import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraniteSwatchTile, getGraniteTextureImage } from '../components/GraniteSwatchTile';
import { getLocaleContent } from '../content';
import { buildLocalizedPath } from '../routing';
import type { GalleryCategory, GraniteSwatch, Locale } from '../types';

interface GalleryPageProps {
  locale: Locale;
}

function buildCatalogSubcategoryPath(locale: Locale, subcategoryId: string) {
  return `${buildLocalizedPath(locale, 'gallery')}/catalog/${subcategoryId}`;
}

function GraniteCategoryPreview({
  swatches,
  paletteTitle
}: {
  swatches: GraniteSwatch[];
  paletteTitle: string;
}) {
  const [selectedId, setSelectedId] = useState(swatches[0]?.id);
  const selectedSwatch = swatches.find((swatch) => swatch.id === selectedId) || swatches[0];
  const selectedImage = selectedSwatch ? getGraniteTextureImage(selectedSwatch) : undefined;

  return (
    <div className="catalog-card-granite-preview" aria-label={paletteTitle}>
      <div className="catalog-card-granite-focus">
        {selectedImage ? <img src={selectedImage} alt={selectedSwatch?.name} loading="lazy" /> : null}
        <div className="catalog-card-granite-badge">
          <span className="catalog-card-granite-label">{paletteTitle}</span>
          <strong>{selectedSwatch?.name}</strong>
        </div>
      </div>

      <div className="catalog-card-granite-swatches">
        {swatches.map((swatch) => (
          <button
            key={swatch.id}
            type="button"
            className={swatch.id === selectedSwatch?.id ? 'catalog-card-swatch active' : 'catalog-card-swatch'}
            onClick={() => setSelectedId(swatch.id)}
            aria-pressed={swatch.id === selectedSwatch?.id}
            title={swatch.name}
          >
            <GraniteSwatchTile swatch={swatch} className="catalog-card-swatch-media" />
          </button>
        ))}
      </div>
    </div>
  );
}

function CategoryMedia({
  category,
  paletteTitle
}: {
  category: GalleryCategory;
  paletteTitle: string;
}) {
  if (category.previewMode === 'granite' && category.graniteSwatches?.length) {
    return <GraniteCategoryPreview swatches={category.graniteSwatches} paletteTitle={paletteTitle} />;
  }

  return <img src={category.image} alt={category.title} loading="lazy" />;
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
              <CategoryMedia category={category} paletteTitle={section.labels.granitePaletteTitle} />
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
