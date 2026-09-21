import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SmartEnquiry from './SmartEnquiry';

describe('SmartEnquiry Page', () => {
  it('renders page heading and the enquiry wizard', () => {
    render(
      <MemoryRouter>
        <SmartEnquiry />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 1, name: /plan your event/i })).toBeInTheDocument();
    expect(screen.getByText(/what event are you planning/i)).toBeInTheDocument();
  });

  it('extracts query params and initializes context when loaded with params', () => {
    render(
      <MemoryRouter initialEntries={['/enquire?vertical=corporate-events&experience=product-launch']}>
        <SmartEnquiry />
      </MemoryRouter>
    );
    expect(screen.getByText(/planning for:/i)).toBeInTheDocument();
    expect(screen.getByText(/corporate events — product launch/i)).toBeInTheDocument();
    expect(screen.getByText(/where and when will it happen/i)).toBeInTheDocument();
  });
});
