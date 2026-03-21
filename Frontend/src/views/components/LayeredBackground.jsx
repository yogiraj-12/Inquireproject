import React, { useEffect, useRef } from 'react';
import { parallaxLayer } from '../../utils/gsapAnimations';

const LayeredBackground = ({ 
  children, 
  id, 
  videoSrc, 
  fallbackGradient,
  themeColor = 'rgba(10, 10, 15, 0.7)',
  className = '' 
}) => {
  const sectionRef = useRef(null);
  const videoLayerRef = useRef(null);
  const themeLayerRef = useRef(null);
  const contentLayerRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current && videoLayerRef.current) {
      parallaxLayer(videoLayerRef.current, 0.3, sectionRef.current);
    }
    if (sectionRef.current && themeLayerRef.current) {
      parallaxLayer(themeLayerRef.current, 0.1, sectionRef.current);
    }
  }, []);

  return (
    <section id={id} className={`layered-bg ${className}`} ref={sectionRef}>
      {/* Layer 1: Video / Fallback */}
      <div className="video-layer" ref={videoLayerRef}>
        {videoSrc ? (
          <video autoPlay muted loop playsInline>
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <div 
            className="video-fallback" 
            style={{ background: fallbackGradient || 'linear-gradient(45deg, #0a0a0f, #1a1a2e)' }} 
          />
        )}
      </div>

      {/* Layer 2: Theme / Atmosphere */}
      <div 
        className="theme-layer" 
        ref={themeLayerRef}
        style={{ 
          background: `linear-gradient(to bottom, ${themeColor}, rgba(10,10,15,1))`
        }}
      />

      {/* Layer 3: Content */}
      <div className="content-layer" ref={contentLayerRef}>
        {children}
      </div>
    </section>
  );
};

export default LayeredBackground;
