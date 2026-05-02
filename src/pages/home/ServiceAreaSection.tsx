interface ServiceAreaSectionProps {
  label: string;
  title: string;
  lead: string;
  items: string[];
}

export function ServiceAreaSection({ label, title, lead, items }: ServiceAreaSectionProps) {
  return (
    <section className="home-service-area reveal-on-scroll">
      <div>
        <span className="section-kicker">{label}</span>
        <h2>{title}</h2>
        <p>{lead}</p>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

