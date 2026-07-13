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
  const [flippedId, setFlippedId] = useState<string | null>(null);
  const [detailItem, setDetailItem] = useState<WorkItem | null>(null);
  const [loadedImageIds, setLoadedImageIds] = useState<Set<string>>(() => new Set());
  const [loadedHoverImageIds, setLoadedHoverImageIds] = useState<Set<string>>(() => new Set());
  const detailsLabel = { en: 'Details', et: 'Vaata', ru: 'Подробнее' }[locale];
  const closeLabel = { en: 'Close', et: 'Sulge', ru: 'Закрыть' }[locale];
  const firstImageLabel = { en: 'Show first image', et: 'Näita esimest pilti', ru: 'Показать первое фото' }[locale];
  const secondImageLabel = { en: 'Show second image', et: 'Näita teist pilti', ru: 'Показать второе фото' }[locale];
  const engravingsEmptyLabel = { en: 'Engravings are coming soon.', et: 'Graveeringud lisanduvad peagi.', ru: 'Гравировки скоро появятся.' }[locale];
  const colorIds = ['bege', 'black', 'blue', 'green', 'grey', 'light-blue', 'orange', 'purple', 'red', 'white'];
  const [activeColor, setActiveColor] = useState<string>(colorIds[1]);
  const monumentSrc = `${import.meta.env.BASE_URL}images/granite_monument_cut.png`;
  const textureSrc = (id: string) => `${import.meta.env.BASE_URL}images/granite-textures/${id}.png`;

  // Monument photos under n3/monuments, fences under n3/fences, engravings under
  // n3/engravings, landscaping benches under n3/environment, placeholders under n3/works.
  const assetDir = (base: string) =>
    base.startsWith('pam')
      ? 'n3/monuments'
      : base.startsWith('og')
        ? 'n3/fences'
        : base.startsWith('comp')
          ? 'n3/engravings'
          : base.startsWith('blag')
            ? 'n3/environment'
            : 'n3/works';
  const markImageLoaded = (id: string) => {
    setLoadedImageIds((loaded) => {
      if (loaded.has(id)) return loaded;
      return new Set(loaded).add(id);
    });
  };
  const markHoverImageLoaded = (id: string) => {
    setLoadedHoverImageIds((loaded) => {
      if (loaded.has(id)) return loaded;
      return new Set(loaded).add(id);
    });
  };
  const renderPicture = (
    base: string,
    className: string,
    alt: string,
    item: WorkItem,
    hidden = false,
    onLoad?: () => void,
    eager = false
  ) => {
    const url = (ext: string) => `${import.meta.env.BASE_URL}images/${assetDir(base)}/${base}.${ext}`;
    return (
      <picture className={className} aria-hidden={hidden || undefined}>
        <source type="image/avif" srcSet={url('avif')} />
        <source type="image/webp" srcSet={url('webp')} />
        <img
          className="works-tile-image"
          src={url('jpg')}
          width={item.width}
          height={item.height}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={onLoad}
        />
      </picture>
    );
  };

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
          <p className="works-catalog-note">{works.catalogNote}</p>
          <a className="works-colors-jump" href="#works-colors">{works.colorsLink}</a>
        </div>
      </section>

      <section className="works-filter reveal-on-scroll">
        <div className="ui-container works-filter-row">
          <span className="works-filter-label">{works.filterLabel}</span>
          <ul className="works-filter-pills" role="list">
            {filterKeys.map((key) => {
              const label = (works.filters as Record<FilterKey, string>)[key];
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

      <section className="works-gallery">
        <div className="ui-container">
          {visible.length === 0 ? (
            <p className="works-gallery-empty" role="status">{engravingsEmptyLabel}</p>
          ) : (
          <ul className="works-grid" role="list">
            {visible.map((item, index) => {
              const localizedTitle = item.title[locale];
              const altText = item.material ? `${localizedTitle} — ${item.material}` : localizedTitle;
              const hoverBase = item.hoverImageBase;
              const flipped = flippedId === item.id;
              const imageLoaded = loadedImageIds.has(item.id)
                && (!flipped || !hoverBase || loadedHoverImageIds.has(item.id));
              const eager = index < 9;
              const tileClass = `works-tile works-tile-${item.ratio}`
                + (hoverBase ? ' has-hover-swap' : '')
                + (flipped ? ' is-flipped' : '')
                + (imageLoaded ? ' is-image-loaded' : '');
              return (
                <li
                  key={item.id}
                  className={tileClass}
                  data-category={item.category}
                  style={{ aspectRatio: `${item.width} / ${item.height}` }}
                >
                  <div className="works-tile-link" id={item.id}>
                    {hoverBase ? (
                      <span className="works-tile-media">
                        {renderPicture(item.imageBase, 'works-tile-picture works-tile-picture-main', altText, item, false, () => markImageLoaded(item.id), eager)}
                        {renderPicture(
                          hoverBase,
                          'works-tile-picture works-tile-picture-hover',
                          '',
                          item,
                          true,
                          () => markHoverImageLoaded(item.id),
                          flipped
                        )}
                        <span className="works-tile-arrows" role="group" aria-label={localizedTitle}>
                          <button
                            type="button"
                            className="works-tile-arrow works-tile-arrow-prev"
                            aria-label={firstImageLabel}
                            aria-pressed={!flipped}
                            onClick={() => setFlippedId(null)}
                          >
                            <span aria-hidden="true">←</span>
                          </button>
                          <button
                            type="button"
                            className="works-tile-arrow works-tile-arrow-next"
                            aria-label={secondImageLabel}
                            aria-pressed={flipped}
                            onClick={() => setFlippedId(item.id)}
                          >
                            <span aria-hidden="true">→</span>
                          </button>
                        </span>
                      </span>
                    ) : (
                      renderPicture(item.imageBase, 'works-tile-picture', altText, item, false, () => markImageLoaded(item.id), eager)
                    )}
                    <span className="works-tile-overlay" aria-hidden="true" />
                  </div>
                  <span className="works-tile-loader" aria-hidden="true">
                    <span className="works-tile-loader-bar" />
                  </span>
                  <span className="works-tile-caption">
                    <span className="works-tile-title">{localizedTitle}</span>
                    {item.description ? (
                      <button
                        type="button"
                        className="works-tile-details"
                        onClick={() => setDetailItem(item)}
                      >
                        {detailsLabel}
                      </button>
                    ) : null}
                  </span>
                </li>
              );
            })}
          </ul>
          )}
        </div>
      </section>

      <section id="works-colors" className="works-colors reveal-on-scroll">
        <div className="ui-container">
          <h2 className="works-colors-label">{works.colorsLabel}</h2>
          <div className="works-colors-layout">
            <figure className="monument-preview">
              <span
                className="monument-stage"
                role="img"
                aria-label={works.colors[activeColor]}
                style={{
                  backgroundImage: `url(${textureSrc(activeColor)})`,
                  WebkitMaskImage: `url(${monumentSrc})`,
                  maskImage: `url(${monumentSrc})`,
                }}
              />
              <figcaption className="monument-name">{works.colors[activeColor]}</figcaption>
            </figure>
            <ul className="works-colors-grid" role="list">
              {colorIds.map((id) => {
                const isActive = id === activeColor;
                return (
                  <li key={id} className="works-colors-item">
                    <button
                      type="button"
                      className={`works-colors-swatch${isActive ? ' is-active' : ''}`}
                      onClick={() => setActiveColor(id)}
                      aria-pressed={isActive}
                      title={works.colors[id]}
                    >
                      <span
                        className="works-colors-tile"
                        style={{ backgroundImage: `url(${textureSrc(id)})` }}
                        aria-hidden="true"
                      />
                      <span className="works-colors-name">{works.colors[id]}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
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

      {detailItem ? (
        <div
          className="works-detail-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={detailItem.title[locale]}
          onClick={() => setDetailItem(null)}
        >
          <div className="works-detail-panel" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="works-detail-close"
              aria-label={closeLabel}
              onClick={() => setDetailItem(null)}
            >
              <span aria-hidden="true">×</span>
            </button>
            <h3 className="works-detail-title">{detailItem.title[locale]}</h3>
            <p className="works-detail-text">{detailItem.description?.[locale]}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
