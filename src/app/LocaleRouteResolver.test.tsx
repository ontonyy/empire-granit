import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LocaleRouteResolver } from './LocaleRouteResolver';
import { HelmetProvider } from 'react-helmet-async';

// Mock analytics to avoid Firebase issues in tests
vi.mock('../lib/analytics', () => ({
  trackEvent: vi.fn(),
}));

describe('LocaleRouteResolver', () => {
  it('should redirect to /ru/ if locale is invalid', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/invalid/path']}>
          <Routes>
            <Route path="/:locale/*" element={<LocaleRouteResolver />} />
            <Route path="/ru/" element={<div>RU Home</div>} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByText('RU Home')).toBeDefined();
  });

  it('should render HomePage for /ru/', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/ru/']}>
          <Routes>
            <Route path="/:locale/*" element={<LocaleRouteResolver />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );

    // Use a unique string from HomePage to verify it rendered.
    expect(screen.getByText(/Памятники, установка и благоустройство мест захоронения/i)).toBeDefined();
  });

  it('should render AboutPage for /en/about', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/en/about']}>
          <Routes>
            <Route path="/:locale/*" element={<LocaleRouteResolver />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );

    // "About the Company" is the title for EN
    expect(screen.getByText(/About the Company/i)).toBeDefined();
  });
});
