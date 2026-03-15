import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getLocaleContent } from '../content';
import { siteConfig } from '../config/site';
import { trackEvent } from '../lib/analytics';
import type { Locale } from '../types';

interface ContactPageProps {
  locale: Locale;
}

function getContactAssistContent(locale: Locale) {
  if (locale === 'ru') {
    return {
      detailsTitle: 'Свяжитесь с нами',
      detailsPhone: 'Телефон',
      detailsEmail: 'E-mail',
      callbackTitle: 'Круглосуточный звонок',
      callbackHint: 'Оставьте номер, и мы перезвоним вам.',
      callbackButton: 'Жду звонка',
      inquiryTitle: 'Задать вопрос',
      inquiryHint: 'Оставьте сообщение или задайте вопрос.',
      inquiryButton: 'Отправить',
      packageInterestTemplate: 'Здравствуйте! Я заинтересован в пакете "{name}". Пожалуйста, расскажите подробнее.'
    };
  }

  if (locale === 'et') {
    return {
      detailsTitle: 'Võta ühendust',
      detailsPhone: 'Telefon',
      detailsEmail: 'E-post',
      callbackTitle: 'Tagasihelistamine',
      callbackHint: 'Jätke oma number ja me helistame teile.',
      callbackButton: 'Telli kõne',
      inquiryTitle: 'Saada päring',
      inquiryHint: 'Esitage küsimus või kirjeldage oma soove.',
      inquiryButton: 'Saada',
      packageInterestTemplate: 'Tere! Olen huvitatud "{name}" paketist. Palun saata täpsemat infot.'
    };
  }

  return {
    detailsTitle: 'Get in Touch',
    detailsPhone: 'Phone',
    detailsEmail: 'E-mail',
    callbackTitle: 'Request a Callback',
    callbackHint: 'Leave your details and we will reach out.',
    callbackButton: 'Submit Request',
    inquiryTitle: 'Send Inquiry',
    inquiryHint: 'Have a specific question or request?',
    inquiryButton: 'Send Message',
    packageInterestTemplate: 'Hello! I am interested in the "{name}" package. Please provide more details.'
  };
}

export function ContactPage({ locale }: ContactPageProps) {
  const content = getLocaleContent(locale);
  const section = content.contact;
  const assist = getContactAssistContent(locale);
  const location = useLocation();
  const inquiryFormRef = useRef<HTMLDivElement>(null);

  const [message, setMessage] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const packageName = searchParams.get('package');

    if (packageName) {
      const template = assist.packageInterestTemplate.replace('{name}', packageName);
      setMessage(template);

      // Scroll to inquiry form after a short delay
      setTimeout(() => {
        inquiryFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [location.search, assist.packageInterestTemplate]);

  const labels = section.formLabels;
  const inquiryTitle = section.inquiryTitle || assist.inquiryTitle;
  const inquiryHint = section.inquiryHint || assist.inquiryHint;

  return (
    <section className="content-panel contact-overhaul">
      <div className="contact-hero">
        <h1 className="cinzel-font">{section.heading}</h1>
        <p className="intro-text">{section.intro}</p>
      </div>

      <div className="contact-main-grid">
        <div className="contact-forms-column">
          <div className="contact-grid-top">
            <article className="contact-card details-compact">
              <div className="contact-method">
                <p className="eyebrow">{assist.detailsEmail}</p>
                <a href={`mailto:${siteConfig.contacts.email}`} className="contact-link-premium">
                  {siteConfig.contacts.email}
                </a>
              </div>
              <div className="contact-method">
                <p className="eyebrow">{assist.detailsPhone}</p>
                <a href={siteConfig.contacts.phoneLink} className="contact-link-premium phone-highlight">
                  {siteConfig.contacts.phoneDisplay}
                </a>
              </div>
            </article>

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
          </div>

          <article className="contact-card inquiry-full" ref={inquiryFormRef}>
            <h3>{inquiryTitle}</h3>
            <p className="hint-text">{inquiryHint}</p>

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
            <p className="privacy-fine-print">{section.privacyNotice}</p>
          </article>
        </div>

        <aside className="contact-location-column">
          <article className="contact-card address-card">
            <p className="eyebrow">{section.addressLabel}</p>
            <h2 className="address-text">{siteConfig.contacts.address}</h2>
          </article>

          <div id="map" className="map-frame-container">
            <iframe
              title="Location Map"
              src={siteConfig.contacts.mapEmbedUrl}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </aside>
      </div>
    </section>
  );
}
