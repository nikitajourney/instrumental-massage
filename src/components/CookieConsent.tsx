import React, { useEffect, useState } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { hasAnalyticsConsent, initAnalytics, setAnalyticsConsent } from '../services/analytics';

const COOKIE_CHOICE_KEY = 'cookie_choice_v1';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const choice = window.localStorage.getItem(COOKIE_CHOICE_KEY);
    if (!choice) {
      setIsVisible(true);
      return;
    }

    if (hasAnalyticsConsent()) {
      initAnalytics();
    }
  }, []);

  const acceptAnalytics = () => {
    window.localStorage.setItem(COOKIE_CHOICE_KEY, 'accepted');
    setAnalyticsConsent(true);
    initAnalytics();
    setIsVisible(false);
  };

  const declineAnalytics = () => {
    window.localStorage.setItem(COOKIE_CHOICE_KEY, 'necessary');
    setAnalyticsConsent(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6">
      <div className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-graphite-900/95 p-4 shadow-2xl shadow-black/60 backdrop-blur-xl sm:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-turquoise-500/10 text-turquoise-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="space-y-1.5">
              <p className="text-sm font-bold text-white">Cookie и аналитика</p>
              <p className="text-xs leading-relaxed text-graphite-300">
                Мы используем обязательные cookie для работы сайта, а Яндекс.Метрику и VK-пиксель подключаем только
                с вашего согласия, чтобы анализировать рекламу и улучшать курс.
              </p>
              <div className="flex flex-wrap gap-3 text-[11px]">
                <a href="/cookies.html" className="font-semibold text-turquoise-400 hover:underline">
                  Подробнее
                </a>
                <a href="/privacy.html" className="font-semibold text-turquoise-400 hover:underline">
                  Политика обработки персональных данных
                </a>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-col gap-2 sm:flex-row md:pt-1">
            <button
              type="button"
              onClick={acceptAnalytics}
              className="rounded-xl bg-turquoise-500 px-4 py-2.5 text-xs font-extrabold uppercase tracking-wide text-graphite-950 transition-colors hover:bg-turquoise-400"
            >
              Принять
            </button>
            <button
              type="button"
              onClick={declineAnalytics}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-graphite-200 transition-colors hover:bg-white/10"
            >
              Только необходимые
            </button>
            <button
              type="button"
              onClick={declineAnalytics}
              aria-label="Закрыть уведомление"
              className="hidden rounded-xl p-2.5 text-graphite-400 transition-colors hover:bg-white/10 hover:text-white sm:inline-flex"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
