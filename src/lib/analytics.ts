import { addDoc, collection } from 'firebase/firestore';
import { firestore } from './firebase';

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

  try {
    await addDoc(collection(firestore, ANALYTICS_COLLECTION), event);
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('[analytics][firestore-write-failed]', error);
    }
  }

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

export {
  getAnalyticsSummary,
  type AdminEventFilter,
  type AdminRecentEvent,
  type AnalyticsSummary
} from './analytics-summary';
