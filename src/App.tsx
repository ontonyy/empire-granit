import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AboutPage } from './pages/AboutPage';
import { AdminPage } from './pages/AdminPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { GalleryPage } from './pages/GalleryPage';
import { GalleryDetailPage } from './pages/GalleryDetailPage';
import { HomePage } from './pages/HomePage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { PricingPage } from './pages/PricingPage';
import { LOCALES, buildLocalizedPath, getRouteSegment } from './routing';
import type { Locale, RouteKey } from './types';

function resolveRouteKey(locale: Locale, tail: string | undefined): { routeKey: RouteKey; subPath?: string } | null {
  const pieces = (tail || '').split('/').filter(Boolean);
  const mainSegment = pieces[0] || '';
  const subPath = pieces.slice(1).join('/');

  for (const routeKey of [
    'home',
    'about',
    'pricing',
    'gallery',
    'faq',
    'playground',
    'contact',
    'privacy'
  ] as RouteKey[]) {
    if (getRouteSegment(locale, routeKey) === mainSegment) {
      return { routeKey, subPath };
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

  const resolved = resolveRouteKey(locale, params['*']);
  if (!resolved) {
    return <Navigate to={buildLocalizedPath(locale, 'home')} replace />;
  }

  const { routeKey, subPath } = resolved;

  return (
    <Layout locale={locale} routeKey={routeKey}>
      {routeKey === 'home' ? <HomePage locale={locale} /> : null}
      {routeKey === 'about' ? <AboutPage locale={locale} /> : null}
      {routeKey === 'pricing' ? <PricingPage locale={locale} /> : null}
      {routeKey === 'gallery' ? (
        subPath ? (
          <GalleryDetailPage locale={locale} categoryId={subPath} />
        ) : (
          <GalleryPage locale={locale} />
        )
      ) : null}
      {routeKey === 'faq' ? <FaqPage locale={locale} /> : null}
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
      <Route path="/:locale/__empire-admin" element={<AdminRoute />} />
      <Route path="/:locale/*" element={<LocaleRouteResolver />} />
      <Route path="*" element={<Navigate to="/ru/" replace />} />
    </Routes>
  );
}

function AdminRoute() {
  const params = useParams();
  const locale = params.locale as Locale | undefined;

  if (!locale || !LOCALES.includes(locale)) {
    return <Navigate to="/ru/" replace />;
  }

  return <AdminPage locale={locale} />;
}
