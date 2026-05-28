import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLocaleContent } from '../content';
import { trackEvent } from '../lib/analytics';
import { buildLocalizedPath } from '../routing';
import type { Locale } from '../types';
import { PricingTierCard } from './pricing/PricingTierCard';

interface PricingPageProps {
  locale: Locale;
}

export function PricingPage({ locale }: PricingPageProps) {
  const content = getLocaleContent(locale);
  const section = content.pricing;
  const assist = content.assist;
  const contactPath = buildLocalizedPath(locale, 'contact');

  useEffect(() => {
    trackEvent('pricing_page_view', { locale });
  }, [locale]);

  return (
    <>
      <section className="pricing-header">
        <div className="ui-container pricing-header-inner">
          <span className="ui-eyebrow">{content.nav.pricing} / Empire Granit / Narva</span>
          <h1 className="ui-display ui-display-1 pricing-title">{section.title}</h1>
          <p className="pricing-intro">{section.intro}</p>
        </div>
      </section>

      <section className="pricing-tiers">
        <div className="ui-container">
          <div className="pricing-tier-grid">
            {section.tiers.map((tier, idx) => (
              <PricingTierCard
                key={tier.id}
                tier={tier}
                index={idx + 1}
                includedLabel={section.includedLabel}
                affectsLabel={section.affectsLabel}
                ctaLabel={section.cta}
                contactPath={contactPath}
                locale={locale}
              />
            ))}
          </div>

          <p className="pricing-disclaimer">{section.bottomNote}</p>
        </div>
      </section>

      <section className="pricing-contact-band assist-band">
        <div className="ui-container pricing-contact-inner">
          <span className="ui-eyebrow">{assist.eyebrow}</span>
          <h2 className="assist-band__title">{assist.title}</h2>
          <p className="assist-band__body">{assist.body}</p>
          <Link className="pricing-contact-link" to={contactPath}>
            {assist.link}
          </Link>
        </div>
      </section>
    </>
  );
}
