import { getLocaleContent } from '../content';
import type { Locale } from '../types';
import { CatalogPreviewSection } from './home/CatalogPreviewSection';
import { ConfiguratorTeaserSection } from './home/ConfiguratorTeaserSection';
import { ContactBanner } from './home/ContactBanner';
import { GuaranteeCareSection } from './home/GuaranteeCareSection';
import { HeroSection } from './home/HeroSection';
import { HomeFaqSection } from './home/HomeFaqSection';
import { MaterialsOptionsSection } from './home/MaterialsOptionsSection';
import { ProcessSection } from './home/ProcessSection';
import { ServiceAreaSection } from './home/ServiceAreaSection';
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
        highlights={home.highlights}
      />
      <TrustBarSection label={home.trustLabel} metrics={home.trustMetrics} />
      <ProcessSection label={home.processLabel} title={home.processTitle} steps={home.processSteps} />
      <CatalogPreviewSection
        locale={locale}
        label={home.catalogLabel}
        title={home.catalogTitle}
        lead={home.catalogLead}
        items={home.catalogItems}
        ctaLabel={home.catalogCta}
      />
      <MaterialsOptionsSection
        label={home.optionsLabel}
        title={home.optionsTitle}
        lead={home.optionsLead}
        options={home.options}
      />
      <ConfiguratorTeaserSection
        locale={locale}
        label={home.configuratorLabel}
        title={home.configuratorTitle}
        lead={home.configuratorLead}
        items={home.configuratorItems}
        ctaLabel={home.configuratorCta}
      />
      <GuaranteeCareSection
        label={home.careLabel}
        title={home.careTitle}
        lead={home.careLead}
        items={home.careItems}
      />
      <ServiceAreaSection
        label={home.areaLabel}
        title={home.areaTitle}
        lead={home.areaLead}
        items={home.areaItems}
      />
      <ContactBanner locale={locale} sendInquiryLabel={content.cta.sendInquiry} />
      <HomeFaqSection
        locale={locale}
        label={home.faqLabel}
        title={home.faqTitle}
        items={home.faqItems}
        ctaLabel={content.nav.faq}
      />
    </>
  );
}
