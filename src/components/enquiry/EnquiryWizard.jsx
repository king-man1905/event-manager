import { useState, useEffect } from 'react';
import StepEventOccasion from './StepEventOccasion';
import StepLocationDate from './StepLocationDate';
import StepServicesContact from './StepServicesContact';
import StepConfirmation from './StepConfirmation';
import { events } from '../../data/events';
import { getOccasionsForVertical } from '../../data/enquiryOptions';

const STEPS = [
  { step: 1, name: 'Event' },
  { step: 2, name: 'Timing & Location' },
  { step: 3, name: 'Services & Details' },
  { step: 4, name: 'Dispatch' },
];

export default function EnquiryWizard({ initialValues = {} }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    vertical: '',
    verticalLabel: '',
    occasion: '',
    occasionLabel: '',
    locationType: 'ranchi',
    district: '',
    destinationCity: '',
    dateMode: 'specific',
    eventDate: '',
    flexibleDate: '',
    guestCount: '',
    services: [],
    name: '',
    phone: '',
    notes: '',
  });

  useEffect(() => {
    if (initialValues.vertical) {
      const match = events.find((e) => e.slug === initialValues.vertical);
      if (!match) {
        // Unrecognized vertical: do not advance, stay on Step 1 cleanly
        return;
      }

      const verticalLabel = match.label;
      let occasionLabel = '';

      if (initialValues.experience) {
        const occasions = getOccasionsForVertical(match.slug);
        const occMatch = occasions.find((o) => o.slug === initialValues.experience);
        if (occMatch) {
          occasionLabel = occMatch.label;
        }
      }

      setFormData((prev) => ({
        ...prev,
        vertical: match.slug,
        verticalLabel,
        occasion: occasionLabel ? initialValues.experience : '',
        occasionLabel,
        locationType: initialValues.locationType || prev.locationType,
        district: initialValues.district || prev.district,
        destinationCity: initialValues.destinationCity || prev.destinationCity,
      }));

      // Automatically advance to Step 2 so user doesn't re-enter context
      setCurrentStep(2);
    }
  }, [initialValues.vertical, initialValues.experience, initialValues.locationType, initialValues.district, initialValues.destinationCity]);

  function updateFormData(fields) {
    setFormData((prev) => ({ ...prev, ...fields }));
  }

  return (
    <div className="bg-ivory border border-charcoal/10 shadow-sm p-6 sm:p-10">
      {/* Context Badge (when pre-filled from an experience page) */}
      {formData.vertical && currentStep > 1 && (
        <div className="mb-6 flex items-center justify-between bg-gold/10 px-4 py-2 text-xs border border-gold/30">
          <span className="text-charcoal font-medium">
            Planning for:{' '}
            <strong className="text-charcoal font-semibold">
              {formData.verticalLabel}
              {formData.occasionLabel ? ` — ${formData.occasionLabel}` : ''}
            </strong>
          </span>
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className="text-gold uppercase tracking-wider font-semibold underline hover:text-gold/80 ml-2"
          >
            Change
          </button>
        </div>
      )}

      {/* Accessible Step Progress Indicator */}
      <nav aria-label="Enquiry progress" className="mb-8 border-b border-charcoal/10 pb-4">
        <ol className="flex items-center justify-between text-xs">
          {STEPS.map((s) => {
            const isCurrent = currentStep === s.step;
            const isCompleted = currentStep > s.step;
            return (
              <li
                key={s.step}
                aria-current={isCurrent ? 'step' : undefined}
                className={`flex items-center gap-2 ${
                  isCurrent
                    ? 'font-semibold text-gold'
                    : isCompleted
                    ? 'text-charcoal font-medium'
                    : 'text-charcoal/40'
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                    isCurrent
                      ? 'bg-gold text-charcoal'
                      : isCompleted
                      ? 'bg-charcoal text-ivory'
                      : 'border border-charcoal/20 text-charcoal/40'
                  }`}
                >
                  {isCompleted ? '✓' : s.step}
                </span>
                <span className="hidden sm:inline">{s.name}</span>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Step Renderings */}
      {currentStep === 1 && (
        <StepEventOccasion
          formData={formData}
          onChange={updateFormData}
          onNext={() => setCurrentStep(2)}
        />
      )}

      {currentStep === 2 && (
        <StepLocationDate
          formData={formData}
          onChange={updateFormData}
          onNext={() => setCurrentStep(3)}
          onBack={() => setCurrentStep(1)}
        />
      )}

      {currentStep === 3 && (
        <StepServicesContact
          formData={formData}
          onChange={updateFormData}
          onNext={() => setCurrentStep(4)}
          onBack={() => setCurrentStep(2)}
        />
      )}

      {currentStep === 4 && (
        <StepConfirmation
          formData={formData}
          onEdit={() => setCurrentStep(1)}
        />
      )}
    </div>
  );
}
