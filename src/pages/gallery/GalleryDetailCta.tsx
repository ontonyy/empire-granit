import { Button, DisplayHeading } from '../../components/ui';
import { buildLocalizedPath } from '../../routing';
import type { GalleryLabels, Locale } from '../../types';

interface GalleryDetailCtaProps {
  locale: Locale;
  labels: GalleryLabels;
}

export function GalleryDetailCta({ locale, labels }: GalleryDetailCtaProps) {
  return (
    <section className="detail-cta-refined" aria-labelledby="detail-cta-heading">
      <DisplayHeading level={2} id="detail-cta-heading">
        {labels.ctaHeading}
      </DisplayHeading>
      <p>{labels.ctaBody}</p>
      <Button as="router-link" to={buildLocalizedPath(locale, 'contact')} variant="primary">
        {labels.ctaButton}
      </Button>
    </section>
  );
}
