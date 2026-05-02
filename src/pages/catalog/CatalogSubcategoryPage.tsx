import { Link } from 'react-router-dom';
import { buildLocalizedPath } from '../../routing';
import type { CatalogSubcategory, GalleryLabels, Locale } from '../../types';
import { GranitePalette } from './GranitePalette';

interface CatalogSubcategoryPageProps {
  locale: Locale;
  labels: GalleryLabels;
  category: CatalogSubcategory;
}

export function CatalogSubcategoryPage({
  locale,
  labels,
  category
}: CatalogSubcategoryPageProps) {
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
                <Link to={buildLocalizedPath(locale, 'contact')} className="catalog-product-request">
                  {labels.requestSimilar}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
}
