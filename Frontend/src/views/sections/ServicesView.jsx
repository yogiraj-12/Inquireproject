import React, { useEffect, useRef } from 'react';
import LayeredBackground from '../components/LayeredBackground';
import { staggerIn } from '../../utils/gsapAnimations';
import { ServiceCard } from '../components/Cards';
import { servicesData } from '../../models/servicesData';

const ServicesView = () => {
  const cardsRef = useRef(null);

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.service-card-anim');
      staggerIn(cards, cardsRef.current, 0.1);
    }
  }, []);

  return (
    <LayeredBackground
      id="services"
      fallbackGradient="linear-gradient(to bottom, #12121a, #0a0a0f)"
      themeColor="rgba(18,18,26,0.8)"
    >
      <h2 className="section-heading">Our Services</h2>
      <p className="section-subheading">Comprehensive digital solutions to drive your business forward.</p>
      
      <div className="grid-container" ref={cardsRef}>
        {servicesData.map((service, index) => (
          <ServiceCard key={index} service={service} className="service-card-anim" />
        ))}
      </div>
    </LayeredBackground>
  );
};

export default ServicesView;
