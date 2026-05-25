export type Locale = 'ru' | 'et' | 'en';

export type RouteKey =
  | 'home'
  | 'works'
  | 'pricing'
  | 'contact'
  | 'privacy';

export type { SeoMeta } from './types/seo';
export type { ContactInfo, ServiceOffer } from './types/contact';

import type { SeoMeta } from './types/seo';

export interface LocaleContent {
  localeLabel: string;
  nav: Record<RouteKey, string>;
  cta: {
    callNow: string;
    sendInquiry: string;
  };
  layout: {
    aboutAndPrivacy: string;
    mobileMenuOpen: string;
    mobileMenuClose: string;
    call: string;
    primaryNavigation: string;
    languageSwitcher: string;
    locationMap: string;
    navServices: string;
    scrollTop: string;
    footerHours: string;
    footerHoursValue: string;
  };
  homepage: {
    heroLabel: string;
    heroTitle: string;
    heroLead: string;
    highlights: string[];
    secondaryCta: string;
    trustLabel: string;
    trustMetrics: Array<{ value: string; label: string }>;
    intro: string;
    phoneEyebrow: string;
    craftEyebrow: string;
    craftTitle: string;
    servicesShort: Array<{ title: string; body: string }>;
    worksSectionEyebrow: string;
    worksSectionTitle: string;
    pricesEyebrow: string;
    pricesTitle: string;
    pricesTableLink: string;
    finalEyebrow: string;
    finalContactLink: string;
  };
  pricing: {
    heading: string;
    intro: string;
    bottomNote: string;
    includedLabel: string;
    affectsLabel: string;
    factorsBody: string[];
    tiers: Array<{
      id: string;
      name: string;
      price: number | string;
      bestFor: string;
      features: string[];
      note?: string;
    }>;
    cta: string;
  };
  works: {
    eyebrow: string;
    title: string;
    pageLead: string;
    filterLabel: string;
    homeFooterCounter: string;
    viewAllLink: string;
    filters: {
      all: string;
      monuments: string;
      fences: string;
      engravings: string;
      installation: string;
    };
    captionSeparator: string;
    cta: {
      eyebrow: string;
      title: string;
      body: string;
      link: string;
    };
  };
  contact: {
    heading: string;
    intro: string;
    intentItems: string[];
    inquiryTitle?: string;
    privacyNotice: string;
    addressLabel: string;
    formLabels: {
      name: string;
      phone: string;
      email: string;
      serviceType: string;
      message: string;
      submit: string;
    };
    assist: {
      intentTitle: string;
      detailsPhone: string;
      detailsEmail: string;
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
    kicker: string;
    heading: string;
    intro: string;
    cards: Array<{ title: string; body: string }>;
  };
  seo: Record<RouteKey, SeoMeta>;
}
