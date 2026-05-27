import { siteConfig } from '../../config/site';
import { trackEvent } from '../../lib/analytics';
import type { Locale } from '../../types';

interface OpeningTableauProps {
  locale: Locale;
  eyebrow: string;
  title: string;
  heroBodyLine: string;
  heroLocation: string;
  logoSrc: string;
}

export function OpeningTableau({
  locale,
  eyebrow,
  title,
  heroBodyLine,
  heroLocation,
  logoSrc
}: OpeningTableauProps) {
  return (
    <section className="home-opening">
      <picture className="home-opening__picture">
        <source
          type="image/avif"
          srcSet="/images/n3/hero-1x.avif 1200w, /images/n3/hero-2x.avif 2400w"
          sizes="100vw"
        />
        <source
          type="image/webp"
          srcSet="/images/n3/hero-1x.webp 1200w, /images/n3/hero-2x.webp 2400w"
          sizes="100vw"
        />
        <img
          className="home-opening__image"
          src="/images/n3/hero-2x.jpg"
          srcSet="/images/n3/hero-1x.jpg 1200w, /images/n3/hero-2x.jpg 2400w"
          sizes="100vw"
          width={2400}
          height={1350}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          {...{ fetchpriority: 'high' }}
        />
      </picture>
      <div className="home-opening__overlay" aria-hidden="true" />

      <div className="home-opening__brand">
        <img
          className="home-opening__brand-logo"
          src={logoSrc}
          alt=""
          aria-hidden="true"
          width={64}
          height={64}
          decoding="async"
        />
        <span className="home-opening__location">{heroLocation}</span>
      </div>

      <div className="home-opening__copy">
        <span className="home-opening__eyebrow">{eyebrow}</span>
        <h1 className="home-opening__title">{title}</h1>
        <p className="home-opening__body">{heroBodyLine}</p>
      </div>

      <a
        className="home-opening__phone"
        href={siteConfig.contacts.phoneLink}
        onClick={() => trackEvent('phone_click', { locale, source: 'hero' })}
      >
        <svg
          className="home-opening__phone-icon"
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
        </svg>
        <span className="home-opening__phone-number">{siteConfig.contacts.phoneDisplay}</span>
      </a>
    </section>
  );
}
