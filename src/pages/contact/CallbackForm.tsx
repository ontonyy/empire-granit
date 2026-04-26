import { useState } from 'react';
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
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    trackEvent('callback_request_submit', { locale, source: 'contact-page' });

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
        (event.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('[callback-submit-failed]', error);
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <article className="contact-card form-minimal success-state">
        <div className="form-feedback success">
          <p>{assist.formSuccess}</p>
          <button type="button" className="btn-link" onClick={() => setStatus('idle')}>
            {assist.callbackButton}
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className="contact-card form-minimal">
      <h3>{assist.callbackTitle}</h3>
      <p className="hint-small">{assist.callbackHint}</p>
      <form className="callback-form-clean" onSubmit={handleSubmit}>
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="serviceType" value="callback_request" />
        <input
          type="text"
          name="name"
          placeholder={labels.name}
          required
          disabled={status === 'loading'}
        />
        <input
          type="tel"
          name="phone"
          placeholder={labels.phone}
          required
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          className="btn-primary-small"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? '...' : assist.callbackButton}
        </button>
        {status === 'error' && <p className="form-error-text-small">{assist.formError}</p>}
      </form>
    </article>
  );
}
