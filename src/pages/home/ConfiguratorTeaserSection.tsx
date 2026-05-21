import { Link } from 'react-router-dom';
import { buildLocalizedPath } from '../../routing';
import type { Locale } from '../../types';
import type { ConfiguratorItem } from './sections';

interface ConfiguratorTeaserSectionProps {
  locale: Locale;
  label: string;
  title: string;
  lead: string;
  items: ConfiguratorItem[];
  ctaLabel: string;
}

export function ConfiguratorTeaserSection({
  locale,
  label,
  title,
  lead,
  items,
  ctaLabel
}: ConfiguratorTeaserSectionProps) {
  return (
    <section className="home-configurator-teaser reveal-on-scroll">
      <div className="home-section-heading">
        <span className="section-kicker">{label}</span>
        <h2>{title}</h2>
        <p>{lead}</p>
      </div>

      <div className="home-configurator-layout">
        <div className="home-configurator-preview" aria-hidden="true">
          <span className="home-configurator-stone" />
          <span className="home-configurator-base" />
          <span className="home-configurator-border" />
        </div>

        <div className="home-configurator-copy">
          <div className="home-configurator-items">
            {items.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <Link className="hero-primary" to={buildLocalizedPath(locale, 'playground')}>
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
