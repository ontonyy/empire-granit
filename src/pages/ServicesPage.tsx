import { Link } from 'react-router-dom';
import { siteConfig } from '../config/site';
import { getLocaleContent } from '../content';
import { buildLocalizedPath } from '../routing';
import type { Locale } from '../types';
import { ServicePicture } from './services/ServicePicture';

interface ServicesPageProps {
  locale: Locale;
}

const PHOTOS = ['service-framing', 'service-fence', 'service-plate'];

export function ServicesPage({ locale }: ServicesPageProps) {
  const content = getLocaleContent(locale);
  const section = content.services;
  const contactPath = buildLocalizedPath(locale, 'contact');
  const ctaLabel = content.pricing.cta;

  return (
    <>
      <section className="services-header">
        <div className="ui-container services-header-inner">
          <span className="ui-eyebrow">Empire Granit · Narva</span>
          <h1 className="ui-display ui-display-1 services-title">{section.title}</h1>
          <p className="services-lead">{section.lead}</p>
        </div>
      </section>

      <section className="services-blocks">
        <div className="ui-container">
          {section.items.map((item, idx) => {
            const reversed = idx % 2 === 1;
            const photo = PHOTOS[idx] ?? PHOTOS[0];
            const numeral = String(idx + 1).padStart(2, '0');
            return (
              <article
                key={item.title}
                className={`services-block${reversed ? ' services-block--reversed' : ''}`}
              >
                <div className="services-block__copy">
                  <span className="services-block__numeral">{numeral}.</span>
                  <h2 className="services-block__title">{item.title}</h2>
                  <p className="services-block__body">{item.body}</p>
                  <ul className="services-block__deliverables" role="list">
                    {item.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  <Link className="services-block__link" to={contactPath}>
                    {ctaLabel} →
                  </Link>
                </div>
                <div className="services-block__photo">
                  <ServicePicture name={photo} alt={item.title} />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="services-contact-band">
        <div className="ui-container services-contact-inner">
          <span className="ui-eyebrow">{content.homepage.finalEyebrow}</span>
          <a className="services-contact-phone" href={siteConfig.contacts.phoneLink}>
            {siteConfig.contacts.phoneDisplay}
          </a>
          <Link className="services-contact-link" to={contactPath}>
            {content.homepage.finalContactLink}
          </Link>
        </div>
      </section>
    </>
  );
}
