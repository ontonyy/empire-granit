import { Link } from 'react-router-dom';
import { buildCatalogSubcategoryPath } from '../../routing';
import type { CatalogSubcategory, GalleryLabels, Locale } from '../../types';

interface ElectronicCatalogSectionProps {
  locale: Locale;
  labels: GalleryLabels;
  catalogCategories: CatalogSubcategory[];
  featuredCategories: CatalogSubcategory[];
}

export function ElectronicCatalogSection({
  locale,
  labels,
  catalogCategories,
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
