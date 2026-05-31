import type { ContactInfo } from '../types';

export const siteConfig = {
  siteName: 'Empire Granit',
  defaultSiteUrl: 'https://empiregranit.ee',
  contacts: {
    company: 'Empire Granit',
    phoneDisplay: '+372 5811 6373',
    phoneLink: 'tel:+37258116373',
    email: 'ms.pamyatnik@mail.ru',
    whatsapp: 'https://wa.me/37258116373',
    address: 'Pähklimäe 6, Narva',
    mapEmbedUrl:
      'https://www.google.com/maps?q=Empire+Granit%2C+P%C3%A4hklim%C3%A4e+6%2C+Narva&output=embed&z=17'
  } satisfies ContactInfo,
  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Empire Granit',
    image: 'https://empiregranit.ee/images/logo.png',
    telephone: '+37258116373',
    email: 'ms.pamyatnik@mail.ru',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Pähklimäe 6',
      addressLocality: 'Narva',
      addressCountry: 'EE'
    }
  },
  analytics: {
    provider: 'plausible' as 'plausible' | 'umami' | 'none',
    scriptSrc: 'https://plausible.io/js/script.js',
    domain: import.meta.env.VITE_ANALYTICS_DOMAIN || 'empiregranit.ee'
  },
  formEndpoint: 'https://formspree.io/f/mbdzkngq',
  admin: {
    password: import.meta.env.VITE_ADMIN_PASSWORD || 'empire2024'
  }
};

export function getSiteUrl(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL as string | undefined;
  // Fallback to production domain if no env variable is set
  return (fromEnv || 'https://empiregranit.ee').replace(/\/$/, '');
}
