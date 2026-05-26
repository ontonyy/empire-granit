import { useEffect } from 'react';
import { siteConfig } from '../config/site';

export function AnalyticsLoader() {
  useEffect(() => {
    if (siteConfig.analytics.provider === 'none') {
      return;
    }

    const inject = () => {
      const scriptId = `analytics-${siteConfig.analytics.provider}`;
      if (document.getElementById(scriptId)) {
        return;
      }

      const script = document.createElement('script');
      script.id = scriptId;
      script.src = siteConfig.analytics.scriptSrc;
      script.defer = true;

      if (siteConfig.analytics.provider === 'plausible') {
        script.setAttribute('data-domain', siteConfig.analytics.domain);
      }

      document.head.appendChild(script);
    };

    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    if (typeof win.requestIdleCallback === 'function') {
      win.requestIdleCallback(inject, { timeout: 4000 });
    } else {
      const t = window.setTimeout(inject, 2500);
      return () => window.clearTimeout(t);
    }
  }, []);

  return null;
}
