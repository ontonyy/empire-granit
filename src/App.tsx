import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { GalleryPage } from './pages/GalleryPage';
import { HomePage } from './pages/HomePage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { ServicesPage } from './pages/ServicesPage';
import { LOCALES, buildLocalizedPath, getRouteSegment } from './routing';
import type { Locale, RouteKey } from './types';

function resolveRouteKey(locale: Locale, tail: string | undefined): RouteKey | null {
  const cleanTail = (tail || '').replace(/\/+$/, '');
  for (const routeKey of [
    'home',
    'about',
    'services',
    'gallery',
    'playground',
    'contact',
    'privacy'
  ] as RouteKey[]) {
    if (getRouteSegment(locale, routeKey) === cleanTail) {
      return routeKey;
    }
  }
  return null;
}

function LocaleRouteResolver() {
  const params = useParams();
  const locale = params.locale as Locale | undefined;

  if (!locale || !LOCALES.includes(locale)) {
    return <Navigate to="/ru/" replace />;
  }

  const routeKey = resolveRouteKey(locale, params['*']);
  if (!routeKey) {
    return <Navigate to={buildLocalizedPath(locale, 'home')} replace />;
  }

  return (
    <Layout locale={locale} routeKey={routeKey}>
      {routeKey === 'home' ? <HomePage locale={locale} /> : null}
      {routeKey === 'about' ? <AboutPage locale={locale} /> : null}
      {routeKey === 'services' ? <ServicesPage locale={locale} /> : null}
      {routeKey === 'gallery' ? <GalleryPage locale={locale} /> : null}
      {routeKey === 'playground' ? <PlaygroundPage locale={locale} /> : null}
      {routeKey === 'contact' ? <ContactPage locale={locale} /> : null}
      {routeKey === 'privacy' ? <PrivacyPage locale={locale} /> : null}
    </Layout>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/ru/" replace />} />
      <Route path="/:locale/*" element={<LocaleRouteResolver />} />
      <Route path="*" element={<Navigate to="/ru/" replace />} />
    </Routes>
  );
}
