import { useEffect } from 'react';
import { siteConfig } from '../config/site';

export function AnalyticsLoader() {
  useEffect(() => {
    if (siteConfig.analytics.provider === 'none') {
      return;
    }

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
  }, []);

  return null;
}
