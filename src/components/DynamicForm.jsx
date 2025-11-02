import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import block1 from '../assets/block1.svg';
import block2 from '../assets/block2.svg';
import block3 from '../assets/block3.svg';
import block4 from '../assets/block4.svg';

const DynamicForm = ({ 
  title, 
  subtitle, 
  fields, 
  submitButtonText = "Submit", 
  onSubmit,
  logoSrc = "/iedc-summit-25-logo.png",
  successMessage = "Thank you! Your form has been submitted successfully.",
  backToHome = true
}) => {
  const [formData, setFormData] = useState(() => {
    const initialData = {};
    fields.forEach(field => {
      initialData[field.name] = field.defaultValue || '';
    });
    return initialData;
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    fields.forEach(field => {
      const value = formData[field.name];

      // Required field validation
      if (field.required && !value?.toString().trim()) {
        newErrors[field.name] = `${field.label} is required`;
        return;
      }

      // Skip other validations if field is empty and not required
      if (!value?.toString().trim()) return;

      // Email validation
      if (field.type === 'email' && !/\S+@\S+\.\S+/.test(value)) {
        newErrors[field.name] = 'Please enter a valid email address';
      }

      // Phone validation (basic)
      if (field.type === 'tel' && field.validation === 'phone') {
        if (!/^[0-9]{10,}$/.test(value.replace(/[\s\-\(\)]/g, ''))) {
          newErrors[field.name] = 'Please enter a valid phone number';
        }
      }

      // URL validation
      if (field.type === 'url' && !/^https?:\/\/.+\..+/.test(value)) {
        newErrors[field.name] = 'Please enter a valid URL';
      }

      // Min length validation
      if (field.minLength && value.length < field.minLength) {
        newErrors[field.name] = `Minimum ${field.minLength} characters required`;
      }

      // Max length validation
      if (field.maxLength && value.length > field.maxLength) {
        newErrors[field.name] = `Maximum ${field.maxLength} characters allowed`;
      }

      // Number range validation
      if (field.type === 'number') {
        const numValue = parseFloat(value);
        if (field.min !== undefined && numValue < field.min) {
          newErrors[field.name] = `Minimum value is ${field.min}`;
        }
        if (field.max !== undefined && numValue > field.max) {
          newErrors[field.name] = `Maximum value is ${field.max}`;
        }
      }

      // Custom validation
      if (field.customValidation) {
        const customError = field.customValidation(value, formData);
        if (customError) {
          newErrors[field.name] = customError;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
      setSubmitted(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        const resetData = {};
        fields.forEach(field => {
          resetData[field.name] = field.defaultValue || '';
        });
        setFormData(resetData);
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const renderField = (field) => {
    const baseInputClasses = `w-full px-4 py-3 border-2 rounded-lg font-gilroy-medium focus:outline-none transition ${
      errors[field.name]
        ? 'border-red-500 bg-red-50'
        : 'border-blue-200 focus:border-blue-500 bg-blue-50'
    }`;

    switch (field.type) {
      case 'html':
        return (
          <div dangerouslySetInnerHTML={{ __html: field.content }} />
        );

      case 'file':
        return (
          <div className="file-upload-container">
            <input
              type="file"
              name={field.name}
              onChange={(e) => {
                const file = e.target.files[0];
                setFormData(prev => ({
                  ...prev,
                  [field.name]: file
                }));
                if (errors[field.name]) {
                  setErrors(prev => ({
                    ...prev,
                    [field.name]: ''
                  }));
                }
              }}
              accept={field.accept}
              className="hidden"
              id={`file-${field.name}`}
              disabled={field.disabled}
            />
            <label
              htmlFor={`file-${field.name}`}
              className={`flex items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer transition ${
                errors[field.name]
                  ? 'border-red-500 bg-red-50'
                  : 'border-blue-300 bg-blue-50 hover:bg-blue-100'
              }`}
            >
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-blue-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="mt-2 text-sm text-blue-600 font-gilroy-medium">
                  {formData[field.name]?.name || 'Click to upload or drag and drop'}
                </p>
                {field.accept && (
                  <p className="text-xs text-blue-400 mt-1">
                    {field.accept.split(',').join(', ').toUpperCase()}
                  </p>
                )}
              </div>
            </label>
            {formData[field.name] && (
              <p className="mt-2 text-sm text-green-600 font-gilroy-medium">
                ✓ {formData[field.name].name}
              </p>
            )}
          </div>
        );

      case 'textarea':
        return (
          <textarea
            name={field.name}
            value={formData[field.name]}
            onChange={handleInputChange}
            placeholder={field.placeholder}
            rows={field.rows || 5}
            maxLength={field.maxLength}
            className={`${baseInputClasses} resize-none`}
            disabled={field.disabled}
          />
        );

      case 'select':
        return (
          <select
            name={field.name}
            value={formData[field.name]}
            onChange={handleInputChange}
            className={`${baseInputClasses} appearance-none cursor-pointer`}
            disabled={field.disabled}
          >
            <option value="">-- {field.placeholder || 'Select an option'} --</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              name={field.name}
              checked={formData[field.name]}
              onChange={handleInputChange}
              className="w-5 h-5 text-blue-600 border-2 border-blue-200 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
              disabled={field.disabled}
            />
            <label className="ml-3 text-blue-600 font-gilroy-medium">
              {field.checkboxLabel || field.label}
            </label>
          </div>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map(option => (
              <div key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={formData[field.name] === option.value}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-blue-600 border-2 border-blue-200 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  disabled={field.disabled}
                />
                <label className="ml-3 text-blue-600 font-gilroy-medium">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <input
            type={field.type || 'text'}
            name={field.name}
            value={formData[field.name]}
            onChange={handleInputChange}
            placeholder={field.placeholder}
            maxLength={field.maxLength}
            min={field.min}
            max={field.max}
            step={field.step}
            className={baseInputClasses}
            disabled={field.disabled}
          />
        );
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12 px-4 relative overflow-hidden">
        {/* Decorative Circles */}
        <img src="/Ellipse2.svg" alt="Decorative circle" className="absolute top-20 left-0 w-1/3 opacity-20" />
        <img src="/Ellipse3.svg" alt="Decorative circle" className="absolute bottom-32 right-0 w-1/3 opacity-20" />
        <img src="/Ellipse3.svg" alt="Decorative circle" className="absolute top-40 right-10 w-1/4 opacity-15" />

        {/* Decorative Blocks */}
        <img src={block1} alt="Block 1" className="absolute top-10 left-5 w-24 h-24 opacity-30" />
        <img src={block2} alt="Block 2" className="absolute top-1/3 right-10 w-20 h-20 opacity-25" />
        <img src={block3} alt="Block 3" className="absolute bottom-1/4 left-10 w-28 h-28 opacity-20" />
        <img src={block4} alt="Block 4" className="absolute bottom-10 right-5 w-24 h-24 opacity-25" />

        <div className="max-w-2xl mx-auto mt-[5vh] relative z-10">
          {/* Form Header */}
          <div className="mb-12 text-center">
            {title && (
              <h1 className="text-4xl lg:text-5xl font-bold font-clash-display text-blue-600 mb-2">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-blue-400 text-lg font-gilroy-medium">
                {subtitle}
              </p>
            )}
          </div>

          {submitted && (
            <div className="mb-8 p-4 bg-green-100 border-2 border-green-500 rounded-lg text-center">
              <p className="text-green-700 font-gilroy-bold text-lg">
                ✓ {successMessage}
              </p>
            </div>
          )}

          {/* Form Container */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <div className="space-y-8">
              {fields.map((field, index) => (
                <div key={field.name || index}>
                  {field.type !== 'checkbox' && field.type !== 'html' && (
                    <label className="block text-blue-600 font-gilroy-bold text-sm mb-2">
                      {field.label}
                      {field.required && <span className="text-red-500"> *</span>}
                      {!field.required && field.showOptional && (
                        <span className="text-blue-400 text-xs ml-1">(Optional)</span>
                      )}
                    </label>
                  )}
                  
                  {field.description && field.type !== 'html' && (
                    <p className="text-blue-400 text-sm mb-2 font-gilroy-medium">
                      {field.description}
                    </p>
                  )}

                  {renderField(field)}
                  
                  {field.maxLength && (field.type === 'textarea' || field.type === 'text') && formData[field.name] && (
                    <p className="text-blue-400 text-xs mt-1 text-right">
                      {formData[field.name]?.length || 0} / {field.maxLength}
                    </p>
                  )}

                  {errors[field.name] && field.type !== 'html' && (
                    <p className="text-red-500 text-sm mt-2 font-gilroy-bold">
                      ✗ {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}

              {/* Submit Button */}
              <div className="pt-8">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-clash-display font-bold text-lg py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {submitButtonText}
                </button>
                <p className="text-center text-blue-400 text-sm mt-4 font-gilroy-medium">
                  We will review your application and contact you soon
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Decorative Blocks at Bottom */}
      <img 
        src="/hero-blocks.png" 
        alt="Decorative blocks" 
        className="w-full h-24 object-cover"
      />

      <Footer />
    </div>
  );
};

export default DynamicForm;