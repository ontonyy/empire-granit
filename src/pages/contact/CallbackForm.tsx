import { siteConfig } from '../../config/site';
import { trackEvent } from '../../lib/analytics';
import type { LocaleContent, Locale } from '../../types';
import type { ContactAssistCopy } from './copy';

type FormLabels = LocaleContent['contact']['formLabels'];

interface CallbackFormProps {
  locale: Locale;
  labels: FormLabels;
  assist: ContactAssistCopy;
}

export function CallbackForm({ locale, labels, assist }: CallbackFormProps) {
  return (
    <article className="contact-card form-minimal">
      <h3>{assist.callbackTitle}</h3>
      <p className="hint-small">{assist.callbackHint}</p>
      <form
        className="callback-form-clean"
        action={siteConfig.formEndpoint}
        method="POST"
        onSubmit={() => trackEvent('callback_request_submit', { locale, source: 'contact-page' })}
      >
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="serviceType" value="callback_request" />
        <input type="text" name="name" placeholder={labels.name} required />
        <input type="tel" name="phone" placeholder={labels.phone} required />
        <button type="submit" className="btn-primary-small">{assist.callbackButton}</button>
      </form>
    </article>
  );
}
