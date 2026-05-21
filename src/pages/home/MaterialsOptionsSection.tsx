import { GraniteSwatchTile } from '../../components/GraniteSwatchTile';
import type { GraniteSwatch } from '../../types';
import type { OptionItem } from './sections';

interface MaterialsOptionsSectionProps {
  label: string;
  title: string;
  lead: string;
  options: OptionItem[];
}

const calmGraniteSwatches: GraniteSwatch[] = [
  { id: 'home-grey-granite', name: 'Grey granite', textureKey: 'grey-granite' },
  { id: 'home-black-granite', name: 'Black granite', textureKey: 'black-granite' },
  { id: 'home-white-granite', name: 'White granite', textureKey: 'white-granite' },
  { id: 'home-brown-granite', name: 'Brown granite', textureKey: 'brown-granite' }
];

export function MaterialsOptionsSection({ label, title, lead, options }: MaterialsOptionsSectionProps) {
  return (
    <section className="home-options-section reveal-on-scroll">
      <div className="home-section-heading">
        <span className="section-kicker">{label}</span>
        <h2>{title}</h2>
        <p>{lead}</p>
      </div>
      <div className="home-granite-strip" aria-hidden="true">
        {calmGraniteSwatches.map((swatch) => (
          <GraniteSwatchTile key={swatch.id} swatch={swatch} />
        ))}
      </div>
      <div className="home-options-grid">
        {options.map((option) => (
          <article key={option.title} className="home-option-card">
            <h3>{option.title}</h3>
            <p>{option.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
