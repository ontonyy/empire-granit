declare global {
  interface Window {
    plausible?: (eventName: string, payload?: { props?: Record<string, string> }) => void;
    umami?: {
      track: (eventName: string, payload?: Record<string, string>) => void;
    };
  }
}

const ANALYTICS_STORAGE_KEY = 'empire_local_analytics_events';
const MAX_STORED_EVENTS = 500;

interface AnalyticsEvent {
  eventName: string;
  props: Record<string, string>;
  timestamp: string;
}

interface AdminRecentEvent {
  eventName: string;
  propsSummary: string;
  timestamp: string;
  timeLabel: string;
}

interface CountItem {
  key: string;
  count: number;
}

export interface AnalyticsSummary {
  totalPageViews: number;
  callClicks: number;
  whatsappClicks: number;
  formSubmissions: number;
  galleryCategories: CountItem[];
  recentEvents: AdminRecentEvent[];
}

function getStoredEvents(): AnalyticsEvent[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(ANALYTICS_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as AnalyticsEvent[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistEvent(event: AnalyticsEvent) {
  if (typeof window === 'undefined') {
    return;
  }

  const next = [...getStoredEvents(), event].slice(-MAX_STORED_EVENTS);
  window.localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(next));
}

export function trackEvent(eventName: string, props?: Record<string, string>) {
  if (typeof window === 'undefined') {
    return;
  }

  const safeProps = props || {};
  persistEvent({
    eventName,
    props: safeProps,
    timestamp: new Date().toISOString()
  });

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

function countByEvent(events: AnalyticsEvent[], eventName: string): number {
  return events.filter((event) => event.eventName === eventName).length;
}

function summarizeProps(props: Record<string, string>): string {
  const entries = Object.entries(props);
  if (!entries.length) {
    return 'No extra data';
  }

  return entries
    .slice(0, 3)
    .map(([key, value]) => `${key}: ${value}`)
    .join(' · ');
}

function formatTimeLabel(timestamp: string): string {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return timestamp;
  }

  return date.toLocaleString();
}

export function getAnalyticsSummary(): AnalyticsSummary {
  const events = getStoredEvents();
  const galleryMap = new Map<string, number>();

  events.forEach((event) => {
    if (event.eventName === 'gallery_category_view' && event.props.category) {
      galleryMap.set(event.props.category, (galleryMap.get(event.props.category) || 0) + 1);
    }
  });

  const galleryCategories = Array.from(galleryMap.entries())
    .map(([key, count]) => ({ key, count }))
    .sort((left, right) => right.count - left.count);

  return {
    totalPageViews: countByEvent(events, 'page_view'),
    callClicks: countByEvent(events, 'phone_click'),
    whatsappClicks: countByEvent(events, 'whatsapp_click'),
    formSubmissions:
      countByEvent(events, 'contact_form_submit') + countByEvent(events, 'callback_request_submit'),
    galleryCategories,
    recentEvents: events
      .slice()
      .reverse()
      .slice(0, 12)
      .map((event) => ({
        eventName: event.eventName,
        propsSummary: summarizeProps(event.props),
        timestamp: event.timestamp,
        timeLabel: formatTimeLabel(event.timestamp)
      }))
  };
}
