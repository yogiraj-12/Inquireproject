import React, { useEffect, useRef } from 'react';
import LayeredBackground from '../components/LayeredBackground';
import { fadeInUp, counterAnimation } from '../../utils/gsapAnimations';
import { companyData } from '../../models/companyData';

const AboutView = () => {
  const textRef = useRef(null);
  const statsRef = useRef(null);
  const numbersRef = useRef([]);

  useEffect(() => {
    fadeInUp(textRef.current, textRef.current);
    fadeInUp(statsRef.current, statsRef.current, 0.2);
    
    numbersRef.current.forEach((el, index) => {
      if (el) counterAnimation(el, companyData.stats[index].value);
    });
  }, []);

  return (
    <LayeredBackground
      id="about"
      fallbackGradient="linear-gradient(135deg, #0a0a0f 0%, #16162a 100%)"
      themeColor="rgba(10,10,15,0.8)"
    >
      <h2 className="section-heading">Who We Are</h2>
      <div ref={textRef}>
        <p className="section-subheading">{companyData.aboutText}</p>
      </div>
      
      <div className="stats-grid" ref={statsRef}>
        {companyData.stats.map((stat, i) => (
          <div key={i} className="stat-item">
            <div className="stat-number">
              <span ref={el => numbersRef.current[i] = el}>0</span>
              {stat.suffix}
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </LayeredBackground>
  );
};

export default AboutView;
