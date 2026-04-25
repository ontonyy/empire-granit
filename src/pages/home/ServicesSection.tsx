import type { ServiceItem } from './sections';

interface ServicesSectionProps {
  label: string;
  title: string;
  services: ServiceItem[];
}

export function ServicesSection({ label, title, services }: ServicesSectionProps) {
  return (
    <section className="services-showcase reveal-on-scroll">
      <span className="section-kicker">{label}</span>
      <h2>{title}</h2>
      <div className="services-grid-home">
        {services.map((service) => (
          <article key={service.title} className="service-highlight-card">
            <span className="service-highlight-dot" aria-hidden="true" />
            <h3>{service.title}</h3>
            <p>{service.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
