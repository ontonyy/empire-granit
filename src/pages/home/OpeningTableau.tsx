import type { Locale } from '../../types';

interface OpeningTableauProps {
  locale: Locale;
  eyebrow: string;
  title: string;
  heroBodyLine: string;
}

export function OpeningTableau({
  locale: _locale,
  eyebrow,
  title,
  heroBodyLine
}: OpeningTableauProps) {
  return (
    <section className="home-opening">
      <picture className="home-opening__picture">
        <img
          className="home-opening__image"
          src={`${import.meta.env.BASE_URL}images/background.png`}
          sizes="100vw"
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          {...{ fetchpriority: 'high' }}
        />
      </picture>
      <div className="home-opening__overlay" aria-hidden="true" />

      <div className="home-opening__copy">
        <span className="home-opening__eyebrow">{eyebrow}</span>
        <h1 className="home-opening__title">{title}</h1>
        <p className="home-opening__body">{heroBodyLine}</p>
      </div>
    </section>
  );
}
