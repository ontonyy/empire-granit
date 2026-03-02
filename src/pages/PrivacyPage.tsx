import { getLocaleContent } from '../content';
import type { Locale } from '../types';

interface PrivacyPageProps {
  locale: Locale;
}

export function PrivacyPage({ locale }: PrivacyPageProps) {
  const section = getLocaleContent(locale).privacy;

  return (
    <section className="content-panel">
      <h1>{section.heading}</h1>
      <div className="privacy-sections">
        {section.sections.map((entry) => (
          <article key={entry.title} className="privacy-card">
            <h2>{entry.title}</h2>
            <p>{entry.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
