import { describe, it, expect } from 'vitest';
import { buildLocalizedPath, getRouteSegment, LOCALES, ROUTE_KEYS } from './routing';

describe('routing', () => {
  it('should have supported locales', () => {
    expect(LOCALES).toContain('ru');
    expect(LOCALES).toContain('et');
    expect(LOCALES).toContain('en');
  });

  it('should have core route keys', () => {
    expect(ROUTE_KEYS).toEqual(['home', 'works', 'pricing', 'contact', 'privacy']);
  });

  it('should build localized paths correctly', () => {
    expect(buildLocalizedPath('ru', 'home')).toBe('/ru/');
    expect(buildLocalizedPath('ru', 'contact')).toBe('/ru/kontakty');
    expect(buildLocalizedPath('ru', 'works')).toBe('/ru/raboty');

    expect(buildLocalizedPath('et', 'home')).toBe('/et/');
    expect(buildLocalizedPath('et', 'contact')).toBe('/et/kontakt');
    expect(buildLocalizedPath('et', 'works')).toBe('/et/tood');

    expect(buildLocalizedPath('en', 'home')).toBe('/en/');
    expect(buildLocalizedPath('en', 'contact')).toBe('/en/contact');
    expect(buildLocalizedPath('en', 'works')).toBe('/en/works');
    expect(buildLocalizedPath('en', 'pricing')).toBe('/en/pricing');
    expect(buildLocalizedPath('en', 'privacy')).toBe('/en/privacy-policy');
  });

  it('should get route segments', () => {
    expect(getRouteSegment('ru', 'works')).toBe('raboty');
    expect(getRouteSegment('et', 'works')).toBe('tood');
    expect(getRouteSegment('en', 'works')).toBe('works');
    expect(getRouteSegment('et', 'pricing')).toBe('hinnakiri');
    expect(getRouteSegment('ru', 'privacy')).toBe('politika-konfidentsialnosti');
  });
});
