import { siteConfig } from '../../config/site';

interface TrustMetric {
  value: string;
  label: string;
}

interface IntroRowProps {
  intro: string;
  phoneEyebrow: string;
  trustMetrics: TrustMetric[];
}

export function IntroRow({ intro, phoneEyebrow, trustMetrics }: IntroRowProps) {
  const metrics = trustMetrics.slice(0, 3);
  return (
    <section className="home-intro">
      <div className="ui-container">
        <div className="home-intro__row">
          <p className="home-intro__lead">{intro}</p>
          <div className="home-intro__phone">
            <span className="ui-eyebrow">{phoneEyebrow}</span>
            <a className="home-intro__phone-number" href={siteConfig.contacts.phoneLink}>
              {siteConfig.contacts.phoneDisplay}
            </a>
          </div>
        </div>
        <ul className="home-intro__trust" role="list">
          {metrics.map((m) => (
            <li key={m.label} className="home-intro__trust-item">
              <strong>{m.value}</strong> {m.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
