import { getLocaleContent } from '../content';
import type { Locale } from '../types';
import { CatalogPreviewSection } from './home/CatalogPreviewSection';
import { HeroSection } from './home/HeroSection';
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
      />
      <TestimonialsSection
        label={home.testimonialsLabel}
        title={home.testimonialsTitle}
        testimonials={home.testimonials}
      />
    </>
  );
}
