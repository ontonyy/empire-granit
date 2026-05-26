import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteConfig } from '../../config/site';
import { trackEvent } from '../../lib/analytics';
import { buildLocalizedPath } from '../../routing';
import type { Locale, RouteKey } from '../../types';
import { LanguageSwitcher } from '../LanguageSwitcher';
import type { LayoutUiLabels } from './ui-labels';

interface SiteHeaderProps {
  locale: Locale;
  routeKey: RouteKey;
  ui: LayoutUiLabels;
  nav: Record<RouteKey, string>;
  logoPrimarySrc: string;
  logoFallbackSrc: string;
}

interface AnchorDef {
  hash: string;
  label: string;
}

export function SiteHeader({
  locale,
  routeKey,
  ui,
  nav,
  logoPrimarySrc,
  logoFallbackSrc
}: SiteHeaderProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();
  const homePath = buildLocalizedPath(locale, 'home');
  const pricingPath = buildLocalizedPath(locale, 'pricing');
  const isHome = routeKey === 'home';

  useEffect(() => {
    setMobileNavOpen(false);
  }, [routeKey, location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileNavOpen]);

  const anchors: AnchorDef[] = [
    { hash: 'services', label: ui.navServices },
    { hash: 'works', label: nav.works },
    { hash: 'contact', label: nav.contact }
  ];

  const anchorHref = (hash: string) => (isHome ? `#${hash}` : `${homePath}#${hash}`);

  const renderAnchors = (onClick?: () => void) =>
    anchors.map((a) => (
      <a key={a.hash} className="n3-nav-anchor" href={anchorHref(a.hash)} onClick={onClick}>
        {a.label}
      </a>
    ));

  const phoneLink = (
    <a
      className="n3-phone"
      href={siteConfig.contacts.phoneLink}
      aria-label={`${ui.call} ${siteConfig.contacts.phoneDisplay}`}
      onClick={() => trackEvent('phone_click', { locale, source: 'header' })}
    >
      <svg
        className="n3-phone-icon"
        viewBox="0 0 24 24"
        width="12"
        height="12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
      </svg>
      <span>{siteConfig.contacts.phoneDisplay}</span>
    </a>
  );

  return (
    <header className="n3-header">
      <div className="n3-header-inner">
        <Link className="n3-brand" to={homePath} aria-label={siteConfig.siteName}>
          <picture>
            <source type="image/webp" srcSet={logoPrimarySrc.replace(/logo\.png$/, 'logo.webp')} />
            <img
              className="n3-brand-logo"
              src={logoPrimarySrc}
              alt=""
              width={400}
              height={267}
              decoding="async"
              onError={(event) => {
                const img = event.currentTarget;
                if (!img.dataset.fallback) {
                  img.dataset.fallback = '1';
                  img.src = logoFallbackSrc;
                }
              }}
            />
          </picture>
          <span className="n3-wordmark">EMPIRE GRANIT</span>
        </Link>

        <nav className="n3-nav" aria-label={ui.primaryNavigation}>
          {renderAnchors()}
          <Link
            className={routeKey === 'pricing' ? 'n3-nav-anchor is-active' : 'n3-nav-anchor'}
            to={pricingPath}
            aria-current={routeKey === 'pricing' ? 'page' : undefined}
          >
            {nav.pricing}
          </Link>
        </nav>

        <div className="n3-header-right">
          <LanguageSwitcher currentLocale={locale} routeKey={routeKey} />
          {phoneLink}
          <button
            type="button"
            className="n3-burger"
            aria-expanded={mobileNavOpen}
            aria-controls="n3-mobile-nav"
            aria-label={mobileNavOpen ? ui.mobileMenuClose : ui.mobileMenuOpen}
            onClick={() => setMobileNavOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="n3-mobile-nav"
        className={mobileNavOpen ? 'n3-mobile-overlay is-open' : 'n3-mobile-overlay'}
        role="dialog"
        aria-modal="true"
        aria-label={ui.primaryNavigation}
        hidden={!mobileNavOpen}
      >
        <nav className="n3-mobile-nav">
          {renderAnchors(() => setMobileNavOpen(false))}
          <Link
            className="n3-nav-anchor"
            to={pricingPath}
            onClick={() => setMobileNavOpen(false)}
          >
            {nav.pricing}
          </Link>
        </nav>
      </div>
    </header>
  );
}
