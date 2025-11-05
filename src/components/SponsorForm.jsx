import DynamicForm from './DynamicForm';
import { submitSponsorForm } from '../utils/supabase';

export const SponsorForm = () => {
  const sponsorFields = [
    {
      name: 'organizationName',
      label: 'Company/Organization Name',
      type: 'text',
      placeholder: 'Enter your organization name',
      required: true,
      maxLength: 100
    },
    {
      name: 'contactName',
      label: 'Contact Person Name',
      type: 'text',
      placeholder: 'Enter your name',
      required: true,
      maxLength: 50
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'Enter your email address',
      required: true
    },
    {
      name: 'phone',
      label: 'Contact Number',
      type: 'tel',
      placeholder: 'Enter your contact number',
      required: true,
      validation: 'phone'
    },
    {
      name: 'website',
      label: 'Website / LinkedIn URL',
      type: 'url',
      placeholder: 'https://example.com',
      required: false,
      showOptional: true
    },
    {
      name: 'partnershipType',
      label: 'Select Partnership / Sponsorship Type',
      type: 'select',
      required: true,
      options: [
            { value: 'INNOVATION_PARTNER_OF_THE_YEAR', label: 'INNOVATION PARTNER OF THE YEAR : 26 LAKHS' },
            // { value: 'TECHNOLOGY_ENABLER', label: 'TECHNOLOGY TRAILBLAZERS : 10 LAKHS' },
            { value: 'STARTUP_ENABLER', label: 'STARTUP ENABLER : 6 LAKHS' },
            { value: 'INNOVATION_SUPPORTER', label: 'INNOVATION SUPPORTER : 3 LAKHS' },
            // { value: 'EVENT_COLLABORATOR', label: 'EVENT COLLABORATOR : 2 LAKHS' },
            { value: 'OTHER', label: 'OTHER' },
      ]
    },
    {
      name: 'remarks',
      label: 'Remarks',
      type: 'textarea',
      placeholder: 'Add any additional remarks or requirements...',
      rows: 5,
      required: false,
      showOptional: true,
      maxLength: 500
    }
  ];

  const handleSubmit = async (formData) => {
    console.log('Form submitted:', formData);
    
    try {
      // Send to Supabase
      const result = await submitSponsorForm(formData);
      
      if (!result.success) {
        console.error('Failed to submit form:', result.error);
        throw new Error(result.error || 'Failed to submit form');
      }
      
      console.log('Form data saved successfully:', result.data);
      return result;
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      throw error;
    }
  };

  return (
    <DynamicForm
      title="Sponsorship IEDC Summit 2025"
      subtitle="Join us as a partner in this exciting journey"
      fields={sponsorFields}
      submitButtonText="Submit Application"
      onSubmit={handleSubmit}
    />
  );
};