import { Link } from 'react-router-dom';
import { trackEvent } from '../../lib/analytics';
import type { Locale, LocaleContent } from '../../types';

type Tier = LocaleContent['pricing']['tiers'][number];

interface PricingTierCardProps {
  tier: Tier;
  index: number;
  includedLabel: string;
  affectsLabel: string;
  ctaLabel: string;
  contactPath: string;
  locale: Locale;
}

export function PricingTierCard({
  tier,
  index,
  includedLabel,
  affectsLabel,
  ctaLabel,
  contactPath,
  locale
}: PricingTierCardProps) {
  const tierLabel = `Tier ${String(index).padStart(2, '0')}`;
  const priceText = typeof tier.price === 'number' ? `${tier.price}€` : tier.price;

  return (
    <article className="pricing-tier-card">
      <span className="ui-eyebrow pricing-tier-eyebrow">{tierLabel}</span>
      <h2 className="pricing-tier-name">{tier.name}</h2>
      <p className="pricing-tier-price">{priceText}</p>
      <hr className="pricing-tier-rule" />

      <p className="pricing-tier-bestfor">{tier.bestFor}</p>

      <p className="pricing-tier-section-label">{includedLabel}</p>
      <ul className="pricing-tier-features">
        {tier.features.map((feature) => (
          <li key={feature} className="pricing-tier-feature">
            <span className="pricing-tier-check" aria-hidden="true">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {tier.note && (
        <p className="pricing-tier-affects">
          <span className="pricing-tier-affects-label">{affectsLabel}.</span> {tier.note}
        </p>
      )}

      <Link
        className="pricing-tier-cta"
        to={`${contactPath}?package=${encodeURIComponent(tier.name)}#contact-form`}
        onClick={() => trackEvent('pricing_tier_cta_click', { locale, tier: tier.id })}
      >
        {ctaLabel} →
      </Link>
    </article>
  );
}
