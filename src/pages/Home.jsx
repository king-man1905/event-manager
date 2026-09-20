import Hero from '../components/home/Hero';
import BrandIntro from '../components/home/BrandIntro';
import EventDiscovery from '../components/home/EventDiscovery';
import SectionTeaser from '../components/home/SectionTeaser';
import ServicesCapabilities from '../components/home/ServicesCapabilities';
import HowWeWork from '../components/home/HowWeWork';
import FinalCTA from '../components/home/FinalCTA';
import ContactSection from '../components/home/ContactSection';
import { homeTeasers } from '../data/homeTeasers';

const teaserById = Object.fromEntries(homeTeasers.map((teaser) => [teaser.id, teaser]));

export default function Home() {
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
