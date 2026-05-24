import { Navigate, useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ContactPage } from '../pages/ContactPage';
import { HomePage } from '../pages/HomePage';
import { PricingPage } from '../pages/PricingPage';
import { PrivacyPage } from '../pages/PrivacyPage';
import { WorksPage } from '../pages/WorksPage';
import { LOCALES, buildLocalizedPath } from '../routing';
import type { Locale } from '../types';
import { resolveLegacyRedirect } from './legacy-redirects';
import { resolveRouteKey } from './resolve-route-key';

export function LocaleRouteResolver() {
  const params = useParams();
  const locale = params.locale as Locale | undefined;

  if (!locale || !LOCALES.includes(locale)) {
    return <Navigate to="/et/" replace />;
  }

  const tail = params['*'];
  const resolved = resolveRouteKey(locale, tail);
  if (!resolved) {
    const legacy = resolveLegacyRedirect(locale, tail);
    if (legacy) {
      return <Navigate to={buildLocalizedPath(locale, legacy)} replace />;
    }
    return <Navigate to={buildLocalizedPath(locale, 'home')} replace />;
  }

  const { routeKey } = resolved;

  return (
    <Layout locale={locale} routeKey={routeKey}>
      {routeKey === 'home' ? <HomePage locale={locale} /> : null}
      {routeKey === 'works' ? <WorksPage locale={locale} /> : null}
      {routeKey === 'pricing' ? <PricingPage locale={locale} /> : null}
      {routeKey === 'contact' ? <ContactPage locale={locale} /> : null}
      {routeKey === 'privacy' ? <PrivacyPage locale={locale} /> : null}
    </Layout>
  );
}
