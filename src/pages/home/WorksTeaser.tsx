import { Link } from 'react-router-dom';
import { buildLocalizedPath } from '../../routing';
import type { Locale } from '../../types';
import { HOME_WORKS_EXAMPLES, type HomeWorkExample } from './works-examples';

interface WorksTeaserProps {
  locale: Locale;
  eyebrow: string;
  title: string;
  footerCounter: string;
  viewAllLink: string;
  learnMore: string;
}

function ExamplePicture({ example }: { example: HomeWorkExample }) {
  const base = `/images/n3/works/${example.imageBase}`;
  const alt = `${example.title} — ${example.material}`;
  return (
    <picture>
      <source type="image/avif" srcSet={`${base}.avif`} />
      <source type="image/webp" srcSet={`${base}.webp`} />
      <img src={`${base}.jpg`} alt={alt} loading="lazy" decoding="async" />
    </picture>
  );
}

function ordinal(i: number): string {
  return String(i + 1).padStart(2, '0');
}

export function WorksTeaser({ locale, eyebrow, title, footerCounter, viewAllLink, learnMore }: WorksTeaserProps) {
  const examples = HOME_WORKS_EXAMPLES.slice(0, 4);
  return (
    <section id="works" className="home-works">
      <div className="ui-container">
        <header className="home-works__header">
          <span className="ui-eyebrow">{eyebrow}</span>
          <h2 className="home-works__title">{title}</h2>
        </header>
        <div className="home-works__grid">
          {examples.map((ex, i) => (
            <figure
              key={ex.id}
              className={`home-works__cell home-works__cell--${'abcd'[i]}`}
            >
              <ExamplePicture example={ex} />
              <figcaption>{ordinal(i)}</figcaption>
            </figure>
          ))}
        </div>
        <footer className="home-works__footer">
          <span>{footerCounter}</span>
          <Link className="home-works__link" to={buildLocalizedPath(locale, 'works')}>
            {viewAllLink}
          </Link>
        </footer>
        <Link className="home-works__learn-more" to={buildLocalizedPath(locale, 'works')}>
          {learnMore}
        </Link>
      </div>
    </section>
  );
}
