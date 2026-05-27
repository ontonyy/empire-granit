import { Link } from 'react-router-dom';
import { buildLocalizedPath } from '../../routing';
import type { Locale } from '../../types';

interface ServiceShort {
  title: string;
  body: string;
}

interface ServicesTeaserProps {
  locale: Locale;
  eyebrow: string;
  title: string;
  services: ServiceShort[];
  learnMore: string;
}

interface ServicePhoto {
  name: 'service-framing' | 'service-fence' | 'service-plate';
  width: number;
  height: number;
  sizes: string;
}

const PHOTOS: ServicePhoto[] = [
  { name: 'service-framing', width: 1400, height: 1750, sizes: '(min-width: 1024px) 50vw, 100vw' },
  { name: 'service-fence', width: 900, height: 900, sizes: '(min-width: 1024px) 25vw, 50vw' },
  { name: 'service-plate', width: 900, height: 900, sizes: '(min-width: 1024px) 25vw, 50vw' }
];

function ServicePicture({ photo }: { photo: ServicePhoto }) {
  const { name, width, height, sizes } = photo;
  const b = `${import.meta.env.BASE_URL}images/n3/${name}`;
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`${b}-1x.avif ${width / 2}w, ${b}-2x.avif ${width}w`}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={`${b}-1x.webp ${width / 2}w, ${b}-2x.webp ${width}w`}
        sizes={sizes}
      />
      <img
        src={`${b}-2x.jpg`}
        srcSet={`${b}-1x.jpg ${width / 2}w, ${b}-2x.jpg ${width}w`}
        sizes={sizes}
        width={width}
        height={height}
        alt=""
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}

function firstSentence(text: string): string {
  const m = text.match(/^[^.!?]+[.!?]/);
  return (m ? m[0] : text).trim();
}

export function ServicesTeaser({ locale, eyebrow, title, services, learnMore }: ServicesTeaserProps) {
  return (
    <section id="services" className="home-services-teaser">
      <div className="ui-container">
        <header className="home-services-teaser__header">
          <span className="ui-eyebrow">{eyebrow}</span>
          <h2 className="home-services-teaser__title">{title}</h2>
        </header>
        <div className="home-services-teaser__grid">
          <div className="home-services-teaser__photo home-services-teaser__photo--big">
            <ServicePicture photo={PHOTOS[0]} />
          </div>
          <div className="home-services-teaser__photo">
            <ServicePicture photo={PHOTOS[1]} />
          </div>
          <div className="home-services-teaser__photo">
            <ServicePicture photo={PHOTOS[2]} />
          </div>
        </div>
        <ul className="home-services-teaser__services" role="list">
          {services.map((s) => (
            <li key={s.title} className="home-services-teaser__service">
              <strong>{s.title}</strong>
              <span>{firstSentence(s.body)}</span>
            </li>
          ))}
        </ul>
        <Link className="home-services-teaser__link" to={buildLocalizedPath(locale, 'services')}>
          {learnMore}
        </Link>
      </div>
    </section>
  );
}
