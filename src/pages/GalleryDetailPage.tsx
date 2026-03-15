import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getLocaleContent } from '../content';
import { trackEvent } from '../lib/analytics';
import { buildLocalizedPath } from '../routing';
import type { Locale } from '../types';

interface GalleryDetailPageProps {
  locale: Locale;
  categoryId?: string;
}

export function GalleryDetailPage({ locale, categoryId }: GalleryDetailPageProps) {
  const content = getLocaleContent(locale);
  const category = content.gallery.categories.find((c) => c.id === categoryId);
  const labels = content.gallery.labels;

  useEffect(() => {
    if (!category) {
      return;
    }

    trackEvent('gallery_category_view', {
      locale,
      category: category.id,
      title: category.title
    });
  }, [category, locale]);

  if (!category) {
    return (
      <div className="content-panel">
        <h1>404</h1>
        <p>Category not found.</p>
        <Link to={buildLocalizedPath(locale, 'gallery')}>{labels.backToGallery}</Link>
      </div>
    );
  }

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
          <img src={category.image} alt={category.title} className="detail-hero-image" />
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
    </article>
  );
}
