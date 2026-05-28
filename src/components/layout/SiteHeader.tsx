import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteConfig } from '../../config/site';
import { useScrollReveal } from '../../hooks/useScrollReveal';
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
  revealOnScroll?: boolean;
}

type NavRoute = Extract<RouteKey, 'services' | 'works' | 'pricing' | 'contact'>;

const NAV_ROUTES: NavRoute[] = ['services', 'works', 'pricing', 'contact'];

function useResponsiveThreshold(): number {
  const [threshold, setThreshold] = useState(80);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const apply = () => setThreshold(Math.max(120, Math.round(window.innerHeight * 0.7)));
    apply();
    window.addEventListener('resize', apply);
    return () => window.removeEventListener('resize', apply);
  }, []);
  return threshold;
}

export function SiteHeader({
  locale,
  routeKey,
  ui,
  nav,
  logoPrimarySrc,
  logoFallbackSrc,
  revealOnScroll = false
}: SiteHeaderProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [forcedReveal, setForcedReveal] = useState(false);
  const location = useLocation();
  const homePath = buildLocalizedPath(locale, 'home');
  const headerRef = useRef<HTMLElement | null>(null);

  const threshold = useResponsiveThreshold();
  const { revealed: scrollRevealed } = useScrollReveal(threshold);
  const revealed = !revealOnScroll || scrollRevealed || forcedReveal;

  useEffect(() => {
    setMobileNavOpen(false);
  }, [routeKey, location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    if (!revealOnScroll) return;
    const el = headerRef.current;
    if (!el) return;
    const handler = () => setForcedReveal(true);
    el.addEventListener('focusin', handler);
    return () => el.removeEventListener('focusin', handler);
  }, [revealOnScroll]);

  const renderNavLinks = (onClick?: () => void) =>
    NAV_ROUTES.map((key) => {
      const active = routeKey === key;
      return (
        <Link
          key={key}
          className={active ? 'n3-nav-link is-active' : 'n3-nav-link'}
          to={buildLocalizedPath(locale, key)}
          aria-current={active ? 'page' : undefined}
          onClick={onClick}
        >
          {nav[key]}
        </Link>
      );
    });

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

  const headerClass = [
    'n3-header',
    revealOnScroll ? (revealed ? 'is-revealed' : 'is-hidden') : '',
    scrollRevealed ? 'is-solid' : ''
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header ref={headerRef} className={headerClass}>
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
        </Link>

        <nav className="n3-nav" aria-label={ui.primaryNavigation}>
          {renderNavLinks()}
        </nav>

        <div className="n3-header-right">
          <span onClick={() => setForcedReveal(true)}>
            <LanguageSwitcher currentLocale={locale} routeKey={routeKey} />
          </span>
          {phoneLink}
          <button
            type="button"
            className={mobileNavOpen ? 'n3-burger is-open' : 'n3-burger'}
            aria-expanded={mobileNavOpen}
            aria-controls="n3-mobile-nav"
            aria-label={mobileNavOpen ? ui.mobileMenuClose : ui.mobileMenuOpen}
            onClick={() => setMobileNavOpen((v) => !v)}
          >
            {mobileNavOpen ? (
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6 L18 18 M18 6 L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M4 7 H20 M4 12 H20 M4 17 H20" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        id="n3-mobile-nav"
        className={mobileNavOpen ? 'n3-mobile-overlay is-open' : 'n3-mobile-overlay'}
        role="dialog"
        aria-modal="true"
        aria-label={ui.primaryNavigation}
        onClick={(e) => {
          if (e.target === e.currentTarget) setMobileNavOpen(false);
        }}
      >
        <nav className="n3-mobile-nav">
          {renderNavLinks(() => setMobileNavOpen(false))}
        </nav>
      </div>
    </header>
  );
}
