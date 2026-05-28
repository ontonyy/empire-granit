import { Link } from 'react-router-dom';
import { buildLocalizedPath } from '../../routing';
import type { Locale } from '../../types';

interface WorksTeaserProps {
  locale: Locale;
  eyebrow: string;
  title: string;
  footerCounter: string;
  viewAllLink: string;
}

export function WorksTeaser({ locale, eyebrow, title, footerCounter, viewAllLink }: WorksTeaserProps) {
  return (
    <section id="works" className="home-works home-works--text-only">
      <div className="ui-container">
        <header className="home-works__header">
          <span className="ui-eyebrow">{eyebrow}</span>
          <h2 className="home-works__title">{title}</h2>
        </header>
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
