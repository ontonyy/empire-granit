import { useRef } from 'react';
import { getLocaleContent } from '../content';
import { siteConfig } from '../config/site';
import type { Locale } from '../types';
import { ContactForm } from './contact/ContactForm';
import { getContactAssistContent } from './contact/copy';
import { WorkshopMap } from './contact/WorkshopMap';

interface ContactPageProps {
  locale: Locale;
}

export function ContactPage({ locale }: ContactPageProps) {
  const content = getLocaleContent(locale);
  const section = content.contact;
  const assist = getContactAssistContent(locale);
  const formRef = useRef<HTMLDivElement>(null);

  return (
    <section className="content-panel contact-n3 reveal-on-scroll is-visible">
      <header className="contact-n3__header">
        <h1 className="cinzel-font">{section.heading}</h1>
        <p className="intro-text">{section.intro}</p>
      </header>

      <div className="contact-n3__phone" aria-label={assist.detailsPhone}>
        <p className="eyebrow contact-n3__phone-eyebrow">{assist.detailsPhone}</p>
        <a href={siteConfig.contacts.phoneLink} className="contact-n3__phone-number">
          {siteConfig.contacts.phoneDisplay}
        </a>
        <p className="contact-n3__phone-hours">{assist.hoursValue}</p>
      </div>

      <div className="contact-n3__separator" aria-hidden="true" />

      <ContactForm
        ref={formRef}
        locale={locale}
        labels={section.formLabels}
        assist={assist}
        privacyNotice={section.privacyNotice}
      />

      <dl className="contact-n3__register">
        <div className="contact-n3__register-row">
          <dt>{assist.detailsEmail}</dt>
          <dd>
            <a href={`mailto:${siteConfig.contacts.email}`}>{siteConfig.contacts.email}</a>
          </dd>
        </div>
        <div className="contact-n3__register-row">
          <dt>{assist.workshopLabel}</dt>
          <dd>{siteConfig.contacts.address}</dd>
        </div>
        <div className="contact-n3__register-row">
          <dt>{assist.hoursLabel}</dt>
          <dd>{assist.hoursValue}</dd>
        </div>
      </dl>

      <div id="map" className="contact-n3__map">
        <WorkshopMap src={siteConfig.contacts.mapEmbedUrl} title={content.layout.locationMap} />
      </div>
    </section>
  );
}
