import type { Locale, RouteKey } from '../types';

export const LEGACY_REDIRECTS: Record<Locale, Record<string, RouteKey>> = {
  ru: {
    'pamyatniki': 'works',
    'raboty': 'works',
    'galereya': 'works',
    'materialy': 'works',
    'o-kompanii': 'home',
    'process': 'home',
    'uslugi/restavratsiya-ustanovka': 'home',
    'preview': 'home',
    'voprosy': 'home',
    'konfigurator': 'home'
  },
  et: {
    'hauakivid': 'works',
    'portfoolio': 'works',
    'galerii': 'works',
    'materjalid': 'works',
    'meist': 'home',
    'protsess': 'home',
    'teenused/taastamine-paigaldus': 'home',
    'eelvaade': 'home',
    'kkk': 'home',
    'konfiguraator': 'home'
  },
  en: {
    'memorials': 'works',
    'portfolio': 'works',
    'gallery': 'works',
    'materials': 'works',
    'about': 'home',
    'process': 'home',
    'services/restoration-installation': 'home',
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
