import type { LocaleContent } from '../../types';

type Tier = LocaleContent['pricing']['tiers'][number];

interface PricingTierCardProps {
  tier: Tier;
  ctaLabel: string;
  includedLabel: string;
  affectsLabel: string;
  isSelected: boolean;
  onSelect: () => void;
  onPurchase: () => void;
}

export function PricingTierCard({
  tier,
  ctaLabel,
  includedLabel,
  affectsLabel,
  isSelected,
  onSelect,
  onPurchase
}: PricingTierCardProps) {
  return (
    <article
      className={`service-card interactive-card ${isSelected ? 'selected-card' : ''}`}
      onClick={onSelect}
      style={{ cursor: 'pointer' }}
    >
      <div style={{ padding: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 className="cinzel-font" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{tier.name}</h2>
          <div
            style={{
              fontSize: '1.6rem',
              fontWeight: 700,
              color: 'var(--accent)',
              marginTop: '1.5rem'
            }}
          >
            {typeof tier.price === 'number' ? `${tier.price}€` : tier.price}
          </div>
        </div>

        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', minHeight: '3rem', fontSize: '1rem' }}>
          {tier.bestFor}
        </p>

        <h3 className="pricing-card-subtitle">{includedLabel}</h3>
        <ul className="tier-features" style={{ listStyle: 'none', padding: 0, margin: '0.75rem 0 1.5rem' }}>
          {tier.features.map((feature) => (
            <li key={feature} style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="checkmark" aria-hidden="true">✓</span>
              {feature}
            </li>
          ))}
        </ul>

        {tier.note && (
          <>
            <h3 className="pricing-card-subtitle">{affectsLabel}</h3>
            <p className="pricing-card-note">{tier.note}</p>
          </>
        )}

        <button
          className={isSelected ? 'btn-primary' : 'btn-secondary'}
          style={{ width: '100%', padding: '1rem' }}
          onClick={(e) => {
            e.stopPropagation();
            onPurchase();
          }}
        >
          {ctaLabel}
        </button>
      </div>
    </article>
  );
}
