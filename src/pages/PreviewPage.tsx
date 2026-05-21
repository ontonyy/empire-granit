import type { ComponentType, SVGProps } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraniteSwatchTile, getGraniteTextureImage } from '../components/GraniteSwatchTile';
import { DisplayHeading, Eyebrow } from '../components/ui';
import { getLocaleContent } from '../content';
import { buildLocalizedPath } from '../routing';
import type { GraniteSwatch, Locale } from '../types';
import {
  ArchedShape,
  BookShape,
  CrossShape,
  FlatTopShape,
  HeartShape,
  OvalShape,
  ShoulderedShape,
  WaveShape
} from './preview/shapes';
import { type MemorialShapeId, useMemorialConfig } from './preview/useMemorialConfig';
import type { AddonId, MemorialConfig } from './preview/useMemorialConfig';

interface PreviewPageProps {
  locale: Locale;
}

type ShapeOption = {
  id: MemorialShapeId;
  label: string;
  Shape: ComponentType<SVGProps<SVGPathElement>>;
};

const SHAPE_OPTIONS: ShapeOption[] = [
  { id: 'arched', label: 'Arch', Shape: ArchedShape },
  { id: 'flat', label: 'Flat', Shape: FlatTopShape },
  { id: 'shouldered', label: 'Steps', Shape: ShoulderedShape },
  { id: 'heart', label: 'Heart', Shape: HeartShape },
  { id: 'wave', label: 'Wave', Shape: WaveShape },
  { id: 'cross', label: 'Cross', Shape: CrossShape },
  { id: 'book', label: 'Book', Shape: BookShape },
  { id: 'oval', label: 'Oval', Shape: OvalShape }
];

const STONE_FALLBACK_COLORS: Record<string, string> = {
  'grey-granite': 'var(--legacy-color-6b6b6b)',
  'black-granite': 'var(--legacy-color-1a1a1a)',
  'red-granite': 'var(--legacy-color-8c3f3f)',
  'green-granite': 'var(--legacy-color-4c6d57)',
  'white-granite': 'var(--legacy-color-f7f3ed)',
  'brown-granite': 'var(--legacy-color-6c4a36)',
  'blue-granite': 'var(--legacy-color-44566d)',
  'light-blue-granite': 'var(--legacy-color-b2b2b2)',
  'orange-granite': 'var(--legacy-color-b58f5b)',
  'violet-granite': 'var(--legacy-color-7770a2)'
};

const FINISH_OPTIONS: Array<{ id: MemorialConfig['finishId']; className: string }> = [
  { id: 'polished', className: 'is-polished' },
  { id: 'honed', className: 'is-honed' },
  { id: 'flamed', className: 'is-flamed' }
];

const LETTERING_OPTIONS: Array<{ id: MemorialConfig['letteringId']; className: string }> = [
  { id: 'serif', className: 'is-serif' },
  { id: 'sans', className: 'is-sans' },
  { id: 'script', className: 'is-script' },
  { id: 'caps', className: 'is-caps' }
];

const ADDON_OPTIONS: AddonId[] = ['vase', 'photo', 'ornament', 'candle', 'border'];

function stoneFallbackColor(swatch: GraniteSwatch | undefined): string {
  if (!swatch) {
    return 'var(--surface-graphite)';
  }

  return STONE_FALLBACK_COLORS[swatch.textureKey] ?? 'var(--surface-graphite)';
}

function MemorialCanvas({
  selectedStone,
  selectedShape,
  config,
  previewLabel,
  finishLabel
}: {
  selectedStone: GraniteSwatch | undefined;
  selectedShape: ShapeOption;
  config: MemorialConfig;
  previewLabel: string;
  finishLabel: string;
}) {
  const Shape = selectedShape.Shape;
  const texture = selectedStone ? getGraniteTextureImage(selectedStone) : undefined;
  const fillId = 'preview-stone-pattern';
  const finishClass = FINISH_OPTIONS.find((finish) => finish.id === config.finishId)?.className ?? 'is-polished';
  const letteringClass = LETTERING_OPTIONS.find((lettering) => lettering.id === config.letteringId)?.className ?? 'is-serif';

  return (
    <figure className="preview-canvas" aria-label={previewLabel}>
      <svg className="preview-canvas__svg" viewBox="0 0 520 520" role="img" aria-labelledby="preview-title">
        <title id="preview-title">{previewLabel}</title>
        <defs>
          <linearGradient id="preview-polish" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="var(--legacy-color-255-255-255-035)" />
            <stop offset="0.34" stopColor="var(--legacy-color-255-255-255-006)" />
            <stop offset="0.62" stopColor="var(--legacy-color-0-0-0-015)" />
            <stop offset="1" stopColor="var(--legacy-color-255-255-255-018)" />
          </linearGradient>
          <pattern id={fillId} patternUnits="userSpaceOnUse" width="96" height="96">
            <rect width="96" height="96" fill={stoneFallbackColor(selectedStone)} />
            {texture ? <image href={texture} width="96" height="96" preserveAspectRatio="xMidYMid slice" /> : null}
          </pattern>
          <filter id="preview-flamed-texture" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" />
          </filter>
        </defs>

        <ellipse cx="260" cy="474" rx="172" ry="22" className="preview-canvas__shadow" />
        <rect x="110" y="386" width="300" height="50" rx="5" className="preview-canvas__base" />
        <rect x="82" y="432" width="356" height="38" rx="5" className="preview-canvas__plinth" />
        <g transform="translate(78 58)">
          <Shape className="preview-canvas__stone" fill={`url(#${fillId})`} />
          <Shape className={`preview-canvas__finish ${finishClass}`} fill="url(#preview-polish)" />
          {config.addons.border && <Shape className="preview-canvas__border" />}
          {config.addons.ornament && <path d="M146 190c20-22 52-22 72 0m-36-19v44" className="preview-canvas__ornament" />}
          {config.addons.photo && <ellipse cx="182" cy="112" rx="34" ry="42" className="preview-canvas__photo" />}
          <text x="182" y="174" textAnchor="middle" className={`preview-canvas__name ${letteringClass}`}>
            {config.inscriptionName}
          </text>
          <text x="182" y="210" textAnchor="middle" className={`preview-canvas__dates ${letteringClass}`}>
            {config.inscriptionDates}
          </text>
          {config.addons.vase && <path d="M104 304h36l-8 58h-20z" className="preview-canvas__addon" />}
          {config.addons.candle && <path d="M240 320h30v42h-30zM255 308c8 8 8 15 0 23c-8-8-8-15 0-23z" className="preview-canvas__addon" />}
        </g>
      </svg>
      <figcaption className="preview-canvas__caption">
        <span>{selectedStone?.name}</span>
        <span>{finishLabel}</span>
      </figcaption>
    </figure>
  );
}

function encodeConfig(config: MemorialConfig): string {
  return btoa(unescape(encodeURIComponent(JSON.stringify(config))));
}

function decodeConfig(value: string | null): Partial<MemorialConfig> | undefined {
  if (!value) {
    return undefined;
  }

  try {
    return JSON.parse(decodeURIComponent(escape(atob(value)))) as Partial<MemorialConfig>;
  } catch {
    return undefined;
  }
}

export function PreviewPage({ locale }: PreviewPageProps) {
  const location = useLocation();
  const content = getLocaleContent(locale);
  const copy = content.preview;
  const initialConfig = decodeConfig(new URLSearchParams(location.search).get('config'));
  const {
    config,
    selectedStone,
    swatches,
    setShapeId,
    setStoneId,
    setFinishId,
    setLetteringId,
    setInscriptionName,
    setInscriptionDates,
    toggleAddon
  } = useMemorialConfig(locale, content, initialConfig);
  const selectedShape = SHAPE_OPTIONS.find((shape) => shape.id === config.shapeId) ?? SHAPE_OPTIONS[0];
  const savedConfig = encodeConfig(config);
  const conceptUrl = `${buildLocalizedPath(locale, 'preview')}?config=${encodeURIComponent(savedConfig)}`;
  const contactUrl = `${buildLocalizedPath(locale, 'contact')}?config=${encodeURIComponent(savedConfig)}`;
  const selectedFinishLabel = copy.finishOptions.find((item) => item.id === config.finishId)?.label ?? copy.labels.polished;

  return (
    <section className="preview-page">
      <header className="preview-hero reveal-on-scroll">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <DisplayHeading level={1}>{copy.heading}</DisplayHeading>
        <p>{copy.intro}</p>
      </header>

      <ol className="preview-stepper reveal-on-scroll" aria-label={copy.heading}>
        {copy.stepper.map((step, index) => (
          <li key={step} className={index < 2 ? 'is-active' : ''}>
            <span>{index + 1}</span>
            {step}
          </li>
        ))}
      </ol>

      <div className="preview-workspace">
        <div className="preview-workspace__stage reveal-on-scroll">
          <MemorialCanvas
            selectedStone={selectedStone}
            selectedShape={selectedShape}
            config={config}
            previewLabel={copy.labels.preview}
            finishLabel={selectedFinishLabel}
          />
          <article className="preview-summary-card" aria-labelledby="preview-summary-title">
            <h2 id="preview-summary-title">{copy.save.title}</h2>
            <p>{copy.save.body}</p>
            <div className="preview-summary-card__actions">
              <a className="btn-secondary" href={conceptUrl}>
                {copy.save.action}
              </a>
              <Link className="btn-primary preview-consult-btn" to={contactUrl}>
                {copy.save.consult}
              </Link>
            </div>
          </article>
        </div>

        <aside className="preview-controls reveal-on-scroll" aria-label={copy.labels.selected}>
          <section className="preview-control-group" aria-labelledby="preview-shape-title">
            <h2 id="preview-shape-title">{copy.groups.shape}</h2>
            <div className="preview-shape-grid">
              {SHAPE_OPTIONS.map(({ id, label, Shape }) => {
                const active = config.shapeId === id;
                return (
                  <button
                    key={id}
                    type="button"
                    className={['preview-shape-option', active ? 'is-active' : ''].filter(Boolean).join(' ')}
                    aria-pressed={active}
                    onClick={() => setShapeId(id)}
                  >
                    <svg viewBox="0 0 364 368" aria-hidden="true">
                      <Shape />
                    </svg>
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="preview-control-group" aria-labelledby="preview-stone-title">
            <h2 id="preview-stone-title">{copy.groups.stone}</h2>
            <div className="preview-stone-grid">
              {swatches.slice(0, 8).map((swatch) => {
                const active = selectedStone?.id === swatch.id;
                return (
                  <button
                    key={swatch.id}
                    type="button"
                    className={['preview-stone-option', active ? 'is-active' : ''].filter(Boolean).join(' ')}
                    aria-pressed={active}
                    onClick={() => setStoneId(swatch.id)}
                  >
                    <GraniteSwatchTile swatch={swatch} className="preview-stone-option__swatch" />
                    <span>{swatch.name}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="preview-control-group" aria-labelledby="preview-finish-title">
            <h2 id="preview-finish-title">{copy.groups.finish}</h2>
            <div className="preview-segmented" role="group" aria-labelledby="preview-finish-title">
              {copy.finishOptions.map((option) => {
                const active = config.finishId === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    className={active ? 'is-active' : ''}
                    aria-pressed={active}
                    onClick={() => setFinishId(option.id)}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="preview-control-group" aria-labelledby="preview-engraving-title">
            <h2 id="preview-engraving-title">{copy.groups.engraving}</h2>
            <div className="preview-field-stack">
              <label htmlFor="preview-name">{copy.labels.name}</label>
              <input id="preview-name" value={config.inscriptionName} onChange={(event) => setInscriptionName(event.target.value)} />
              <label htmlFor="preview-dates">{copy.labels.dates}</label>
              <input id="preview-dates" value={config.inscriptionDates} onChange={(event) => setInscriptionDates(event.target.value)} />
            </div>
            <div className="preview-segmented" role="group" aria-label={copy.groups.engraving}>
              {copy.letteringOptions.map((option) => {
                const active = config.letteringId === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    className={active ? 'is-active' : ''}
                    aria-pressed={active}
                    onClick={() => setLetteringId(option.id)}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="preview-control-group" aria-labelledby="preview-addons-title">
            <h2 id="preview-addons-title">{copy.groups.addons}</h2>
            <div className="preview-toggle-grid">
              {ADDON_OPTIONS.map((addonId) => (
                <button
                  key={addonId}
                  type="button"
                  className={config.addons[addonId] ? 'is-active' : ''}
                  aria-pressed={config.addons[addonId]}
                  onClick={() => toggleAddon(addonId)}
                >
                  {copy.addonOptions[addonId]}
                </button>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}
