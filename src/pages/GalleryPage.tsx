import { Link } from 'react-router-dom';
import { getLocaleContent } from '../content';
import { buildLocalizedPath } from '../routing';
import type { Locale } from '../types';

interface GalleryPageProps {
  locale: Locale;
}

function buildCatalogSubcategoryPath(locale: Locale, subcategoryId: string) {
  return `${buildLocalizedPath(locale, 'gallery')}/catalog/${subcategoryId}`;
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
                <Link to={`${buildLocalizedPath(locale, 'gallery')}/${category.id}`} className="hero-secondary">
                  {section.labels.viewDetails}
                </Link>
              </div>
            </div>
            <div className="category-content">
              <h2>{category.title}</h2>
              <p>{category.summary}</p>
              <Link to={`${buildLocalizedPath(locale, 'gallery')}/${category.id}`} className="text-link">
                {section.labels.learnMore} →
              </Link>
            </div>
          </article>
        ))}
      </div>

      <section className="catalog-ready-works reveal-on-scroll">
        <div className="catalog-ready-works-header">
          <span className="section-kicker">{section.labels.readyWorksTitle}</span>
          <h2>{section.labels.readyWorksTitle}</h2>
          <p>{section.labels.readyWorksBody}</p>
        </div>
        <div className="ready-works-carousel" role="region" aria-label={section.labels.readyWorksTitle}>
          {section.readyWorks.map((work) => (
            <article key={work.id} className="ready-work-card">
              <img src={work.image} alt={work.title} loading="lazy" />
              <div className="ready-work-copy">
                <strong>{work.title}</strong>
                <Link to={buildCatalogSubcategoryPath(locale, 'monuments')} className="text-link">
                  {section.labels.openCatalog} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
