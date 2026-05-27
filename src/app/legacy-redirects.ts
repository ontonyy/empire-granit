import type { Locale, RouteKey } from '../types';

export const LEGACY_REDIRECTS: Record<Locale, Record<string, RouteKey>> = {
  ru: {
    'pamyatniki': 'works',
    'raboty': 'works',
    'galereya': 'works',
    'materialy': 'services',
    'o-kompanii': 'home',
    'process': 'services',
    'uslugi/restavratsiya-ustanovka': 'services',
    'preview': 'home',
    'voprosy': 'home',
    'konfigurator': 'home'
  },
  et: {
    'hauakivid': 'works',
    'portfoolio': 'works',
    'galerii': 'works',
    'materjalid': 'services',
    'meist': 'home',
    'protsess': 'services',
    'teenused/taastamine-paigaldus': 'services',
    'eelvaade': 'home',
    'kkk': 'home',
    'konfiguraator': 'home'
  },
  en: {
    'memorials': 'works',
    'portfolio': 'works',
    'gallery': 'works',
    'materials': 'services',
    'about': 'home',
    'process': 'services',
    'services/restoration-installation': 'services',
    'preview': 'home',
    'faq': 'home',
    'playground': 'home'
  }
};

export function resolveLegacyRedirect(locale: Locale, tail: string | undefined): RouteKey | null {
  if (!tail) return null;
  const normalized = tail.replace(/\/+$/, '');
  return LEGACY_REDIRECTS[locale][normalized] ?? null;
}
