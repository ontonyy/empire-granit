import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/site';
import { buildLocalizedPath } from '../../routing';
import type { Locale } from '../../types';

interface FinalTableauProps {
  locale: Locale;
  eyebrow: string;
  hours: string;
  contactLink: string;
}

export function FinalTableau({ locale, eyebrow, hours, contactLink }: FinalTableauProps) {
  return (
    <section id="contact" className="home-final">
      <img
        className="home-final__image"
        src="/images/examples/cemetry.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
      />
      <div className="home-final__overlay" aria-hidden="true" />
      <div className="home-final__copy">
        <span className="home-final__eyebrow">{eyebrow}</span>
        <a className="home-final__phone" href={siteConfig.contacts.phoneLink}>
          {siteConfig.contacts.phoneDisplay}
        </a>
        <div className="home-final__meta">
          <span>{siteConfig.contacts.address}</span>
          <span>{hours}</span>
          <Link className="home-final__link" to={buildLocalizedPath(locale, 'contact')}>
            {contactLink}
          </Link>
        </div>
      </div>
    </section>
  );
}
