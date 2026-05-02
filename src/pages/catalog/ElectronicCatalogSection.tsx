import { Card, DisplayHeading, Eyebrow } from '../../components/ui';
import type { CatalogSubcategory, GalleryLabels } from '../../types';

interface ElectronicCatalogSectionProps {
  labels: GalleryLabels;
  featuredCategories: CatalogSubcategory[];
}

export function ElectronicCatalogSection({ labels, featuredCategories }: ElectronicCatalogSectionProps) {
  return (
    <section className="electronic-catalog-section">
      <header className="electronic-catalog-header" style={{ marginBottom: 'var(--space-3)' }}>
        <Eyebrow>{labels.electronicCatalogTitle}</Eyebrow>
        <DisplayHeading level={2}>{labels.electronicCatalogTitle}</DisplayHeading>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 640, marginTop: 'var(--space-1)' }}>
          {labels.electronicCatalogIntro}
        </p>
      </header>

      <div className="catalog-status-banner">
        <strong>{labels.electronicCatalogStatusTitle}</strong>
        <p>{labels.electronicCatalogStatusBody}</p>
      </div>

      <div className="catalog-grid">
        {featuredCategories.flatMap((category) =>
          category.productCards.slice(0, 2).map((product) => (
            <Card
              key={product.id}
              imageSrc={product.image}
              imageAlt={product.title}
              title={product.title}
              description={product.price}
            />
          ))
        )}
      </div>
    </section>
  );
}
