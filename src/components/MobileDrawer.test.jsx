import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MobileDrawer from './MobileDrawer';
import { nav } from '../data/nav';

describe('MobileDrawer', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <MemoryRouter>
        <MobileDrawer items={nav} isOpen={false} onClose={() => {}} />
      </MemoryRouter>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('shows the same eight event links as the desktop menu after expanding Events', () => {
    render(
      <MemoryRouter>
        <MobileDrawer items={nav} isOpen onClose={() => {}} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Events' }));
    const eventsItem = nav.find((item) => item.label === 'Events');
    eventsItem.columns[0].links.forEach((link) => {
      expect(screen.getByRole('link', { name: link.label })).toHaveAttribute('href', link.href);
    });
  });
});
