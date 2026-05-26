import { useEffect, useRef, useState } from 'react';

interface WorkshopMapProps {
  src: string;
  title: string;
}

export function WorkshopMap({ src, title }: WorkshopMapProps) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active || typeof IntersectionObserver === 'undefined') {
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: '300px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [active]);

  return (
    <div ref={ref} className="contact-n3__map-inner">
      {active ? (
        <iframe
          title={title}
          src={src}
          width="100%"
          height="480"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="contact-n3__map-placeholder" aria-hidden="true" />
      )}
    </div>
  );
}
