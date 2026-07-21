import { InquiryFormData } from '../types';

type LeadCaptureResult = {
  success?: boolean;
  notifications?: {
    telegram?: {
      configured?: boolean;
    };
    vk?: {
      configured?: boolean;
    };
    email?: {
      configured?: boolean;
    };
  };
  errors?: string[];
  error?: string;
};

type LeadPayload = InquiryFormData & {
  coursePrice: number | string;
};

const getPublicEnv = (key: string) =>
  (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.[key];

const LEAD_EMAIL = getPublicEnv('VITE_LEAD_EMAIL') || 'academia.massage@yandex.ru';

const messengerLabels: Record<InquiryFormData['messenger'], string> = {
  telegram: 'Telegram',
  max: 'Max',
  viber: 'Viber',
  phone: 'Звонок'
};

const isGithubPages = () => window.location.hostname.endsWith('github.io');

const getApiUrl = () => {
  const explicitUrl = getPublicEnv('VITE_LEAD_API_URL');
  if (explicitUrl) return explicitUrl;

  return isGithubPages() ? '' : '/api/lead';
};

const saveLeadBackup = (payload: LeadPayload) => {
  try {
    const existingInquiries = JSON.parse(localStorage.getItem('massage_inquiries') || '[]');
    existingInquiries.push({
      ...payload,
      price: payload.coursePrice,
      date: new Date().toISOString()
    });
    localStorage.setItem('massage_inquiries', JSON.stringify(existingInquiries));
  } catch {
    // Local backup is best-effort only. A failed browser storage write should not block checkout.
  }
};

const leadToFormSubmitPayload = (payload: LeadPayload) => ({
  name: payload.name,
  phone: payload.phone,
  email: payload.email,
  messenger: messengerLabels[payload.messenger],
  course: 'Инструментальный массаж',
  price: `${payload.coursePrice} ₽`,
  submitted_at: new Date().toLocaleString('ru-RU'),
  _subject: 'Новая заявка на курс инструментального массажа',
  _template: 'table',
  _captcha: 'false'
});

const postFormSubmit = async (url: string, payload: Record<string, string | undefined>) => {
  const formBody = new URLSearchParams();

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      formBody.append(key, value);
    }
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  });

  let data: LeadCaptureResult = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data.error || 'Не удалось отправить заявку.');
  }

  return data;
};

const postJson = async (url: string, payload: unknown) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  let data: LeadCaptureResult = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data.error || 'Не удалось отправить заявку.');
  }

  return data;
};

export const submitLead = async (payload: LeadPayload): Promise<LeadCaptureResult> => {
  saveLeadBackup(payload);

  const apiUrl = getApiUrl();
  if (apiUrl) {
    try {
      const data = await postJson(apiUrl, payload);
      if (data.success) return data;
    } catch {
      // Fall through to the static-site email endpoint.
    }
  }

  try {
    await postFormSubmit(`https://formsubmit.co/ajax/${encodeURIComponent(LEAD_EMAIL)}`, leadToFormSubmitPayload(payload));
    return { success: true };
  } catch {
    return {
      success: false,
      error: 'Не удалось отправить заявку автоматически. Напишите нам в Telegram или Max ниже, мы быстро ответим.'
    };
  }
};
