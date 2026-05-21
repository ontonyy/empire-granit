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
    expect(ROUTE_KEYS).toContain('memorials');
    expect(ROUTE_KEYS).toContain('materials');
    expect(ROUTE_KEYS).toContain('portfolio');
    expect(ROUTE_KEYS).toContain('process');
    expect(ROUTE_KEYS).toContain('preview');
    expect(ROUTE_KEYS).toContain('restorationInstallation');
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
    expect(buildLocalizedPath('en', 'memorials')).toBe('/en/memorials');
    expect(buildLocalizedPath('en', 'materials')).toBe('/en/materials');
    expect(buildLocalizedPath('en', 'portfolio')).toBe('/en/portfolio');
    expect(buildLocalizedPath('en', 'process')).toBe('/en/process');
    expect(buildLocalizedPath('en', 'preview')).toBe('/en/preview');
    expect(buildLocalizedPath('en', 'restorationInstallation')).toBe('/en/services/restoration-installation');
  });

  it('should get route segments', () => {
    expect(getRouteSegment('ru', 'about')).toBe('o-kompanii');
    expect(getRouteSegment('et', 'about')).toBe('meist');
    expect(getRouteSegment('en', 'about')).toBe('about');
    expect(getRouteSegment('ru', 'process')).toBe('process');
    expect(getRouteSegment('et', 'process')).toBe('protsess');
    expect(getRouteSegment('et', 'preview')).toBe('eelvaade');
    expect(getRouteSegment('ru', 'restorationInstallation')).toBe('uslugi/restavratsiya-ustanovka');
    expect(getRouteSegment('et', 'materials')).toBe('materjalid');
  });
});
