import en from './locales/en.json';
import et from './locales/et.json';
import ru from './locales/ru.json';
import type { Locale, LocaleContent } from '../types';

const content: Record<Locale, LocaleContent> = {
  ru: ru as LocaleContent,
  et: et as LocaleContent,
  en: en as LocaleContent
};

function withBaseUrl(path: string): string {
  if (!path.startsWith('/')) {
    return path;
  }

  const base = import.meta.env.BASE_URL || '/';
  return `${base.replace(/\/$/, '')}${path}`;
}

function normalizeLocaleContent(localeContent: LocaleContent): LocaleContent {
  return {
    ...localeContent,
    gallery: {
      ...localeContent.gallery,
      categories: localeContent.gallery.categories.map((category) => ({
        ...category,
        image: withBaseUrl(category.image)
      })),
      catalogCategories: localeContent.gallery.catalogCategories.map((category) => ({
        ...category,
        image: withBaseUrl(category.image),
        productCards: category.productCards.map((product) => ({
          ...product,
          image: withBaseUrl(product.image)
        }))
      })),
      readyWorks: localeContent.gallery.readyWorks.map((item) => ({
        ...item,
        image: withBaseUrl(item.image)
      }))
    }
  };
}

export function getLocaleContent(locale: Locale): LocaleContent {
  return normalizeLocaleContent(content[locale]);
}
