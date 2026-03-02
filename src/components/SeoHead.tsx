import { Helmet } from 'react-helmet-async';
import { getLocaleContent } from '../content';
import { getSiteUrl, siteConfig } from '../config/site';
import { LOCALES, buildLocalizedPath } from '../routing';
import type { Locale, RouteKey } from '../types';

interface SeoHeadProps {
  locale: Locale;
  routeKey: RouteKey;
}

export function SeoHead({ locale, routeKey }: SeoHeadProps) {
  const content = getLocaleContent(locale);
  const meta = content.seo[routeKey];
  const siteUrl = getSiteUrl();
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
  const canonicalPath = buildLocalizedPath(locale, routeKey);
  const canonical = `${siteUrl}${basePath}${canonicalPath}`;

  return (
    <Helmet htmlAttributes={{ lang: locale }}>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={meta.ogTitle || meta.title} />
      <meta property="og:description" content={meta.ogDescription || meta.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={locale} />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="canonical" href={canonical} />
      {LOCALES.map((altLocale) => {
        const href = `${siteUrl}${basePath}${buildLocalizedPath(altLocale, routeKey)}`;
        return <link key={altLocale} rel="alternate" hrefLang={altLocale} href={href} />;
      })}
      <script type="application/ld+json">
        {JSON.stringify({
          ...siteConfig.localBusiness,
          url: canonical,
          inLanguage: locale
        })}
      </script>
    </Helmet>
  );
}
