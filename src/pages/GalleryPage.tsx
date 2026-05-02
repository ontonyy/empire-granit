import { Link } from 'react-router-dom';
import { GraniteSwatchTile } from '../components/GraniteSwatchTile';
import { getLocaleContent } from '../content';
import { buildCatalogSubcategoryPath, buildLocalizedPath } from '../routing';
import type { Locale } from '../types';

interface GalleryPageProps {
  locale: Locale;
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
          <Link key={category.id} to={`${buildLocalizedPath(locale, 'gallery')}/${category.id}`} className="category-card">
            <div className="category-image-wrapper">
              <div className="category-visual-stage">
                <img src={category.image} alt={category.title} loading="lazy" />
              </div>
              {category.graniteSwatches?.length ? (
                <div className="category-granite-preview" aria-label={category.title}>
                  {category.graniteSwatches.slice(0, 6).map((swatch) => (
                    <GraniteSwatchTile key={swatch.id} swatch={swatch} className="category-granite-tile" />
                  ))}
                </div>
              ) : null}
            </div>
            <div className="category-content">
              <h2>{category.title}</h2>
              <p>{category.summary}</p>
              <span className="text-link">
                {section.labels.learnMore} →
              </span>
              <span className="category-request-link">
                {section.labels.requestSimilar}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <section className="catalog-navigation-block catalog-navigation-block-spaced reveal-on-scroll">
        <h2>{section.labels.catalogCategoriesTitle}</h2>
        <div className="catalog-nav-grid">
          {section.catalogCategories.map((category) => (
            <Link key={category.id} to={buildCatalogSubcategoryPath(locale, category.id)} className="catalog-nav-card">
              <span>{category.title}</span>
              <small>{category.summary}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="catalog-ready-works reveal-on-scroll">
        <div className="catalog-ready-works-header">
          <span className="section-kicker">{section.labels.readyWorksTitle}</span>
          <h2>{section.labels.readyWorksTitle}</h2>
          <p>{section.labels.readyWorksBody}</p>
        </div>
        <div className="ready-works-carousel" role="region" aria-label={section.labels.readyWorksTitle}>
          {section.readyWorks.map((work) => (
            <Link key={work.id} to={buildCatalogSubcategoryPath(locale, 'monuments')} className="ready-work-card">
              <img src={work.image} alt={work.title} loading="lazy" />
              <div className="ready-work-copy">
                <strong>{work.title}</strong>
                <span className="text-link">
                  {section.labels.openCatalog} →
                </span>
                <span className="ready-work-request">{section.labels.requestSimilar}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
}
