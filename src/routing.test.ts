import { describe, it, expect } from 'vitest';
import { buildLocalizedPath, getRouteSegment, LOCALES, ROUTE_KEYS } from './routing';

describe('routing', () => {
  it('should have supported locales', () => {
    expect(LOCALES).toContain('ru');
    expect(LOCALES).toContain('et');
    expect(LOCALES).toContain('en');
  });

  it('should have core route keys', () => {
    expect(ROUTE_KEYS).toContain('home');
    expect(ROUTE_KEYS).toContain('contact');
    expect(ROUTE_KEYS).toContain('gallery');
  });

  it('should build localized paths correctly', () => {
    // Russian
    expect(buildLocalizedPath('ru', 'home')).toBe('/ru/');
    expect(buildLocalizedPath('ru', 'contact')).toBe('/ru/kontakty');
    
    // Estonian
    expect(buildLocalizedPath('et', 'home')).toBe('/et/');
    expect(buildLocalizedPath('et', 'contact')).toBe('/et/kontakt');

    // English
    expect(buildLocalizedPath('en', 'home')).toBe('/en/');
    expect(buildLocalizedPath('en', 'contact')).toBe('/en/contact');
  });

  it('should get route segments', () => {
    expect(getRouteSegment('ru', 'about')).toBe('o-kompanii');
    expect(getRouteSegment('et', 'about')).toBe('meist');
    expect(getRouteSegment('en', 'about')).toBe('about');
  });
});
