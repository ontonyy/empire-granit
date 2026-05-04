import { Link } from 'react-router-dom';
import { Card, DisplayHeading, Eyebrow } from '../components/ui';
import { getLocaleContent } from '../content';
import { buildCatalogSubcategoryPath, buildLocalizedPath } from '../routing';
import type { Locale } from '../types';

interface GalleryPageProps {
  locale: Locale;
}

export function GalleryPage({ locale }: GalleryPageProps) {
  const section = getLocaleContent(locale).gallery;
  const navLabel = getLocaleContent(locale).nav.gallery;

  return (
    <main className="content-panel gallery-page catalog-grid-page">
      <header className="catalog-grid-header">
        <Eyebrow>{navLabel}</Eyebrow>
        <DisplayHeading level={1}>{section.heading}</DisplayHeading>
        <p className="catalog-grid-intro">{section.intro}</p>
      </header>

      <section aria-label={section.labels.topCategoriesTitle} className="catalog-grid-section reveal-on-scroll">
        <header className="catalog-grid-section-header">
          <Eyebrow>{section.labels.topCategoriesTitle}</Eyebrow>
        </header>
        <div className="catalog-grid">
          {section.categories.map((category) => (
            <Card
              key={category.id}
              to={`${buildLocalizedPath(locale, 'gallery')}/${category.id}`}
              imageSrc={category.image}
              imageAlt={category.title}
              title={category.title}
              description={category.summary}
              cta={section.labels.learnMore}
            />
          ))}
        </div>
      </section>

      <section className="catalog-navigation-block reveal-on-scroll">
        <Eyebrow>{section.labels.catalogCategoriesTitle}</Eyebrow>
        <DisplayHeading level={2}>{section.labels.catalogCategoriesTitle}</DisplayHeading>
        <div className="catalog-nav-grid">
          {section.catalogCategories.map((category) => (
            <Link key={category.id} to={buildCatalogSubcategoryPath(locale, category.id)} className="catalog-nav-card">
              <span className="catalog-nav-thumb" aria-hidden="true">
                <img src={category.image} alt="" loading="lazy" />
              </span>
              <span className="catalog-nav-copy">
                <span className="catalog-nav-title">{category.title}</span>
                <small>{category.summary}</small>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="catalog-ready-works reveal-on-scroll">
        <header className="catalog-ready-works-header">
          <Eyebrow>{section.labels.readyWorksTitle}</Eyebrow>
          <DisplayHeading level={2}>{section.labels.readyWorksTitle}</DisplayHeading>
          <p>{section.labels.readyWorksBody}</p>
        </header>
        <div className="ready-works-carousel" role="region" aria-label={section.labels.readyWorksTitle}>
          {section.readyWorks.map((work) => (
            <Link key={work.id} to={buildCatalogSubcategoryPath(locale, 'monuments')} className="ready-work-card">
              <img src={work.image} alt={work.title} loading="lazy" />
              <div className="ready-work-copy">
                <strong>{work.title}</strong>
                <span className="text-link">{section.labels.openCatalog} →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
