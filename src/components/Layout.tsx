import type { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { getLocaleContent } from '../content';
import { siteConfig } from '../config/site';
import { trackEvent } from '../lib/analytics';
import { ROUTE_KEYS, buildLocalizedPath } from '../routing';
import type { Locale, RouteKey } from '../types';
import { AnalyticsLoader } from './AnalyticsLoader';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SeoHead } from './SeoHead';

interface LayoutProps extends PropsWithChildren {
  locale: Locale;
  routeKey: RouteKey;
}

export function Layout({ locale, routeKey, children }: LayoutProps) {
  const content = getLocaleContent(locale);

  return (
    <div className="site-shell">
      <SeoHead locale={locale} routeKey={routeKey} />
      <AnalyticsLoader />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <div className="brand-row">
          <Link className="brand" to={buildLocalizedPath(locale, 'home')}>
            <img
              className="brand-logo"
              src={`${import.meta.env.BASE_URL}images/logo-empire-granit.svg`}
              alt={`${siteConfig.siteName} logo`}
            />
            <span>
              <strong className="sr-only">{siteConfig.siteName}</strong>
              <small>{siteConfig.contacts.address}</small>
            </span>
          </Link>
          <LanguageSwitcher currentLocale={locale} routeKey={routeKey} />
        </div>

        <nav className="main-nav" aria-label="Primary">
          {ROUTE_KEYS.map((navKey) => (
            <Link
              key={navKey}
              className={navKey === routeKey ? 'nav-link active' : 'nav-link'}
              to={buildLocalizedPath(locale, navKey)}
            >
              {content.nav[navKey]}
            </Link>
          ))}
        </nav>

        <div className="cta-row">
          <a
            href={siteConfig.contacts.phoneLink}
            onClick={() => trackEvent('phone_click', { locale })}
          >
            {content.cta.callNow}
          </a>
          <a
            href={siteConfig.contacts.whatsapp}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent('whatsapp_click', { locale })}
          >
            {content.cta.writeWhatsapp}
          </a>
          <Link to={buildLocalizedPath(locale, 'contact')}>{content.cta.sendInquiry}</Link>
        </div>
      </header>

      <main id="main-content" className="main-content">
        {children}
      </main>

      <footer className="site-footer">
        <p>{siteConfig.contacts.company}</p>
        <p>
          <a href={siteConfig.contacts.phoneLink}>{siteConfig.contacts.phoneDisplay}</a>
          {' · '}
          <a href={`mailto:${siteConfig.contacts.email}`}>{siteConfig.contacts.email}</a>
        </p>
      </footer>
    </div>
  );
}
