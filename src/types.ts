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
    heroLabel: string;
    secondaryCta: string;
    featureCards: Array<{ icon: string; title: string; body: string }>;
    trustLabel: string;
    trustMetrics: Array<{ value: string; label: string }>;
    processLabel: string;
    processTitle: string;
    processSteps: Array<{ title: string; body: string }>;
    servicesLabel: string;
    servicesTitle: string;
    services: Array<{ title: string; body: string }>;
    testimonialsLabel: string;
    testimonialsTitle: string;
    testimonials: Array<{ quote: string; author: string; meta: string }>;
  };
  about: {
    heading: string;
    body: string[];
    kicker: string;
    title: string;
    lead: string;
    points: string[];
    metrics: Array<{ value: string; label: string }>;
  };
  pricing: {
    heading: string;
    intro: string;
    tiers: Array<{
      id: string;
      name: string;
      price: number | string;
      bestFor: string;
      features: string[];
      highlighted?: boolean;
      note?: string;
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
    kicker: string;
    intro: string;
    cards: Array<{ title: string; body: string }>;
  };
  faq: {
    heading: string;
    intro: string;
    contactCta: string;
    items: Array<{ question: string; answer: string }>;
  };
  seo: Record<RouteKey, SeoMeta>;
}
