const YANDEX_METRIKA_ID = 110922501;
const VK_PIXEL_ID = 3781680;
const ANALYTICS_CONSENT_KEY = 'analytics_consent_v1';

type AnalyticsGoal =
  | 'open_lead_form'
  | 'lead_submit_success'
  | 'click_pay_course'
  | 'click_free_lesson'
  | 'play_free_lesson'
  | 'click_direct_contact'
  | 'use_roi_calculator';

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

const firedGoals = new Set<string>();
let analyticsInitialized = false;

declare global {
  interface Window {
    ym?: ((...args: unknown[]) => void) & { a?: IArguments[]; l?: number };
    _tmr?: Array<Record<string, unknown>>;
  }
}

export const hasAnalyticsConsent = () => {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(ANALYTICS_CONSENT_KEY) === 'accepted';
};

export const setAnalyticsConsent = (accepted: boolean) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(ANALYTICS_CONSENT_KEY, accepted ? 'accepted' : 'declined');
};

const loadScriptOnce = (id: string, src: string) => {
  if (document.getElementById(id)) return;
  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
};

export const initAnalytics = () => {
  if (typeof window === 'undefined' || analyticsInitialized || !hasAnalyticsConsent()) return;

  analyticsInitialized = true;

  window.ym = window.ym || function ymStub(...args: unknown[]) {
    (window.ym!.a = window.ym!.a || []).push(args as unknown as IArguments);
  };
  window.ym.l = Date.now();
  loadScriptOnce('yandex-metrika-tag', `https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}`);
  window.ym(YANDEX_METRIKA_ID, 'init', {
    ssr: true,
    webvisor: true,
    clickmap: true,
    ecommerce: 'dataLayer',
    referrer: document.referrer,
    url: location.href,
    accurateTrackBounce: true,
    trackLinks: true
  });

  window._tmr = window._tmr || [];
  window._tmr.push({ id: VK_PIXEL_ID, type: 'pageView', start: Date.now() });
  loadScriptOnce('tmr-code', 'https://top-fwz1.mail.ru/js/code.js');
};

export const trackGoal = (goal: AnalyticsGoal, params?: AnalyticsParams) => {
  if (typeof window === 'undefined') return;
  if (!hasAnalyticsConsent()) return;

  initAnalytics();

  if (typeof window.ym === 'function') {
    window.ym(YANDEX_METRIKA_ID, 'reachGoal', goal, params);
  }

  window._tmr?.push({
    id: VK_PIXEL_ID,
    type: 'reachGoal',
    goal,
    params,
  });
};

export const trackGoalOnce = (goal: AnalyticsGoal, params?: AnalyticsParams) => {
  const key = `${goal}:${JSON.stringify(params ?? {})}`;
  if (firedGoals.has(key)) return;

  firedGoals.add(key);
  trackGoal(goal, params);
};
