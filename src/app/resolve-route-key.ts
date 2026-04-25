import { getRouteSegment } from '../routing';
import type { Locale, RouteKey } from '../types';

const ORDERED_ROUTE_KEYS: RouteKey[] = [
  'home',
  'about',
  'pricing',
  'gallery',
  'faq',
  'playground',
  'contact',
  'privacy'
];

export function resolveRouteKey(
  locale: Locale,
  tail: string | undefined
): { routeKey: RouteKey; subPath?: string } | null {
  const pieces = (tail || '').split('/').filter(Boolean);
  const mainSegment = pieces[0] || '';
  const subPath = pieces.slice(1).join('/');

  for (const routeKey of ORDERED_ROUTE_KEYS) {
    if (getRouteSegment(locale, routeKey) === mainSegment) {
      return { routeKey, subPath };
    }
  }
  return null;
}
