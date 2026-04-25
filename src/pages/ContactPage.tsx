import { useRef } from 'react';
import { getLocaleContent } from '../content';
import { siteConfig } from '../config/site';
import type { Locale } from '../types';
import { CallbackForm } from './contact/CallbackForm';
import { InquiryForm } from './contact/InquiryForm';
import { getContactAssistContent } from './contact/copy';

interface ContactPageProps {
  locale: Locale;
}

export function ContactPage({ locale }: ContactPageProps) {
  const content = getLocaleContent(locale);
  const section = content.contact;
  const assist = getContactAssistContent(locale);
  const inquiryFormRef = useRef<HTMLDivElement>(null);

  const labels = section.formLabels;
  const inquiryTitle = section.inquiryTitle || assist.inquiryTitle;
  const inquiryHint = section.inquiryHint || assist.inquiryHint;

  return (
    <section className="content-panel contact-overhaul reveal-on-scroll is-visible">
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

            <CallbackForm locale={locale} labels={labels} assist={assist} />
          </div>

          <InquiryForm
            ref={inquiryFormRef}
            locale={locale}
            labels={labels}
            assist={assist}
            title={inquiryTitle}
            hint={inquiryHint}
            privacyNotice={section.privacyNotice}
          />
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
