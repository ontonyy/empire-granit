import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GraniteSwatchTile, getGraniteTextureImage } from '../components/GraniteSwatchTile';
import { getLocaleContent } from '../content';
import { trackEvent } from '../lib/analytics';
import { buildLocalizedPath } from '../routing';
import type { CatalogSubcategory, GraniteSwatch, Locale } from '../types';

interface GalleryDetailPageProps {
  locale: Locale;
  categoryId?: string;
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

function GranitePalette({
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
    <section className="catalog-granite-showcase">
      <div className="catalog-granite-header">
        <span className="section-kicker">{title}</span>
        <h2>{title}</h2>
      </div>
      <div className="catalog-granite-layout">
        <div className="catalog-granite-grid">
          {enrichedSwatches.map((swatch) => (
            <button
              key={swatch.id}
              type="button"
              className={swatch.id === selectedSwatch?.id ? 'catalog-granite-item active' : 'catalog-granite-item'}
              onClick={() => setSelectedId(swatch.id)}
              aria-pressed={swatch.id === selectedSwatch?.id}
            >
              <GraniteSwatchTile swatch={swatch} />
              <span>{swatch.name}</span>
            </button>
          ))}
        </div>
        <div className="catalog-granite-focus">
          {selectedImage ? <img src={selectedImage} alt={selectedSwatch?.name} className="granite-focus-image" /> : null}
          <strong>{selectedSwatch?.name}</strong>
        </div>
      </div>
    </section>
  );
}

function ElectronicCatalogSection({
  locale,
  labels,
  catalogCategories,
  featuredCategories
}: {
  locale: Locale;
  labels: ReturnType<typeof getLocaleContent>['gallery']['labels'];
  catalogCategories: CatalogSubcategory[];
  featuredCategories: CatalogSubcategory[];
}) {
  return (
    <section className="electronic-catalog-section">
      <div className="section-header-centered electronic-catalog-header">
        <span className="section-kicker">{labels.electronicCatalogTitle}</span>
        <h2>{labels.electronicCatalogTitle}</h2>
        <p>{labels.electronicCatalogIntro}</p>
      </div>

      <div className="catalog-status-banner">
        <strong>{labels.electronicCatalogStatusTitle}</strong>
        <p>{labels.electronicCatalogStatusBody}</p>
      </div>

      <div className="catalog-product-grid">
        {featuredCategories.flatMap((category) =>
          category.productCards.slice(0, 2).map((product) => (
            <article key={product.id} className="catalog-product-card">
              <img src={product.image} alt={product.title} loading="lazy" />
              <div className="catalog-product-copy">
                <strong>{product.title}</strong>
                <span>{product.price}</span>
              </div>
            </article>
          ))
        )}
      </div>

      <div className="catalog-navigation-block">
        <h3>{labels.catalogCategoriesTitle}</h3>
        <div className="catalog-nav-grid">
          {catalogCategories.map((category) => (
            <Link key={category.id} to={buildCatalogSubcategoryPath(locale, category.id)} className="catalog-nav-card">
              <span>{category.title}</span>
              <small>{category.summary}</small>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CatalogSubcategoryPage({
  locale,
  labels,
  category,
  catalogCategories
}: {
  locale: Locale;
  labels: ReturnType<typeof getLocaleContent>['gallery']['labels'];
  category: CatalogSubcategory;
  catalogCategories: CatalogSubcategory[];
}) {
  return (
    <article className="content-panel gallery-detail">
      <nav className="breadcrumb">
        <Link to={buildLocalizedPath(locale, 'gallery')}>← {labels.backToGallery}</Link>
      </nav>

      <div className="gallery-detail-hero">
        <div className="gallery-detail-copy">
          <span className="section-kicker">{labels.electronicCatalogTitle}</span>
          <h1>{category.title}</h1>
          <p className="intro-text">{category.description}</p>
        </div>
        <div className="gallery-detail-visual">
          <img src={category.image} alt={category.title} className="detail-hero-image" />
        </div>
      </div>

      {category.graniteSwatches?.length ? (
        <GranitePalette swatches={category.graniteSwatches} title={labels.granitePaletteTitle} locale={locale} />
      ) : null}

      <section className="electronic-catalog-section catalog-subpage-products">
        <div className="catalog-status-banner">
          <strong>{labels.electronicCatalogStatusTitle}</strong>
          <p>{labels.electronicCatalogStatusBody}</p>
        </div>
        <div className="catalog-product-grid">
          {category.productCards.map((product) => (
            <article key={product.id} className="catalog-product-card">
              <img src={product.image} alt={product.title} loading="lazy" />
              <div className="catalog-product-copy">
                <strong>{product.title}</strong>
                <span>{product.price}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="catalog-navigation-block catalog-navigation-block-spaced">
        <h2>{labels.catalogCategoriesTitle}</h2>
        <div className="catalog-nav-grid">
          {catalogCategories.map((item) => (
            <Link key={item.id} to={buildCatalogSubcategoryPath(locale, item.id)} className="catalog-nav-card">
              <span>{item.title}</span>
              <small>{item.summary}</small>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}

export function GalleryDetailPage({ locale, categoryId }: GalleryDetailPageProps) {
  const content = getLocaleContent(locale);
  const labels = content.gallery.labels;
  const subcatalogId = categoryId?.startsWith('catalog/') ? categoryId.replace(/^catalog\//, '') : undefined;
  const catalogCategory = subcatalogId
    ? content.gallery.catalogCategories.find((item) => item.id === subcatalogId)
    : undefined;
  const category = !subcatalogId ? content.gallery.categories.find((c) => c.id === categoryId) : undefined;

  useEffect(() => {
    if (catalogCategory) {
      trackEvent('gallery_category_view', {
        locale,
        category: `catalog:${catalogCategory.id}`,
        title: catalogCategory.title
      });
      return;
    }

    if (!category) {
      return;
    }

    trackEvent('gallery_category_view', {
      locale,
      category: category.id,
      title: category.title
    });
  }, [catalogCategory, category, locale]);

  if (catalogCategory) {
    return (
      <CatalogSubcategoryPage
        locale={locale}
        labels={labels}
        category={catalogCategory}
        catalogCategories={content.gallery.catalogCategories}
      />
    );
  }

  if (!category) {
    return (
      <div className="content-panel">
        <h1>404</h1>
        <p>Category not found.</p>
        <Link to={buildLocalizedPath(locale, 'gallery')}>{labels.backToGallery}</Link>
      </div>
    );
  }

  const featuredCategories = content.gallery.catalogCategories.filter((item) =>
    category.electronicCatalogFeaturedIds?.includes(item.id)
  );

  return (
    <article className="content-panel gallery-detail">
      <nav className="breadcrumb">
        <Link to={buildLocalizedPath(locale, 'gallery')}>← {labels.backToGallery}</Link>
      </nav>

      <div className="gallery-detail-hero">
        <div className="gallery-detail-copy">
          <span className="section-kicker">{category.title}</span>
          <h1>{category.title}</h1>
          <p className="intro-text">{category.description}</p>
        </div>
        <div className="gallery-detail-visual">
          {category.graniteSwatches?.length ? (
            <div className="detail-granite-hero">
              <GranitePalette swatches={category.graniteSwatches} title={labels.granitePaletteTitle} locale={locale} />
            </div>
          ) : (
            <img src={category.image} alt={category.title} className="detail-hero-image" />
          )}
        </div>
      </div>

      <div className="gallery-detail-grid">
        {(category.advantages || category.features) && (
          <section className="detail-section advantages-section">
            <h2 className="cinzel-font">{labels.advantages}</h2>
            <ul className="highlight-list-vertical">
              {(category.advantages || category.features || []).map((item, idx) => (
                <li key={idx} className="highlight-item">
                  <span className="bullet">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {(category.services || category.options) && (
          <section className="detail-section services-section">
            <h2 className="cinzel-font">{labels.services}</h2>
            <div className="services-mini-grid">
              {(category.services || category.options || []).map((service, idx) => (
                <div key={idx} className="service-mini-card">
                  <div className="service-dot"></div>
                  <p>{service}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <section className="detail-cta">
        <div className="cta-banner-mini">
          <h3>{labels.ctaHeading}</h3>
          <p>{labels.ctaBody}</p>
          <div className="cta-group">
            <Link to={buildLocalizedPath(locale, 'contact')} className="hero-primary">
              {labels.ctaButton}
            </Link>
          </div>
        </div>
      </section>

      <ElectronicCatalogSection
        locale={locale}
        labels={labels}
        catalogCategories={content.gallery.catalogCategories}
        featuredCategories={featuredCategories.length ? featuredCategories : content.gallery.catalogCategories.slice(0, 3)}
      />
    </article>
  );
}
