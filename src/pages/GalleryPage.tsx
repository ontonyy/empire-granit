import { getLocaleContent } from '../content';
import type { Locale } from '../types';

interface GalleryPageProps {
  locale: Locale;
}

export function GalleryPage({ locale }: GalleryPageProps) {
  const section = getLocaleContent(locale).gallery;

  return (
    <section className="content-panel">
      <h1>{section.heading}</h1>
      <p>{section.intro}</p>
      <div className="gallery-grid">
        {section.works.map((work) => (
          <article key={work.id} className="gallery-card">
            <img src={work.image} alt={work.title} loading="lazy" />
            <div>
              <h2>{work.title}</h2>
              <p className="badge">{work.category}</p>
              <p>{work.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
