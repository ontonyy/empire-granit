import { getPrivacyContent } from '../content/extra/privacy';
import type { Locale } from '../types';

interface PrivacyPageProps {
  locale: Locale;
}

export function PrivacyPage({ locale }: PrivacyPageProps) {
  const content = getPrivacyContent(locale);

  return (
    <section className="content-panel privacy-page-upgraded">
      <div className="privacy-hero-panel">
        <div>
          <span className="section-kicker">{content.kicker}</span>
          <h1>{content.heading}</h1>
        </div>
        <div className="about-story-card">
          <p className="privacy-lead">{content.intro}</p>
        </div>
      </div>

      <section className="about-details-panel">
        <div className="about-detail-list privacy-upgraded-grid">
          {content.cards.map((entry, index) => (
            <article key={entry.title} className="about-detail-card upgraded-privacy-card">
              <span className="about-detail-mark privacy-card-index">{`0${index + 1}`}</span>
              <h2>{entry.title}</h2>
              <p>{entry.body}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
