import { Link } from 'react-router-dom';
import { buildLocalizedPath } from '../../routing';
import type { Locale } from '../../types';

interface PricingClaritySectionProps {
  locale: Locale;
  label: string;
  title: string;
  lead: string;
  items: Array<{ label: string; value: string }>;
  ctaLabel: string;
}

export function PricingClaritySection({ locale, label, title, lead, items, ctaLabel }: PricingClaritySectionProps) {
  return (
    <section className="home-pricing-clarity reveal-on-scroll">
      <div className="home-section-heading">
        <span className="section-kicker">{label}</span>
        <h2>{title}</h2>
        <p>{lead}</p>
      </div>
      <div className="home-price-grid">
        {items.map((item) => (
          <article key={item.label} className="home-price-item">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </div>
      <Link className="hero-primary" to={buildLocalizedPath(locale, 'pricing')}>
        {ctaLabel}
      </Link>
    </section>
  );
}

