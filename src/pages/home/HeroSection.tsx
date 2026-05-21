import { Link } from 'react-router-dom';
import { buildLocalizedPath } from '../../routing';
import type { Locale } from '../../types';

interface HeroSectionProps {
  locale: Locale;
  heroLabel: string;
  heroTitle: string;
  heroLead: string;
  primaryCta: string;
  secondaryCta: string;
  highlights: string[];
}

export function HeroSection({
  locale,
  heroLabel,
  heroTitle,
  heroLead,
  primaryCta,
  secondaryCta,
  highlights
}: HeroSectionProps) {
  return (
    <section className="hero-panel hero-panel-expanded reveal-on-scroll is-visible">
      <div className="hero-copy">
        <span className="eyebrow">{heroLabel}</span>
        <h1>{heroTitle}</h1>
        {heroLead ? <p className="hero-lead">{heroLead}</p> : null}

        <div className="hero-actions">
          <Link className="hero-primary" to={buildLocalizedPath(locale, 'contact')}>
            {primaryCta}
          </Link>
          <Link className="hero-secondary" to={buildLocalizedPath(locale, 'memorials')}>
            {secondaryCta}
          </Link>
        </div>
      </div>

      <ul className="highlight-list" aria-label={heroLabel}>
        {highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
    </section>
  );
}
