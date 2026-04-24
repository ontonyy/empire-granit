import type { LocaleContent } from '../../types';

type Preset = LocaleContent['playground']['presets'][number];

interface PlaygroundPresetsProps {
  presets: Preset[];
  activePresetId: string | null;
  ariaLabel: string;
  onApply: (presetId: string) => void;
}

export function PlaygroundPresets({ presets, activePresetId, ariaLabel, onApply }: PlaygroundPresetsProps) {
  return (
    <div className="preset-row" role="group" aria-label={ariaLabel}>
      {presets.map((preset) => (
        <button
          key={preset.id}
          type="button"
          className={preset.id === activePresetId ? 'preset-btn active' : 'preset-btn'}
          onClick={() => onApply(preset.id)}
        >
          {preset.name}
        </button>
      ))}
    </div>
  );
}
