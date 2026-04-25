import { forwardRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '../../config/site';
import { trackEvent } from '../../lib/analytics';
import type { LocaleContent, Locale } from '../../types';
import type { ContactAssistCopy } from './copy';

type FormLabels = LocaleContent['contact']['formLabels'];

interface InquiryFormProps {
  locale: Locale;
  labels: FormLabels;
  assist: ContactAssistCopy;
  title: string;
  hint: string;
  privacyNotice: string;
}

export const InquiryForm = forwardRef<HTMLDivElement, InquiryFormProps>(function InquiryForm(
  { locale, labels, assist, title, hint, privacyNotice },
  ref
) {
  const location = useLocation();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const packageName = searchParams.get('package');

    if (packageName) {
      const template = assist.packageInterestTemplate.replace('{name}', packageName);
      setMessage(template);

      setTimeout(() => {
        if (ref && typeof ref === 'object' && ref.current) {
          ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location.search, assist.packageInterestTemplate, ref]);

  return (
    <article className="contact-card inquiry-full" ref={ref}>
      <h3>{title}</h3>
      <p className="hint-text">{hint}</p>

      <form
        className="inquiry-form-premium"
        action={siteConfig.formEndpoint}
        method="POST"
        onSubmit={() => trackEvent('contact_form_submit', { locale, source: 'contact-page' })}
      >
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="serviceType" value="general_inquiry" />

        <div className="form-row">
          <div className="field">
            <label>{labels.name}</label>
            <input type="text" name="name" required />
          </div>
          <div className="field">
            <label>{labels.email}</label>
            <input type="email" name="email" required />
          </div>
        </div>

        <div className="field">
          <label>{labels.message}</label>
          <textarea
            name="message"
            rows={4}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="btn-primary full-width-glow">
          {labels.submit}
        </button>
      </form>
      <p className="privacy-fine-print">{privacyNotice}</p>
    </article>
  );
});
