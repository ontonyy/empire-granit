import { forwardRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '../../config/site';
import { trackEvent } from '../../lib/analytics';
import type { LocaleContent, Locale } from '../../types';
import type { ContactAssistCopy } from './copy';

type FormLabels = LocaleContent['contact']['formLabels'];

interface ContactFormProps {
  locale: Locale;
  labels: FormLabels;
  assist: ContactAssistCopy;
  title: string;
  hint: string;
  privacyNotice: string;
}

const PHONE_PATTERN = /^[+0-9][0-9\s\-()]{5,}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ContactForm = forwardRef<HTMLDivElement, ContactFormProps>(function ContactForm(
  { locale, labels, assist, title, hint, privacyNotice },
  ref
) {
  const location = useLocation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldError, setFieldError] = useState<{ name?: string; phone?: string; email?: string }>({});

  const expanded =
    name.trim().length >= 2 || phone.trim().length > 0 || email.length > 0 || message.length > 0;

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const packageName = searchParams.get('package');
    if (packageName) {
      setMessage(assist.packageInterestTemplate.replace('{name}', packageName));
      setTimeout(() => {
        if (ref && typeof ref === 'object' && ref.current) {
          ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location.search, assist.packageInterestTemplate, ref]);

  function validate(): boolean {
    const errs: typeof fieldError = {};
    if (name.trim().length < 2) errs.name = assist.errorNameRequired;
    if (!PHONE_PATTERN.test(phone.trim())) errs.phone = assist.errorPhoneInvalid;
    if (email.trim() && !EMAIL_PATTERN.test(email.trim())) errs.email = assist.errorEmailInvalid;
    setFieldError(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    setErrorMsg('');
    trackEvent('contact_form_submit', { locale, source: 'contact-page' });

    const payload = {
      locale,
      serviceType: 'general_inquiry',
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      message: message.trim()
    };

    try {
      const response = await fetch(siteConfig.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setPhone('');
        setEmail('');
        setMessage('');
        setFieldError({});
      } else if (response.status === 429) {
        setStatus('error');
        setErrorMsg(assist.formRateLimit);
      } else {
        setStatus('error');
        setErrorMsg(assist.formError);
      }
    } catch (error) {
      console.error('[contact-submit-failed]', error);
      setStatus('error');
      setErrorMsg(assist.formError);
    }
  }

  if (status === 'success') {
    return (
      <article className="contact-card inquiry-full success-state" ref={ref}>
        <div className="form-feedback success">
          <h3>{assist.formSuccess}</h3>
          <button type="button" className="btn-primary" onClick={() => setStatus('idle')}>
            {assist.sendAnother}
          </button>
        </div>
      </article>
    );
  }

  const loading = status === 'loading';

  return (
    <article className="contact-card inquiry-full" ref={ref}>
      <h3>{title}</h3>
      <p className="hint-text">{hint}</p>

      <form className="inquiry-form-premium" onSubmit={handleSubmit} noValidate>
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="serviceType" value="general_inquiry" />

        <div className="form-row">
          <div className="field">
            <label htmlFor="cf-name">{labels.name}</label>
            <input
              id="cf-name"
              type="text"
              name="name"
              required
              minLength={2}
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              autoComplete="name"
              aria-invalid={!!fieldError.name}
            />
            {fieldError.name && <p className="field-error">{fieldError.name}</p>}
          </div>
          <div className="field">
            <label htmlFor="cf-phone">{labels.phone}</label>
            <input
              id="cf-phone"
              type="tel"
              name="phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={loading}
              autoComplete="tel"
              aria-invalid={!!fieldError.phone}
            />
            {fieldError.phone && <p className="field-error">{fieldError.phone}</p>}
          </div>
        </div>

        <div className={`progressive-fields ${expanded ? 'is-visible' : ''}`} aria-hidden={!expanded}>
          <div className="field">
            <label htmlFor="cf-email">
              {labels.email} <span className="optional-tag">{assist.optionalLabel}</span>
            </label>
            <input
              id="cf-email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              autoComplete="email"
              tabIndex={expanded ? 0 : -1}
              aria-invalid={!!fieldError.email}
            />
            {fieldError.email && <p className="field-error">{fieldError.email}</p>}
          </div>

          <div className="field">
            <label htmlFor="cf-message">
              {labels.message} <span className="optional-tag">{assist.optionalLabel}</span>
            </label>
            <textarea
              id="cf-message"
              name="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
              tabIndex={expanded ? 0 : -1}
            />
          </div>
        </div>

        <button type="submit" className="btn-primary contact-submit" disabled={loading}>
          {loading ? assist.formLoading : labels.submit}
        </button>

        {status === 'error' && (
          <p className="form-error-text" role="alert">
            {errorMsg || assist.formError}
          </p>
        )}
      </form>
      <p className="privacy-fine-print">{privacyNotice}</p>
    </article>
  );
});
