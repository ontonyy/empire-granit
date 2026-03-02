import routeSegmentsRaw from './content/route-segments.json';
import type { Locale, RouteKey } from './types';

const routeSegments = routeSegmentsRaw as Record<RouteKey, Record<Locale, string>>;

export const LOCALES: Locale[] = ['ru', 'et', 'en'];
export const ROUTE_KEYS: RouteKey[] = [
  'home',
  'about',
  'services',
  'gallery',
  'playground',
  'contact',
  'privacy'
];

export function buildLocalizedPath(locale: Locale, routeKey: RouteKey): string {
  const segment = routeSegments[routeKey][locale];
  return segment ? `/${locale}/${segment}` : `/${locale}/`;
}

export function detectLocale(pathname: string): Locale {
  const first = pathname.split('/').filter(Boolean)[0];
  return LOCALES.includes(first as Locale) ? (first as Locale) : 'ru';
}

export function detectRouteKey(pathname: string, locale: Locale): RouteKey {
  const pieces = pathname.split('/').filter(Boolean);
  const segment = pieces[1] ?? '';
  for (const routeKey of ROUTE_KEYS) {
    if (routeSegments[routeKey][locale] === segment) {
      return routeKey;
    }
  }
  return 'home';
}

export function getAllLocalizedPaths(): string[] {
  return LOCALES.flatMap((locale) =>
    ROUTE_KEYS.map((routeKey) => buildLocalizedPath(locale, routeKey))
  );
}

export function getRouteSegment(locale: Locale, routeKey: RouteKey): string {
  return routeSegments[routeKey][locale];
}
