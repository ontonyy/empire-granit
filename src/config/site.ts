import type { ContactInfo } from '../types';

export const siteConfig = {
  siteName: 'Empire Granit',
  defaultSiteUrl: 'https://user.github.io/empire-granit',
  contacts: {
    company: 'Empire Granit',
    phoneDisplay: '+372 5811 6373',
    phoneLink: 'tel:+37258116373',
    email: 'ms.pamyatnik@mail.ru',
    whatsapp: 'https://wa.me/37258116373',
    address: 'Pähklimäe 2, Narva',
    mapEmbedUrl:
      'https://www.google.com/maps?q=P%C3%A4hklim%C3%A4e+2,+Narva&output=embed'
  } satisfies ContactInfo,
  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Empire Granit',
    image: 'https://user.github.io/empire-granit/images/hero.jpg',
    telephone: '+37258116373',
    email: 'ms.pamyatnik@mail.ru',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Pähklimäe 2',
      addressLocality: 'Narva',
      addressCountry: 'EE'
    }
  },
  analytics: {
    provider: 'plausible' as 'plausible' | 'umami' | 'none',
    scriptSrc: 'https://plausible.io/js/script.js',
    domain: 'user.github.io'
  },
  formEndpoint: 'https://formspree.io/f/mbdzkngq',
  admin: {
    password: 'empire2024'
  }
};

export function getSiteUrl(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL as string | undefined;
  return (fromEnv || siteConfig.defaultSiteUrl).replace(/\/$/, '');
}
