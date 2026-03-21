import React from 'react';
import NavigationController from '../../controllers/NavigationController';
import HeroView from '../sections/HeroView';
import AboutView from '../sections/AboutView';
import ServicesView from '../sections/ServicesView';
import PortfolioView from '../sections/PortfolioView';
import ProcessView from '../sections/ProcessView';
import TestimonialsView from '../sections/TestimonialsView';
import InquiryFormView from '../sections/InquiryFormView';
import Footer from '../components/Footer';

const HomePage = () => {
  const handleNavigate = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <div className="app-wrapper">
      <NavigationController />
      <HeroView onNavigate={handleNavigate} />
      <AboutView />
      <ServicesView />
      <PortfolioView />
      <ProcessView />
      <TestimonialsView />
      <InquiryFormView />
      <Footer />
    </div>
  );
};

export default HomePage;
