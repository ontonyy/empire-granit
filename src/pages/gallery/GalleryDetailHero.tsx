import type { GalleryCategory } from '../../types';

interface GalleryDetailHeroProps {
  category: GalleryCategory;
}

export function GalleryDetailHero({ category }: GalleryDetailHeroProps) {
  return (
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
  );
}
