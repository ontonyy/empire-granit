import { Link } from 'react-router-dom';
import { DisplayHeading, Eyebrow } from '../components/ui';
import { getLocaleContent } from '../content';
import { buildLocalizedPath } from '../routing';
import type { Locale } from '../types';

interface ProcessPageProps {
  locale: Locale;
}

const romanStepNumbers = ['I', 'II', 'III', 'IV', 'V'];

export function ProcessPage({ locale }: ProcessPageProps) {
  const content = getLocaleContent(locale);
  const process = content.process;

  return (
    <section className="content-panel process-page">
      <header className="page-hero process-hero">
        <Eyebrow>{process.eyebrow}</Eyebrow>
        <DisplayHeading level={1}>{process.heading}</DisplayHeading>
        <p>{process.intro}</p>
      </header>

      <div className="process-story reveal-on-scroll" aria-label={process.heading}>
        {process.steps.map((step, index) => (
          <article key={step.title} className="process-story-step">
            <div className="process-story-media">
              <img src={step.image} alt="" loading="lazy" />
            </div>
            <div className="process-story-copy">
              <span className="process-story-index">{romanStepNumbers[index]}</span>
              <h2 className="cinzel-font">{step.title}</h2>
              {step.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
      </div>

      <aside className="process-consultation reveal-on-scroll">
        <div>
          <Eyebrow>{content.cta.sendInquiry}</Eyebrow>
          <h2 className="cinzel-font">{process.ctaTitle}</h2>
          <p>{process.ctaBody}</p>
        </div>
        <Link className="hero-primary process-consultation-cta" to={buildLocalizedPath(locale, 'contact')}>
          {process.ctaLabel}
        </Link>
      </aside>
    </section>
  );
}
