import type { Locale } from '../../types';
import { getLocaleContent } from '../../content';

export interface ContactAssistCopy {
  detailsTitle: string;
  intentTitle: string;
  detailsPhone: string;
  detailsEmail: string;
  whatsappLabel: string;
  inquiryTitle: string;
  inquiryHint: string;
  packageInterestTemplate: string;
  designInterestTemplate: string;
  optionalLabel: string;
  formLoading: string;
  formSuccess: string;
  formError: string;
  formRateLimit: string;
  sendAnother: string;
  modeMessage: string;
  modeCallback: string;
  callbackTitle: string;
  callbackHint: string;
  errorNameRequired: string;
  errorPhoneInvalid: string;
  errorEmailInvalid: string;
  fileLabel: string;
  fileHelper: string;
}

export function getContactAssistContent(locale: Locale): ContactAssistCopy {
  return getLocaleContent(locale).contact.assist;
}
