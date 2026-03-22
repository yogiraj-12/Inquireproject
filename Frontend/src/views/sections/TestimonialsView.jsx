import React, { useEffect, useRef } from 'react';
import LayeredBackground from '../components/LayeredBackground';
import { staggerIn } from '../../utils/gsapAnimations';
import { testimonialsData } from '../../models/testimonialsData';

const TestimonialsView = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.testimonial-card');
      staggerIn(cards, gridRef.current, 0.2);
    }
  }, []);

  return (
    <LayeredBackground
      id="testimonials"
      fallbackGradient="linear-gradient(to right, #0a0a0f, #1a1a2e, #0a0a0f)"
      themeColor="rgba(10,10,15,0.7)"
    >
      <h2 className="section-heading">Client Testimonials</h2>
      <p className="section-subheading">Hear what our partners say about working with us.</p>
      
      <div className="grid-container" ref={gridRef}>
        {testimonialsData.map((t) => (
          <div key={t.id} className="glass-card testimonial-card">
            <p style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
              "{t.quote}"
            </p>
            <div>
              <h4 style={{ color: 'var(--accent-secondary)' }}>{t.author}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </LayeredBackground>
  );
};

export default TestimonialsView;
