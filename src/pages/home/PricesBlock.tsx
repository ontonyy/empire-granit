import { Link } from 'react-router-dom';
import { buildLocalizedPath } from '../../routing';
import type { Locale } from '../../types';

interface TierRow {
  id: string;
  name: string;
  price: string;
}

interface PricesBlockProps {
  locale: Locale;
  eyebrow: string;
  title: string;
  leadLine: string;
  tableLink: string;
  tiers: TierRow[];
}

export function PricesBlock({ locale, eyebrow, title, leadLine, tableLink, tiers }: PricesBlockProps) {
  const pricingPath = buildLocalizedPath(locale, 'pricing');
  return (
    <section className="home-prices">
      <div className="ui-container">
        <header className="home-prices__header">
          <span className="ui-eyebrow">{eyebrow}</span>
          <h2 className="home-prices__title">{title}</h2>
          <p className="home-prices__lead">{leadLine}</p>
        </header>
        <ul className="home-prices__table" role="list">
          {tiers.map((t) => (
            <li key={t.id} className="home-prices__row">
              <span>{t.name}</span>
              <span>{t.price}</span>
            </li>
          ))}
        </ul>
        <div className="home-prices__actions">
          <Link className="home-prices__link" to={pricingPath}>
            {tableLink}
          </Link>
        </div>
      </div>
    </section>
  );
}
