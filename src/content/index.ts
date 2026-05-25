import en from './locales/en.json';
import et from './locales/et.json';
import ru from './locales/ru.json';
import type { Locale, LocaleContent } from '../types';

const content: Record<Locale, LocaleContent> = {
  ru: ru as unknown as LocaleContent,
  et: et as unknown as LocaleContent,
  en: en as unknown as LocaleContent
};

export function getLocaleContent(locale: Locale): LocaleContent {
  return content[locale];
}
