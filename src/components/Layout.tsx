import type { PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import { getLocaleContent } from '../content';
import { buildLocalizedPath } from '../routing';
import type { Locale, RouteKey } from '../types';
import { AnalyticsLoader } from './AnalyticsLoader';
import { SeoHead } from './SeoHead';
import { SiteFooter } from './layout/SiteFooter';
import { SiteHeader } from './layout/SiteHeader';
import { getLayoutUiLabels } from './layout/ui-labels';
import { usePageView } from './layout/use-page-view';
import { useRevealOnScroll } from './layout/use-reveal-on-scroll';
import { useScrollToHash } from './layout/use-scroll-to-hash';

interface LayoutProps extends PropsWithChildren {
  locale: Locale;
  routeKey: RouteKey;
}

export function Layout({ locale, routeKey, children }: LayoutProps) {
  const content = getLocaleContent(locale);
  const ui = getLayoutUiLabels(locale);
  const location = useLocation();
  const logoPrimarySrc = `${import.meta.env.BASE_URL}images/logo.png`;
  const logoFallbackSrc = `${import.meta.env.BASE_URL}images/logo.png`;
  const mapLink = `${buildLocalizedPath(locale, 'contact')}#map`;
  const isHomePage = routeKey === 'home';

  useScrollToHash(location.hash, location.pathname);
  usePageView(locale, routeKey, location.pathname);
  useRevealOnScroll(location.pathname);

  return (
    <div className="site-shell">
      <SeoHead locale={locale} routeKey={routeKey} />
      <AnalyticsLoader />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <SiteHeader
        locale={locale}
        routeKey={routeKey}
        ui={ui}
        nav={content.nav}
        logoPrimarySrc={logoPrimarySrc}
        logoFallbackSrc={logoFallbackSrc}
        revealOnScroll={false}
      />

      <main id="main-content" className={isHomePage ? 'main-content is-home' : 'main-content'}>
        {children}
      </main>

      <SiteFooter
        locale={locale}
        ui={ui}
        nav={content.nav}
        logoSrc={logoPrimarySrc}
        mapLink={mapLink}
        hidePhoneLink={isHomePage}
      />
    </div>
  );
}
