import { useEffect, useState } from 'react';

export function useScrollReveal(threshold = 80): { revealed: boolean } {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const check = () => setRevealed(window.scrollY > threshold);
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => {
      window.removeEventListener('scroll', check);
    };
  }, [threshold]);

  return { revealed };
}
