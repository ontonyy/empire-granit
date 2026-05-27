import { Link } from 'react-router-dom';
import { buildLocalizedPath } from '../../routing';
import type { Locale, LocaleContent } from '../../types';

interface FinalTableauProps {
  locale: Locale;
  assist: LocaleContent['assist'];
}

export function FinalTableau({ locale, assist }: FinalTableauProps) {
  return (
    <section id="contact" className="home-final is-placeholder">
      {/* TODO(owner-image): replace with workshop exterior or installation site photograph (landscape, cool desaturated palette). */}
      <picture className="home-final__picture">
        <img
          className="home-final__image"
          src={`${import.meta.env.BASE_URL}images/n3/contact-placeholder.jpg`}
          srcSet={`${import.meta.env.BASE_URL}images/n3/contact-placeholder.jpg 1024w`}
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
        <span className="home-final__eyebrow">{assist.eyebrow}</span>
        <h2 className="home-final__title">{assist.title}</h2>
        <p className="home-final__body">{assist.body}</p>
        <Link className="home-final__link" to={buildLocalizedPath(locale, 'contact')}>
          {assist.link}
        </Link>
      </div>
    </section>
  );
}
