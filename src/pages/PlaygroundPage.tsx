import { useMemo, useState } from 'react';
import { getLocaleContent } from '../content';
import { trackEvent } from '../lib/analytics';
import type { Locale } from '../types';
import { PlaygroundConfigForm } from './playground/PlaygroundConfigForm';
import { PlaygroundPresets } from './playground/PlaygroundPresets';
import { PlaygroundPreviewPanel } from './playground/PlaygroundPreviewPanel';
import { getUiCopy } from './playground/copy';

interface PlaygroundPageProps {
  locale: Locale;
}

export function PlaygroundPage({ locale }: PlaygroundPageProps) {
  const section = getLocaleContent(locale).playground;
  const ui = getUiCopy(locale);
  const initialConfig = Object.fromEntries(
    section.options.map((option) => [option.id, option.values[0]])
  );

  const [selection, setSelection] = useState<Record<string, string>>(initialConfig);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [viewAngle, setViewAngle] = useState(24);

  const currentPresetNote = useMemo(() => {
    if (!activePreset) {
      return null;
    }
    return section.presets.find((preset) => preset.id === activePreset)?.note || null;
  }, [activePreset, section.presets]);

  function setOption(optionId: string, value: string) {
    setActivePreset(null);
    setSelection((current) => ({ ...current, [optionId]: value }));
    trackEvent('playground_interaction', { locale, option: optionId, value });
  }

  function applyPreset(presetId: string) {
    const preset = section.presets.find((item) => item.id === presetId);
    if (!preset) {
      return;
    }

    setActivePreset(preset.id);
    setSelection(preset.values);
    trackEvent('playground_interaction', { locale, preset: preset.name });
  }

  function handleViewAngleChange(value: number) {
    setViewAngle(value);
    trackEvent('playground_interaction', {
      locale,
      option: 'view-angle',
      value: String(value)
    });
  }

  return (
    <section className="content-panel">
      <h1>{section.heading}</h1>
      <p>{section.intro}</p>

      <PlaygroundPresets
        presets={section.presets}
        activePresetId={activePreset}
        ariaLabel={section.interactionLabel}
        onApply={applyPreset}
      />

      <div className="playground-grid">
        <PlaygroundConfigForm
          options={section.options}
          selection={selection}
          viewAngle={viewAngle}
          viewAngleLabel={ui.viewAngle}
          onOptionChange={setOption}
          onViewAngleChange={handleViewAngleChange}
        />

        <PlaygroundPreviewPanel
          locale={locale}
          previewTitle={section.previewTitle}
          ui={ui}
          options={section.options}
          selection={selection}
          viewAngle={viewAngle}
          presetNote={currentPresetNote}
        />
      </div>
    </section>
  );
}
