import routeSegmentsRaw from './content/route-segments.json';
import type { Locale, RouteKey } from './types';

const routeSegments = routeSegmentsRaw as Record<RouteKey, Record<Locale, string>>;

export const LOCALES: Locale[] = ['ru', 'et', 'en'];
export const ROUTE_KEYS: RouteKey[] = [
  'home',
  'about',
  'pricing',
  'gallery',
  'faq',
  'playground',
  'contact',
  'privacy'
];

export function buildLocalizedPath(locale: Locale, routeKey: RouteKey): string {
  const segment = routeSegments[routeKey][locale];
  return segment ? `/${locale}/${segment}` : `/${locale}/`;
}

export function getRouteSegment(locale: Locale, routeKey: RouteKey): string {
  return routeSegments[routeKey][locale];
}

export function buildCatalogSubcategoryPath(locale: Locale, subcategoryId: string): string {
  return `${buildLocalizedPath(locale, 'gallery')}/catalog/${subcategoryId}`;
}
