import { Link } from 'react-router-dom';
import { siteConfig } from '../config/site';
import { getLocaleContent } from '../content';
import { buildLocalizedPath } from '../routing';
import type { Locale } from '../types';

interface AboutPageProps {
  locale: Locale;
}

export function AboutPage({ locale }: AboutPageProps) {
  const section = getLocaleContent(locale).about;
  const workshopImage =
    'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=80';

  return (
    <section className="about-page-upgraded">
      <header className="about-hero-panel">
        <div className="about-hero-copy">
          <span className="section-kicker">{section.kicker}</span>
          <h1>{section.title}</h1>
          <p className="about-lead">{section.lead}</p>
        </div>
        <figure className="about-workshop-photo">
          <img src={workshopImage} alt={section.photoAlt} />
        </figure>
      </header>

      <section className="about-story-band" aria-labelledby="about-story-heading">
        <div>
          <span className="section-kicker">{section.heading}</span>
          <h2 id="about-story-heading">{section.heading}</h2>
        </div>
        <div className="about-story-copy">
          {section.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="about-details-panel" aria-label={section.heading}>
        <div className="about-detail-list">
          {section.points.map((point, index) => (
            <article key={point} className="about-detail-card">
              <span className="about-detail-mark" aria-hidden="true">
                {`0${index + 1}`}
              </span>
              <p>{point}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-service-area" aria-labelledby="about-area-heading">
        <span className="section-kicker">{section.area.kicker}</span>
        <h2 id="about-area-heading">{section.area.title}</h2>
        <p>{section.area.body}</p>
        <ul>
          {section.area.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <section className="about-contact-block" aria-labelledby="about-contact-heading">
        <div>
          <span className="section-kicker">{siteConfig.contacts.address}</span>
          <h2 id="about-contact-heading">{section.contact.title}</h2>
          <p>{section.contact.body}</p>
        </div>
        <div className="about-contact-actions">
          <a className="hero-secondary about-phone-link" href={siteConfig.contacts.phoneLink}>
            {siteConfig.contacts.phoneDisplay}
          </a>
          <Link className="hero-primary" to={buildLocalizedPath(locale, 'contact')}>
            {section.contact.primary}
          </Link>
          <a className="about-email-link" href={`mailto:${siteConfig.contacts.email}`}>
            {section.contact.secondary}
          </a>
        </div>
      </section>
    </section>
  );
}
