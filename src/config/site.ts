import type { ContactInfo } from '../types';

export const siteConfig = {
  siteName: 'Empire Granit',
  defaultSiteUrl: 'https://empire-granit.ee',
  contacts: {
    company: 'Empire Granit',
    phoneDisplay: '+372 5811 6373',
    phoneLink: 'tel:+37258116373',
    email: 'ms.pamyatnik@mail.ru',
    whatsapp: 'https://wa.me/37258116373',
    address: 'Pähklimäe 2, Narva',
    mapEmbedUrl:
      'https://www.google.com/maps?q=P%C3%A4hklim%C3%A4e+2,+Narva,+Estonia&output=embed&z=17'
  } satisfies ContactInfo,
  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Empire Granit',
    image: 'https://empire-granit.ee/images/logo.png',
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
    domain: import.meta.env.VITE_ANALYTICS_DOMAIN || 'empire-granit.ee'
  },
  formEndpoint: 'https://formspree.io/f/mbdzkngq',
  admin: {
    password: import.meta.env.VITE_ADMIN_PASSWORD || 'empire2024'
  }
};

export function getSiteUrl(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL as string | undefined;
  // Fallback to production domain if no env variable is set
  return (fromEnv || 'https://empire-granit.ee').replace(/\/$/, '');
}
