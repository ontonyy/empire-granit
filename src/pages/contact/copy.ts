import type { Locale, LocaleContent } from '../../types';
import { getLocaleContent } from '../../content';

export type ContactAssistCopy = LocaleContent['contact']['assist'];

export function getContactAssistContent(locale: Locale): ContactAssistCopy {
  return getLocaleContent(locale).contact.assist;
}
