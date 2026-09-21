import { describe, it, expect, vi } from 'vitest';
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

  it('renders a Plan Your Event button linking to /enquire', () => {
    render(
      <MemoryRouter>
        <MobileDrawer items={nav} isOpen onClose={() => {}} />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: 'Plan Your Event' })).toHaveAttribute('href', '/enquire');
  });

  it('has role="dialog", aria-modal="true", and closes on Escape key', () => {
    const handleClose = vi.fn();
    render(
      <MemoryRouter>
        <MobileDrawer items={nav} isOpen onClose={handleClose} />
      </MemoryRouter>
    );
    const dialog = screen.getByRole('dialog', { name: /Navigation Menu/i });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(document.body.style.overflow).toBe('hidden');

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalled();
  });
});

