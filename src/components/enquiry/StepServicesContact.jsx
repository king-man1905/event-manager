import { useState } from 'react';
import { getServicesForVertical } from '../../data/enquiryOptions';

export default function StepServicesContact({ formData, onChange, onNext, onBack }) {
  const [errors, setErrors] = useState({});
  const availableServices = getServicesForVertical(formData.vertical);

  function toggleService(serviceLabel) {
    const current = formData.services || [];
    const exists = current.includes(serviceLabel);
    const updated = exists
      ? current.filter((s) => s !== serviceLabel)
      : [...current, serviceLabel];
    onChange({ services: updated });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name || !formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }

    const cleanedPhone = (formData.phone || '').replace(/\D/g, '');
    if (!cleanedPhone || cleanedPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onNext();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      <div>
        <h2 className="font-display text-2xl text-charcoal sm:text-3xl">What services do you need?</h2>
        <p className="mt-2 text-sm text-charcoal/70">
          Select all the services you would like us to handle, and provide your contact details.
        </p>
      </div>

      {/* Contextual Services Checklist */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-widest text-charcoal/60">
          Services Required (Select all that apply)
        </label>
        <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {availableServices.map((service) => {
            const isChecked = (formData.services || []).includes(service.label);
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => toggleService(service.label)}
                className={`flex items-center gap-3 p-3 text-left border transition-all ${
                  isChecked
                    ? 'border-gold bg-gold/10 text-charcoal'
                    : 'border-charcoal/15 bg-ivory text-charcoal/80 hover:border-gold/50'
                }`}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center border text-[10px] ${
                    isChecked ? 'border-gold bg-gold text-charcoal font-bold' : 'border-charcoal/30'
                  }`}
                >
                  {isChecked ? '✓' : ''}
                </span>
                <span className="text-xs font-medium">{service.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contact Details */}
      <div className="pt-4 border-t border-charcoal/10 space-y-4">
        <label className="text-xs font-semibold uppercase tracking-widest text-charcoal/60">
          Your Contact Details
        </label>

        <div>
          <label htmlFor="user-name" className="block text-xs font-medium text-charcoal/80">
            Your Name <span className="text-gold">*</span>
          </label>
          <input
            id="user-name"
            type="text"
            value={formData.name || ''}
            onChange={(e) => {
              onChange({ name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: null });
            }}
            placeholder="e.g. Aman Verma"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={`mt-1.5 w-full border bg-ivory px-3.5 py-2.5 text-sm text-charcoal placeholder-charcoal/40 focus:outline-none ${
              errors.name ? 'border-red-500' : 'border-charcoal/20 focus:border-gold'
            }`}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="mt-1 text-xs text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="user-phone" className="block text-xs font-medium text-charcoal/80">
            Phone / WhatsApp Number <span className="text-gold">*</span>
          </label>
          <input
            id="user-phone"
            type="tel"
            value={formData.phone || ''}
            onChange={(e) => {
              onChange({ phone: e.target.value });
              if (errors.phone) setErrors({ ...errors, phone: null });
            }}
            placeholder="e.g. 9876543210"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            className={`mt-1.5 w-full border bg-ivory px-3.5 py-2.5 text-sm text-charcoal placeholder-charcoal/40 focus:outline-none ${
              errors.phone ? 'border-red-500' : 'border-charcoal/20 focus:border-gold'
            }`}
          />
          {errors.phone && (
            <p id="phone-error" role="alert" className="mt-1 text-xs text-red-600">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="user-notes" className="block text-xs font-medium text-charcoal/80">
            Special Requests or Vision (Optional)
          </label>
          <textarea
            id="user-notes"
            rows={3}
            maxLength={250}
            value={formData.notes || ''}
            onChange={(e) => onChange({ notes: e.target.value })}
            placeholder="Tell us any specific ideas, themes, or requirements you have in mind..."
            className="mt-1.5 w-full border border-charcoal/20 bg-ivory p-3 text-sm text-charcoal placeholder-charcoal/40 focus:border-gold focus:outline-none"
          />
        </div>
      </div>

      {/* Nav Controls */}
      <div className="flex justify-between pt-6 border-t border-charcoal/10">
        <button
          type="button"
          onClick={onBack}
          className="border border-charcoal/20 px-6 py-2.5 font-sans text-xs uppercase tracking-widest font-semibold text-charcoal hover:border-charcoal"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-gold px-8 py-3 font-sans text-xs uppercase tracking-widest font-semibold text-charcoal hover:bg-gold/90"
        >
          Review Enquiry
        </button>
      </div>
    </form>
  );
}
