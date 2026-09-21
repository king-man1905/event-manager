import Hero from '../components/home/Hero';
import BrandIntro from '../components/home/BrandIntro';
import EventDiscovery from '../components/home/EventDiscovery';
import SectionTeaser from '../components/home/SectionTeaser';
import ServicesCapabilities from '../components/home/ServicesCapabilities';
import HowWeWork from '../components/home/HowWeWork';
import FinalCTA from '../components/home/FinalCTA';
import ContactSection from '../components/home/ContactSection';
import { homeTeasers } from '../data/homeTeasers';
import { usePageMeta } from '../hooks/usePageMeta';

const teaserById = Object.fromEntries(homeTeasers.map((teaser) => [teaser.id, teaser]));

export default function Home() {
  usePageMeta({
    title: 'Next Level Events — Wedding, Birthday & Corporate Event Planners in Ranchi, Jharkhand',
    description:
      'Next Level Events plans and produces weddings, birthdays, corporate events and custom celebrations across Ranchi and Jharkhand. Premium décor, planning and full-day management, end to end.',
  });

  return (
    <>
      <Hero />
      <BrandIntro />
      <EventDiscovery />
      <SectionTeaser teaser={teaserById['weddings-flagship']} />
      <SectionTeaser teaser={teaserById['real-events']} />
      <SectionTeaser teaser={teaserById['inspiration']} />
      <ServicesCapabilities />
      <SectionTeaser teaser={teaserById['transformation']} />
      <SectionTeaser teaser={teaserById['behind-the-event']} />
      <HowWeWork />
      <SectionTeaser teaser={teaserById['locations']} />
      <SectionTeaser teaser={teaserById['social-video']} />
      <FinalCTA />
      <ContactSection />
    </>
  );
}
