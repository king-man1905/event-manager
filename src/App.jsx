import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Intro from './components/Intro';
import OurEvents from './components/OurEvents';
import Marquee from './components/Marquee';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Experience from './components/Experience';
import WhyNextLevel from './components/WhyNextLevel';
import BrandStatement from './components/BrandStatement';
import About from './components/About';
import Instagram from './components/Instagram';
import FinalCTA from './components/FinalCTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import MobileActionBar from './components/MobileActionBar';
import useReveal from './hooks/useReveal';

export default function App() {
  useReveal();
  const [portfolioFocus, setPortfolioFocus] = useState(null);

  return (
    <div className="bg-[#0B0B0B] text-light min-h-screen selection:bg-gold selection:text-obsidian pb-16 md:pb-0">
      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] btn-primary text-xs"
        aria-label="Skip to main content"
      >
        Skip to content
      </a>

      {/* 1. Adaptive Navbar */}
      <Navbar />

      <main id="main-content">
        {/* 2. Cinematic Hero */}
        <Hero />

        {/* 3. Editorial Brand Intro */}
        <Intro />

        {/* 3b. Our Events — main category discovery grid (Weddings drills down via modal) */}
        <OurEvents onViewWork={(category) => setPortfolioFocus({ category })} />

        {/* 4. Editorial Marquee Ticker */}
        <Marquee />

        {/* 5. Star Portfolio (Magazine Masonry) */}
        <Portfolio focusRequest={portfolioFocus} />

        {/* 6. Editorial Services Rows (No generic cards) */}
        <Services />

        {/* 7. Subtle Marquee separator */}
        <Marquee />

        {/* 8. Experience Process Storytelling */}
        <Experience />

        {/* 9. The Next Level Difference (Brand Principles) */}
        <WhyNextLevel />

        {/* 10. Full-Bleed Brand Statement Campaign */}
        <BrandStatement />

        {/* 11. Art-Directed About Section */}
        <About />

        {/* 12. Verified Instagram Stories */}
        <Instagram />

        {/* 13. Cinematic Final CTA */}
        <FinalCTA />

        {/* 14. Luxury Contact Section */}
        <Contact />
      </main>

      {/* 15. Minimal Luxury Footer */}
      <Footer />

      {/* Desktop Floating WhatsApp */}
      <FloatingWhatsApp />

      {/* Mobile Sticky Action Bar */}
      <MobileActionBar />
    </div>
  );
}
