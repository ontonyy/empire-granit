import { getLocaleContent } from '../content';
import type { Locale } from '../types';

interface AboutPageProps {
  locale: Locale;
}

interface AboutMetric {
  value: string;
  label: string;
}

interface AboutBlock {
  kicker: string;
  title: string;
  lead: string;
  points: string[];
  metrics: AboutMetric[];
}

function getAboutBlock(locale: Locale): AboutBlock {
  if (locale === 'ru') {
    return {
      kicker: 'EMPIRE GRANIT',
      title: 'О компании',
      lead:
        'Мы соединяем спокойную консультацию, точную работу с камнем и понятный процесс для семей, которым важно получить достойный результат без лишнего стресса.',
      points: [
        'Работаем с памятниками, установкой и благоустройством мемориальных участков.',
        'Объясняем варианты простым языком и подбираем решение под бюджет семьи.',
        'Стараемся, чтобы каждый этап был понятным: от первого обращения до готовой установки.'
      ],
      metrics: [
        { value: '15+', label: 'лет опыта' },
        { value: '1000+', label: 'семей доверили нам заказ' },
        { value: '1 день', label: 'на ответ и расчет' },
        { value: '3 языка', label: 'русский, eesti, english' }
      ]
    };
  }

  if (locale === 'et') {
    return {
      kicker: 'EMPIRE GRANIT',
      title: 'Ettevõttest',
      lead:
        'Ühendame rahuliku nõustamise, täpse kivimeisterlikkuse ja arusaadava protsessi perede jaoks, kes soovivad väärikat tulemust ilma liigse koormuseta.',
      points: [
        'Tegeleme monumentide, paigalduse ja mälestuspaikade korrastamisega.',
        'Selgitame variandid lihtsalt lahti ja aitame valida pere eelarvele sobiva lahenduse.',
        'Hoiame kogu protsessi arusaadava esimesest kontaktist kuni valmis paigalduseni.'
      ],
      metrics: [
        { value: '15+', label: 'aastat kogemust' },
        { value: '1000+', label: 'peret on meid usaldanud' },
        { value: '1 päev', label: 'vastusele ja hinnapakkumisele' },
        { value: '3 keelt', label: 'русский, eesti, english' }
      ]
    };
  }

  return {
    kicker: 'EMPIRE GRANIT',
    title: 'About the Company',
    lead:
      'We combine calm guidance, precise stone craftsmanship, and a clear process for families who want a dignified result without unnecessary stress.',
    points: [
      'We work with granite memorials, installation, and full memorial site improvement.',
      'Options are explained clearly so families can choose with confidence and within budget.',
      'The process is kept understandable from the first conversation to final installation.'
    ],
    metrics: [
      { value: '15+', label: 'years of experience' },
      { value: '1000+', label: 'families have trusted us' },
      { value: '1 day', label: 'for reply and quotation' },
      { value: '3 languages', label: 'russian, eesti, english' }
    ]
  };
}

export function AboutPage({ locale }: AboutPageProps) {
  const section = getLocaleContent(locale).about;
  const about = getAboutBlock(locale);

  return (
    <section className="content-panel about-page-upgraded">
      <div className="about-hero-panel">
        <div>
          <span className="section-kicker">{about.kicker}</span>
          <h1>{about.title}</h1>
          <p className="about-lead">{about.lead}</p>
        </div>
        <div className="about-story-card">
          {section.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <section className="about-metrics-grid" aria-label={about.title}>
        {about.metrics.map((metric) => (
          <article key={metric.label} className="about-metric-card">
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </article>
        ))}
      </section>

      <section className="about-details-panel">
        <h2>{section.heading}</h2>
        <div className="about-detail-list">
          {about.points.map((point, index) => (
            <article key={point} className="about-detail-card">
              <span className="about-detail-mark" aria-hidden="true">
                {`0${index + 1}`}
              </span>
              <p>{point}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
