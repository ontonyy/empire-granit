import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocaleContent } from '../content';
import { trackEvent } from '../lib/analytics';
import { buildLocalizedPath } from '../routing';
import type { Locale } from '../types';

interface PricingPageProps {
    locale: Locale;
}

export function PricingPage({ locale }: PricingPageProps) {
    const section = getLocaleContent(locale).pricing;
    const navigate = useNavigate();
    const [selectedTierId, setSelectedTierId] = useState<string | null>(null);

    useEffect(() => {
        trackEvent('pricing_page_view', { locale });
    }, [locale]);

    const handleSelectPackage = (packageName: string) => {
        trackEvent('pricing_package_select', {
            locale,
            package: packageName
        });
        const path = buildLocalizedPath(locale, 'contact');
        navigate(`${path}?package=${encodeURIComponent(packageName)}`);
    };

    return (
        <section className="content-panel">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 className="cinzel-font" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{section.heading}</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>{section.intro}</p>
            </div>

            <div className="card-grid">
                {section.tiers.map((tier) => {
                    const isSelected = selectedTierId === tier.id;
                    return (
                        <article
                            key={tier.id}
                            className={`service-card interactive-card ${isSelected ? 'selected-card' : ''}`}
                            onClick={() => {
                                setSelectedTierId(tier.id);
                                trackEvent('pricing_package_view', {
                                    locale,
                                    package: tier.name,
                                    packageId: tier.id
                                });
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            <div style={{ padding: '2rem' }}>
                                <div style={{ marginBottom: '2rem' }}>
                                    <h2 className="cinzel-font" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{tier.name}</h2>
                                    <div style={{
                                        fontSize: '1.6rem',
                                        fontWeight: 700,
                                        color: 'var(--accent)',
                                        marginTop: '1.5rem'
                                    }}>
                                        {tier.price}€
                                    </div>
                                </div>

                                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', minHeight: '3rem', fontSize: '1rem' }}>
                                    {tier.bestFor}
                                </p>

                                <ul className="tier-features" style={{ listStyle: 'none', padding: 0, margin: '2rem 0' }}>
                                    {tier.features.map((feature) => (
                                        <li key={feature} style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ color: 'var(--accent)' }}>✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className={isSelected ? 'btn-primary' : 'btn-secondary'}
                                    style={{ width: '100%', padding: '1rem' }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSelectPackage(tier.name);
                                    }}
                                >
                                    {section.cta}
                                </button>
                            </div>
                        </article>
                    );
                })}
            </div>

            <div className="benefits-section" style={{ marginTop: '5rem' }}>
                <h2 className="cinzel-font" style={{ textAlign: 'center', marginBottom: '3rem' }}>{section.benefits.heading}</h2>
                <div className="benefits-grid">
                    {section.benefits.items.map((item, idx) => (
                        <div key={idx} className="benefit-item">
                            <h3 style={{ color: 'var(--accent)', marginBottom: '0.5rem', fontSize: '1.2rem' }}>{item.title}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
