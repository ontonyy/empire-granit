import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/site';
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
  const contactPath = buildLocalizedPath(locale, 'contact');

  useEffect(() => {
    trackEvent('pricing_page_view', { locale });
  }, [locale]);

  return (
    <>
      <section className="pricing-header">
        <div className="ui-container pricing-header-inner">
          <span className="ui-eyebrow">{content.nav.pricing}</span>
          <h1 className="ui-display ui-display-1 pricing-title">{section.heading}</h1>
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
                ctaLabel={section.cta}
                includedLabel={section.includedLabel}
                affectsLabel={section.affectsLabel}
                contactHref={`${contactPath}?tier=${tier.id}`}
                onCtaClick={() =>
                  trackEvent('pricing_package_select', {
                    locale,
                    package: tier.name,
                    packageId: tier.id
                  })
                }
              />
            ))}
          </div>

          <p className="pricing-disclaimer">{section.bottomNote}</p>
        </div>
      </section>

      <section className="pricing-contact-band">
        <div className="ui-container pricing-contact-inner">
          <a
            className="pricing-contact-phone"
            href={siteConfig.contacts.phoneLink}
            onClick={() => trackEvent('phone_click', { locale, source: 'pricing-band' })}
          >
            {siteConfig.contacts.phoneDisplay}
          </a>
          <Link className="pricing-contact-link" to={contactPath}>
            {section.cta}
          </Link>
        </div>
      </section>
    </>
  );
}
