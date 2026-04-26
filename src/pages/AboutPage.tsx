import { getLocaleContent } from '../content';
import type { Locale } from '../types';

interface AboutPageProps {
  locale: Locale;
}

export function AboutPage({ locale }: AboutPageProps) {
  const section = getLocaleContent(locale).about;

  return (
    <section className="content-panel about-page-upgraded">
      <div className="about-hero-panel">
        <div>
          <span className="section-kicker">{section.kicker}</span>
          <h1>{section.title}</h1>
          <p className="about-lead">{section.lead}</p>
        </div>
        <div className="about-story-card">
          {section.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <section className="about-metrics-grid" aria-label={section.title}>
        {section.metrics.map((metric) => (
          <article key={metric.label} className="about-metric-card">
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </article>
        ))}
      </section>

      <section className="about-details-panel">
        <h2>{section.heading}</h2>
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
    </section>
  );
}
