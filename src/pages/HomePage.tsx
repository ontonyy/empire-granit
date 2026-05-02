import { getLocaleContent } from '../content';
import type { Locale } from '../types';
import { CatalogPreviewSection } from './home/CatalogPreviewSection';
import { ContactBanner } from './home/ContactBanner';
import { GuaranteeCareSection } from './home/GuaranteeCareSection';
import { HomeFaqSection } from './home/HomeFaqSection';
import { HeroSection } from './home/HeroSection';
import { MaterialsOptionsSection } from './home/MaterialsOptionsSection';
import { PricingClaritySection } from './home/PricingClaritySection';
import { ProcessSection } from './home/ProcessSection';
import { ServiceAreaSection } from './home/ServiceAreaSection';
import { ServicesSection } from './home/ServicesSection';
import { TestimonialsSection } from './home/TestimonialsSection';
import { TrustBarSection } from './home/TrustBarSection';

interface HomePageProps {
  locale: Locale;
}

export function HomePage({ locale }: HomePageProps) {
  const content = getLocaleContent(locale);
  const home = content.homepage;

  return (
    <>
      <HeroSection
        locale={locale}
        heroLabel={home.heroLabel}
        heroTitle={home.heroTitle}
        heroLead={home.heroLead}
        primaryCta={content.cta.sendInquiry}
        secondaryCta={home.secondaryCta}
        featureCards={home.featureCards}
      />
      <TrustBarSection label={home.trustLabel} metrics={home.trustMetrics} />
      <ServicesSection label={home.servicesLabel} title={home.servicesTitle} services={home.services} />
      <CatalogPreviewSection
        locale={locale}
        label={home.catalogLabel}
        title={home.catalogTitle}
        lead={home.catalogLead}
        items={home.catalogItems}
        ctaLabel={content.nav.gallery}
        requestCtaLabel={home.catalogCta}
      />
      <MaterialsOptionsSection
        label={home.optionsLabel}
        title={home.optionsTitle}
        lead={home.optionsLead}
        options={home.options}
      />
      <PricingClaritySection
        locale={locale}
        label={home.pricingLabel}
        title={home.pricingTitle}
        lead={home.pricingLead}
        items={home.pricingItems}
        ctaLabel={content.pricing.cta}
      />
      <ProcessSection label={home.processLabel} title={home.processTitle} steps={home.processSteps} />
      <GuaranteeCareSection
        label={home.careLabel}
        title={home.careTitle}
        lead={home.careLead}
        items={home.careItems}
      />
      <ServiceAreaSection label={home.areaLabel} title={home.areaTitle} lead={home.areaLead} items={home.areaItems} />
      <TestimonialsSection
        label={home.testimonialsLabel}
        title={home.testimonialsTitle}
        testimonials={home.testimonials}
      />
      <HomeFaqSection
        locale={locale}
        label={home.faqLabel}
        title={home.faqTitle}
        items={home.faqItems}
        ctaLabel={content.nav.faq}
      />
      <ContactBanner
        locale={locale}
        sendInquiryLabel={content.cta.sendInquiry}
      />
    </>
  );
}
