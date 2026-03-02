import { getLocaleContent } from '../content';
import type { Locale } from '../types';

interface HomePageProps {
  locale: Locale;
}

export function HomePage({ locale }: HomePageProps) {
  const content = getLocaleContent(locale).homepage;

  return (
    <section className="hero-panel">
      <div>
        <p className="eyebrow">Empire Granit</p>
        <h1>{content.heroTitle}</h1>
        <p>{content.heroLead}</p>
      </div>
      <ul className="highlight-list">
        {content.highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
