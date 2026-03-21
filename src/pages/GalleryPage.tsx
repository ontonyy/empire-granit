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

function getExtraGraniteSwatches(locale: Locale): GraniteSwatch[] {
  if (locale === 'ru') {
    return [
      { id: 'ru-extra-light-blue', name: 'Светло-голубой', textureKey: 'light-blue-granite' },
      { id: 'ru-extra-orange', name: 'Оранжевый', textureKey: 'orange-granite' }
    ];
  }

  if (locale === 'et') {
    return [
      { id: 'et-extra-light-blue', name: 'Helesinine', textureKey: 'light-blue-granite' },
      { id: 'et-extra-orange', name: 'Oranž', textureKey: 'orange-granite' }
    ];
  }

  return [
    { id: 'en-extra-light-blue', name: 'Light Blue', textureKey: 'light-blue-granite' },
    { id: 'en-extra-orange', name: 'Orange', textureKey: 'orange-granite' }
  ];
}

function withAdditionalGraniteSwatches(locale: Locale, swatches: GraniteSwatch[]): GraniteSwatch[] {
  const existingKeys = new Set(swatches.map((swatch) => swatch.textureKey));
  return [...swatches, ...getExtraGraniteSwatches(locale).filter((swatch) => !existingKeys.has(swatch.textureKey))];
}

function GranitePreview({
  swatches,
  title,
  locale
}: {
  swatches: GraniteSwatch[];
  title: string;
  locale: Locale;
}) {
  const enrichedSwatches = withAdditionalGraniteSwatches(locale, swatches);
  const [selectedId, setSelectedId] = useState(enrichedSwatches[0]?.id);
  const selectedSwatch = enrichedSwatches.find((swatch) => swatch.id === selectedId) || enrichedSwatches[0];
  const selectedImage = selectedSwatch ? getGraniteTextureImage(selectedSwatch) : undefined;

  return (
    <div className="granite-preview-panel" aria-label={title}>
      <div className="granite-preview-featured">
        {selectedSwatch ? <GraniteSwatchTile swatch={selectedSwatch} className="granite-swatch-featured" /> : null}
        <div className="granite-preview-featured-copy">
          <strong>{selectedSwatch?.name}</strong>
          <span>{title}</span>
        </div>
      </div>

      <div className="granite-preview-selector">
        <div className="granite-preview-selector-grid">
          {enrichedSwatches.map((swatch) => (
            <button
              key={swatch.id}
              type="button"
              className={swatch.id === selectedSwatch?.id ? 'granite-picker active' : 'granite-picker'}
              onClick={() => setSelectedId(swatch.id)}
              aria-pressed={swatch.id === selectedSwatch?.id}
            >
              <GraniteSwatchTile swatch={swatch} />
              <span>{swatch.name}</span>
            </button>
          ))}
        </div>

        {selectedImage ? <img src={selectedImage} alt={selectedSwatch?.name} className="granite-preview-zoom" /> : null}
      </div>
    </div>
  );
}

function CategoryPreview({
  category,
  title,
  locale
}: {
  category: GalleryCategory;
  title: string;
  locale: Locale;
}) {
  if (category.previewMode === 'granite' && category.graniteSwatches?.length) {
    return <GranitePreview swatches={category.graniteSwatches} title={title} locale={locale} />;
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
              <CategoryPreview category={category} title={section.labels.granitePaletteTitle} locale={locale} />
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
