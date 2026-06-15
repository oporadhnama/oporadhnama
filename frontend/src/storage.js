export function readStoredJSON(key, fallback = {}) {
  if (typeof window === 'undefined') {
    return fallback;
  }

  try {
    return JSON.parse(window.localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

export function readStoredToken() {
  if (typeof window === 'undefined') {
    return '';
  }

  return window.localStorage.getItem('access_token') || '';
}

export function hasStoredToken() {
  const token = readStoredToken();
  return token !== 'null' && token !== 'undefined' && token !== '';
}
