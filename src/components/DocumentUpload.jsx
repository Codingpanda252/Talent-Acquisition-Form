import React, { useState } from 'react';

const DocumentUpload = ({ next, back, dispatch, data }) => {
  const [formData, setFormData] = useState(data);
  const [fieldErrors, setFieldErrors] = useState({});
  
  const requiredFields = ['class10', 'class12', 'grad', 'resume'];
  
  const handleFileChange = e => {
    const fieldName = e.target.name;
    setFormData({ ...formData, [fieldName]: e.target.files[0] });
    
    // Clear error for this field when file is selected
    if (fieldErrors[fieldName]) {
      setFieldErrors({ ...fieldErrors, [fieldName]: '' });
    }
  };
  
  const handleSubmit = () => {
    const errors = {};
    const missing = requiredFields.filter(field => {
      if (!formData[field]) {
        errors[field] = 'This document is required';
        return true;
      }
      return false;
    });
    
    if (missing.length > 0) {
      setFieldErrors(errors);
      return;
    }
    
    dispatch({ type: 'SET_DOCS', payload: formData });
    next();
  };
  
  return (
    <div className="form-section">
      {['class10', 'class12', 'grad', 'postgrad', 'resume', 'recommendation', 'salary', 'others'].map((field) => (
        <div key={field} className="form-group" style={{ position: 'relative' }}>
          <label className="form-label">
            {field.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^(\w)/, c => c.toUpperCase())}
            {requiredFields.includes(field) && <span className="required">*</span>}
          </label>
          <input 
            type="file" 
            name={field} 
            className={`form-input ${fieldErrors[field] ? 'error' : ''}`}
            onChange={handleFileChange} 
          />
          {fieldErrors[field] && (
            <div className="tooltip-error">
              {fieldErrors[field]}
            </div>
          )}
        </div>
      ))}
      <div className="form-navigation">
        <button className="nav-button nav-button-secondary" onClick={back}>Back</button>
        <button className="nav-button nav-button-primary" onClick={handleSubmit}>Next</button>
      </div>
    </div>
  );
};

export default DocumentUpload;
