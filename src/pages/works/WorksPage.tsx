import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLocaleContent } from '../../content';
import { buildLocalizedPath } from '../../routing';
import type { Locale } from '../../types';
import { WORKS, WORK_CATEGORIES, WORK_SWATCHES, type WorkCategory, type WorkItem } from './works-data';

interface WorksPageProps {
  locale: Locale;
}

type FilterKey = 'all' | WorkCategory;

export function WorksPage({ locale }: WorksPageProps) {
  const content = getLocaleContent(locale);
  const works = content.works;
  const [filter, setFilter] = useState<FilterKey>('all');

  const visible = useMemo<WorkItem[]>(() => {
    if (filter === 'all') {
      return WORKS;
    }
    return WORKS.filter((item) => item.category === filter);
  }, [filter]);

  const filterKeys: FilterKey[] = ['all', ...WORK_CATEGORIES];

  return (
    <>
      <section className="works-header reveal-on-scroll is-visible">
        <div className="ui-container">
          <span className="ui-eyebrow">{content.nav.works} / Empire Granit / Narva</span>
          <h1 className="ui-display ui-display-1 works-title">{works.title}</h1>
          <p className="works-lead">{works.pageLead}</p>
        </div>
      </section>

      <section className="works-filter reveal-on-scroll">
        <div className="ui-container works-filter-row">
          <span className="works-filter-label">{works.filterLabel}</span>
          <ul className="works-filter-pills" role="list">
            {filterKeys.map((key) => {
              const label = key === 'all' ? works.filters.all : works.filters[key];
              const isActive = filter === key;
              return (
                <li key={key}>
                  <button
                    type="button"
                    className={`works-filter-pill${isActive ? ' is-active' : ''}`}
                    onClick={() => setFilter(key)}
                    aria-pressed={isActive}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="works-gallery reveal-on-scroll">
        <div className="ui-container">
          <ul className="works-grid" role="list">
            {visible.map((item) => {
              const localizedTitle = item.title[locale];
              const altText = `${localizedTitle} — ${item.material}`;
              return (
                <li
                  key={item.id}
                  className={`works-tile works-tile-${item.ratio}`}
                  data-category={item.category}
                >
                  <a className="works-tile-link" href={`#${item.id}`} id={item.id}>
                    <picture className="works-tile-picture">
                      <source type="image/avif" srcSet={`${import.meta.env.BASE_URL}images/n3/works/${item.imageBase}.avif`} />
                      <source type="image/webp" srcSet={`${import.meta.env.BASE_URL}images/n3/works/${item.imageBase}.webp`} />
                      <img
                        className="works-tile-image"
                        src={`${import.meta.env.BASE_URL}images/n3/works/${item.imageBase}.jpg`}
                        width={item.width}
                        height={item.height}
                        alt={altText}
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                    <span className="works-tile-overlay" aria-hidden="true" />
                  </a>
                  <span className="works-tile-caption">
                    <span className="works-tile-title">{localizedTitle}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="works-swatches reveal-on-scroll">
        <div className="ui-container">
          <h2 className="ui-display ui-display-3 works-swatches-title">{works.swatches.title}</h2>
          <p className="works-swatches-lead">{works.swatches.lead}</p>
          <ul className="works-swatch-grid" role="list">
            {WORK_SWATCHES.map((swatch) => (
              <li key={swatch.id} className="works-swatch">
                <span
                  className="works-swatch-chip"
                  style={{ backgroundColor: swatch.hex }}
                  aria-hidden="true"
                />
                <span className="works-swatch-name">{works.swatches.items[swatch.id]}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="works-cta reveal-on-scroll">
        <div className="ui-container works-cta-inner">
          <span className="ui-eyebrow">{content.assistAlt.eyebrow}</span>
          <h2 className="ui-display ui-display-2 works-cta-title">{content.assistAlt.title}</h2>
          <p className="works-cta-body">{content.assistAlt.body}</p>
          <Link className="works-cta-link" to={buildLocalizedPath(locale, 'contact')}>
            {content.assistAlt.link}
          </Link>
        </div>
      </section>
    </>
  );
}
