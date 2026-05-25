import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LocaleRouteResolver } from './LocaleRouteResolver';
import { HelmetProvider } from 'react-helmet-async';

vi.mock('../lib/analytics', () => ({
  trackEvent: vi.fn(),
}));

describe('LocaleRouteResolver', () => {
  it('should redirect to /et/ if locale is invalid', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/invalid/path']}>
          <Routes>
            <Route path="/:locale/*" element={<LocaleRouteResolver />} />
            <Route path="/et/" element={<div>ET Home</div>} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByText('ET Home')).toBeDefined();
  });

  it('should render WorksPage for /et/tood', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/et/tood']}>
          <Routes>
            <Route path="/:locale/*" element={<LocaleRouteResolver />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(
      screen.getByRole('heading', { name: /Näited valminud lahendustest/i })
    ).toBeDefined();
  });

  it('should redirect legacy /en/about to home', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/en/about']}>
          <Routes>
            <Route path="/:locale/*" element={<LocaleRouteResolver />} />
            <Route path="/en/" element={<div>EN Home</div>} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByText('EN Home')).toBeDefined();
  });

  it('should redirect legacy /et/hauakivid to works', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/et/hauakivid']}>
          <Routes>
            <Route path="/:locale/*" element={<LocaleRouteResolver />} />
            <Route path="/et/tood" element={<div>ET Works</div>} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByText('ET Works')).toBeDefined();
  });
});
