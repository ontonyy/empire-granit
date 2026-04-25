import type { TestimonialItem } from './sections';

interface TestimonialsSectionProps {
  label: string;
  title: string;
  testimonials: TestimonialItem[];
}

export function TestimonialsSection({ label, title, testimonials }: TestimonialsSectionProps) {
  return (
    <section className="trust-signals testimonials-section reveal-on-scroll">
      <span className="section-kicker">{label}</span>
      <h2>{title}</h2>
      <div className="reviews-grid testimonial-grid">
        {testimonials.map((review) => (
          <article key={`${review.author}-${review.meta}`} className="review-card testimonial-card">
            <span className="quote-mark" aria-hidden="true">
              "
            </span>
            <p>{review.quote}</p>
            <strong>{review.author}</strong>
            <small>{review.meta}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
