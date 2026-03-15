import { useState } from 'react';
import { Link } from 'react-router-dom';
import { buildLocalizedPath } from '../routing';
import type { Locale } from '../types';

interface FaqPageProps {
  locale: Locale;
}

interface FaqEntry {
  question: string;
  answer: string;
}

function getFaqContent(locale: Locale): {
  heading: string;
  intro: string;
  contactCta: string;
  items: FaqEntry[];
} {
  if (locale === 'ru') {
    return {
      heading: 'Частые вопросы',
      intro: 'Ответы на вопросы, которые чаще всего задают семьи перед заказом.',
      contactCta: 'Не нашли ответ? Оставить заявку',
      items: [
        {
          question: 'Сколько времени изготовление?',
          answer: 'Обычно от 2 до 6 недель, в зависимости от сложности, сезона и выбранного материала.'
        },
        {
          question: 'Какие документы нужны?',
          answer:
            'Для первичной консультации достаточно базовой информации. Для установки на кладбище поможем уточнить перечень документов по конкретному месту.'
        },
        {
          question: 'Можно ли рассрочку?',
          answer:
            'Да, по части заказов возможна рассрочка. Точные условия согласовываем индивидуально при расчете.'
        },
        {
          question: 'Работаете ли по всей Эстонии?',
          answer: 'Да, принимаем и выполняем заказы по всей Эстонии.'
        }
      ]
    };
  }

  if (locale === 'et') {
    return {
      heading: 'Korduma kippuvad küsimused',
      intro: 'Vastused küsimustele, mida pered enne tellimust kõige sagedamini küsivad.',
      contactCta: 'Ei leidnud vastust? Saada päring',
      items: [
        {
          question: 'Kui kaua valmistamine kestab?',
          answer: 'Tavaliselt 2 kuni 6 nädalat sõltuvalt keerukusest, hooajast ja materjalist.'
        },
        {
          question: 'Milliseid dokumente on vaja?',
          answer:
            'Esmaseks konsultatsiooniks piisab põhiteabest. Paigalduseks aitame täpsustada nõutud dokumente vastavalt kalmistule.'
        },
        {
          question: 'Kas järelmaks on võimalik?',
          answer: 'Jah, osade tellimuste puhul on järelmaks võimalik. Tingimused lepime kokku individuaalselt.'
        },
        {
          question: 'Kas töötate üle kogu Eesti?',
          answer: 'Jah, võtame ja täidame tellimusi üle kogu Eesti.'
        }
      ]
    };
  }

  return {
    heading: 'Frequently Asked Questions',
    intro: 'Answers to the most common questions families ask before ordering.',
    contactCta: 'Did not find your answer? Send inquiry',
    items: [
      {
        question: 'How long does production take?',
        answer: 'Usually 2 to 6 weeks depending on complexity, season, and selected material.'
      },
      {
        question: 'What documents are required?',
        answer:
          'For the initial consultation, basic information is enough. For cemetery installation we help clarify required documents for the specific location.'
      },
      {
        question: 'Is installment payment available?',
        answer:
          'Yes, installment plans are available for some orders. Final terms are agreed individually during quotation.'
      },
      {
        question: 'Do you work across all Estonia?',
        answer: 'Yes, we accept and complete orders across Estonia.'
      }
    ]
  };
}

export function FaqPage({ locale }: FaqPageProps) {
  const content = getFaqContent(locale);
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="content-panel faq-page faq-page-upgraded">
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
