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
  privacyNotice: string;
}

const PHONE_PATTERN = /^[+0-9][0-9\s\-()]{5,}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FILE_BYTES = 5 * 1024 * 1024;
type ContactMode = 'message' | 'callback';

function decodeDesignConfig(value: string | null): string {
  if (!value) return '';
  try {
    return decodeURIComponent(escape(atob(value)));
  } catch {
    return '';
  }
}

export const ContactForm = forwardRef<HTMLDivElement, ContactFormProps>(function ContactForm(
  { locale, labels, assist, privacyNotice },
  ref
) {
  const location = useLocation();
  const [mode, setMode] = useState<ContactMode>('message');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [bestTime, setBestTime] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [designConfig, setDesignConfig] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldError, setFieldError] = useState<{ name?: string; phone?: string; email?: string; files?: string }>({});

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
  }, [location.search, assist.packageInterestTemplate, assist.designInterestTemplate, ref]);

  function validate(): boolean {
    const errs: typeof fieldError = {};
    if (name.trim().length < 2) errs.name = assist.errorNameRequired;
    if (!PHONE_PATTERN.test(phone.trim())) errs.phone = assist.errorPhoneInvalid;
    if (mode === 'message' && email.trim() && !EMAIL_PATTERN.test(email.trim())) {
      errs.email = assist.errorEmailInvalid;
    }
    if (mode === 'message' && files.some((f) => f.size > MAX_FILE_BYTES)) {
      errs.files = assist.fileHelper;
    }
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
      name: name.trim(),
      phone: phone.trim(),
      email: mode === 'message' ? email.trim() : '',
      message: mode === 'message' ? message.trim() : '',
      meta: {
        kind: mode,
        bestTime: mode === 'callback' ? bestTime.trim() : '',
        attachments,
        designConfig
      }
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
        setBestTime('');
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

  const loading = status === 'loading';
  const isMessageMode = mode === 'message';

  function selectMode(nextMode: ContactMode) {
    setMode(nextMode);
    setStatus('idle');
    setErrorMsg('');
    setFieldError({});
    if (nextMode === 'callback') {
      setEmail('');
      setMessage('');
      setFiles([]);
    } else {
      setBestTime('');
    }
  }

  if (status === 'success') {
    return (
      <div className="contact-n3__form-wrap" ref={ref}>
        <div className="contact-n3__success" role="status" aria-live="polite">
          <h3>{assist.formSuccess}</h3>
          <button type="button" className="btn-primary contact-n3__submit" onClick={() => setStatus('idle')}>
            {assist.sendAnother}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-n3__form-wrap" ref={ref}>
      <div className="contact-n3__segmented" role="tablist" aria-label={labels.serviceType}>
        <button
          type="button"
          role="tab"
          aria-selected={isMessageMode}
          className={isMessageMode ? 'is-active' : ''}
          onClick={() => selectMode('message')}
          disabled={loading}
        >
          {assist.modeMessage}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={!isMessageMode}
          className={!isMessageMode ? 'is-active' : ''}
          onClick={() => selectMode('callback')}
          disabled={loading}
        >
          {assist.modeCallback}
        </button>
      </div>

      <form className="contact-n3__form" onSubmit={handleSubmit} noValidate>
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
            aria-describedby={fieldError.name ? 'cf-name-err' : undefined}
          />
          {fieldError.name && <p id="cf-name-err" className="field-error">{fieldError.name}</p>}
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
            aria-describedby={fieldError.phone ? 'cf-phone-err' : undefined}
          />
          {fieldError.phone && <p id="cf-phone-err" className="field-error">{fieldError.phone}</p>}
        </div>

        {isMessageMode ? (
          <>
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
                aria-describedby={fieldError.email ? 'cf-email-err' : undefined}
              />
              {fieldError.email && <p id="cf-email-err" className="field-error">{fieldError.email}</p>}
            </div>

            <div className="field">
              <label htmlFor="cf-message">{labels.message}</label>
              <textarea
                id="cf-message"
                name="message"
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={loading}
              />
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
                className="file-input"
                disabled={loading}
                onChange={(e) => setFiles(e.target.files ? Array.from(e.target.files) : [])}
                aria-describedby={fieldError.files ? 'cf-files-err' : 'cf-files-help'}
              />
              <p id="cf-files-help" className="field-help">{assist.fileHelper}</p>
              {fieldError.files && <p id="cf-files-err" className="field-error">{fieldError.files}</p>}
              {files.length > 0 && (
                <ul className="file-list">
                  {files.map((f) => (
                    <li key={f.name}>{f.name}</li>
                  ))}
                </ul>
              )}
            </div>
          </>
        ) : (
          <div className="field">
            <label htmlFor="cf-best-time">
              {assist.callbackBestTime} <span className="optional-tag">{assist.optionalLabel}</span>
            </label>
            <input
              id="cf-best-time"
              type="text"
              name="bestTime"
              value={bestTime}
              onChange={(e) => setBestTime(e.target.value)}
              disabled={loading}
            />
          </div>
        )}

        <div className="contact-n3__live" role="status" aria-live="polite">
          {status === 'error' && (errorMsg || assist.formError)}
        </div>

        <button type="submit" className="btn-primary contact-n3__submit" disabled={loading}>
          {loading ? assist.formLoading : labels.submit}
        </button>
      </form>
      <p className="privacy-fine-print">{privacyNotice}</p>
    </div>
  );
});
