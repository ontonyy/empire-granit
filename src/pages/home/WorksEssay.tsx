import { Link } from 'react-router-dom';
import { buildLocalizedPath } from '../../routing';
import type { Locale } from '../../types';
import { HOME_WORKS_EXAMPLES, type HomeWorkExample } from './works-examples';

interface WorksEssayProps {
  locale: Locale;
  eyebrow: string;
  title: string;
  footerCounter: string;
  viewAllLink: string;
}

function ExamplePicture({ example }: { example: HomeWorkExample }) {
  const base = `/images/n3/works/${example.imageBase}`;
  return (
    <picture>
      <source type="image/avif" srcSet={`${base}.avif`} />
      <source type="image/webp" srcSet={`${base}.webp`} />
      <img src={`${base}.jpg`} alt="" loading="lazy" decoding="async" />
    </picture>
  );
}

export function WorksEssay({ locale, eyebrow, title, footerCounter, viewAllLink }: WorksEssayProps) {
  const examples = HOME_WORKS_EXAMPLES;
  return (
    <section id="works" className="home-works">
      <div className="ui-container">
        <header className="home-works__header">
          <span className="ui-eyebrow">{eyebrow}</span>
          <h2 className="home-works__title">{title}</h2>
        </header>
        <div className="home-works__grid">
          <figure className="home-works__cell home-works__cell--a">
            <ExamplePicture example={examples[0]} />
            <figcaption>{examples[0].title}</figcaption>
          </figure>
          <div className="home-works__side home-works__side--b">
            <strong>{examples[1].title}</strong>
            <span>{examples[1].material}</span>
          </div>
          <figure className="home-works__cell home-works__cell--c">
            <ExamplePicture example={examples[1]} />
            <figcaption>{examples[1].title}</figcaption>
          </figure>
          <figure className="home-works__cell home-works__cell--d">
            <ExamplePicture example={examples[2]} />
            <figcaption>{examples[2].title}</figcaption>
          </figure>
          <figure className="home-works__cell home-works__cell--e">
            <ExamplePicture example={examples[3]} />
            <figcaption>{examples[3].title}</figcaption>
          </figure>
          <figure className="home-works__cell home-works__cell--f">
            <ExamplePicture example={examples[4]} />
            <figcaption>{examples[4].title}</figcaption>
          </figure>
          <div className="home-works__side home-works__side--g">
            <strong>{examples[4].title}</strong>
            <span>{examples[4].material}</span>
          </div>
        </div>
        <footer className="home-works__footer">
          <span>{footerCounter}</span>
          <Link className="home-works__link" to={buildLocalizedPath(locale, 'works')}>
            {viewAllLink}
          </Link>
        </footer>
      </div>
    </section>
  );
}
