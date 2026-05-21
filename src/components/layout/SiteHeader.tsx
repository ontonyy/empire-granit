import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/site';
import { trackEvent } from '../../lib/analytics';
import { buildLocalizedPath } from '../../routing';
import type { Locale, RouteKey } from '../../types';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { CORE_NAV_KEYS, type LayoutUiLabels } from './ui-labels';

interface SiteHeaderProps {
  locale: Locale;
  routeKey: RouteKey;
  ui: LayoutUiLabels;
  nav: Record<RouteKey, string>;
  logoPrimarySrc: string;
  logoFallbackSrc: string;
}

export function SiteHeader({
  locale,
  routeKey,
  ui,
  nav,
  logoPrimarySrc,
  logoFallbackSrc
}: SiteHeaderProps) {
  const [isHeaderElevated, setIsHeaderElevated] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderElevated(window.scrollY > 18);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [routeKey]);

  return (
    <header className={isHeaderElevated ? 'site-header is-elevated' : 'site-header'}>
      <div className="brand-row">
        <div className="brand-main">
          <Link className="brand" to={buildLocalizedPath(locale, 'home')}>
            <img
              className="brand-logo"
              src={logoPrimarySrc}
              alt={`${siteConfig.siteName} logo`}
              onError={(event) => {
                const img = event.currentTarget;
                if (!img.dataset.fallback) {
                  img.dataset.fallback = '1';
                  img.src = logoFallbackSrc;
                }
              }}
            />
            <span>
              <strong className="sr-only">{siteConfig.siteName}</strong>
            </span>
          </Link>
          <a
            className="brand-emergency-link"
            href={siteConfig.contacts.phoneLink}
            aria-label={`${ui.call} ${siteConfig.contacts.phoneDisplay}`}
            onClick={() => trackEvent('phone_click', { locale, source: 'header-emergency' })}
          >
            <svg
              className="brand-emergency-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
            </svg>
            {ui.emergencyPrefix ? <span className="brand-emergency-prefix">{ui.emergencyPrefix}</span> : null}
            <span className="brand-emergency-value">{siteConfig.contacts.phoneDisplay}</span>
          </a>
        </div>
        <div className="header-controls">
          <LanguageSwitcher currentLocale={locale} routeKey={routeKey} />
          <button
            type="button"
            className={mobileNavOpen ? 'mobile-nav-toggle active' : 'mobile-nav-toggle'}
            aria-expanded={mobileNavOpen}
            aria-controls="main-nav"
            aria-label={mobileNavOpen ? ui.mobileMenuClose : ui.mobileMenuOpen}
            onClick={() => setMobileNavOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <nav
        id="main-nav"
        className={mobileNavOpen ? 'main-nav open' : 'main-nav'}
        aria-label={ui.primaryNavigation}
      >
        {CORE_NAV_KEYS.map((navKey) => (
          <Link
            key={navKey}
            className={navKey === routeKey ? 'nav-link active' : 'nav-link'}
            to={buildLocalizedPath(locale, navKey)}
          >
            {nav[navKey]}
          </Link>
        ))}
      </nav>
    </header>
  );
}
