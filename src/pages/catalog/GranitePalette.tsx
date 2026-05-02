import { useState } from 'react';
import { DisplayHeading, Eyebrow, SwatchGrid } from '../../components/ui';
import { getGraniteTextureImage } from '../../components/GraniteSwatchTile';
import type { GraniteSwatch, Locale } from '../../types';
import { withAdditionalGraniteSwatches } from './granite-swatches';

interface GranitePaletteProps {
  swatches: GraniteSwatch[];
  title: string;
  locale: Locale;
}

export function GranitePalette({ swatches, title, locale }: GranitePaletteProps) {
  const enrichedSwatches = withAdditionalGraniteSwatches(locale, swatches);
  const [selectedId, setSelectedId] = useState<string | undefined>(enrichedSwatches[0]?.id);
  const selectedSwatch = enrichedSwatches.find((swatch) => swatch.id === selectedId) || enrichedSwatches[0];
  const selectedImage = selectedSwatch ? getGraniteTextureImage(selectedSwatch) : undefined;

  return (
    <section className="catalog-granite-showcase is-refined" aria-labelledby="granite-heading">
      <header className="catalog-granite-header">
        <Eyebrow>{title}</Eyebrow>
        <DisplayHeading level={2} id="granite-heading">
          {title}
        </DisplayHeading>
      </header>
      <div className="catalog-granite-layout">
        <div className="catalog-granite-focus-card">
          {selectedImage ? <img src={selectedImage} alt={selectedSwatch?.name} className="granite-focus-image" /> : null}
          <div className="catalog-granite-focus-copy">
            <strong>{selectedSwatch?.name}</strong>
          </div>
        </div>
        <SwatchGrid
          swatches={enrichedSwatches}
          selectedId={selectedSwatch?.id}
          onSelect={setSelectedId}
          columns={3}
        />
      </div>
    </section>
  );
}
