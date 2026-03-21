import { create } from 'zustand';

export const useInquiryStore = create((set) => ({
  formData: {
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    projectType: '',
    budget: '',
    timeline: '',
    projectDescription: '',
    howDidYouHear: ''
  },
  status: 'idle', // idle, submitting, success, error
  errorMessage: '',
  updateField: (field, value) => set((state) => ({
    formData: { ...state.formData, [field]: value }
  })),
  submitForm: async (data) => {
    set({ status: 'submitting' });
    try {
      // Actual API call to localhost backend
      const response = await fetch('http://localhost:5000/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.fullName,
          company: data.companyName || 'N/A',
          type: data.projectType === 'web' ? 'Website' : data.projectType === 'mobile' ? 'App' : 'Other',
          budget: 'TBD'
        }),
      });

      if (!response.ok) throw new Error('API error');
      console.log('Form submitted successfully:', data);
      set({ status: 'success', errorMessage: '' });
      // Reset after 3 seconds
      setTimeout(() => set({ status: 'idle' }), 3000);
    } catch (error) {
      set({ status: 'error', errorMessage: 'Something went wrong. Please try again.' });
    }
  }
}));
