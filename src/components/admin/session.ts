const ADMIN_SESSION_KEY = 'empire_admin_session';

export function hasAdminSession(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.localStorage.getItem(ADMIN_SESSION_KEY) === '1';
}

export function setAdminSession() {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(ADMIN_SESSION_KEY, '1');
}

export function clearAdminSession() {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.removeItem(ADMIN_SESSION_KEY);
}
