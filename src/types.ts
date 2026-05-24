export type Locale = 'ru' | 'et' | 'en';

export type RouteKey =
  | 'home'
  | 'works'
  | 'pricing'
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
  layout: {
    emergencyPrefix: string;
    footerIntro: string;
    footerNavigation: string;
    footerContacts: string;
    footerAddress: string;
    footerHours: string;
    footerHoursValue: string;
    footerSupport: string;
    aboutAndPrivacy: string;
    mobileMenuOpen: string;
    mobileMenuClose: string;
    call: string;
    primaryNavigation: string;
    languageSwitcher: string;
    locationMap: string;
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
    catalogLabel: string;
    catalogTitle: string;
    catalogLead: string;
    catalogItems: Array<{ title: string; body: string }>;
    catalogCta: string;
    optionsLabel: string;
    optionsTitle: string;
    optionsLead: string;
    options: Array<{ title: string; body: string }>;
    configuratorLabel: string;
    configuratorTitle: string;
    configuratorLead: string;
    configuratorItems: Array<{ title: string; body: string }>;
    configuratorCta: string;
    pricingLabel: string;
    pricingTitle: string;
    pricingLead: string;
    pricingItems: Array<{ label: string; value: string }>;
    areaLabel: string;
    areaTitle: string;
    areaLead: string;
    areaItems: string[];
    faqLabel: string;
    faqTitle: string;
    faqItems: Array<{ question: string; answer: string }>;
    testimonialsLabel: string;
    testimonialsTitle: string;
    testimonials: Array<{ quote: string; author: string; meta: string }>;
    careLabel: string;
    careTitle: string;
    careLead: string;
    careItems: Array<{ title: string; body: string }>;
  };
  about: {
    heading: string;
    body: string[];
    kicker: string;
    title: string;
    lead: string;
    points: string[];
    photoAlt: string;
    area: {
      kicker: string;
      title: string;
      body: string;
      points: string[];
    };
    contact: {
      title: string;
      body: string;
      primary: string;
      secondary: string;
    };
  };
  pricing: {
    heading: string;
    intro: string;
    bottomNote: string;
    includedLabel: string;
    affectsLabel: string;
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
  portfolio: {
    heading: string;
    intro: string;
    labels: {
      eyebrow: string;
      cta: string;
    };
    items: Array<{
      id: string;
      title: string;
      summary: string;
      location: string;
      image: string;
    }>;
  };
  process: {
    eyebrow: string;
    heading: string;
    intro: string;
    ctaTitle: string;
    ctaBody: string;
    ctaLabel: string;
    steps: Array<{
      title: string;
      image: string;
      paragraphs: string[];
    }>;
  };
  preview: {
    eyebrow: string;
    heading: string;
    intro: string;
    sampleName: string;
    sampleDates: string;
    stepper: string[];
    groups: {
      shape: string;
      stone: string;
      finish: string;
      engraving: string;
      addons: string;
    };
    labels: {
      preview: string;
      selected: string;
      polished: string;
      name: string;
      dates: string;
    };
    finishOptions: Array<{ id: 'polished' | 'honed' | 'flamed'; label: string }>;
    letteringOptions: Array<{ id: 'serif' | 'sans' | 'script' | 'caps'; label: string }>;
    addonOptions: {
      vase: string;
      photo: string;
      ornament: string;
      candle: string;
      border: string;
    };
    save: {
      title: string;
      body: string;
      action: string;
      consult: string;
    };
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
    intentTitle: string;
    intentItems: string[];
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
    assist: {
      detailsTitle: string;
      intentTitle: string;
      detailsPhone: string;
      detailsEmail: string;
      whatsappLabel: string;
      inquiryTitle: string;
      inquiryHint: string;
      packageInterestTemplate: string;
      designInterestTemplate: string;
      optionalLabel: string;
      formLoading: string;
      formSuccess: string;
      formError: string;
      formRateLimit: string;
      sendAnother: string;
      modeMessage: string;
      modeCallback: string;
      callbackTitle: string;
      callbackHint: string;
      errorNameRequired: string;
      errorPhoneInvalid: string;
      errorEmailInvalid: string;
      fileLabel: string;
      fileHelper: string;
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
