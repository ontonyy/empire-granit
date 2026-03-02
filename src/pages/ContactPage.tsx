import { getLocaleContent } from '../content';
import { siteConfig } from '../config/site';
import { trackEvent } from '../lib/analytics';
import type { Locale } from '../types';

interface ContactPageProps {
  locale: Locale;
}

export function ContactPage({ locale }: ContactPageProps) {
  const section = getLocaleContent(locale).contact;
  const serviceOffers = getLocaleContent(locale).services.offers;

  return (
    <section className="content-panel">
      <h1>{section.heading}</h1>
      <p>{section.intro}</p>

      <div className="contact-grid">
        <article className="contact-card">
          <h2>{siteConfig.contacts.company}</h2>
          <p>
            <a
              href={siteConfig.contacts.phoneLink}
              onClick={() => trackEvent('phone_click', { locale, source: 'contact-page' })}
            >
              {siteConfig.contacts.phoneDisplay}
            </a>
          </p>
          <p>
            <a href={`mailto:${siteConfig.contacts.email}`}>{siteConfig.contacts.email}</a>
          </p>
          <p>
            <a
              href={siteConfig.contacts.whatsapp}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('whatsapp_click', { locale, source: 'contact-page' })}
            >
              WhatsApp
            </a>
          </p>
          <p>{siteConfig.contacts.address}</p>
        </article>

        <form
          className="contact-form"
          action={siteConfig.formEndpoint}
          method="POST"
          onSubmit={() => trackEvent('contact_form_submit', { locale })}
        >
          <input type="hidden" name="locale" value={locale} />

          <label className="field">
            <span>{section.formLabels.name}</span>
            <input type="text" name="name" autoComplete="name" required />
          </label>

          <label className="field">
            <span>{section.formLabels.phone}</span>
            <input type="tel" name="phone" autoComplete="tel" required />
          </label>

          <label className="field">
            <span>{section.formLabels.email}</span>
            <input type="email" name="email" autoComplete="email" />
          </label>

          <label className="field">
            <span>{section.formLabels.serviceType}</span>
            <select name="serviceType" required>
              {serviceOffers.map((offer) => (
                <option key={offer.id} value={offer.id}>
                  {offer.title}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>{section.formLabels.message}</span>
            <textarea name="message" rows={4} required />
          </label>

          <input
            type="text"
            name="company"
            className="honeypot"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <label className="consent">
            <input type="checkbox" name="consent" value="true" required />
            <span>{section.consentText}</span>
          </label>

          <p className="privacy-note">{section.privacyNotice}</p>
          <button type="submit">{section.formLabels.submit}</button>
        </form>
      </div>

      <div className="map-wrapper">
        <iframe
          title="Google map"
          src={siteConfig.contacts.mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
