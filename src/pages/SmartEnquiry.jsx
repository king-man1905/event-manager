import { useSearchParams } from 'react-router-dom';
import EnquiryWizard from '../components/enquiry/EnquiryWizard';
import { parseEnquiryParams } from '../utils/enquiryHelpers';
import { usePageMeta } from '../hooks/usePageMeta';

export default function SmartEnquiry() {
  usePageMeta(
    'Plan Your Event | Smart Enquiry | Next Level Events Ranchi',
    'Custom event planning enquiry for weddings, birthdays, corporate and social events across Jharkhand and destination celebrations by Next Level Events.'
  );

  const [searchParams] = useSearchParams();
  const initialValues = parseEnquiryParams(searchParams);

  return (
    <div className="min-h-screen bg-neutral/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-gold">
            Next Level Events
          </p>
          <h1 className="mt-2 font-display text-4xl text-charcoal sm:text-5xl">
            Plan Your Event
          </h1>
          <p className="mt-3 text-sm text-charcoal/70 max-w-xl mx-auto">
            Tell us about your celebration. We craft bespoke décor, seamless coordination, and unforgettable experiences across Jharkhand and beyond.
          </p>
        </div>

        {/* Wizard Container */}
        <EnquiryWizard initialValues={initialValues} />
      </div>
    </div>
  );
}
