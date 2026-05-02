export interface GalleryCategory {
  id: string;
  title: string;
  image: string;
  summary: string;
  description: string;
  previewMode?: 'image' | 'granite';
  graniteSwatches?: GraniteSwatch[];
  electronicCatalogFeaturedIds?: string[];
  advantages?: string[];
  options?: string[];
  features?: string[];
  services?: string[];
}

export interface GraniteSwatch {
  id: string;
  name: string;
  textureKey: string;
}

export interface CatalogProductCard {
  id: string;
  title: string;
  image: string;
  price: string;
}

export interface CatalogSubcategory {
  id: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  productCards: CatalogProductCard[];
  graniteSwatches?: GraniteSwatch[];
}

export interface GalleryLabels {
  viewDetails: string;
  learnMore: string;
  backToGallery: string;
  advantages: string;
  services: string;
  ctaHeading: string;
  ctaBody: string;
  ctaButton: string;
  electronicCatalogTitle: string;
  electronicCatalogIntro: string;
  electronicCatalogStatusTitle: string;
  electronicCatalogStatusBody: string;
  catalogCategoriesTitle: string;
  openCatalog: string;
  requestSimilar: string;
  readyWorksTitle: string;
  readyWorksBody: string;
  granitePaletteTitle: string;
  topCategoriesTitle: string;
}
