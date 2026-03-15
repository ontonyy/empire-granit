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

export interface ServiceOffer {
  id: string;
  title: string;
  description: string;
  features: string[];
}

export interface GalleryCategory {
  id: string;
  title: string;
  image: string;
  summary: string;
  description: string;
  advantages?: string[];
  options?: string[];
  features?: string[];
  services?: string[];
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
}

export interface PlaygroundOption {
  id: string;
  label: string;
  values: string[];
}

export interface ContactInfo {
  company: string;
  phoneDisplay: string;
  phoneLink: string;
  email: string;
  whatsapp: string;
  address: string;
  mapEmbedUrl: string;
}

export interface SeoMeta {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
}

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
