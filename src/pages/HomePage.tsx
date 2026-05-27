import { getLocaleContent } from '../content';
import type { Locale } from '../types';
import {
  FinalTableau,
  IntroRow,
  OpeningTableau,
  PricesBlock,
  ServicesTeaser,
  WorksTeaser
} from './home/sections';

interface HomePageProps {
  locale: Locale;
}

export function HomePage({ locale }: HomePageProps) {
  const content = getLocaleContent(locale);
  const home = content.homepage;
  const works = content.works;
  const tiers = content.pricing.tiers.slice(0, 3).map((t) => ({
    id: t.id,
    name: t.name,
    price: String(t.price)
  }));

  return (
    <>
      <OpeningTableau
        locale={locale}
        eyebrow={home.heroLabel}
        title={home.heroTitle}
        heroBodyLine={home.heroBodyLine}
      />
      <IntroRow
        intro={home.intro}
        phoneEyebrow={home.phoneEyebrow}
        trustMetrics={home.trustMetrics}
      />
      <ServicesTeaser
        locale={locale}
        eyebrow={home.servicesEyebrow}
        title={home.servicesShortTitle}
        services={home.servicesShort}
        learnMore={home.servicesLearnMore}
      />
      <WorksTeaser
        locale={locale}
        eyebrow={home.worksSectionEyebrow}
        title={home.worksSectionTitle}
        footerCounter={works.homeFooterCounter}
        viewAllLink={works.viewAllLink}
      />
      <PricesBlock
        locale={locale}
        eyebrow={home.pricesEyebrow}
        title={home.pricesTitle}
        leadLine={home.pricesLeadLine}
        tableLink={home.pricesTableLink}
        tiers={tiers}
      />
      <FinalTableau
        locale={locale}
        eyebrow={home.finalEyebrow}
        hours={content.layout.footerHoursValue}
        contactLink={home.finalContactLink}
      />
    </>
  );
}
