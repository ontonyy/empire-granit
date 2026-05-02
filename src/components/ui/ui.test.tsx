import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Breadcrumb, Button, Card, DisplayHeading, Eyebrow } from './index';

function withRouter(node: React.ReactNode) {
  return <MemoryRouter>{node}</MemoryRouter>;
}

describe('ui primitives', () => {
  it('Eyebrow renders with token class', () => {
    render(<Eyebrow>catalog</Eyebrow>);
    const el = screen.getByText('catalog');
    expect(el.className).toContain('ui-eyebrow');
  });

  it('DisplayHeading renders as level h2', () => {
    render(<DisplayHeading level={2}>Hello</DisplayHeading>);
    const el = screen.getByRole('heading', { level: 2 });
    expect(el.className).toContain('ui-display-2');
  });

  it('Button primary renders an anchor when as=router-link', () => {
    render(withRouter(<Button as="router-link" to="/x" variant="primary">Go</Button>));
    const link = screen.getByRole('link', { name: 'Go' });
    expect(link.getAttribute('href')).toBe('/x');
    expect(link.className).toContain('ui-btn--primary');
  });

  it('Card with `to` prop renders as a router link', () => {
    render(
      withRouter(
        <Card to="/x" imageSrc="/img.png" imageAlt="alt" title="T" description="D" cta="Learn more" />
      )
    );
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe('/x');
    expect(screen.getByText('T')).toBeTruthy();
    expect(screen.getByText('D')).toBeTruthy();
  });

  it('Breadcrumb marks last item as current', () => {
    render(
      withRouter(
        <Breadcrumb items={[{ label: 'Catalog', to: '/catalog' }, { label: 'Borders' }]} />
      )
    );
    const current = screen.getByText('Borders');
    expect(current.getAttribute('aria-current')).toBe('page');
  });
});
