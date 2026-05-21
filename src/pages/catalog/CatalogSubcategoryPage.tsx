import { Card, Breadcrumb, DisplayHeading, Eyebrow } from '../../components/ui';
import { buildLocalizedPath } from '../../routing';
import type { CatalogSubcategory, GalleryLabels, Locale } from '../../types';
import { getLocaleContent } from '../../content';
import { GranitePalette } from './GranitePalette';

interface CatalogSubcategoryPageProps {
  locale: Locale;
  labels: GalleryLabels;
  category: CatalogSubcategory;
}

export function CatalogSubcategoryPage({ locale, labels, category }: CatalogSubcategoryPageProps) {
  const catalogRoot = getLocaleContent(locale).gallery.heading;
  return (
    <article className="content-panel gallery-detail">
      <Breadcrumb
        items={[
          { label: catalogRoot, to: buildLocalizedPath(locale, 'memorials') },
          { label: category.title }
        ]}
      />

      <div className="gallery-detail-hero is-refined">
        <div className="gallery-detail-copy">
          <Eyebrow>{labels.electronicCatalogTitle}</Eyebrow>
          <DisplayHeading level={1}>{category.title}</DisplayHeading>
          <p className="gallery-detail-description">{category.description}</p>
        </div>
        <div className="gallery-detail-visual">
          <img src={category.image} alt={category.title} className="detail-hero-image" />
        </div>
      </div>

      {category.graniteSwatches?.length ? (
        <GranitePalette swatches={category.graniteSwatches} title={labels.granitePaletteTitle} locale={locale} />
      ) : null}

      <section className="catalog-subpage-products">
        <header style={{ marginBottom: 'var(--space-3)' }}>
          <Eyebrow>{labels.electronicCatalogTitle}</Eyebrow>
          <DisplayHeading level={2}>{labels.electronicCatalogTitle}</DisplayHeading>
        </header>
        <div className="catalog-status-banner">
          <strong>{labels.electronicCatalogStatusTitle}</strong>
          <p>{labels.electronicCatalogStatusBody}</p>
        </div>
        <div className="catalog-grid">
          {category.productCards.map((product) => (
            <Card
              key={product.id}
              to={buildLocalizedPath(locale, 'contact')}
              imageSrc={product.image}
              imageAlt={product.title}
              title={product.title}
              description={product.price}
              cta={labels.requestSimilar}
            />
          ))}
        </div>
      </section>
    </article>
  );
}
