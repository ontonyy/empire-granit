import { Link } from 'react-router-dom';
import { buildLocalizedPath } from '../../routing';
import type { Locale } from '../../types';
import type { HeroFeature } from './sections';

interface HeroSectionProps {
  locale: Locale;
  heroLabel: string;
  heroTitle: string;
  heroLead: string;
  primaryCta: string;
  secondaryCta: string;
  featureCards: HeroFeature[];
}

export function HeroSection({
  locale,
  heroLabel,
  heroTitle,
  heroLead,
  primaryCta,
  secondaryCta,
  featureCards
}: HeroSectionProps) {
  return (
    <section className="hero-panel hero-panel-expanded reveal-on-scroll is-visible">
      <div className="hero-copy">
        <span className="eyebrow">{heroLabel}</span>
        <h1>{heroTitle}</h1>
        <p className="hero-lead">{heroLead}</p>

        <div className="hero-actions">
          <Link className="hero-primary" to={buildLocalizedPath(locale, 'contact')}>
            {primaryCta}
          </Link>
          <Link className="hero-secondary" to={buildLocalizedPath(locale, 'pricing')}>
            {secondaryCta}
          </Link>
        </div>
      </div>

      <div className="hero-feature-stack">
        {featureCards.map((card) => (
          <article key={card.title} className="hero-feature-card">
            <span className="hero-feature-icon" aria-hidden="true">
              {card.icon}
            </span>
            <div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
