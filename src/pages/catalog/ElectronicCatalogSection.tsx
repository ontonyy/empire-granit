import type { CatalogSubcategory, GalleryLabels } from '../../types';

interface ElectronicCatalogSectionProps {
  labels: GalleryLabels;
  featuredCategories: CatalogSubcategory[];
}

export function ElectronicCatalogSection({
  labels,
  featuredCategories
}: ElectronicCatalogSectionProps) {
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
    </section>
  );
}
