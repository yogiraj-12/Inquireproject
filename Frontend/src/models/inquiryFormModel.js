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
      // Corrected URL building that ensures '/api/requests' is always appended
      const apiUrl = import.meta.env.VITE_API_URL || 'https://inquireproject.onrender.com';
      const cleanApiUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
      
      const response = await fetch(`${cleanApiUrl}/api/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.fullName,
          company: data.companyName || 'N/A',
          type: data.projectType === 'web' ? 'Website' : data.projectType === 'mobile' ? 'App' : 'Other',
          budget: 'TBD',
          status: 'Unread'
        }),
      });

      if (!response.ok) throw new Error('API error');
      console.log('Form submitted successfully:', data);
      set({ status: 'success', errorMessage: '' });
      setTimeout(() => set({ status: 'idle' }), 3000);
    } catch (error) {
      set({ status: 'error', errorMessage: 'Something went wrong. Please try again.' });
    }
  }
}));
