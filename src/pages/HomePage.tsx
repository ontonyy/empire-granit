import { Link } from 'react-router-dom';
import { getLocaleContent } from '../content';
import { siteConfig } from '../config/site';
import { buildLocalizedPath } from '../routing';
import type { Locale } from '../types';

interface HomePageProps {
  locale: Locale;
}

interface HeroFeature {
  icon: string;
  title: string;
  body: string;
}

interface TrustMetric {
  value: string;
  label: string;
}

interface StepItem {
  title: string;
  body: string;
}

interface ServiceItem {
  title: string;
  body: string;
}

interface TestimonialItem {
  quote: string;
  author: string;
  meta: string;
}

function getHomeSections(locale: Locale): {
  heroLabel: string;
  secondaryCta: string;
  featureCards: HeroFeature[];
  trustLabel: string;
  trustMetrics: TrustMetric[];
  processLabel: string;
  processTitle: string;
  processSteps: StepItem[];
  servicesLabel: string;
  servicesTitle: string;
  services: ServiceItem[];
  testimonialsLabel: string;
  testimonialsTitle: string;
  testimonials: TestimonialItem[];
} {
  if (locale === 'ru') {
    return {
      heroLabel: 'EMPIRE GRANIT · НАРВА',
      secondaryCta: 'Наши услуги',
      featureCards: [
        { icon: '24/7', title: 'На связи в любое время', body: 'Отвечаем быстро и спокойно, без лишней суеты.' },
        { icon: 'Док', title: 'Помогаем с документами', body: 'Подскажем, что нужно подготовить и как оформить заказ.' },
        { icon: 'EE', title: 'Работаем по всей Эстонии', body: 'Консультация, изготовление и установка в удобном формате.' },
        { icon: 'Камень', title: 'Гранитные памятники на заказ', body: 'Подбираем форму, камень, гравировку и монтаж под ваш запрос.' }
      ],
      trustLabel: 'ПОЧЕМУ НАС ВЫБИРАЮТ',
      trustMetrics: [
        { value: '15+', label: 'лет опыта' },
        { value: '1000+', label: 'семей доверили нам заказ' },
        { value: '1 день', label: 'на ответ и расчет' },
        { value: '3 языка', label: 'русский, eesti, english' }
      ],
      processLabel: 'КАК ЭТО ПРОИСХОДИТ',
      processTitle: 'Понятный путь от первого звонка до готового памятника',
      processSteps: [
        { title: 'Вы связываетесь с нами', body: 'Объясняем варианты, сроки и ориентир по стоимости простым языком.' },
        { title: 'Согласуем проект', body: 'Подбираем форму, материал, гравировку и показываем, как это будет выглядеть.' },
        { title: 'Изготавливаем и устанавливаем', body: 'Делаем памятник аккуратно и организуем установку в согласованные сроки.' }
      ],
      servicesLabel: 'ЧТО МЫ ДЕЛАЕМ',
      servicesTitle: 'Основные услуги Empire Granit',
      services: [
        { title: 'Памятники из гранита', body: 'Одиночные, двойные и семейные памятники с подбором камня и формы.' },
        { title: 'Гравировка и портреты', body: 'Надписи, даты, декоративные элементы и аккуратная персонализация.' },
        { title: 'Установка памятников', body: 'Подготовка основания, монтаж и выравнивание на месте захоронения.' },
        { title: 'Благоустройство участка', body: 'Плитка, щебень, ограды и аккуратное оформление мемориальной зоны.' },
        { title: 'Реставрация и уход', body: 'Очистка, обновление и поддержание памятника в достойном состоянии.' },
        { title: 'Консультация и расчет', body: 'Помогаем спокойно выбрать вариант под бюджет и пожелания семьи.' }
      ],
      testimonialsLabel: 'ОТЗЫВЫ',
      testimonialsTitle: 'Люди приходят к нам за спокойствием и понятностью',
      testimonials: [
        {
          quote: 'Все объяснили очень спокойно, помогли выбрать памятник и не навязывали лишнего.',
          author: 'Ирина С.',
          meta: 'Нарва'
        },
        {
          quote: 'Сроки соблюли, установка прошла аккуратно, итог выглядел именно так, как обещали.',
          author: 'Александр П.',
          meta: 'Йыхви'
        },
        {
          quote: 'Было важно, что можно было задать любой вопрос и получить нормальный человеческий ответ.',
          author: 'Марина К.',
          meta: 'Таллинн'
        }
      ]
    };
  }

  if (locale === 'et') {
    return {
      heroLabel: 'EMPIRE GRANIT · NARVA',
      secondaryCta: 'Meie teenused',
      featureCards: [
        { icon: '24/7', title: 'Kättesaadavad igal ajal', body: 'Vastame kiiresti ja rahulikult, ilma liigse pingeta.' },
        { icon: 'Abi', title: 'Aitame dokumentidega', body: 'Selgitame sammud ja aitame tellimuse korrektselt vormistada.' },
        { icon: 'EE', title: 'Teenindame kogu Eestis', body: 'Nõustamine, valmistamine ja paigaldus sobivas vormis.' },
        { icon: 'Kivi', title: 'Graniidist mälestusmärgid', body: 'Valime koos kuju, kivi, graveeringu ja paigalduse.' }
      ],
      trustLabel: 'MIKS MEID VALITAKSE',
      trustMetrics: [
        { value: '15+', label: 'aastat kogemust' },
        { value: '1000+', label: 'peret on meid usaldanud' },
        { value: '1 päev', label: 'vastusele ja kalkulatsioonile' },
        { value: '3 keelt', label: 'русский, eesti, english' }
      ],
      processLabel: 'KUIDAS SEE TOIMIB',
      processTitle: 'Selge teekond esimesest kõnest valmis mälestusmärgini',
      processSteps: [
        { title: 'Võtate meiega ühendust', body: 'Räägime lihtsalt läbi variandid, tähtajad ja hinnavahemiku.' },
        { title: 'Kooskõlastame projekti', body: 'Valime kuju, materjali, graveeringu ning näitame tulemust ette.' },
        { title: 'Valmistame ja paigaldame', body: 'Teeme töö hoolikalt valmis ja korraldame paigalduse kokkulepitud ajal.' }
      ],
      servicesLabel: 'MIDA ME TEEME',
      servicesTitle: 'Empire Granit põhiteenused',
      services: [
        { title: 'Graniidist mälestusmärgid', body: 'Üksik-, topelt- ja perekonnamonumendid sobiva kuju ja kiviga.' },
        { title: 'Graveeringud ja portreed', body: 'Tekstid, kuupäevad, detailid ja isikupärane viimistlus.' },
        { title: 'Paigaldus', body: 'Aluse ettevalmistus, paigaldus ja täpne joondamine kalmistul.' },
        { title: 'Platsi korrastamine', body: 'Plaatimine, killustik, piirded ja mälestusala terviklik kujundus.' },
        { title: 'Hooldus ja taastamine', body: 'Puhastus, värskendamine ja monumendi korrashoid pikemaks ajaks.' },
        { title: 'Nõustamine ja hinnapakkumine', body: 'Aitame leida rahuliku ja selge lahenduse pere eelarve järgi.' }
      ],
      testimonialsLabel: 'TAGASISIDE',
      testimonialsTitle: 'Perede jaoks on oluline rahulik ja arusaadav teenindus',
      testimonials: [
        {
          quote: 'Kõik selgitati väga rahulikult, meile ei surutud midagi peale ning valik sai kiiresti tehtud.',
          author: 'Irina S.',
          meta: 'Narva'
        },
        {
          quote: 'Tähtaegadest peeti kinni ja paigaldus tehti väga korrektselt. Tulemus vastas lubatule.',
          author: 'Aleksandr P.',
          meta: 'Jõhvi'
        },
        {
          quote: 'Kõige tähtsam oli, et iga küsimuse peale saime normaalse ja arusaadava vastuse.',
          author: 'Marina K.',
          meta: 'Tallinn'
        }
      ]
    };
  }

  return {
    heroLabel: 'EMPIRE GRANIT · NARVA',
    secondaryCta: 'Our services',
    featureCards: [
      { icon: '24/7', title: 'Available whenever needed', body: 'We respond quickly and clearly, without making the process harder.' },
      { icon: 'Docs', title: 'Guidance with paperwork', body: 'We explain what is needed and help structure the next steps.' },
      { icon: 'EE', title: 'Serving all Estonia', body: 'Consultation, production and installation arranged across the country.' },
      { icon: 'Stone', title: 'Custom granite memorials', body: 'Shape, stone, engraving and installation tailored to the family.' }
    ],
    trustLabel: 'WHY FAMILIES CHOOSE US',
    trustMetrics: [
      { value: '15+', label: 'years of experience' },
      { value: '1000+', label: 'families have trusted us' },
      { value: '1 day', label: 'for reply and quotation' },
      { value: '3 languages', label: 'russian, estonian, english' }
    ],
    processLabel: 'HOW IT WORKS',
    processTitle: 'A clear path from the first call to the completed memorial',
    processSteps: [
      { title: 'You contact us', body: 'We explain options, timing and pricing range in a calm and simple way.' },
      { title: 'We agree the project', body: 'We choose the shape, material and engraving and show how it will look.' },
      { title: 'We produce and install', body: 'The monument is made carefully and installed on the agreed schedule.' }
    ],
    servicesLabel: 'WHAT WE OFFER',
    servicesTitle: 'Core Empire Granit services',
    services: [
      { title: 'Granite monuments', body: 'Single, double and family memorials with the right stone and silhouette.' },
      { title: 'Engraving and portraits', body: 'Names, dates, decorative details and clean personalization.' },
      { title: 'Memorial installation', body: 'Foundation preparation, fitting and precise leveling at the cemetery.' },
      { title: 'Site improvement', body: 'Tiles, stone fill, borders and a complete memorial area arrangement.' },
      { title: 'Restoration and care', body: 'Cleaning, renewal and long-term upkeep of existing monuments.' },
      { title: 'Consultation and quotation', body: 'We help families choose a suitable option within their budget.' }
    ],
    testimonialsLabel: 'TESTIMONIALS',
    testimonialsTitle: 'Families come to us for clarity and calm support',
    testimonials: [
      {
        quote: 'Everything was explained calmly, the monument was selected without pressure, and the process felt clear.',
        author: 'Irina S.',
        meta: 'Narva'
      },
      {
        quote: 'The timing was kept, installation was neat, and the final result matched what we were promised.',
        author: 'Aleksandr P.',
        meta: 'Jõhvi'
      },
      {
        quote: 'What mattered most was being able to ask questions and receive a normal, respectful answer every time.',
        author: 'Marina K.',
        meta: 'Tallinn'
      }
    ]
  };
}

export function HomePage({ locale }: HomePageProps) {
  const content = getLocaleContent(locale);
  const section = content.homepage;
  const home = getHomeSections(locale);

  return (
    <>
      <section className="hero-panel hero-panel-expanded reveal-on-scroll is-visible">
        <div className="hero-copy">
          <span className="eyebrow">{home.heroLabel}</span>
          <h1>{section.heroTitle}</h1>
          <p className="hero-lead">{section.heroLead}</p>

          <div className="hero-actions">
            <Link className="hero-primary" to={buildLocalizedPath(locale, 'contact')}>
              {content.cta.sendInquiry}
            </Link>
            <Link className="hero-secondary" to={buildLocalizedPath(locale, 'pricing')}>
              {home.secondaryCta}
            </Link>
          </div>
        </div>

        <div className="hero-feature-stack">
          {home.featureCards.map((card) => (
            <article key={card.title} className="hero-feature-card">
              <span className="hero-feature-icon" aria-hidden="true">
                {card.icon}
              </span>
              <div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="trust-bar-section reveal-on-scroll" aria-label={home.trustLabel}>
        {home.trustMetrics.map((metric) => (
          <article key={metric.label} className="trust-bar-item">
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </article>
        ))}
      </section>

      <section className="how-it-works reveal-on-scroll">
        <span className="section-kicker">{home.processLabel}</span>
        <h2>{home.processTitle}</h2>
        <div className="steps-grid enhanced-steps-grid">
          {home.processSteps.map((step, index) => (
            <article key={step.title} className="step-card enhanced-step-card">
              <span className="step-index">{`0${index + 1}`}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="services-showcase reveal-on-scroll">
        <span className="section-kicker">{home.servicesLabel}</span>
        <h2>{home.servicesTitle}</h2>
        <div className="services-grid-home">
          {home.services.map((service) => (
            <article key={service.title} className="service-highlight-card">
              <span className="service-highlight-dot" aria-hidden="true" />
              <h3>{service.title}</h3>
              <p>{service.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="trust-signals testimonials-section reveal-on-scroll">
        <span className="section-kicker">{home.testimonialsLabel}</span>
        <h2>{home.testimonialsTitle}</h2>
        <div className="reviews-grid testimonial-grid">
          {home.testimonials.map((review) => (
            <article key={`${review.author}-${review.meta}`} className="review-card testimonial-card">
              <span className="quote-mark" aria-hidden="true">
                "
              </span>
              <p>{review.quote}</p>
              <strong>{review.author}</strong>
              <small>{review.meta}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="home-contact-banner reveal-on-scroll">
        <div>
          <span className="section-kicker">{siteConfig.contacts.company}</span>
          <h2>{siteConfig.contacts.phoneDisplay}</h2>
          <p>{siteConfig.contacts.address}</p>
        </div>
        <div className="home-contact-actions">
          <a className="hero-primary" href={siteConfig.contacts.phoneLink}>
            {content.cta.callNow}
          </a>
          <Link className="hero-secondary" to={buildLocalizedPath(locale, 'contact')}>
            {content.cta.sendInquiry}
          </Link>
        </div>
      </section>
    </>
  );
}
