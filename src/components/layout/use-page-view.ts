import { useEffect } from 'react';
import { trackEvent } from '../../lib/analytics';
import type { Locale, RouteKey } from '../../types';

export function usePageView(locale: Locale, routeKey: RouteKey, pathname: string) {
  useEffect(() => {
    trackEvent('page_view', { locale, routeKey, pathname });
  }, [locale, routeKey, pathname]);
}
