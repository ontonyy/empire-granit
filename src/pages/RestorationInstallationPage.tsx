import { useState } from 'react';
import { Button, DisplayHeading, Eyebrow } from '../components/ui';
import { getLocaleContent } from '../content';
import { buildLocalizedPath } from '../routing';
import type { Locale } from '../types';

interface RestorationInstallationPageProps {
  locale: Locale;
}

type RestorationInstallationContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  services: Array<{
    title: string;
    body: string;
    points: string[];
  }>;
  assessmentTitle: string;
  assessmentBody: string;
  assessmentItems: string[];
  slider?: {
    beforeLabel: string;
    afterLabel: string;
    caption: string;
    beforeImage: string;
    afterImage: string;
  };
  processTitle: string;
  processItems: Array<{
    title: string;
    body: string;
  }>;
  ctaTitle: string;
  ctaBody: string;
  ctaLabel: string;
};

const fallbackContent: Record<Locale, RestorationInstallationContent> = {
  ru: {
    eyebrow: 'Установка и восстановление',
    heading: 'Установка, реставрация и благоустройство места',
    intro:
      'Помогаем аккуратно установить новый памятник, обновить существующий комплекс и привести место захоронения в спокойный, ухоженный вид.',
    services: [
      {
        title: 'Установка памятников',
        body: 'Готовим место, согласуем основание, доставку и монтаж с учетом условий кладбища.',
        points: ['Проверка размеров и доступа', 'Подготовка основания', 'Монтаж и выравнивание']
      },
      {
        title: 'Реставрация',
        body: 'Обновляем надписи, портреты, плиты и отдельные элементы, когда памятник можно сохранить.',
        points: ['Оценка состояния по фото или на месте', 'Обновление букв и деталей', 'Бережная очистка гранита']
      },
      {
        title: 'Благоустройство',
        body: 'Оформляем границы, покрытие, цветник и дополнительные элементы для цельного результата.',
        points: ['Бордюры и ограждения', 'Покрытие участка', 'Финальная уборка']
      }
    ],
    assessmentTitle: 'Что уточняем перед работой',
    assessmentBody:
      'Точный объем зависит от состояния участка, материала, доступа, сезона и правил конкретного кладбища.',
    assessmentItems: ['Фото участка и памятника', 'Размеры места', 'Нужные работы', 'Город или кладбище'],
    slider: {
      beforeLabel: 'До',
      afterLabel: 'После',
      caption: 'Пример: очищенное и заново оформленное место выглядит спокойнее и аккуратнее.',
      beforeImage: '/images/work-2.svg',
      afterImage: '/images/work-3.svg'
    },
    processTitle: 'Как проходит работа',
    processItems: [
      { title: 'Осмотр', body: 'Смотрим фото или приезжаем на место, если нужен точный замер.' },
      { title: 'Смета', body: 'Фиксируем материалы, объем работ, сроки и ориентир по цене.' },
      { title: 'Выполнение', body: 'Делаем монтаж или восстановление и проверяем финальный вид.' }
    ],
    ctaTitle: 'Нужна оценка места?',
    ctaBody: 'Пришлите фото, размеры и город. Мы подскажем, что можно сделать и какой порядок работ разумен.',
    ctaLabel: 'Отправить запрос'
  },
  et: {
    eyebrow: 'Paigaldus ja taastamine',
    heading: 'Paigaldus, taastamine ja hauaplatsi korrastus',
    intro:
      'Aitame uue mälestusmärgi paigaldamisel, olemasoleva kompleksi uuendamisel ja hauaplatsi korrektseks tervikuks seadmisel.',
    services: [
      {
        title: 'Mälestusmärgi paigaldus',
        body: 'Valmistame platsi ette ning lepime kokku aluse, transpordi ja paigalduse vastavalt kalmistu tingimustele.',
        points: ['Mõõtude ja ligipääsu kontroll', 'Aluse ettevalmistus', 'Paigaldus ja loodimine']
      },
      {
        title: 'Taastamine',
        body: 'Uuendame kirju, portreesid, plaate ja detaile, kui olemasolevat mälestusmärki saab säilitada.',
        points: ['Seisukorra hindamine foto või koha põhjal', 'Kirjade ja detailide uuendus', 'Graniidi õrn puhastus']
      },
      {
        title: 'Hauaplatsi korrastus',
        body: 'Teeme piirded, katte, lilleala ja lisadetailid, et tulemus oleks terviklik.',
        points: ['Äärekivid ja piirded', 'Platsi kate', 'Lõplik korrastus']
      }
    ],
    assessmentTitle: 'Mida enne tööd täpsustame',
    assessmentBody: 'Täpne maht sõltub platsi seisust, materjalist, ligipääsust, hooajast ja kalmistu reeglitest.',
    assessmentItems: ['Platsi ja mälestusmärgi fotod', 'Platsi mõõdud', 'Vajalik töö', 'Linn või kalmistu'],
    slider: {
      beforeLabel: 'Enne',
      afterLabel: 'Pärast',
      caption: 'Näide: puhastatud ja uuesti korrastatud plats mõjub rahulikumalt ja hoolitsetumalt.',
      beforeImage: '/images/work-2.svg',
      afterImage: '/images/work-3.svg'
    },
    processTitle: 'Töö käik',
    processItems: [
      { title: 'Ülevaatus', body: 'Vaatame fotosid või tuleme kohale, kui on vaja täpset mõõtmist.' },
      { title: 'Pakkumine', body: 'Fikseerime materjalid, töö mahu, tähtaja ja hinnasihi.' },
      { title: 'Teostus', body: 'Teeme paigalduse või taastamise ning kontrollime lõpptulemust.' }
    ],
    ctaTitle: 'Kas vajate platsi hindamist?',
    ctaBody: 'Saatke fotod, mõõdud ja linn. Anname nõu, mida saab teha ja milline tööjärjekord on mõistlik.',
    ctaLabel: 'Saada päring'
  },
  en: {
    eyebrow: 'Installation and restoration',
    heading: 'Installation, restoration, and memorial site improvement',
    intro:
      'We help install new memorials, renew existing stonework, and bring the cemetery site back to a calm, cared-for condition.',
    services: [
      {
        title: 'Monument installation',
        body: 'We prepare the site and coordinate foundation, delivery, and installation around cemetery conditions.',
        points: ['Access and dimensions checked', 'Foundation prepared', 'Installation and alignment']
      },
      {
        title: 'Restoration',
        body: 'We renew lettering, portraits, slabs, and individual details when the existing memorial can be preserved.',
        points: ['Condition assessed by photo or on site', 'Lettering and details renewed', 'Granite cleaned gently']
      },
      {
        title: 'Site improvement',
        body: 'We arrange borders, covering, flower areas, and added details so the whole site feels complete.',
        points: ['Borders and edging', 'Site covering', 'Final cleaning']
      }
    ],
    assessmentTitle: 'What we clarify first',
    assessmentBody: 'The exact scope depends on site condition, material, access, season, and the cemetery rules.',
    assessmentItems: ['Site and monument photos', 'Plot dimensions', 'Needed work', 'City or cemetery'],
    slider: {
      beforeLabel: 'Before',
      afterLabel: 'After',
      caption: 'Example: a cleaned and rearranged site feels calmer and more cared for.',
      beforeImage: '/images/work-2.svg',
      afterImage: '/images/work-3.svg'
    },
    processTitle: 'Work sequence',
    processItems: [
      { title: 'Assessment', body: 'We review photos or visit the site when exact measurement is needed.' },
      { title: 'Estimate', body: 'We confirm materials, scope, timing, and the expected price range.' },
      { title: 'Work', body: 'We complete installation or restoration and check the final appearance.' }
    ],
    ctaTitle: 'Need a site assessment?',
    ctaBody: 'Send photos, dimensions, and city. We will suggest what can be done and the sensible work order.',
    ctaLabel: 'Send inquiry'
  }
};

function getPageContent(locale: Locale): RestorationInstallationContent {
  const content = getLocaleContent(locale) as ReturnType<typeof getLocaleContent> & {
    restorationInstallation?: RestorationInstallationContent;
  };

  return content.restorationInstallation ?? fallbackContent[locale];
}

function withBaseUrl(path: string): string {
  if (!path.startsWith('/')) {
    return path;
  }

  const base = import.meta.env.BASE_URL || '/';
  return `${base.replace(/\/$/, '')}${path}`;
}

export function RestorationInstallationPage({ locale }: RestorationInstallationPageProps) {
  const section = getPageContent(locale);
  const [sliderValue, setSliderValue] = useState(55);

  return (
    <main className="content-panel restoration-installation-page">
      <header className="page-hero">
        <Eyebrow>{section.eyebrow}</Eyebrow>
        <DisplayHeading level={1}>{section.heading}</DisplayHeading>
        <p>{section.intro}</p>
      </header>

      <section className="services-mini-grid reveal-on-scroll" aria-label={section.eyebrow}>
        {section.services.map((service) => (
          <article key={service.title} className="service-mini-card">
            <span className="service-dot" aria-hidden="true" />
            <h2 className="cinzel-font">{service.title}</h2>
            <p>{service.body}</p>
            <ul>
              {service.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="process-consultation reveal-on-scroll">
        <div>
          <Eyebrow>{section.assessmentTitle}</Eyebrow>
          <h2 className="cinzel-font">{section.assessmentTitle}</h2>
          <p>{section.assessmentBody}</p>
        </div>
        <ul>
          {section.assessmentItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {section.slider ? (
        <section className="process-story-step reveal-on-scroll" aria-label={section.slider.caption}>
          <div className="process-story-media" style={{ position: 'relative' }}>
            <img src={withBaseUrl(section.slider.beforeImage)} alt={section.slider.beforeLabel} loading="lazy" />
            <img
              src={withBaseUrl(section.slider.afterImage)}
              alt={section.slider.afterLabel}
              loading="lazy"
              style={{
                clipPath: `inset(0 0 0 ${sliderValue}%)`,
                inset: 0,
                position: 'absolute'
              }}
            />
            <span
              aria-hidden="true"
              style={{
                background: 'var(--color-surface)',
                bottom: 0,
                left: `${sliderValue}%`,
                position: 'absolute',
                top: 0,
                width: 2
              }}
            />
          </div>
          <div className="process-story-copy">
            <span className="process-story-index">
              {section.slider.beforeLabel} / {section.slider.afterLabel}
            </span>
            <h2 className="cinzel-font">{section.assessmentTitle}</h2>
            <p>{section.slider.caption}</p>
            <input
              aria-label={`${section.slider.beforeLabel} ${section.slider.afterLabel}`}
              max="85"
              min="15"
              onChange={(event) => setSliderValue(Number(event.target.value))}
              type="range"
              value={sliderValue}
            />
          </div>
        </section>
      ) : null}

      <section className="catalog-grid-section reveal-on-scroll" aria-label={section.processTitle}>
        <header className="catalog-grid-section-header">
          <DisplayHeading level={2}>{section.processTitle}</DisplayHeading>
        </header>
        <div className="catalog-grid">
          {section.processItems.map((item) => (
            <article key={item.title} className="service-highlight-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <aside className="process-consultation reveal-on-scroll">
        <div>
          <Eyebrow>{section.ctaLabel}</Eyebrow>
          <h2 className="cinzel-font">{section.ctaTitle}</h2>
          <p>{section.ctaBody}</p>
        </div>
        <Button as="router-link" to={buildLocalizedPath(locale, 'contact')}>
          {section.ctaLabel}
        </Button>
      </aside>
    </main>
  );
}
