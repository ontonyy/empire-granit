import type { Locale, LocaleContent } from '../../types';
import { getLocaleContent } from '../../content';

export type LayoutUiLabels = LocaleContent['layout'];

export function getLayoutUiLabels(locale: Locale): LayoutUiLabels {
  return getLocaleContent(locale).layout;
}

export const CORE_NAV_KEYS = [
  'home',
  'works',
  'pricing',
  'contact'
] as const;
