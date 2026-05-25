import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/site';
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

export function SiteFooter({ locale, ui, nav }: SiteFooterProps) {
  const [adminClicks, setAdminClicks] = useState(0);
  const [showAdminLink, setShowAdminLink] = useState(false);
  const clickResetTimeoutRef = useRef<number | null>(null);
  const revealTimeoutRef = useRef<number | null>(null);
  const adminPath = `/${locale}/__empire-admin`;
  const year = new Date().getFullYear();

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
      <div className="n3-footer-inner">
        <div className="n3-footer-left">
          <button type="button" className="n3-footer-secret" onClick={handleSecretClick}>
            © {year} Empire Granit OÜ
          </button>
          <span className="n3-footer-sep" aria-hidden="true">·</span>
          <a href={`mailto:${siteConfig.contacts.email}`} className="n3-footer-link">
            {siteConfig.contacts.email}
          </a>
          <span className="n3-footer-sep" aria-hidden="true">·</span>
          <Link to={buildLocalizedPath(locale, 'privacy')} className="n3-footer-link">
            {nav.privacy}
          </Link>
          {showAdminLink ? (
            <>
              <span className="n3-footer-sep" aria-hidden="true">·</span>
              <Link to={adminPath} className="n3-footer-link">
                Admin
              </Link>
            </>
          ) : null}
        </div>
        <div className="n3-footer-right">
          <button
            type="button"
            className="n3-footer-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {ui.scrollTop} ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
