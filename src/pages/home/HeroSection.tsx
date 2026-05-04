import { Link } from 'react-router-dom';
import { buildLocalizedPath } from '../../routing';
import type { Locale } from '../../types';
import type { HeroFeature } from './sections';

const ICONS: Record<string, JSX.Element> = {
  support: (
    <path d="M3 14v-3a9 9 0 0 1 18 0v3M3 14a2 2 0 0 0 2 2h1v-6H5a2 2 0 0 0-2 2v2zm18 0a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2v2zM18 16v1a4 4 0 0 1-4 4h-1" />
  ),
  range: (
    <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />
  ),
  estonia: (
    <>
      <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  variety: (
    <path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  )
};

function FeatureIcon({ name }: { name: string }) {
  const path = ICONS[name];
  if (!path) return null;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}

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
        {heroLead ? <p className="hero-lead">{heroLead}</p> : null}

        <div className="hero-actions">
          <Link className="hero-primary" to={buildLocalizedPath(locale, 'contact')}>
            {primaryCta}
          </Link>
          <Link className="hero-secondary" to={buildLocalizedPath(locale, 'gallery')}>
            {secondaryCta}
          </Link>
        </div>
      </div>

      <div className="hero-feature-stack">
        {featureCards.map((card) => (
          <article key={card.title} className="hero-feature-card">
            <span className="hero-feature-icon" aria-hidden="true">
              <FeatureIcon name={card.icon} />
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
