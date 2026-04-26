import { getRouteSegment, ROUTE_KEYS } from '../routing';
import type { Locale, RouteKey } from '../types';

export function resolveRouteKey(
  locale: Locale,
  tail: string | undefined
): { routeKey: RouteKey; subPath?: string } | null {
  const pieces = (tail || '').split('/').filter(Boolean);
  const mainSegment = pieces[0] || '';
  const subPath = pieces.slice(1).join('/');

  for (const routeKey of ROUTE_KEYS) {
    if (getRouteSegment(locale, routeKey) === mainSegment) {
      return { routeKey, subPath };
    }
  }
  return null;
}
