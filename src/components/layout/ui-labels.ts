import type { Locale } from '../../types';
import { getLocaleContent } from '../../content';

export interface LayoutUiLabels {
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
  navServices: string;
  scrollTop: string;
}

export function getLayoutUiLabels(locale: Locale): LayoutUiLabels {
  return getLocaleContent(locale).layout;
}

export const CORE_NAV_KEYS = [
  'home',
  'works',
  'pricing',
  'contact'
] as const;
