import { Card, DisplayHeading } from '../components/ui';
import { getLocaleContent } from '../content';
import { buildCatalogSubcategoryPath, buildLocalizedPath } from '../routing';
import type { GalleryCategory, CatalogSubcategory, Locale } from '../types';
import { GalleryDetailPage } from './GalleryDetailPage';

interface MemorialsPageProps {
  locale: Locale;
  categoryId?: string;
}

type MemorialGridItem = {
  id: string;
  title: string;
  summary: string;
  image: string;
  to: string;
};

function buildMemorialGridItems(
  locale: Locale,
  categories: GalleryCategory[],
  catalogCategories: CatalogSubcategory[]
): MemorialGridItem[] {
  const items = new Map<string, MemorialGridItem>();

  categories.forEach((category) => {
    items.set(category.id, {
      id: category.id,
      title: category.title,
      summary: category.summary,
      image: category.image,
      to: `${buildLocalizedPath(locale, 'memorials')}/${category.id}`
    });
  });

  catalogCategories.forEach((category) => {
    if (items.has(category.id)) {
      return;
    }

    items.set(category.id, {
      id: category.id,
      title: category.title,
      summary: category.summary,
      image: category.image,
      to: buildCatalogSubcategoryPath(locale, category.id)
    });
  });

  return Array.from(items.values()).slice(0, 6);
}

export function MemorialsPage({ locale, categoryId }: MemorialsPageProps) {
  if (categoryId) {
    return <GalleryDetailPage locale={locale} categoryId={categoryId} />;
  }

  const content = getLocaleContent(locale);
  const section = content.gallery;
  const seo = content.seo.memorials;
  const categories = buildMemorialGridItems(locale, section.categories, section.catalogCategories);

  return (
    <main className="content-panel gallery-page catalog-grid-page">
      <header className="page-hero">
        <DisplayHeading level={1}>{content.nav.memorials}</DisplayHeading>
        <p>{seo.description || section.intro}</p>
      </header>

      <section aria-label={section.labels.topCategoriesTitle} className="catalog-grid-section reveal-on-scroll">
        <header className="catalog-grid-section-header">
          <DisplayHeading level={2}>{section.labels.topCategoriesTitle}</DisplayHeading>
          <p>{section.intro}</p>
        </header>
        <div className="catalog-grid">
          {categories.map((category) => (
            <Card
              key={category.id}
              to={category.to}
              imageSrc={category.image}
              imageAlt={category.title}
              title={category.title}
              description={category.summary}
              cta={section.labels.learnMore}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
