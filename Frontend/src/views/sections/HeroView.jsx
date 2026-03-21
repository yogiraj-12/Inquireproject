import React, { useEffect, useRef } from 'react';
import LayeredBackground from '../components/LayeredBackground';
import { fastReveal, orbFloat } from '../../utils/gsapAnimations';
import { companyData } from '../../models/companyData';

const HeroView = ({ onNavigate }) => {
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  
  // Orbs refs
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);
  const orb4Ref = useRef(null);

  useEffect(() => {
    // Reveal text elements quickly with a punchy glassmorphic feel
    const elements = [titleRef.current, subtitleRef.current, buttonsRef.current];
    fastReveal(elements, titleRef.current, 0.2);

    // Infinitely float the glowing orbs around the background
    if (orb1Ref.current) orbFloat(orb1Ref.current, 8);
    if (orb2Ref.current) orbFloat(orb2Ref.current, 12);
    if (orb3Ref.current) orbFloat(orb3Ref.current, 9);
    if (orb4Ref.current) orbFloat(orb4Ref.current, 14);
  }, []);

  return (
    <LayeredBackground
      id="home"
      fallbackGradient="none"
      themeColor="transparent"
      className="glass-hero-section"
    >
      {/* Dynamic Background Layer: Glowing Orbs */}
      <div 
        className="glass-orb" 
        ref={orb1Ref}
        style={{ top: '10%', left: '25%', width: '400px', height: '400px', background: 'var(--accent-primary)' }}
      />
      <div 
        className="glass-orb" 
        ref={orb2Ref}
        style={{ bottom: '5%', right: '15%', width: '500px', height: '500px', background: 'var(--accent-secondary)' }}
      />
      <div 
        className="glass-orb" 
        ref={orb3Ref}
        style={{ top: '40%', left: '60%', width: '300px', height: '300px', background: 'var(--accent-tertiary)' }}
      />
      <div 
        className="glass-orb" 
        ref={orb4Ref}
        style={{ top: '60%', left: '10%', width: '350px', height: '350px', background: 'rgba(255, 255, 255, 0.1)' }}
      />

      {/* Main Foreground Content inside a Glass Panel */}
      <div className="hero-content-wrapper" style={{ padding: '0 20px', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div 
          className="glass-panel" 
          ref={contentRef}
          style={{ position: 'relative', zIndex: 10, padding: '4rem 2rem', marginTop: '5rem', maxWidth: '800px', width: '100%', textAlign: 'center' }}
        >
          <h1 className="hero-title text-gradient" ref={titleRef} style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800, margin: '0 auto 1.5rem auto' }}>
            {companyData.tagline}
          </h1>
          <p className="hero-subtitle" ref={subtitleRef} style={{ fontSize: '1.25rem', fontWeight: 400, opacity: 0.9, margin: '0 auto 2.5rem auto', color: 'var(--text-primary)' }}>
            {companyData.description}
          </p>
          <div className="hero-buttons" ref={buttonsRef} style={{ display: 'flex', justifyContent: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
            <button className="glass-button primary" onClick={() => onNavigate('portfolio')}>
              Explore Our Work
            </button>
            <button className="glass-button" onClick={() => onNavigate('contact')}>
              Start a Project
            </button>
          </div>
        </div>
      </div>
    </LayeredBackground>
  );
};

export default HeroView;
