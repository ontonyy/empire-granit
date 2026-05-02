import type { OptionItem } from './sections';

interface MaterialsOptionsSectionProps {
  label: string;
  title: string;
  lead: string;
  options: OptionItem[];
}

export function MaterialsOptionsSection({ label, title, lead, options }: MaterialsOptionsSectionProps) {
  return (
    <section className="home-options-section reveal-on-scroll">
      <div className="home-section-heading">
        <span className="section-kicker">{label}</span>
        <h2>{title}</h2>
        <p>{lead}</p>
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
