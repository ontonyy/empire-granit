import { useMemo, useState } from 'react';
import { getLocaleContent } from '../content';
import { trackEvent } from '../lib/analytics';
import type { Locale } from '../types';

interface PlaygroundPageProps {
  locale: Locale;
}

export function PlaygroundPage({ locale }: PlaygroundPageProps) {
  const section = getLocaleContent(locale).playground;
  const initialConfig = Object.fromEntries(
    section.options.map((option) => [option.id, option.values[0]])
  );

  const [selection, setSelection] = useState<Record<string, string>>(initialConfig);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const currentPresetNote = useMemo(() => {
    if (!activePreset) {
      return null;
    }
    return section.presets.find((preset) => preset.id === activePreset)?.note || null;
  }, [activePreset, section.presets]);

  function setOption(optionId: string, value: string) {
    setActivePreset(null);
    setSelection((current) => ({ ...current, [optionId]: value }));
    trackEvent('playground_interaction', {
      locale,
      option: optionId,
      value
    });
  }

  function applyPreset(presetId: string) {
    const preset = section.presets.find((item) => item.id === presetId);
    if (!preset) {
      return;
    }

    setActivePreset(preset.id);
    setSelection(preset.values);
    trackEvent('playground_interaction', {
      locale,
      preset: preset.name
    });
  }

  return (
    <section className="content-panel">
      <h1>{section.heading}</h1>
      <p>{section.intro}</p>

      <div className="preset-row" role="group" aria-label={section.interactionLabel}>
        {section.presets.map((preset) => (
          <button
            key={preset.id}
            type="button"
            className={preset.id === activePreset ? 'preset-btn active' : 'preset-btn'}
            onClick={() => applyPreset(preset.id)}
          >
            {preset.name}
          </button>
        ))}
      </div>

      <div className="playground-grid">
        <form className="config-form" onSubmit={(event) => event.preventDefault()}>
          {section.options.map((option) => (
            <label key={option.id} className="field">
              <span>{option.label}</span>
              <select
                value={selection[option.id]}
                onChange={(event) => setOption(option.id, event.target.value)}
              >
                {option.values.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </form>

        <article className="preview-card" aria-live="polite">
          <h2>{section.previewTitle}</h2>
          <ul>
            {Object.entries(selection).map(([key, value]) => (
              <li key={key}>
                <strong>{key}</strong>: {value}
              </li>
            ))}
          </ul>
          {currentPresetNote ? <p>{currentPresetNote}</p> : null}
        </article>
      </div>
    </section>
  );
}
