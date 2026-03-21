import React from 'react';
import { useForm } from 'react-hook-form';
import { useInquiryStore } from '../models/inquiryFormModel';

const InquiryFormController = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { submitForm, status, errorMessage } = useInquiryStore();

  const onSubmit = (data) => {
    submitForm(data);
  };

  if (status === 'success') {
    return (
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '400px' }}>
        <h3 style={{ color: 'var(--success)', marginBottom: '1rem', fontSize: '2rem' }}>Message Sent!</h3>
        <p>Thank you for reaching out. We will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <div className="glass-card">
      <form onSubmit={handleSubmit(onSubmit)} className="form-grid">
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input 
            type="text" 
            className="form-input" 
            {...register('fullName', { required: 'Name is required' })} 
          />
          {errors.fullName && <span style={{ color: 'var(--error)', fontSize: '0.8rem' }}>{errors.fullName.message}</span>}
        </div>
        
        <div className="form-group">
          <label className="form-label">Email Address *</label>
          <input 
            type="email" 
            className="form-input" 
            {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })} 
          />
          {errors.email && <span style={{ color: 'var(--error)', fontSize: '0.8rem' }}>Valid email required</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Company Name</label>
          <input type="text" className="form-input" {...register('companyName')} />
        </div>

        <div className="form-group">
          <label className="form-label">Project Type</label>
          <select className="form-select" {...register('projectType')}>
            <option value="">Select a type...</option>
            <option value="web">Web Application</option>
            <option value="mobile">Mobile Application</option>
            <option value="custom">Custom Software</option>
            <option value="uiux">UI/UX Design</option>
          </select>
        </div>

        <div className="form-group full-width">
          <label className="form-label">Project Description *</label>
          <textarea 
            className="form-textarea" 
            placeholder="Tell us about your project, goals, and any specific requirements..."
            {...register('projectDescription', { 
              required: 'Please provide some details', 
              minLength: { value: 50, message: 'Minimum 50 characters required' } 
            })}
          ></textarea>
          {errors.projectDescription && <span style={{ color: 'var(--error)', fontSize: '0.8rem' }}>{errors.projectDescription.message}</span>}
        </div>

        <div className="form-group full-width" style={{ marginTop: '1rem' }}>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending...' : 'Submit Inquiry'}
          </button>
          {errorMessage && <p style={{ color: 'var(--error)', marginTop: '1rem', textAlign: 'center' }}>{errorMessage}</p>}
        </div>
      </form>
    </div>
  );
};

export default InquiryFormController;
