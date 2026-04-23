export type Locale = 'ru' | 'et' | 'en';

export type RouteKey =
  | 'home'
  | 'about'
  | 'pricing'
  | 'gallery'
  | 'faq'
  | 'playground'
  | 'contact'
  | 'privacy';

export type {
  GalleryCategory,
  GraniteSwatch,
  CatalogProductCard,
  CatalogSubcategory,
  GalleryLabels
} from './types/gallery';
export type { PlaygroundOption } from './types/playground';
export type { SeoMeta } from './types/seo';
export type { ContactInfo, ServiceOffer } from './types/contact';

import type {
  GalleryCategory,
  GalleryLabels,
  CatalogSubcategory
} from './types/gallery';
import type { PlaygroundOption } from './types/playground';
import type { SeoMeta } from './types/seo';

export interface LocaleContent {
  localeLabel: string;
  nav: Record<RouteKey, string>;
  cta: {
    callNow: string;
    writeWhatsapp: string;
    sendInquiry: string;
  };
  homepage: {
    heroTitle: string;
    heroLead: string;
    highlights: string[];
  };
  about: {
    heading: string;
    body: string[];
  };
  pricing: {
    heading: string;
    intro: string;
    tiers: Array<{
      id: string;
      name: string;
      price: number;
      bestFor: string;
      features: string[];
      highlighted?: boolean;
    }>;
    cta: string;
    benefits: {
      heading: string;
      items: Array<{
        title: string;
        description: string;
      }>;
    };
  };
  gallery: {
    heading: string;
    intro: string;
    labels: GalleryLabels;
    categories: GalleryCategory[];
    catalogCategories: CatalogSubcategory[];
    readyWorks: Array<{
      id: string;
      title: string;
      image: string;
    }>;
  };
  playground: {
    heading: string;
    intro: string;
    options: PlaygroundOption[];
    presets: Array<{
      id: string;
      name: string;
      values: Record<string, string>;
      note: string;
    }>;
    previewTitle: string;
    interactionLabel: string;
  };
  contact: {
    heading: string;
    intro: string;
    inquiryTitle?: string;
    inquiryHint?: string;
    consentText: string;
    privacyNotice: string;
    addressLabel: string;
    directionsTitle: string;
    directionsBody: string;
    formLabels: {
      name: string;
      phone: string;
      email: string;
      serviceType: string;
      message: string;
      consent: string;
      submit: string;
    };
  };
  privacy: {
    heading: string;
    sections: Array<{ title: string; body: string }>;
  };
  seo: Record<RouteKey, SeoMeta>;
}
