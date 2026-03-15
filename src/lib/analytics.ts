import { addDoc, collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
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
const MAX_RECENT_EVENTS = 12;
const MAX_FETCHED_EVENTS = 1000;

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

export type AdminEventFilter = 'all' | 'forms' | 'gallery' | 'pricing';

export interface AnalyticsSummary {
  totalPageViews: number;
  callClicks: number;
  whatsappClicks: number;
  formSubmissions: number;
  galleryCategories: CountItem[];
  pricePackages: CountItem[];
  filteredEvents: Record<AdminEventFilter, AdminRecentEvent[]>;
  recentEvents: AdminRecentEvent[];
}

const FILTER_EVENT_NAMES: Record<Exclude<AdminEventFilter, 'all'>, string[]> = {
  forms: ['contact_form_submit', 'callback_request_submit'],
  gallery: ['gallery_category_view'],
  pricing: ['pricing_package_view', 'pricing_package_select']
};

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

function buildRecentEvents(events: AnalyticsEvent[], allowedEventNames?: string[]): AdminRecentEvent[] {
  const filteredEvents = allowedEventNames
    ? events.filter((event) => allowedEventNames.includes(event.eventName))
    : events;

  return filteredEvents.slice(0, MAX_RECENT_EVENTS).map((event) => ({
    eventName: event.eventName,
    propsSummary: summarizeProps(event.props || {}),
    timestamp: event.timestamp,
    timeLabel: formatTimeLabel(event.timestamp)
  }));
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const snapshot = await getDocs(
    query(
      collection(firestore, ANALYTICS_COLLECTION),
      orderBy('timestamp', 'desc'),
      limit(MAX_FETCHED_EVENTS)
    )
  );

  const events = snapshot.docs.map((doc) => doc.data() as AnalyticsEvent);
  const galleryMap = new Map<string, number>();
  const pricingMap = new Map<string, number>();

  events.forEach((event) => {
    if (event.eventName === 'gallery_category_view' && event.props.category) {
      galleryMap.set(event.props.category, (galleryMap.get(event.props.category) || 0) + 1);
    }

    if (event.eventName === 'pricing_package_select' && event.props.package) {
      pricingMap.set(event.props.package, (pricingMap.get(event.props.package) || 0) + 1);
    }
  });

  const galleryCategories = Array.from(galleryMap.entries())
    .map(([key, count]) => ({ key, count }))
    .sort((left, right) => right.count - left.count);

  const pricePackages = Array.from(pricingMap.entries())
    .map(([key, count]) => ({ key, count }))
    .sort((left, right) => right.count - left.count);

  return {
    totalPageViews: countByEvent(events, 'page_view'),
    callClicks: countByEvent(events, 'phone_click'),
    whatsappClicks: countByEvent(events, 'whatsapp_click'),
    formSubmissions:
      countByEvent(events, 'contact_form_submit') + countByEvent(events, 'callback_request_submit'),
    galleryCategories,
    pricePackages,
    filteredEvents: {
      all: buildRecentEvents(events),
      forms: buildRecentEvents(events, FILTER_EVENT_NAMES.forms),
      gallery: buildRecentEvents(events, FILTER_EVENT_NAMES.gallery),
      pricing: buildRecentEvents(events, FILTER_EVENT_NAMES.pricing)
    },
    recentEvents: buildRecentEvents(events)
  };
}
