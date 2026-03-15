import type { Locale } from '../types';

interface PrivacyPageProps {
  locale: Locale;
}

interface PrivacyCard {
  title: string;
  body: string;
}

function getPrivacyContent(locale: Locale): {
  kicker: string;
  heading: string;
  intro: string;
  cards: PrivacyCard[];
} {
  if (locale === 'ru') {
    return {
      kicker: 'PRIVACY POLICY',
      heading: 'Политика конфиденциальности',
      intro:
        'Мы собираем только ту информацию, которая необходима для связи с клиентом и подготовки предложения. Никаких лишних данных мы не запрашиваем.',
      cards: [
        {
          title: 'Сбор данных',
          body: 'Мы собираем только информацию, которую вы сами отправляете через формы на сайте.'
        },
        {
          title: 'Цель',
          body: 'Данные используются строго для связи с вами, ответа на запрос и подготовки предложения.'
        },
        {
          title: 'Защита',
          body: 'Доступ к данным ограничен, и мы не передаем информацию третьим лицам.'
        }
      ]
    };
  }

  if (locale === 'et') {
    return {
      kicker: 'PRIVACY POLICY',
      heading: 'Privaatsuspoliitika',
      intro:
        'Kogume ainult neid andmeid, mis on vajalikud kliendiga suhtlemiseks ja pakkumise koostamiseks. Ülearuseid andmeid me ei küsi.',
      cards: [
        {
          title: 'Andmete kogumine',
          body: 'Kogume ainult selle teabe, mille te ise vormide kaudu meile saadate.'
        },
        {
          title: 'Eesmärk',
          body: 'Andmeid kasutatakse ainult teiega suhtlemiseks, päringule vastamiseks ja pakkumise ettevalmistamiseks.'
        },
        {
          title: 'Kaitse',
          body: 'Ligipääs andmetele on piiratud ning me ei jaga neid kolmandate osapooltega.'
        }
      ]
    };
  }

  return {
    kicker: 'PRIVACY POLICY',
    heading: 'Privacy Policy',
    intro:
      'We only collect the information required to communicate with you and prepare a proposal. We do not ask for unnecessary personal data.',
    cards: [
      {
        title: 'Data Collection',
        body: 'We only collect information submitted via our forms.'
      },
      {
        title: 'Purpose',
        body: 'Data is used strictly for communication and proposals.'
      },
      {
        title: 'Protection',
        body: 'Access is limited and never shared with third parties.'
      }
    ]
  };
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
