import { useState } from 'react';
import { GUEST_COUNT_OPTIONS } from '../../data/enquiryOptions';
import { JHARKHAND_DISTRICTS } from '../../data/locationsData';

export default function StepLocationDate({ formData, onChange, onNext, onBack }) {
  const [districtError, setDistrictError] = useState(false);
  const locationType = formData.locationType || 'ranchi';

  function handleContinue() {
    if (locationType === 'jharkhand' && (!formData.district || !formData.district.trim())) {
      setDistrictError(true);
      return;
    }
    setDistrictError(false);
    onNext();
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl text-charcoal sm:text-3xl">Where and when will it happen?</h2>
        <p className="mt-2 text-sm text-charcoal/70">
          Based in Ranchi, serving celebrations across Jharkhand — with outstation events available on enquiry.
        </p>
      </div>

      {/* 3-Level Location Selection */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-widest text-charcoal/60">
          Location Scope
        </label>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {/* OPTION 1: Ranchi */}
          <button
            type="button"
            onClick={() => {
              onChange({ locationType: 'ranchi', district: 'Ranchi', destinationCity: '' });
              setDistrictError(false);
            }}
            className={`p-4 text-left border transition-all ${
              locationType === 'ranchi'
                ? 'border-gold bg-gold/10 text-charcoal shadow-sm'
                : 'border-charcoal/10 bg-ivory text-charcoal/80 hover:border-gold/50'
            }`}
          >
            <p className="font-display text-base font-semibold">Ranchi</p>
            <span className="inline-block mt-1 text-[11px] font-semibold text-gold uppercase tracking-wider">
              Primary Studio & HQ
            </span>
            <p className="mt-1 text-xs text-charcoal/60">
              Our headquarters and main design studio on Kanke Road.
            </p>
          </button>

          {/* OPTION 2: Jharkhand — Select District */}
          <button
            type="button"
            onClick={() => {
              onChange({ locationType: 'jharkhand', district: '', destinationCity: '' });
              setDistrictError(false);
            }}
            className={`p-4 text-left border transition-all ${
              locationType === 'jharkhand'
                ? 'border-gold bg-gold/10 text-charcoal shadow-sm'
                : 'border-charcoal/10 bg-ivory text-charcoal/80 hover:border-gold/50'
            }`}
          >
            <p className="font-display text-base font-semibold">Jharkhand</p>
            <span className="inline-block mt-1 text-[11px] font-semibold text-charcoal/70 uppercase tracking-wider">
              Service Area Across Districts
            </span>
            <p className="mt-1 text-xs text-charcoal/60">
              Active service area across Jharkhand districts, executed by our core team.
            </p>
          </button>

          {/* OPTION 3: Outside Jharkhand — Destination */}
          <button
            type="button"
            onClick={() => {
              onChange({ locationType: 'outside-jharkhand', district: '' });
              setDistrictError(false);
            }}
            className={`p-4 text-left border transition-all ${
              locationType === 'outside-jharkhand'
                ? 'border-gold bg-gold/10 text-charcoal shadow-sm'
                : 'border-charcoal/10 bg-ivory text-charcoal/80 hover:border-gold/50'
            }`}
          >
            <p className="font-display text-base font-semibold">Outside Jharkhand</p>
            <span className="inline-block mt-1 text-[11px] font-semibold text-charcoal/70 uppercase tracking-wider">
              Outstation & Destination
            </span>
            <p className="mt-1 text-xs text-charcoal/60">
              Destination and outstation celebrations on enquiry.
            </p>
          </button>
        </div>

        {/* District Selector for Option 2 */}
        {locationType === 'jharkhand' && (
          <div className="mt-4 p-4 border border-charcoal/15 bg-neutral/20 animate-fadeIn">
            <label htmlFor="jharkhand-district" className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80">
              Select Jharkhand District (Service Area) <span className="text-gold">*</span>
            </label>
            <p className="text-xs text-charcoal/60 mt-0.5 mb-2">
              Our Ranchi production and styling crew deploys directly to your chosen venue.
            </p>
            <select
              id="jharkhand-district"
              value={formData.district || ''}
              onChange={(e) => {
                onChange({ district: e.target.value });
                if (districtError) setDistrictError(false);
              }}
              aria-invalid={districtError}
              aria-describedby={districtError ? 'district-error' : undefined}
              className={`w-full sm:w-80 border bg-ivory px-3.5 py-2 text-sm text-charcoal focus:outline-none ${
                districtError ? 'border-red-500' : 'border-charcoal/20 focus:border-gold'
              }`}
            >
              <option value="">-- Choose Jharkhand District --</option>
              {JHARKHAND_DISTRICTS.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
            {districtError && (
              <p id="district-error" role="alert" className="mt-1.5 text-xs text-red-600">
                Please select a Jharkhand district.
              </p>
            )}
          </div>
        )}

        {/* Destination City Input for Option 3 */}
        {locationType === 'outside-jharkhand' && (
          <div className="mt-4 p-4 border border-charcoal/15 bg-neutral/20 animate-fadeIn">
            <label htmlFor="destination-city" className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80">
              City or Destination Name (Outstation)
            </label>
            <p className="text-xs text-charcoal/60 mt-0.5 mb-2">
              Tell us where outside Jharkhand your celebration will take place.
            </p>
            <input
              id="destination-city"
              type="text"
              value={formData.destinationCity || ''}
              onChange={(e) => onChange({ destinationCity: e.target.value })}
              placeholder="e.g. Kolkata, Varanasi, Puri, Jaipur, etc."
              className="w-full sm:w-80 border border-charcoal/20 bg-ivory px-3.5 py-2 text-sm text-charcoal placeholder-charcoal/40 focus:border-gold focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* Date Section */}
      <div className="pt-4 border-t border-charcoal/10">
        <label className="text-xs font-semibold uppercase tracking-widest text-charcoal/60">
          Target Date or Timing
        </label>
        <div className="mt-3 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onChange({ dateMode: 'specific' })}
            className={`px-4 py-2 text-xs font-medium border transition-colors ${
              formData.dateMode === 'specific'
                ? 'border-gold bg-gold text-charcoal'
                : 'border-charcoal/15 bg-ivory text-charcoal/80 hover:border-gold'
            }`}
          >
            Exact Date
          </button>
          <button
            type="button"
            onClick={() => onChange({ dateMode: 'flexible' })}
            className={`px-4 py-2 text-xs font-medium border transition-colors ${
              formData.dateMode === 'flexible'
                ? 'border-gold bg-gold text-charcoal'
                : 'border-charcoal/15 bg-ivory text-charcoal/80 hover:border-gold'
            }`}
          >
            Flexible / Month Only
          </button>
          <button
            type="button"
            onClick={() => onChange({ dateMode: 'undecided' })}
            className={`px-4 py-2 text-xs font-medium border transition-colors ${
              formData.dateMode === 'undecided'
                ? 'border-gold bg-gold text-charcoal'
                : 'border-charcoal/15 bg-ivory text-charcoal/80 hover:border-gold'
            }`}
          >
            Date Not Fixed Yet
          </button>
        </div>

        {formData.dateMode === 'specific' && (
          <div className="mt-4">
            <label htmlFor="event-date" className="block text-xs font-medium text-charcoal/80">
              Select Event Date
            </label>
            <input
              id="event-date"
              type="date"
              value={formData.eventDate || ''}
              onChange={(e) => onChange({ eventDate: e.target.value })}
              className="mt-1.5 border border-charcoal/20 bg-ivory px-3.5 py-2 text-sm text-charcoal focus:border-gold focus:outline-none"
            />
          </div>
        )}

        {formData.dateMode === 'flexible' && (
          <div className="mt-4">
            <label htmlFor="flexible-date" className="block text-xs font-medium text-charcoal/80">
              Target Month & Year
            </label>
            <input
              id="flexible-date"
              type="text"
              value={formData.flexibleDate || ''}
              onChange={(e) => onChange({ flexibleDate: e.target.value })}
              placeholder="e.g. December 2026 or Early 2027"
              className="mt-1.5 w-full sm:w-80 border border-charcoal/20 bg-ivory px-3.5 py-2 text-sm text-charcoal placeholder-charcoal/40 focus:border-gold focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* Guest Scale Section */}
      <div className="pt-4 border-t border-charcoal/10">
        <label className="text-xs font-semibold uppercase tracking-widest text-charcoal/60">
          Estimated Guest Count (Optional)
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          {GUEST_COUNT_OPTIONS.map((option) => {
            const isSelected = formData.guestCount === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => onChange({ guestCount: option })}
                className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
                  isSelected
                    ? 'border-gold bg-gold text-charcoal'
                    : 'border-charcoal/15 bg-ivory text-charcoal/80 hover:border-gold'
                }`}
              >
                {option}
              </button>
            );
          })}
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
          type="button"
          onClick={handleContinue}
          className="bg-gold px-8 py-3 font-sans text-xs uppercase tracking-widest font-semibold text-charcoal hover:bg-gold/90"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
