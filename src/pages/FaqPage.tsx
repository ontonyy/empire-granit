import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getLocaleContent } from '../content';
import { buildLocalizedPath } from '../routing';
import type { Locale } from '../types';

interface FaqPageProps {
  locale: Locale;
}

export function FaqPage({ locale }: FaqPageProps) {
  const content = getLocaleContent(locale).faq;
  const [openIndices, setOpenIndices] = useState<Set<number>>(() => new Set([0]));

  const toggle = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <section className="content-panel faq-page faq-page-upgraded reveal-on-scroll is-visible">
      <header className="page-hero">
        <h1 className="cinzel-font">{content.heading}</h1>
        <p>{content.intro}</p>
      </header>

      <div className="faq-accordion">
        {content.items.map((item, index) => {
          const isOpen = openIndices.has(index);
          const panelId = `faq-panel-${index}`;
          const buttonId = `faq-trigger-${index}`;
          return (
            <article key={item.question} className={isOpen ? 'faq-item open' : 'faq-item'}>
              <button
                type="button"
                id={buttonId}
                className="faq-question-btn"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
              >
                <span>{item.question}</span>
                <span className="faq-question-icon" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className="faq-answer-panel"
              >
                <p className="faq-answer">{item.answer}</p>
              </div>
            </article>
          );
        })}
      </div>

      <Link className="faq-contact-btn" to={buildLocalizedPath(locale, 'contact')}>
        {content.contactCta}
      </Link>
    </section>
  );
}
