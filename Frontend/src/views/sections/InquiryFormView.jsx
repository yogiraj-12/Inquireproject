import React, { useEffect, useRef } from 'react';
import LayeredBackground from '../components/LayeredBackground';
import { fadeInUp } from '../../utils/gsapAnimations';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import { companyData } from '../../models/companyData';
import InquiryFormController from '../../controllers/InquiryFormController';

const InquiryFormView = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    fadeInUp(containerRef.current, containerRef.current);
  }, []);

  return (
    <LayeredBackground
      id="contact"
      fallbackGradient="linear-gradient(to top, #12121a, #0a0a0f)"
      themeColor="rgba(18,18,26,0.6)"
    >
      <h2 className="section-heading">Start Your Project</h2>
      <p className="section-subheading">Let's build something great together. Fill out the form below and we'll get back to you within 24 hours.</p>
      
      <div className="inquiry-container" ref={containerRef}>
        {/* Left Side: Contact Info */}
        <div className="contact-info glass-card">
          <h3 style={{ marginBottom: '1.5rem' }}>Contact Information</h3>
          <div className="info-item">
            <MapPin className="info-icon" />
            <span>{companyData.contact.address}</span>
          </div>
          <div className="info-item">
            <Mail className="info-icon" />
            <span>{companyData.contact.email}</span>
          </div>
          <div className="info-item">
            <Phone className="info-icon" />
            <span>{companyData.contact.phone}</span>
          </div>
          <div className="info-item">
            <Clock className="info-icon" />
            <span>{companyData.contact.hours}</span>
          </div>
        </div>

        {/* Right Side: Form Controller */}
        <InquiryFormController />
      </div>
    </LayeredBackground>
  );
};

export default InquiryFormView;
