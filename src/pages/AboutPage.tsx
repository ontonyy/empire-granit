import { getLocaleContent } from '../content';
import type { Locale } from '../types';

interface AboutPageProps {
  locale: Locale;
}

export function AboutPage({ locale }: AboutPageProps) {
  const section = getLocaleContent(locale).about;

  return (
    <section className="content-panel">
      <h1>{section.heading}</h1>
      {section.body.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </section>
  );
}
