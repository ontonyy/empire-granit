import type { CareItem } from './sections';

interface GuaranteeCareSectionProps {
  label: string;
  title: string;
  lead: string;
  items: CareItem[];
}

export function GuaranteeCareSection({ label, title, lead, items }: GuaranteeCareSectionProps) {
  return (
    <section className="home-care-section reveal-on-scroll">
      <div className="home-care-intro">
        <span className="section-kicker">{label}</span>
        <h2>{title}</h2>
        <p>{lead}</p>
      </div>
      <div className="home-care-list">
        {items.map((item, index) => (
          <article key={item.title} className="home-care-item">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
