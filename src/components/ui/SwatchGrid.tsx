import { GraniteSwatchTile } from '../GraniteSwatchTile';
import type { GraniteSwatch } from '../../types/gallery';

export interface SwatchGridProps {
  swatches: GraniteSwatch[];
  selectedId?: string;
  onSelect: (id: string) => void;
  columns?: number;
}

export function SwatchGrid({ swatches, selectedId, onSelect, columns = 3 }: SwatchGridProps) {
  return (
    <div
      className="ui-swatch-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: 'var(--space-2)'
      }}
    >
      {swatches.map((swatch) => {
        const isActive = swatch.id === selectedId;
        return (
          <button
            key={swatch.id}
            type="button"
            onClick={() => onSelect(swatch.id)}
            aria-pressed={isActive}
            className={['ui-swatch', isActive ? 'is-active' : ''].filter(Boolean).join(' ')}
          >
            <span className="ui-swatch__photo">
              <GraniteSwatchTile swatch={swatch} className="granite-swatch-thumb" />
            </span>
            <span className="ui-swatch__label">{swatch.name}</span>
          </button>
        );
      })}
    </div>
  );
}
