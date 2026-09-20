import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ScrollToHash from './ScrollToHash';

describe('ScrollToHash', () => {
  beforeEach(() => {
    // jsdom does not implement scrollIntoView; stub it so we can assert on it.
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    delete window.HTMLElement.prototype.scrollIntoView;
  });

  it('scrolls the element matching the URL hash into view', () => {
    render(
      <MemoryRouter initialEntries={['/#contact']}>
        <div id="contact">Contact section</div>
        <ScrollToHash />
      </MemoryRouter>
    );
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('does nothing when there is no hash', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <div id="contact">Contact section</div>
        <ScrollToHash />
      </MemoryRouter>
    );
    expect(window.HTMLElement.prototype.scrollIntoView).not.toHaveBeenCalled();
  });

  it('renders nothing visible', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <ScrollToHash />
      </MemoryRouter>
    );
    expect(container).toBeEmptyDOMElement();
  });
});
