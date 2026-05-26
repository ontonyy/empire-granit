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
      <picture className="home-final__picture">
        <source
          type="image/avif"
          srcSet="/images/n3/final-workshop-1x.avif 512w, /images/n3/final-workshop-2x.avif 1024w"
          sizes="100vw"
        />
        <source
          type="image/webp"
          srcSet="/images/n3/final-workshop-1x.webp 512w, /images/n3/final-workshop-2x.webp 1024w"
          sizes="100vw"
        />
        <img
          className="home-final__image"
          src="/images/n3/final-workshop-2x.jpg"
          srcSet="/images/n3/final-workshop-1x.jpg 512w, /images/n3/final-workshop-2x.jpg 1024w"
          sizes="100vw"
          width={1024}
          height={1024}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
      </picture>
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
