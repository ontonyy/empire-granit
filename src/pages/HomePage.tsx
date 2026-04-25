import { getLocaleContent } from '../content';
import type { Locale } from '../types';
import { ContactBanner } from './home/ContactBanner';
import { HeroSection } from './home/HeroSection';
import { ProcessSection } from './home/ProcessSection';
import { ServicesSection } from './home/ServicesSection';
import { TestimonialsSection } from './home/TestimonialsSection';
import { TrustBarSection } from './home/TrustBarSection';
import { getHomeSections } from './home/sections';

interface HomePageProps {
  locale: Locale;
}

export function HomePage({ locale }: HomePageProps) {
  const content = getLocaleContent(locale);
  const section = content.homepage;
  const home = getHomeSections(locale);

  return (
    <>
      <HeroSection
        locale={locale}
        heroLabel={home.heroLabel}
        heroTitle={section.heroTitle}
        heroLead={section.heroLead}
        primaryCta={content.cta.sendInquiry}
        secondaryCta={home.secondaryCta}
        featureCards={home.featureCards}
      />
      <TrustBarSection label={home.trustLabel} metrics={home.trustMetrics} />
      <ProcessSection label={home.processLabel} title={home.processTitle} steps={home.processSteps} />
      <ServicesSection label={home.servicesLabel} title={home.servicesTitle} services={home.services} />
      <TestimonialsSection
        label={home.testimonialsLabel}
        title={home.testimonialsTitle}
        testimonials={home.testimonials}
      />
      <ContactBanner
        locale={locale}
        callNowLabel={content.cta.callNow}
        sendInquiryLabel={content.cta.sendInquiry}
      />
    </>
  );
}
