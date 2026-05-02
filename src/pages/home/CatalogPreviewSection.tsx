import { Link } from 'react-router-dom';
import { buildLocalizedPath } from '../../routing';
import type { Locale } from '../../types';

interface CatalogPreviewSectionProps {
  locale: Locale;
  label: string;
  title: string;
  lead: string;
  items: Array<{ title: string; body: string }>;
  ctaLabel: string;
}

export function CatalogPreviewSection({ locale, label, title, lead, items, ctaLabel }: CatalogPreviewSectionProps) {
  return (
    <section className="home-catalog-preview reveal-on-scroll">
      <div className="home-section-heading">
        <span className="section-kicker">{label}</span>
        <h2>{title}</h2>
        <p>{lead}</p>
      </div>

      <div className="home-catalog-layout">
        <img src="/images/examples/gravestone.png" alt="" loading="lazy" />
        <div className="home-catalog-list">
          {items.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
          <div className="home-catalog-actions">
            <Link className="hero-primary" to={buildLocalizedPath(locale, 'gallery')}>
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
