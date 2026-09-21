import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ScrollToHash from './ScrollToHash';

describe('ScrollToHash', () => {
  beforeEach(() => {
    // jsdom does not implement scrollIntoView or scrollTo; stub them so we can assert on them.
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    delete window.HTMLElement.prototype.scrollIntoView;
    delete window.scrollTo;
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

  it('scrolls to top when there is no hash', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <div id="contact">Contact section</div>
        <ScrollToHash />
      </MemoryRouter>
    );
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
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
