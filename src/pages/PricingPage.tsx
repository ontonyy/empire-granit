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
      <header className="page-hero">
        <h1 className="cinzel-font">{section.heading}</h1>
        <p>{section.intro}</p>
      </header>

      <div className="card-grid">
        {section.tiers.map((tier) => (
          <PricingTierCard
            key={tier.id}
            tier={tier}
            ctaLabel={section.cta}
            includedLabel={section.includedLabel}
            affectsLabel={section.affectsLabel}
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

      <p className="pricing-bottom-note">{section.bottomNote}</p>

      <PricingBenefits benefits={section.benefits} />
    </section>
  );
}
