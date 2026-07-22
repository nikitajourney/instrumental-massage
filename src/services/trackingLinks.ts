export const MONECLE_BUY_URL = 'https://monecle.com/buy/96990';

const TRACKING_STORAGE_KEY = 'instrument_massage_tracking_params';

const isTrackingParam = (key: string) => {
  const normalized = key.toLowerCase();
  return (
    normalized === 'yclid' ||
    normalized === 'gclid' ||
    normalized === 'fbclid' ||
    normalized === '_openstat' ||
    normalized.startsWith('utm_')
  );
};

const collectTrackingParams = () => {
  const params = new URLSearchParams();
  const currentParams = new URLSearchParams(window.location.search);

  currentParams.forEach((value, key) => {
    if (isTrackingParam(key) && value) {
      params.set(key, value);
    }
  });

  if ([...params.keys()].length > 0) {
    sessionStorage.setItem(TRACKING_STORAGE_KEY, params.toString());
    return params;
  }

  return new URLSearchParams(sessionStorage.getItem(TRACKING_STORAGE_KEY) || '');
};

export const getTrackedMonecleBuyUrl = () => {
  if (typeof window === 'undefined') return MONECLE_BUY_URL;

  const url = new URL(MONECLE_BUY_URL);
  collectTrackingParams().forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  return url.toString();
};
