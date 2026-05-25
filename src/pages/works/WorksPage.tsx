import { useMemo, useState } from 'react';
import { siteConfig } from '../../config/site';
import { getLocaleContent } from '../../content';
import type { Locale } from '../../types';
import { WORKS, WORK_CATEGORIES, type WorkCategory, type WorkItem } from './works-data';

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
          <span className="ui-eyebrow">{works.eyebrow}</span>
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
            {visible.map((item) => (
              <li
                key={item.id}
                className={`works-tile works-tile-${item.ratio}`}
                data-category={item.category}
              >
                <a className="works-tile-link" href={`#${item.id}`} id={item.id}>
                  <img
                    className="works-tile-image"
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />
                  <span className="works-tile-overlay" aria-hidden="true" />
                  <span className="works-tile-caption">
                    <span className="works-tile-title">{item.title}</span>
                    <span className="works-tile-material">
                      {works.captionSeparator} {item.material}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="works-cta reveal-on-scroll">
        <div className="ui-container works-cta-inner">
          <span className="ui-eyebrow">{works.cta.eyebrow}</span>
          <h2 className="ui-display ui-display-2 works-cta-title">{works.cta.title}</h2>
          <p className="works-cta-body">{works.cta.body}</p>
          <a className="works-cta-link" href={siteConfig.contacts.phoneLink}>
            {works.cta.link}
            <span aria-hidden="true"> — {siteConfig.contacts.phoneDisplay}</span>
          </a>
        </div>
      </section>
    </>
  );
}
