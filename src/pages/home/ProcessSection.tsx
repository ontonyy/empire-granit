import type { StepItem } from './sections';

interface ProcessSectionProps {
  label: string;
  title: string;
  steps: StepItem[];
}

export function ProcessSection({ label, title, steps }: ProcessSectionProps) {
  return (
    <section className="how-it-works reveal-on-scroll">
      <span className="section-kicker">{label}</span>
      <h2>{title}</h2>
      <div className="steps-grid enhanced-steps-grid">
        {steps.map((step, index) => (
          <article key={step.title} className="step-card enhanced-step-card">
            <span className="step-index">{`0${index + 1}`}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
