import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocaleContent } from '../content';
import { trackEvent } from '../lib/analytics';
import { buildLocalizedPath } from '../routing';
import type { Locale } from '../types';
import { PricingBenefits } from './pricing/PricingBenefits';
import { PricingTierCard } from './pricing/PricingTierCard';

interface PricingPageProps {
  locale: Locale;
}

export function PricingPage({ locale }: PricingPageProps) {
  const section = getLocaleContent(locale).pricing;
  const navigate = useNavigate();
  const [selectedTierId, setSelectedTierId] = useState<string | null>(null);

  useEffect(() => {
    trackEvent('pricing_page_view', { locale });
  }, [locale]);

  const handleSelectPackage = (packageName: string) => {
    trackEvent('pricing_package_select', { locale, package: packageName });
    const path = buildLocalizedPath(locale, 'contact');
    navigate(`${path}?package=${encodeURIComponent(packageName)}`);
  };

  return (
    <section className="content-panel">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="cinzel-font" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{section.heading}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>{section.intro}</p>
      </div>

      <div className="card-grid">
        {section.tiers.map((tier) => (
          <PricingTierCard
            key={tier.id}
            tier={tier}
            ctaLabel={section.cta}
            isSelected={selectedTierId === tier.id}
            onSelect={() => {
              setSelectedTierId(tier.id);
              trackEvent('pricing_package_view', {
                locale,
                package: tier.name,
                packageId: tier.id
              });
            }}
            onPurchase={() => handleSelectPackage(tier.name)}
          />
        ))}
      </div>

      <PricingBenefits benefits={section.benefits} />
    </section>
  );
}
