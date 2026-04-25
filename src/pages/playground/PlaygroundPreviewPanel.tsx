import { Link } from 'react-router-dom';
import { buildLocalizedPath } from '../../routing';
import type { Locale, PlaygroundOption } from '../../types';
import type { UiCopy } from './copy';
import { MonumentPreviewModel } from './MonumentPreviewModel';

interface PlaygroundPreviewPanelProps {
  locale: Locale;
  previewTitle: string;
  ui: UiCopy;
  options: PlaygroundOption[];
  selection: Record<string, string>;
  viewAngle: number;
  presetNote: string | null;
}

export function PlaygroundPreviewPanel({
  locale,
  previewTitle,
  ui,
  options,
  selection,
  viewAngle,
  presetNote
}: PlaygroundPreviewPanelProps) {
  return (
    <article className="preview-card model-preview" aria-live="polite">
      <h2>
        {previewTitle} · {ui.optionalLabel}
      </h2>
      <p className="preview-caption">{ui.modelCaption}</p>
      <MonumentPreviewModel
        shapeValue={selection.shape || ''}
        materialValue={selection.material || ''}
        finishValue={selection.finish || ''}
        viewAngle={viewAngle}
      />

      <ul className="selection-list">
        {options.map((option) => (
          <li key={option.id}>
            <strong>{option.label}</strong>: {selection[option.id]}
          </li>
        ))}
      </ul>
      {presetNote ? <p>{presetNote}</p> : null}

      <Link className="preview-consult-btn" to={buildLocalizedPath(locale, 'contact')}>
        {ui.consultationButton}
      </Link>
    </article>
  );
}
