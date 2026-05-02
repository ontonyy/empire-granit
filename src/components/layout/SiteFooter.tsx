import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/site';
import { buildLocalizedPath } from '../../routing';
import type { Locale, RouteKey } from '../../types';
import { CORE_NAV_KEYS, type LayoutUiLabels } from './ui-labels';

interface SiteFooterProps {
  locale: Locale;
  ui: LayoutUiLabels;
  nav: Record<RouteKey, string>;
  logoSrc: string;
  mapLink: string;
  hidePhoneLink?: boolean;
}

export function SiteFooter({ locale, ui, nav, logoSrc, mapLink, hidePhoneLink = false }: SiteFooterProps) {
  const [adminClicks, setAdminClicks] = useState(0);
  const [showAdminLink, setShowAdminLink] = useState(false);
  const clickResetTimeoutRef = useRef<number | null>(null);
  const revealTimeoutRef = useRef<number | null>(null);
  const adminPath = `/${locale}/__empire-admin`;

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
    <footer className="site-footer">
      <div className="footer-grid">
        <section className="footer-brand-column">
          <img src={logoSrc} alt={siteConfig.siteName} className="footer-logo" />
          <p>{ui.footerIntro}</p>
        </section>

        <section className="footer-column">
          <h3>{ui.footerNavigation}</h3>
          <div className="footer-link-stack">
            {CORE_NAV_KEYS.map((navKey) => (
              <Link key={navKey} to={buildLocalizedPath(locale, navKey)}>
                {nav[navKey]}
              </Link>
            ))}
            <Link to={buildLocalizedPath(locale, 'about')}>{nav.about}</Link>
            <Link to={buildLocalizedPath(locale, 'privacy')}>{nav.privacy}</Link>
          </div>
        </section>

        <section className="footer-column">
          <h3>{ui.footerContacts}</h3>
          <div className="footer-contact-list">
            {!hidePhoneLink ? (
              <p>
                <span>{ui.footerSupport}</span>
                <a href={siteConfig.contacts.phoneLink}>{siteConfig.contacts.phoneDisplay}</a>
              </p>
            ) : null}
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
  );
}
