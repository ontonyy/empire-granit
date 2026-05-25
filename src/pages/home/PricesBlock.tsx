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
  factorsBody: string[];
  tableLink: string;
  tiers: TierRow[];
}

export function PricesBlock({ locale, eyebrow, title, factorsBody, tableLink, tiers }: PricesBlockProps) {
  return (
    <section className="home-prices">
      <div className="ui-container home-prices__grid">
        <div className="home-prices__copy">
          <span className="ui-eyebrow">{eyebrow}</span>
          <h2 className="home-prices__title">{title}</h2>
          {factorsBody.map((p, i) => (
            <p key={i} className="home-prices__body">{p}</p>
          ))}
        </div>
        <aside className="home-prices__card">
          <ul className="home-prices__table" role="list">
            {tiers.map((t) => (
              <li key={t.id} className="home-prices__row">
                <span>{t.name}</span>
                <span>{t.price}</span>
              </li>
            ))}
          </ul>
          <Link className="home-prices__link" to={buildLocalizedPath(locale, 'pricing')}>
            {tableLink}
          </Link>
        </aside>
      </div>
    </section>
  );
}
