import { Navigate, useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { AboutPage } from '../pages/AboutPage';
import { ContactPage } from '../pages/ContactPage';
import { FaqPage } from '../pages/FaqPage';
import { GalleryDetailPage } from '../pages/GalleryDetailPage';
import { GalleryPage } from '../pages/GalleryPage';
import { HomePage } from '../pages/HomePage';
import { PlaygroundPage } from '../pages/PlaygroundPage';
import { PricingPage } from '../pages/PricingPage';
import { PrivacyPage } from '../pages/PrivacyPage';
import { LOCALES, buildLocalizedPath } from '../routing';
import type { Locale } from '../types';
import { resolveRouteKey } from './resolve-route-key';

export function LocaleRouteResolver() {
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
