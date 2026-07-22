const YANDEX_METRIKA_ID = 110922501;
const VK_PIXEL_ID = 3781680;

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

declare global {
  interface Window {
    ym?: (counterId: number, method: 'reachGoal', goal: AnalyticsGoal, params?: AnalyticsParams) => void;
    _tmr?: Array<Record<string, unknown>>;
  }
}

export const trackGoal = (goal: AnalyticsGoal, params?: AnalyticsParams) => {
  if (typeof window === 'undefined') return;

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
