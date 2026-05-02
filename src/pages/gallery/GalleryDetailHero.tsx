import { DisplayHeading, Eyebrow } from '../../components/ui';
import type { GalleryCategory } from '../../types';

interface GalleryDetailHeroProps {
  category: GalleryCategory;
  eyebrow?: string;
}

export function GalleryDetailHero({ category, eyebrow }: GalleryDetailHeroProps) {
  return (
    <div className="gallery-detail-hero is-refined">
      <div className="gallery-detail-copy">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <DisplayHeading level={1}>{category.title}</DisplayHeading>
        <p className="gallery-detail-description">{category.description}</p>
      </div>
      <div className="gallery-detail-visual">
        <img src={category.image} alt={category.title} className="detail-hero-image" />
      </div>
    </div>
  );
}
