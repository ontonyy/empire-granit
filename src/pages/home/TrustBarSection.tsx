import type { TrustMetric } from './sections';

interface TrustBarSectionProps {
  label: string;
  metrics: TrustMetric[];
}

export function TrustBarSection({ label, metrics }: TrustBarSectionProps) {
  return (
    <section
      className={`trust-bar-section reveal-on-scroll${metrics.length === 2 ? ' trust-bar-section-compact' : ''}`}
      aria-label={label}
    >
      {metrics.map((metric, index) => (
        <article key={metric.label} className="trust-bar-item" data-first={index === 0 ? 'true' : undefined}>
          <strong>{metric.value}</strong>
          <span>{metric.label}</span>
        </article>
      ))}
    </section>
  );
}
