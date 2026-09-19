import { useEffect } from 'react';

/**
 * useReveal — Intersection Observer hook for scroll-triggered reveal animations.
 * Applies 'visible' class to elements with 'reveal' or 'clip-reveal' classes.
 */
export function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.reveal, .clip-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

export default useReveal;
