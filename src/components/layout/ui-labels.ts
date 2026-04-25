import type { Locale } from '../../types';

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
}

export function getLayoutUiLabels(locale: Locale): LayoutUiLabels {
  if (locale === 'ru') {
    return {
      emergencyPrefix: '',
      footerIntro: 'Памятники, установка и помощь с выбором по всей Эстонии.',
      footerNavigation: 'Разделы',
      footerContacts: 'Контакты',
      footerAddress: 'Адрес',
      footerHours: 'Режим работы',
      footerHoursValue: 'Пн-Пт 09:00-18:00, Сб 10:00-15:00',
      footerSupport: 'Быстрая связь',
      aboutAndPrivacy: 'О компании и политика'
    };
  }

  if (locale === 'et') {
    return {
      emergencyPrefix: '',
      footerIntro: 'Monumendid, paigaldus ja rahulik nõustamine üle Eesti.',
      footerNavigation: 'Lehed',
      footerContacts: 'Kontakt',
      footerAddress: 'Aadress',
      footerHours: 'Lahtiolekuajad',
      footerHoursValue: 'E-R 09:00-18:00, L 10:00-15:00',
      footerSupport: 'Kiire kontakt',
      aboutAndPrivacy: 'Ettevõttest ja privaatsus'
    };
  }

  return {
    emergencyPrefix: '',
    footerIntro: 'Granite memorials, installation and calm guidance across Estonia.',
    footerNavigation: 'Pages',
    footerContacts: 'Contacts',
    footerAddress: 'Address',
    footerHours: 'Working hours',
    footerHoursValue: 'Mon-Fri 09:00-18:00, Sat 10:00-15:00',
    footerSupport: 'Quick contact',
    aboutAndPrivacy: 'About and privacy'
  };
}

export const CORE_NAV_KEYS = ['home', 'pricing', 'gallery', 'faq', 'contact'] as const;
