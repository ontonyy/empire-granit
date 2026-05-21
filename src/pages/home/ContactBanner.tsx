import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/site';
import { buildLocalizedPath } from '../../routing';
import type { Locale } from '../../types';

interface ContactBannerProps {
  locale: Locale;
  sendInquiryLabel: string;
}

export function ContactBanner({ locale, sendInquiryLabel }: ContactBannerProps) {
  return (
    <section className="home-contact-banner reveal-on-scroll">
      <div>
        <span className="section-kicker">{siteConfig.contacts.company}</span>
        <h2>{siteConfig.contacts.phoneDisplay}</h2>
        <p>
          {siteConfig.contacts.email} · {siteConfig.contacts.address}
        </p>
      </div>
      <div className="home-contact-actions">
        <Link className="hero-primary" to={buildLocalizedPath(locale, 'contact')}>
          {sendInquiryLabel}
        </Link>
      </div>
    </section>
  );
}
