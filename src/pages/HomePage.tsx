import { getLocaleContent } from '../content';
import type { Locale } from '../types';
import {
  CraftTableau,
  FinalTableau,
  IntroRow,
  OpeningTableau,
  PricesBlock,
  WorksEssay
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
      <OpeningTableau eyebrow={home.heroLabel} title={home.heroTitle} />
      <IntroRow
        intro={home.intro}
        phoneEyebrow={home.phoneEyebrow}
        trustMetrics={home.trustMetrics}
      />
      <CraftTableau
        eyebrow={home.craftEyebrow}
        title={home.craftTitle}
        services={home.servicesShort}
      />
      <WorksEssay
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
        factorsBody={content.pricing.factorsBody}
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
