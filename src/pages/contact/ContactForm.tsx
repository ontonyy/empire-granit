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
type ContactMode = 'message' | 'callback';

function decodeDesignConfig(value: string | null): string {
  if (!value) {
    return '';
  }

  try {
    return decodeURIComponent(escape(atob(value)));
  } catch {
    return '';
  }
}

export const ContactForm = forwardRef<HTMLDivElement, ContactFormProps>(function ContactForm(
  { locale, labels, assist, title, hint, privacyNotice },
  ref
) {
  const location = useLocation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [mode, setMode] = useState<ContactMode>('message');
  const [designConfig, setDesignConfig] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldError, setFieldError] = useState<{ name?: string; phone?: string; email?: string }>({});

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const packageName = searchParams.get('package');
    const configParam = searchParams.get('config');
    const decodedConfig = decodeDesignConfig(configParam);
    if (decodedConfig) {
      setDesignConfig(decodedConfig);
      setMode('message');
      setMessage((current) => current || assist.designInterestTemplate);
      setTimeout(() => {
        if (ref && typeof ref === 'object' && ref.current) {
          ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
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
    const eventName = mode === 'callback' ? 'callback_request_submit' : 'contact_form_submit';
    trackEvent(eventName, { locale, source: 'contact-page', mode });

    const attachments =
      mode === 'message' ? files.map((f) => ({ name: f.name, size: f.size, type: f.type })) : [];
    const serviceType = mode === 'callback' ? 'callback_request' : 'general_inquiry';
    const payload = {
      locale,
      serviceType,
      formType: serviceType,
      mode,
      name: name.trim(),
      phone: phone.trim(),
      email: mode === 'message' ? email.trim() : '',
      message: mode === 'message' ? message.trim() : '',
      attachments,
      designConfig
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
        setFiles([]);
        setDesignConfig('');
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
  const isMessageMode = mode === 'message';
  const activeTitle = isMessageMode ? title : assist.callbackTitle;
  const activeHint = isMessageMode ? hint : assist.callbackHint;

  function selectMode(nextMode: ContactMode) {
    setMode(nextMode);
    setStatus('idle');
    setErrorMsg('');
    setFieldError({});
    if (nextMode === 'callback') {
      setEmail('');
      setMessage('');
      setFiles([]);
    }
  }

  return (
    <article className="contact-card inquiry-full" ref={ref}>
      <div className="contact-form-header">
        <h3>{activeTitle}</h3>
        <div className="contact-mode-toggle" role="group" aria-label={labels.serviceType}>
          <button
            type="button"
            className={isMessageMode ? 'is-active' : ''}
            aria-pressed={isMessageMode}
            onClick={() => selectMode('message')}
            disabled={loading}
          >
            {assist.modeMessage}
          </button>
          <button
            type="button"
            className={!isMessageMode ? 'is-active' : ''}
            aria-pressed={!isMessageMode}
            onClick={() => selectMode('callback')}
            disabled={loading}
          >
            {assist.modeCallback}
          </button>
        </div>
      </div>
      <p className="hint-text">{activeHint}</p>

      <form className="inquiry-form-premium" onSubmit={handleSubmit} noValidate>
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="serviceType" value={isMessageMode ? 'general_inquiry' : 'callback_request'} />
        <input type="hidden" name="mode" value={mode} />
        <input type="hidden" name="designConfig" value={designConfig} />

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

        {isMessageMode && (
          <>
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
              />
            </div>

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
                aria-invalid={!!fieldError.email}
              />
              {fieldError.email && <p className="field-error">{fieldError.email}</p>}
            </div>

            <div className="field">
              <label htmlFor="cf-files">
                {assist.fileLabel} <span className="optional-tag">{assist.optionalLabel}</span>
              </label>
              <input
                id="cf-files"
                type="file"
                name="files"
                accept="image/*"
                multiple
                className="file-input"
                disabled={loading}
                onChange={(e) => setFiles(e.target.files ? Array.from(e.target.files) : [])}
              />
              <p className="field-help">{assist.fileHelper}</p>
              {files.length > 0 && (
                <ul className="file-list">
                  {files.map((f) => (
                    <li key={f.name}>{f.name}</li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}

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
