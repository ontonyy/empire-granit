import { Link } from 'react-router-dom';
import { getLocaleContent } from '../content';
import { buildLocalizedPath } from '../routing';
import type { Locale } from '../types';

interface GalleryPageProps {
  locale: Locale;
}

function getOptionalPreviewCopy(locale: Locale) {
  if (locale === 'ru') {
    return {
      title: 'Предпросмотр (опционально)',
      body: 'Если хотите, можно заранее посмотреть форму памятника в конфигураторе.',
      openPreview: 'Открыть предпросмотр',
      getConsultation: 'Получить консультацию по этому варианту'
    };
  }

  if (locale === 'et') {
    return {
      title: 'Eelvaade (valikuline)',
      body: 'Soovi korral saate monumendi vormi eelnevalt konfiguraatoris vaadata.',
      openPreview: 'Ava eelvaade',
      getConsultation: 'Soovin konsultatsiooni selle variandi kohta'
    };
  }

  return {
    title: 'Preview (optional)',
    body: 'If you want, you can check monument form options in the configurator first.',
    openPreview: 'Open preview',
    getConsultation: 'Get consultation for this option'
  };
}

export function GalleryPage({ locale }: GalleryPageProps) {
  const section = getLocaleContent(locale).gallery;

  return (
    <section className="content-panel gallery-page">
      <div className="section-header-centered">
        <span className="section-kicker">{getLocaleContent(locale).nav.gallery}</span>
        <h1>{section.heading}</h1>
        <p className="intro-text">{section.intro}</p>
      </div>

      <div className="gallery-categories-grid">
        {section.categories.map((category) => (
          <article key={category.id} className="category-card">
            <div className="category-image-wrapper">
              <img src={category.image} alt={category.title} loading="lazy" />
              <div className="category-overlay">
                <Link 
                  to={`${buildLocalizedPath(locale, 'gallery')}/${category.id}`} 
                  className="hero-secondary"
                >
                  {section.labels.viewDetails}
                </Link>
              </div>
            </div>
            <div className="category-content">
              <h2>{category.title}</h2>
              <p>{category.summary}</p>
              <Link 
                to={`${buildLocalizedPath(locale, 'gallery')}/${category.id}`} 
                className="text-link"
              >
                {section.labels.learnMore} →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
