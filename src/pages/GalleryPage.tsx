import { getLocaleContent } from '../content';
import { buildLocalizedPath } from '../routing';
import type { Locale } from '../types';

interface GalleryPageProps {
  locale: Locale;
}

function getOptionalPreviewCopy(locale: Locale) {
  if (locale === 'ru') {
    return {
      title: 'Предпросмотр (опционально)',
      body: 'Если хотите, можно заранее посмотреть форму памятника в конфигураторе.',
      openPreview: 'Открыть предпросмотр',
      getConsultation: 'Получить консультацию по этому варианту'
    };
  }

  if (locale === 'et') {
    return {
      title: 'Eelvaade (valikuline)',
      body: 'Soovi korral saate monumendi vormi eelnevalt konfiguraatoris vaadata.',
      openPreview: 'Ava eelvaade',
      getConsultation: 'Soovin konsultatsiooni selle variandi kohta'
    };
  }

  return {
    title: 'Preview (optional)',
    body: 'If you want, you can check monument form options in the configurator first.',
    openPreview: 'Open preview',
    getConsultation: 'Get consultation for this option'
  };
}

export function GalleryPage({ locale }: GalleryPageProps) {
  const section = getLocaleContent(locale).gallery;
  const previewCopy = getOptionalPreviewCopy(locale);

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

      <section className="optional-preview">
        <h2>{previewCopy.title}</h2>
        <p>{previewCopy.body}</p>
        <div className="optional-preview-actions">
          <a href={buildLocalizedPath(locale, 'playground')}>{previewCopy.openPreview}</a>
          <a href={buildLocalizedPath(locale, 'contact')}>{previewCopy.getConsultation}</a>
        </div>
      </section>
    </section>
  );
}
