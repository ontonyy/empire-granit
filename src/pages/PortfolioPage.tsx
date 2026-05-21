import { Link } from 'react-router-dom';
import { DisplayHeading, Eyebrow } from '../components/ui';
import { getLocaleContent } from '../content';
import { buildLocalizedPath } from '../routing';
import type { Locale, LocaleContent } from '../types';

interface PortfolioPageProps {
  locale: Locale;
}

type PortfolioContent = LocaleContent['portfolio'];

type PortfolioWork = {
  id: string;
  title: string;
  summary: string;
  location: string;
  image: string;
};

const fallbackCopy: Record<
  Locale,
  {
    heading: string;
    intro: string;
    eyebrow: string;
    cta: string;
    summaries: string[];
    locations: string[];
  }
> = {
  et: {
    heading: 'Valminud tööd',
    intro: 'Valik graniitmonumente, piirdeid ja hauaplatsi lahendusi, mis näitavad materjali, proportsiooni ja viimistlust päris keskkonnas.',
    eyebrow: 'Portfoolio',
    cta: 'Küsi sarnast lahendust',
    summaries: [
      'Terviklik memoriaalala koos monumendi, piirde ja korrastatud kattega.',
      'Klassikaline monument koos madala äärekivi ja tasakaalustatud graveeringuga.',
      'Graniidist piire selge geomeetriaga ning vastupidava viimistlusega.',
      'Hauaplatsi aed koos sissepääsuga, sobitatud olemasoleva kujundusega.'
    ],
    locations: ['Narva', 'Ida-Virumaa', 'Tallinn', 'Eesti']
  },
  ru: {
    heading: 'Выполненные работы',
    intro: 'Подборка гранитных памятников, обрамлений и благоустройства участков, где видны материал, пропорции и отделка в реальной среде.',
    eyebrow: 'Портфолио',
    cta: 'Запросить похожее решение',
    summaries: [
      'Комплексное мемориальное место с памятником, обрамлением и аккуратным покрытием.',
      'Классический памятник с низким бордюром и спокойной композицией гравировки.',
      'Гранитное обрамление с четкой геометрией и долговечной отделкой.',
      'Ограда участка с входом, согласованная с существующим оформлением.'
    ],
    locations: ['Нарва', 'Ида-Вирумаа', 'Таллинн', 'Эстония']
  },
  en: {
    heading: 'Completed work',
    intro: 'Selected granite memorials, borders, and cemetery site projects showing material, proportion, and finish in real settings.',
    eyebrow: 'Portfolio',
    cta: 'Request a similar solution',
    summaries: [
      'Complete memorial area with monument, border, and finished ground surface.',
      'Classic monument with low border stone and balanced engraving composition.',
      'Granite border with clear geometry and durable finishing.',
      'Plot fence with entrance, matched to the existing site layout.'
    ],
    locations: ['Narva', 'Ida-Viru County', 'Tallinn', 'Estonia']
  }
};

function getPortfolioContent(content: LocaleContent): PortfolioContent | undefined {
  return (content as LocaleContent & { portfolio?: PortfolioContent }).portfolio;
}

function buildFallbackWorks(locale: Locale, content: LocaleContent): PortfolioWork[] {
  const copy = fallbackCopy[locale];
  return content.gallery.readyWorks.map((work, index) => ({
    id: work.id,
    title: work.title,
    image: work.image,
    summary: copy.summaries[index % copy.summaries.length],
    location: copy.locations[index % copy.locations.length]
  }));
}

function getWorks(locale: Locale, content: LocaleContent): PortfolioWork[] {
  const portfolio = getPortfolioContent(content);

  if (portfolio?.items?.length) {
    return portfolio.items.map((item) => ({
      ...item,
      image: content.gallery.readyWorks.find((work) => work.id === item.id)?.image ?? item.image
    }));
  }

  return buildFallbackWorks(locale, content);
}

export function PortfolioPage({ locale }: PortfolioPageProps) {
  const content = getLocaleContent(locale);
  const portfolio = getPortfolioContent(content);
  const copy = fallbackCopy[locale];
  const works = getWorks(locale, content);

  return (
    <main className="content-panel portfolio-page">
      <header className="page-hero portfolio-hero">
        <Eyebrow>{portfolio?.labels.eyebrow ?? copy.eyebrow}</Eyebrow>
        <DisplayHeading level={1}>{portfolio?.heading ?? copy.heading}</DisplayHeading>
        <p>{portfolio?.intro ?? copy.intro}</p>
      </header>

      <section aria-label={portfolio?.heading ?? copy.heading} className="portfolio-grid reveal-on-scroll">
        {works.map((work) => {
          const contactPath = `${buildLocalizedPath(locale, 'contact')}?ref=${encodeURIComponent(work.id)}`;

          return (
            <article key={work.id} className="portfolio-card">
              <div className="portfolio-card-media">
                <img src={work.image} alt={work.title} loading="lazy" />
              </div>
              <div className="portfolio-card-body">
                <div className="portfolio-card-copy">
                  <p className="portfolio-card-meta">{work.location}</p>
                  <h2 className="cinzel-font portfolio-card-title">{work.title}</h2>
                  <p className="portfolio-card-summary">{work.summary}</p>
                </div>
                <Link className="hero-primary portfolio-card-cta" to={contactPath}>
                  {portfolio?.labels.cta ?? copy.cta}
                </Link>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
