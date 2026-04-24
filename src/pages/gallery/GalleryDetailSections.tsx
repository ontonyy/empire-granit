import type { GalleryCategory, GalleryLabels } from '../../types';

interface GalleryDetailSectionsProps {
  category: GalleryCategory;
  labels: GalleryLabels;
}

export function GalleryDetailSections({ category, labels }: GalleryDetailSectionsProps) {
  const advantages = category.advantages || category.features;
  const services = category.services || category.options;

  return (
    <div className="gallery-detail-grid">
      {advantages && (
        <section className="detail-section advantages-section">
          <h2 className="cinzel-font">{labels.advantages}</h2>
          <ul className="highlight-list-vertical">
            {advantages.map((item, idx) => (
              <li key={idx} className="highlight-item">
                <span className="bullet">✦</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {services && (
        <section className="detail-section services-section">
          <h2 className="cinzel-font">{labels.services}</h2>
          <div className="services-mini-grid">
            {services.map((service, idx) => (
              <div key={idx} className="service-mini-card">
                <div className="service-dot"></div>
                <p>{service}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
