import { useEffect, useRef, useState, type PropsWithChildren } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getLocaleContent } from '../content';
import { siteConfig } from '../config/site';
import { trackEvent } from '../lib/analytics';
import { buildLocalizedPath } from '../routing';
import type { Locale, RouteKey } from '../types';
import { AnalyticsLoader } from './AnalyticsLoader';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SeoHead } from './SeoHead';

interface LayoutProps extends PropsWithChildren {
  locale: Locale;
  routeKey: RouteKey;
}

const CORE_NAV_KEYS: RouteKey[] = ['home', 'pricing', 'gallery', 'faq', 'contact'];

function getUiLabels(locale: Locale) {
  if (locale === 'ru') {
    return {
      emergencyPrefix: 'Круглосуточно',
      footerIntro: 'Памятники, установка и помощь с выбором по всей Эстонии.',
      footerNavigation: 'Разделы',
      footerContacts: 'Контакты',
      footerAddress: 'Адрес',
      footerHours: 'Режим работы',
      footerHoursValue: 'Пн-Пт 09:00-18:00, Сб 10:00-15:00',
      footerSupport: 'Быстрая связь',
      aboutAndPrivacy: 'О компании и политика'
    };
  }

  if (locale === 'et') {
    return {
      emergencyPrefix: '24/7 Telefon',
      footerIntro: 'Monumendid, paigaldus ja rahulik nõustamine üle Eesti.',
      footerNavigation: 'Lehed',
      footerContacts: 'Kontakt',
      footerAddress: 'Aadress',
      footerHours: 'Lahtiolekuajad',
      footerHoursValue: 'E-R 09:00-18:00, L 10:00-15:00',
      footerSupport: 'Kiire kontakt',
      aboutAndPrivacy: 'Ettevõttest ja privaatsus'
    };
  }

  return {
    emergencyPrefix: '24/7 Support',
    footerIntro: 'Granite memorials, installation and calm guidance across Estonia.',
    footerNavigation: 'Pages',
    footerContacts: 'Contacts',
    footerAddress: 'Address',
    footerHours: 'Working hours',
    footerHoursValue: 'Mon-Fri 09:00-18:00, Sat 10:00-15:00',
    footerSupport: 'Quick contact',
    aboutAndPrivacy: 'About and privacy'
  };
}

export function Layout({ locale, routeKey, children }: LayoutProps) {
  const content = getLocaleContent(locale);
  const ui = getUiLabels(locale);
  const location = useLocation();
  const [adminClicks, setAdminClicks] = useState(0);
  const [showAdminLink, setShowAdminLink] = useState(false);
  const [isHeaderElevated, setIsHeaderElevated] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const clickResetTimeoutRef = useRef<number | null>(null);
  const revealTimeoutRef = useRef<number | null>(null);
  const logoPrimarySrc = `${import.meta.env.BASE_URL}images/logo.png`;
  const logoFallbackSrc = `${import.meta.env.BASE_URL}images/logo.png`;
  const mapLink = `${buildLocalizedPath(locale, 'contact')}#map`;
  const adminPath = `/${locale}/__empire-admin`;

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.slice(1);
      const scrollToTarget = () => {
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ block: 'start' });
        }
      };

      scrollToTarget();
      const timeoutId = window.setTimeout(scrollToTarget, 0);
      return () => window.clearTimeout(timeoutId);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash, location.pathname]);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    trackEvent('page_view', {
      locale,
      routeKey,
      pathname: location.pathname
    });
  }, [locale, routeKey, location.pathname]);

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
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal-on-scroll'));
    if (!elements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [location.pathname]);

  const mobileMenuLabel =
    locale === 'ru'
      ? 'Открыть меню'
      : locale === 'et'
        ? 'Ava menüü'
        : 'Open menu';
  const mobileCloseLabel =
    locale === 'ru'
      ? 'Закрыть меню'
      : locale === 'et'
        ? 'Sulge menüü'
        : 'Close menu';

  useEffect(() => {
    return () => {
      if (clickResetTimeoutRef.current) {
        window.clearTimeout(clickResetTimeoutRef.current);
      }
      if (revealTimeoutRef.current) {
        window.clearTimeout(revealTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="site-shell">
      <SeoHead locale={locale} routeKey={routeKey} />
      <AnalyticsLoader />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
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
              onClick={() => trackEvent('phone_click', { locale, source: 'header-emergency' })}
            >
              <span className="brand-emergency-prefix">{ui.emergencyPrefix}</span>
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
              {content.nav[navKey]}
            </Link>
          ))}
        </nav>
      </header>

      <main id="main-content" className="main-content">
        {children}
      </main>

      <footer className="site-footer">
        <div className="footer-grid">
          <section className="footer-brand-column">
            <img src={logoPrimarySrc} alt={siteConfig.siteName} className="footer-logo" />
            <p>{ui.footerIntro}</p>
          </section>

          <section className="footer-column">
            <h3>{ui.footerNavigation}</h3>
            <div className="footer-link-stack">
              {CORE_NAV_KEYS.map((navKey) => (
                <Link key={navKey} to={buildLocalizedPath(locale, navKey)}>
                  {content.nav[navKey]}
                </Link>
              ))}
              <Link to={buildLocalizedPath(locale, 'about')}>{content.nav.about}</Link>
              <Link to={buildLocalizedPath(locale, 'privacy')}>{content.nav.privacy}</Link>
            </div>
          </section>

          <section className="footer-column">
            <h3>{ui.footerContacts}</h3>
            <div className="footer-contact-list">
              <p>
                <span>{ui.footerSupport}</span>
                <a href={siteConfig.contacts.phoneLink}>{siteConfig.contacts.phoneDisplay}</a>
              </p>
              <p>
                <span>E-mail</span>
                <a href={`mailto:${siteConfig.contacts.email}`}>{siteConfig.contacts.email}</a>
              </p>
              <p>
                <span>{ui.footerAddress}</span>
                <Link to={mapLink}>{siteConfig.contacts.address}</Link>
              </p>
              <p>
                <span>{ui.footerHours}</span>
                <strong>{ui.footerHoursValue}</strong>
              </p>
            </div>
          </section>
        </div>

        <p className="footer-bottom" aria-label={ui.aboutAndPrivacy}>
          <button
            type="button"
            className="footer-secret-trigger"
            onClick={() => {
              const nextCount = adminClicks + 1;
              setAdminClicks(nextCount);

              if (clickResetTimeoutRef.current) {
                window.clearTimeout(clickResetTimeoutRef.current);
              }

              clickResetTimeoutRef.current = window.setTimeout(() => {
                setAdminClicks(0);
              }, 2500);

              if (nextCount >= 5) {
                setShowAdminLink(true);
                setAdminClicks(0);

                if (revealTimeoutRef.current) {
                  window.clearTimeout(revealTimeoutRef.current);
                }

                revealTimeoutRef.current = window.setTimeout(() => {
                  setShowAdminLink(false);
                }, 12000);
              }
            }}
          >
            {siteConfig.siteName}
          </button>
          <span>{siteConfig.contacts.address}</span>
          {showAdminLink ? (
            <Link className="footer-admin-link" to={adminPath}>
              Admin
            </Link>
          ) : null}
        </p>
      </footer>

      <a
        className="floating-call"
        href={siteConfig.contacts.phoneLink}
        onClick={() => trackEvent('phone_click', { locale, source: 'floating' })}
      >
        {content.cta.callNow}
      </a>
    </div>
  );
}
