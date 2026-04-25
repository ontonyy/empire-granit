import { Link } from 'react-router-dom';
import { buildLocalizedPath } from '../../routing';
import type { GalleryLabels, Locale } from '../../types';

interface GalleryDetailCtaProps {
  locale: Locale;
  labels: GalleryLabels;
}

export function GalleryDetailCta({ locale, labels }: GalleryDetailCtaProps) {
  return (
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
  );
}
