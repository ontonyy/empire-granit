import type { ContactInfo } from '../types';

export const siteConfig = {
  siteName: 'Empire Granit',
  defaultSiteUrl: 'https://user.github.io/empire-granit',
  contacts: {
    company: 'Empire Granit',
    phoneDisplay: '+372 5555 5555',
    phoneLink: 'tel:+37255555555',
    email: 'info@empiregranit.ee',
    whatsapp: 'https://wa.me/37255555555',
    address: 'Pargi 12, Tallinn, Estonia',
    mapEmbedUrl:
      'https://www.google.com/maps?q=Tallinn&output=embed'
  } satisfies ContactInfo,
  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Empire Granit',
    image: 'https://user.github.io/empire-granit/images/hero.jpg',
    telephone: '+37255555555',
    email: 'info@empiregranit.ee',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Pargi 12',
      addressLocality: 'Tallinn',
      postalCode: '10111',
      addressCountry: 'EE'
    }
  },
  analytics: {
    provider: 'plausible' as 'plausible' | 'umami' | 'none',
    scriptSrc: 'https://plausible.io/js/script.js',
    domain: 'user.github.io'
  },
  formEndpoint: 'https://formspree.io/f/your-form-id'
};

export function getSiteUrl(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL as string | undefined;
  return (fromEnv || siteConfig.defaultSiteUrl).replace(/\/$/, '');
}
