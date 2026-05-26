declare global {
  interface Window {
    plausible?: (eventName: string, payload?: { props?: Record<string, string> }) => void;
    umami?: {
      track: (eventName: string, payload?: Record<string, string>) => void;
    };
  }
}

const ANALYTICS_COLLECTION = 'analytics_events';

interface AnalyticsEvent {
  eventName: string;
  props: Record<string, string>;
  timestamp: string;
}

async function writeToFirestore(event: AnalyticsEvent) {
  try {
    const [{ addDoc, collection }, { firestore }] = await Promise.all([
      import('firebase/firestore'),
      import('./firebase')
    ]);
    await addDoc(collection(firestore, ANALYTICS_COLLECTION), event);
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('[analytics][firestore-write-failed]', error);
    }
  }
}

export async function trackEvent(eventName: string, props?: Record<string, string>) {
  if (typeof window === 'undefined') {
    return;
  }

  const safeProps = props || {};
  const event: AnalyticsEvent = {
    eventName,
    props: safeProps,
    timestamp: new Date().toISOString()
  };

  void writeToFirestore(event);

  if (typeof window.plausible === 'function') {
    window.plausible(eventName, safeProps ? { props: safeProps } : undefined);
    return;
  }

  if (window.umami && typeof window.umami.track === 'function') {
    window.umami.track(eventName, safeProps);
    return;
  }

  if (import.meta.env.DEV) {
    console.info('[analytics]', eventName, safeProps);
  }
}
