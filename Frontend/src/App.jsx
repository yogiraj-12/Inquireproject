import React, { useEffect } from 'react';
import HomePage from './views/pages/HomePage';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.2,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // Exponent easing for very smooth stop
      smoothWheel: true
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0, 0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="app-container">
      <HomePage />
    </div>
  );
}

export default App;
