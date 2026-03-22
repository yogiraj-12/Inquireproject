import React, { useEffect, useRef } from 'react';
import LayeredBackground from '../components/LayeredBackground';
import { staggerIn } from '../../utils/gsapAnimations';
import { processData } from '../../models/portfolioData';

const ProcessView = () => {
  const timelineRef = useRef(null);

  useEffect(() => {
    if (timelineRef.current) {
      const steps = timelineRef.current.querySelectorAll('.process-step');
      staggerIn(steps, timelineRef.current, 0.2);
    }
  }, []);

  return (
    <LayeredBackground
      id="process"
      fallbackGradient="linear-gradient(45deg, #0a0a0f, #12121a)"
      themeColor="rgba(10,10,15,0.9)"
    >
      <h2 className="section-heading">How We Work</h2>
      <p className="section-subheading">A proven methodology to turn your vision into reality.</p>
      
      <div className="process-timeline" ref={timelineRef}>
        {processData.map((item) => (
          <div key={item.step} className="process-step">
            <div className="step-number">{item.step}</div>
            <div className="glass-card" style={{ flex: 1 }}>
              <h3 style={{ marginBottom: '0.5rem' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </LayeredBackground>
  );
};

export default ProcessView;
