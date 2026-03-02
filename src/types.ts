export type Locale = 'ru' | 'et' | 'en';

export type RouteKey =
  | 'home'
  | 'about'
  | 'services'
  | 'gallery'
  | 'playground'
  | 'contact'
  | 'privacy';

export interface ServiceOffer {
  id: string;
  title: string;
  description: string;
  features: string[];
}

export interface WorkExample {
  id: string;
  title: string;
  image: string;
  category: string;
  summary: string;
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
  services: {
    heading: string;
    intro: string;
    offers: ServiceOffer[];
  };
  gallery: {
    heading: string;
    intro: string;
    works: WorkExample[];
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
    consentText: string;
    privacyNotice: string;
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
