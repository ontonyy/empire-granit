import type { PlaygroundOption } from '../../types';

interface PlaygroundConfigFormProps {
  options: PlaygroundOption[];
  selection: Record<string, string>;
  viewAngle: number;
  viewAngleLabel: string;
  onOptionChange: (optionId: string, value: string) => void;
  onViewAngleChange: (value: number) => void;
}

export function PlaygroundConfigForm({
  options,
  selection,
  viewAngle,
  viewAngleLabel,
  onOptionChange,
  onViewAngleChange
}: PlaygroundConfigFormProps) {
  return (
    <form className="config-form" onSubmit={(event) => event.preventDefault()}>
      {options.map((option) => (
        <label key={option.id} className="field">
          <span>{option.label}</span>
          <select
            value={selection[option.id]}
            onChange={(event) => onOptionChange(option.id, event.target.value)}
          >
            {option.values.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
      ))}

      <label className="field">
        <span>{viewAngleLabel}</span>
        <input
          type="range"
          min={8}
          max={40}
          value={viewAngle}
          onChange={(event) => onViewAngleChange(Number(event.target.value))}
        />
      </label>
    </form>
  );
}
