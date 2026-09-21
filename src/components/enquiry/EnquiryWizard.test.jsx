import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EnquiryWizard from './EnquiryWizard';

describe('EnquiryWizard', () => {
  it('renders Step 1 with all 8 event verticals initially', () => {
    render(<EnquiryWizard />);
    expect(screen.getByText(/what event are you planning/i)).toBeInTheDocument();
    expect(screen.getByText('Weddings')).toBeInTheDocument();
    expect(screen.getByText('Corporate Events')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue/i })).toBeDisabled();
  });

  it('enables Continue when a vertical is selected and shows occasions', () => {
    render(<EnquiryWizard />);
    fireEvent.click(screen.getByText('Weddings'));
    expect(screen.getByText(/select occasion or ritual/i)).toBeInTheDocument();
    const continueBtn = screen.getByRole('button', { name: /continue/i });
    expect(continueBtn).not.toBeDisabled();
  });

  it('navigates through all steps with default Ranchi location and reaches confirmation', () => {
    render(<EnquiryWizard />);
    // Step 1
    fireEvent.click(screen.getByText('Weddings'));
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    // Step 2: Location & Timing (Default Option 1: Ranchi)
    expect(screen.getByText(/where and when will it happen/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^ranchi/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^jharkhand/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^outside jharkhand/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    // Step 3: Services & Contact Details
    expect(screen.getByText(/what services do you need/i)).toBeInTheDocument();
    expect(screen.getByText(/mandap, stage & ritual décor/i)).toBeInTheDocument();

    const submitBtn = screen.getByRole('button', { name: /review enquiry/i });

    // Submitting without name or phone shows validation errors
    fireEvent.click(submitBtn);
    expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();

    // Fill valid contact info
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Aman Verma' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '9876543210' } });
    fireEvent.click(submitBtn);

    // Step 4: Confirmation & Dispatch
    expect(screen.getByText(/your enquiry is ready to send/i)).toBeInTheDocument();
    expect(screen.getByText('Jharkhand — Ranchi')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /send on whatsapp/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /copy summary/i })).toBeInTheDocument();
  });

  it('handles Option 2: Jharkhand district selection with validation', () => {
    render(<EnquiryWizard />);
    fireEvent.click(screen.getByText('Weddings'));
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    // Select Jharkhand service area
    fireEvent.click(screen.getByRole('button', { name: /^jharkhand/i }));
    const select = screen.getByLabelText(/select jharkhand district/i);
    expect(select).toBeInTheDocument();

    // Trying to continue without selecting district triggers error
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(screen.getByText(/please select a jharkhand district/i)).toBeInTheDocument();

    // Select Dhanbad
    fireEvent.change(select, { target: { value: 'Dhanbad' } });
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    // Step 3 reached
    expect(screen.getByText(/what services do you need/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Sunil' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '9876543210' } });
    fireEvent.click(screen.getByRole('button', { name: /review enquiry/i }));

    // Step 4 summary includes district
    expect(screen.getByText('Jharkhand — Dhanbad')).toBeInTheDocument();
  });

  it('handles Option 3: Outside Jharkhand destination selection', () => {
    render(<EnquiryWizard />);
    fireEvent.click(screen.getByText('Corporate Events'));
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    // Select Outside Jharkhand
    fireEvent.click(screen.getByRole('button', { name: /^outside jharkhand/i }));
    const cityInput = screen.getByPlaceholderText(/kolkata, varanasi, puri, jaipur/i);
    expect(cityInput).toBeInTheDocument();
    fireEvent.change(cityInput, { target: { value: 'Kolkata' } });
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    // Step 3
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Aman' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '9876543210' } });
    fireEvent.click(screen.getByRole('button', { name: /review enquiry/i }));

    // Step 4 summary reflects Outside Jharkhand — Kolkata
    expect(screen.getByText('Outside Jharkhand — Kolkata')).toBeInTheDocument();
  });

  it('pre-fills context from initialValues and jumps to Step 2', () => {
    const initialValues = {
      vertical: 'weddings',
      experience: 'haldi',
    };
    render(<EnquiryWizard initialValues={initialValues} />);
    expect(screen.getByText(/where and when will it happen/i)).toBeInTheDocument();
    expect(screen.getByText(/planning for:/i)).toBeInTheDocument();
    expect(screen.getByText(/weddings — haldi/i)).toBeInTheDocument();
  });

  it('gracefully handles invalid query parameters and stays on Step 1', () => {
    const invalidValues = {
      vertical: 'invalid-nonexistent-vertical',
      experience: 'unknown-slug',
    };
    render(<EnquiryWizard initialValues={invalidValues} />);
    expect(screen.getByText(/what event are you planning/i)).toBeInTheDocument();
    expect(screen.queryByText(/where and when will it happen/i)).not.toBeInTheDocument();
  });

  it('allows clicking Edit Details on confirmation to return to earlier steps', () => {
    render(<EnquiryWizard initialValues={{ vertical: 'weddings', experience: 'haldi' }} />);
    // Step 2
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    // Step 3
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Aman' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '9876543210' } });
    fireEvent.click(screen.getByRole('button', { name: /review enquiry/i }));
    // Step 4 reached
    expect(screen.getByText(/your enquiry is ready to send/i)).toBeInTheDocument();

    // Click Edit Details
    fireEvent.click(screen.getByRole('button', { name: /edit details/i }));
    expect(screen.getByText(/what event are you planning/i)).toBeInTheDocument();
  });
});
