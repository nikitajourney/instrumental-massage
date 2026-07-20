export interface FreeLesson {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  fallbackUrl: string;
  posterUrl: string;
  duration: string;
}

export interface CurriculumZone {
  title: string;
  items: string[];
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface InquiryFormData {
  name: string;
  phone: string;
  email?: string;
  messenger: 'telegram' | 'max' | 'viber' | 'phone';
}

export interface CalculatorResult {
  lessonsToPayback: number;
  monthlyRevenue: number;
  sixMonthsRevenue: number;
  netProfit: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  experience: string;
  avatarUrl: string;
  rating: number;
  text: string;
  highlight: string;
  outcome: string;
}
