import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/ui';
import { getLocaleContent } from '../content';
import { trackEvent } from '../lib/analytics';
import { buildLocalizedPath } from '../routing';
import type { Locale } from '../types';
import { CatalogSubcategoryPage } from './catalog/CatalogSubcategoryPage';
import { ElectronicCatalogSection } from './catalog/ElectronicCatalogSection';
import { GranitePalette } from './catalog/GranitePalette';
import { GalleryDetailCta } from './gallery/GalleryDetailCta';
import { GalleryDetailHero } from './gallery/GalleryDetailHero';
import { GalleryDetailSections } from './gallery/GalleryDetailSections';

interface GalleryDetailPageProps {
  locale: Locale;
  categoryId?: string;
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
      <Breadcrumb
        items={[
          { label: content.gallery.heading, to: buildLocalizedPath(locale, 'gallery') },
          { label: category.title }
        ]}
      />

      <GalleryDetailHero category={category} eyebrow={content.gallery.heading} />

      {category.graniteSwatches?.length ? (
        <GranitePalette swatches={category.graniteSwatches} title={labels.granitePaletteTitle} locale={locale} />
      ) : null}

      <GalleryDetailSections category={category} labels={labels} />

      <GalleryDetailCta locale={locale} labels={labels} />

      <ElectronicCatalogSection
        labels={labels}
        featuredCategories={featuredCategories.length ? featuredCategories : content.gallery.catalogCategories.slice(0, 3)}
      />
    </article>
  );
}
