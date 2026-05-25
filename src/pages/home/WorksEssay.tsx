import { Link } from 'react-router-dom';
import { buildLocalizedPath } from '../../routing';
import type { Locale } from '../../types';
import { HOME_WORKS_EXAMPLES } from './works-examples';

interface WorksEssayProps {
  locale: Locale;
  eyebrow: string;
  title: string;
  footerCounter: string;
  viewAllLink: string;
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
            <img src={examples[0].image} alt="" loading="lazy" />
            <figcaption>{examples[0].title}</figcaption>
          </figure>
          <div className="home-works__side home-works__side--b">
            <strong>{examples[1].title}</strong>
            <span>{examples[1].material}</span>
          </div>
          <figure className="home-works__cell home-works__cell--c">
            <img src={examples[1].image} alt="" loading="lazy" />
            <figcaption>{examples[1].title}</figcaption>
          </figure>
          <figure className="home-works__cell home-works__cell--d">
            <img src={examples[2].image} alt="" loading="lazy" />
            <figcaption>{examples[2].title}</figcaption>
          </figure>
          <figure className="home-works__cell home-works__cell--e">
            <img src={examples[3].image} alt="" loading="lazy" />
            <figcaption>{examples[3].title}</figcaption>
          </figure>
          <figure className="home-works__cell home-works__cell--f">
            <img src={examples[4].image} alt="" loading="lazy" />
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
