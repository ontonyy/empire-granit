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
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="content-panel faq-page faq-page-upgraded reveal-on-scroll is-visible">
      <span className="section-kicker">FAQ</span>
      <h1>{content.heading}</h1>
      <p>{content.intro}</p>

      <div className="faq-accordion">
        {content.items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <article key={item.question} className={isOpen ? 'faq-item open' : 'faq-item'}>
              <button
                type="button"
                className="faq-question-btn"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <span>{item.question}</span>
                <span className="faq-question-icon" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              {isOpen ? <p className="faq-answer">{item.answer}</p> : null}
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
