import { useState } from 'react';
import { GraniteSwatchTile, getGraniteTextureImage } from '../../components/GraniteSwatchTile';
import type { GraniteSwatch, Locale } from '../../types';
import { withAdditionalGraniteSwatches } from './granite-swatches';

interface GranitePaletteProps {
  swatches: GraniteSwatch[];
  title: string;
  locale: Locale;
}

export function GranitePalette({ swatches, title, locale }: GranitePaletteProps) {
  const enrichedSwatches = withAdditionalGraniteSwatches(locale, swatches);
  const [selectedId, setSelectedId] = useState(enrichedSwatches[0]?.id);
  const selectedSwatch = enrichedSwatches.find((swatch) => swatch.id === selectedId) || enrichedSwatches[0];
  const selectedImage = selectedSwatch ? getGraniteTextureImage(selectedSwatch) : undefined;

  return (
    <section className="catalog-granite-showcase">
      <div className="catalog-granite-header">
        <span className="section-kicker">{title}</span>
        <h2>{title}</h2>
      </div>
      <div className="catalog-granite-layout">
        <div className="catalog-granite-focus-card">
          {selectedImage ? <img src={selectedImage} alt={selectedSwatch?.name} className="granite-focus-image" /> : null}
          <div className="catalog-granite-focus-copy">
            <span className="section-kicker">{title}</span>
            <strong>{selectedSwatch?.name}</strong>
          </div>
        </div>
        <div className="catalog-granite-grid-card">
          <div className="catalog-granite-grid">
            {enrichedSwatches.map((swatch) => (
              <button
                key={swatch.id}
                type="button"
                className={swatch.id === selectedSwatch?.id ? 'catalog-granite-item active' : 'catalog-granite-item'}
                onClick={() => setSelectedId(swatch.id)}
                aria-pressed={swatch.id === selectedSwatch?.id}
              >
                <GraniteSwatchTile swatch={swatch} className="granite-swatch-thumb" />
                <span>{swatch.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
