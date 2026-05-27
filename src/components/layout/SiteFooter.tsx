import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/site';
import { getLocaleContent } from '../../content';
import { buildLocalizedPath } from '../../routing';
import type { Locale, RouteKey } from '../../types';
import type { LayoutUiLabels } from './ui-labels';

interface SiteFooterProps {
  locale: Locale;
  ui: LayoutUiLabels;
  nav: Record<RouteKey, string>;
  logoSrc: string;
  mapLink: string;
  hidePhoneLink?: boolean;
}

const NAV_KEYS: RouteKey[] = ['home', 'services', 'works', 'pricing', 'contact'];

export function SiteFooter({ locale, ui, nav, logoSrc, hidePhoneLink }: SiteFooterProps) {
  const [adminClicks, setAdminClicks] = useState(0);
  const [showAdminLink, setShowAdminLink] = useState(false);
  const clickResetTimeoutRef = useRef<number | null>(null);
  const revealTimeoutRef = useRef<number | null>(null);
  const adminPath = `/${locale}/__empire-admin`;
  const year = new Date().getFullYear();
  const content = getLocaleContent(locale);
  const footer = content.footer;
  const contacts = siteConfig.contacts;

  useEffect(() => {
    return () => {
      if (clickResetTimeoutRef.current) window.clearTimeout(clickResetTimeoutRef.current);
      if (revealTimeoutRef.current) window.clearTimeout(revealTimeoutRef.current);
    };
  }, []);

  const handleSecretClick = () => {
    const next = adminClicks + 1;
    setAdminClicks(next);
    if (clickResetTimeoutRef.current) window.clearTimeout(clickResetTimeoutRef.current);
    clickResetTimeoutRef.current = window.setTimeout(() => setAdminClicks(0), 2500);
    if (next >= 5) {
      setShowAdminLink(true);
      setAdminClicks(0);
      if (revealTimeoutRef.current) window.clearTimeout(revealTimeoutRef.current);
      revealTimeoutRef.current = window.setTimeout(() => setShowAdminLink(false), 12000);
    }
  };

  return (
    <footer className="n3-footer" aria-label={ui.aboutAndPrivacy}>
      <div className="n3-footer-grid">
        <div className="n3-footer-col n3-footer-brand">
          <img src={logoSrc} alt="Empire Granit" className="n3-footer-logo" />
          <ul className="n3-footer-tagline">
            {footer.tagline.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

        <div className="n3-footer-col">
          <h3 className="n3-footer-title">{footer.navTitle}</h3>
          <ul className="n3-footer-list">
            {NAV_KEYS.map((key) => (
              <li key={key}>
                <Link to={buildLocalizedPath(locale, key)} className="n3-footer-link">
                  {nav[key]}
                </Link>
              </li>
            ))}
            <li>
              <Link to={buildLocalizedPath(locale, 'privacy')} className="n3-footer-link">
                {nav.privacy}
              </Link>
            </li>
          </ul>
        </div>

        <div className="n3-footer-col">
          <h3 className="n3-footer-title">{footer.contactTitle}</h3>
          <ul className="n3-footer-list">
            {!hidePhoneLink ? (
              <li>
                <a href={contacts.phoneLink} className="n3-footer-link">
                  {contacts.phoneDisplay}
                </a>
              </li>
            ) : (
              <li>{contacts.phoneDisplay}</li>
            )}
            <li>
              <a href={`mailto:${contacts.email}`} className="n3-footer-link">
                {contacts.email}
              </a>
            </li>
            <li>{contacts.address}</li>
          </ul>
        </div>

        <div className="n3-footer-col">
          <h3 className="n3-footer-title">{footer.openingHoursTitle}</h3>
          <ul className="n3-footer-list">
            {footer.openingHoursLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

        <div className="n3-footer-col n3-footer-cta-col">
          <Link to={buildLocalizedPath(locale, 'contact')} className="n3-footer-cta">
            {footer.bookCta}
          </Link>
        </div>
      </div>

      <div className="n3-footer-bottom">
        <button type="button" className="n3-footer-secret" onClick={handleSecretClick}>
          © {year} Empire Granit OÜ · Narva
        </button>
        {showAdminLink ? (
          <>
            <span className="n3-footer-sep" aria-hidden="true">·</span>
            <Link to={adminPath} className="n3-footer-link">
              Admin
            </Link>
          </>
        ) : null}
        <button
          type="button"
          className="n3-footer-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {ui.scrollTop} ↑
        </button>
      </div>
    </footer>
  );
}
