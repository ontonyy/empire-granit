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
  hidePhoneLink?: boolean;
}

export function SiteHeader({
  locale,
  routeKey,
  ui,
  nav,
  logoPrimarySrc,
  logoFallbackSrc,
  hidePhoneLink = false
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

  const mobileMenuLabel =
    locale === 'ru' ? 'Открыть меню' : locale === 'et' ? 'Ava menüü' : 'Open menu';
  const mobileCloseLabel =
    locale === 'ru' ? 'Закрыть меню' : locale === 'et' ? 'Sulge menüü' : 'Close menu';

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
          {!hidePhoneLink ? (
            <a
              className="brand-emergency-link"
              href={siteConfig.contacts.phoneLink}
              onClick={() => trackEvent('phone_click', { locale, source: 'header-emergency' })}
            >
              {ui.emergencyPrefix ? <span className="brand-emergency-prefix">{ui.emergencyPrefix}</span> : null}
              <span className="brand-emergency-value">{siteConfig.contacts.phoneDisplay}</span>
            </a>
          ) : null}
        </div>
        <div className="header-controls">
          <LanguageSwitcher currentLocale={locale} routeKey={routeKey} />
          <button
            type="button"
            className={mobileNavOpen ? 'mobile-nav-toggle active' : 'mobile-nav-toggle'}
            aria-expanded={mobileNavOpen}
            aria-controls="main-nav"
            aria-label={mobileNavOpen ? mobileCloseLabel : mobileMenuLabel}
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
        aria-label="Primary"
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
