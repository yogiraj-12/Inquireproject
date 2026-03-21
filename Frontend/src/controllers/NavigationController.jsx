import React from 'react';
import Navbar from '../views/components/Navbar';

const NavigationController = () => {
  const links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'process', label: 'Process' },
    { id: 'testimonials', label: 'Testimonials' }
  ];

  const handleNavigate = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return <Navbar links={links} onNavigate={handleNavigate} />;
};

export default NavigationController;
