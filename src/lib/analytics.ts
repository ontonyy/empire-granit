declare global {
  interface Window {
    plausible?: (eventName: string, payload?: { props?: Record<string, string> }) => void;
    umami?: {
      track: (eventName: string, payload?: Record<string, string>) => void;
    };
  }
}

export function trackEvent(eventName: string, props?: Record<string, string>) {
  if (typeof window === 'undefined') {
    return;
  }

  if (typeof window.plausible === 'function') {
    window.plausible(eventName, props ? { props } : undefined);
    return;
  }

  if (window.umami && typeof window.umami.track === 'function') {
    window.umami.track(eventName, props);
    return;
  }

  if (import.meta.env.DEV) {
    console.info('[analytics]', eventName, props || {});
  }
}
