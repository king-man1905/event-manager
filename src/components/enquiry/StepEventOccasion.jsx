import { events } from '../../data/events';
import { getOccasionsForVertical } from '../../data/enquiryOptions';

export default function StepEventOccasion({ formData, onChange, onNext }) {
  const occasions = formData.vertical ? getOccasionsForVertical(formData.vertical) : [];

  function handleSelectVertical(verticalSlug) {
    const selectedEvent = events.find((e) => e.slug === verticalSlug);
    onChange({
      vertical: verticalSlug,
      verticalLabel: selectedEvent ? selectedEvent.label : verticalSlug,
      occasion: '',
      occasionLabel: '',
      services: [], // reset services so contextual services for new vertical apply
    });
  }

  function handleSelectOccasion(occasionItem) {
    onChange({
      occasion: occasionItem.slug,
      occasionLabel: occasionItem.label,
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl text-charcoal sm:text-3xl">What event are you planning?</h2>
        <p className="mt-2 text-sm text-charcoal/70">
          Select the event type to personalize your planning journey.
        </p>
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-widest text-charcoal/60">
          Select Event Category
        </label>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {events.map((event) => {
            const isSelected = formData.vertical === event.slug;
            return (
              <button
                key={event.slug}
                type="button"
                onClick={() => handleSelectVertical(event.slug)}
                className={`flex flex-col items-start p-4 text-left transition-all border ${
                  isSelected
                    ? 'border-gold bg-gold/10 text-charcoal shadow-sm'
                    : 'border-charcoal/10 bg-ivory text-charcoal/80 hover:border-gold/50'
                }`}
              >
                <span className="font-display text-base font-semibold">{event.label}</span>
                <span className="mt-1 text-xs text-charcoal/60 line-clamp-2">{event.teaser}</span>
              </button>
            );
          })}
        </div>
      </div>

      {formData.vertical && occasions.length > 0 && (
        <div className="pt-4 border-t border-charcoal/10">
          <label className="text-xs font-semibold uppercase tracking-widest text-charcoal/60">
            Select Occasion or Ritual (Optional)
          </label>
          <div className="mt-3 flex flex-wrap gap-2">
            {occasions.map((item) => {
              const isSelected = formData.occasion === item.slug;
              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => handleSelectOccasion(item)}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors border ${
                    isSelected
                      ? 'border-gold bg-gold text-charcoal'
                      : 'border-charcoal/15 bg-ivory text-charcoal/80 hover:border-gold'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex justify-end pt-6 border-t border-charcoal/10">
        <button
          type="button"
          onClick={onNext}
          disabled={!formData.vertical}
          className="bg-gold px-8 py-3 font-sans text-xs uppercase tracking-widest font-semibold text-charcoal transition-opacity disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gold/90"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
