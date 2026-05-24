import { getLocaleContent } from '../content';
import type { Locale } from '../types';
import { ContactBanner } from './home/ContactBanner';
import { HeroSection } from './home/HeroSection';
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
      <ContactBanner locale={locale} sendInquiryLabel={content.cta.sendInquiry} />
    </>
  );
}
