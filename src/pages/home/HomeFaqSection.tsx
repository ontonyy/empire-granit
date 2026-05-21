import { Link } from 'react-router-dom';
import { buildLocalizedPath } from '../../routing';
import type { Locale } from '../../types';

interface HomeFaqSectionProps {
  locale: Locale;
  label: string;
  title: string;
  items: Array<{ question: string; answer: string }>;
  ctaLabel: string;
}

export function HomeFaqSection({ locale, label, title, items, ctaLabel }: HomeFaqSectionProps) {
  return (
    <section className="home-faq-preview reveal-on-scroll">
      <div className="home-section-heading">
        <span className="section-kicker">{label}</span>
        <h2>{title}</h2>
      </div>
      <div className="home-faq-grid">
        {items.slice(0, 3).map((item) => (
          <article key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </article>
        ))}
      </div>
      <Link className="hero-secondary" to={buildLocalizedPath(locale, 'faq')}>
        {ctaLabel}
      </Link>
    </section>
  );
}
