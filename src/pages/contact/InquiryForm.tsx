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
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    trackEvent('contact_form_submit', { locale, source: 'contact-page' });

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(siteConfig.formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setStatus('success');
        setMessage('');
        (event.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('[form-submit-failed]', error);
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <article className="contact-card inquiry-full success-state" ref={ref}>
        <div className="form-feedback success">
          <h3>{assist.formSuccess}</h3>
          <button type="button" className="btn-secondary" onClick={() => setStatus('idle')}>
            {labels.submit}
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className="contact-card inquiry-full" ref={ref}>
      <h3>{title}</h3>
      <p className="hint-text">{hint}</p>

      <form className="inquiry-form-premium" onSubmit={handleSubmit}>
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="serviceType" value="general_inquiry" />

        <div className="form-row">
          <div className="field">
            <label>{labels.name}</label>
            <input type="text" name="name" required disabled={status === 'loading'} />
          </div>
          <div className="field">
            <label>{labels.email}</label>
            <input type="email" name="email" required disabled={status === 'loading'} />
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
            disabled={status === 'loading'}
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn-primary full-width-glow"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? '...' : labels.submit}
        </button>

        {status === 'error' && <p className="form-error-text">{assist.formError}</p>}
      </form>
      <p className="privacy-fine-print">{privacyNotice}</p>
    </article>
  );
});
