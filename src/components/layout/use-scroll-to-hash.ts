import { useEffect } from 'react';

export function useScrollToHash(hash: string, pathname: string) {
  useEffect(() => {
    if (hash) {
      const targetId = hash.slice(1);
      const scrollToTarget = () => {
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ block: 'start' });
        }
      };

      scrollToTarget();
      const timeoutId = window.setTimeout(scrollToTarget, 0);
      return () => window.clearTimeout(timeoutId);
    }

    window.scrollTo(0, 0);
  }, [hash, pathname]);
}
