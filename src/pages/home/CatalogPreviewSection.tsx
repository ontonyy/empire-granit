import { Link } from 'react-router-dom';
import { buildCatalogSubcategoryPath, buildLocalizedPath } from '../../routing';
import type { Locale } from '../../types';

interface CatalogPreviewSectionProps {
  locale: Locale;
  label: string;
  title: string;
  lead: string;
  items: Array<{ title: string; body: string }>;
  ctaLabel: string;
}

const catalogPreviewExamples = [
  {
    id: 'monuments',
    image: 'images/examples/monument.png'
  },
  {
    id: 'framing',
    image: 'images/examples/framing.png'
  },
  {
    id: 'benches',
    image: 'images/examples/granite_bench.png'
  },
  {
    id: 'tables',
    image: 'images/examples/memorial_table.png'
  },
  {
    id: 'decor',
    image: 'images/examples/candles.png'
  }
];

export function CatalogPreviewSection({ locale, label, title, lead, items, ctaLabel }: CatalogPreviewSectionProps) {
  const previewItems = items.slice(0, catalogPreviewExamples.length).map((item, index) => ({
    ...item,
    ...catalogPreviewExamples[index]
  }));

  return (
    <section className="home-catalog-preview reveal-on-scroll">
      <div className="home-section-heading">
        <span className="section-kicker">{label}</span>
        <h2>{title}</h2>
        <p>{lead}</p>
      </div>

      <div className="home-catalog-layout">
        {previewItems.map((item) => (
          <Link key={item.title} to={buildCatalogSubcategoryPath(locale, item.id)} className="home-catalog-card">
            <img src={`${import.meta.env.BASE_URL}${item.image}`} alt="" loading="lazy" />
            <span>
              <strong>{item.title}</strong>
              <span>{item.body}</span>
            </span>
          </Link>
        ))}

        <div className="home-catalog-actions">
          <Link className="hero-primary" to={buildLocalizedPath(locale, 'memorials')}>
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
