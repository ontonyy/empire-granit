import type { LocaleContent } from '../../types';

type Benefits = LocaleContent['pricing']['benefits'];

interface PricingBenefitsProps {
  benefits: Benefits;
}

export function PricingBenefits({ benefits }: PricingBenefitsProps) {
  return (
    <div className="benefits-section" style={{ marginTop: '5rem' }}>
      <h2 className="cinzel-font" style={{ textAlign: 'center', marginBottom: '3rem' }}>{benefits.heading}</h2>
      <div className="benefits-grid">
        {benefits.items.map((item, idx) => (
          <div key={idx} className="benefit-item">
            <h3 style={{ color: 'var(--accent)', marginBottom: '0.5rem', fontSize: '1.2rem' }}>{item.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
