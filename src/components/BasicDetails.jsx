import React, { useState } from 'react';

const BasicDetails = ({ next, dispatch, data, errors = {} }) => {
  const [formData, setFormData] = useState(data);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    next(formData);
  };

  return (
    <div className="form-section">
      <div className="form-group">
        <label className="form-label">1. Name <span className="required">*</span></label>
        <div className="input-container">
          <input
            type="text"
            name="name"
            className={`form-input ${errors.name ? 'error' : ''}`}
            placeholder="Enter your full name"
            value={formData.name || ''}
            onChange={handleChange}
          />
          {errors.name && (
            <div className="validation-tooltip">
              <div className="tooltip-icon">⚠</div>
              <div className="tooltip-message">{errors.name}</div>
            </div>
          )}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">2. Email <span className="required">*</span></label>
        <div className="input-container">
          <input
            type="email"
            name="email"
            className={`form-input ${errors.email ? 'error' : ''}`}
            placeholder="Example — userid@gmail.com"
            value={formData.email || ''}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="validation-tooltip">
              <div className="tooltip-icon">⚠</div>
              <div className="tooltip-message">{errors.email}</div>
            </div>
          )}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">3. Date of Birth</label>
        <div className="input-container">
          <input
            type="date"
            name="dob"
            className="form-input"
            value={formData.dob || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">4. Contact no <span className="required">*</span></label>
        <div className="input-container">
          <input
            type="tel"
            name="phone"
            className={`form-input ${errors.phone ? 'error' : ''}`}
            placeholder="Enter your 10 digit contact no"
            value={formData.phone || ''}
            onChange={handleChange}
          />
          {errors.phone && (
            <div className="validation-tooltip">
              <div className="tooltip-icon">⚠</div>
              <div className="tooltip-message">{errors.phone}</div>
            </div>
          )}
        </div>
      </div>

      <div className="form-navigation">
        <button className="nav-button nav-button-primary" onClick={handleSubmit}>
          NEXT
        </button>
      </div>

      <style jsx>{`
        .input-container {
          position: relative;
          display: inline-block;
          width: 100%;
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.2s;
        }

        .form-input:focus {
          outline: none;
          border-color: #007bff;
        }

        .form-input.error {
          border-color: #dc3545;
        }

        .validation-tooltip {
          position: absolute;
          top: -45px;
          right: 10px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          padding: 8px 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          z-index: 1000;
          min-width: 200px;
        }

        .validation-tooltip::after {
          content: '';
          position: absolute;
          bottom: -8px;
          right: 20px;
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid white;
        }

        .tooltip-icon {
          background: #ff9500;
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
        }

        .tooltip-message {
          font-size: 14px;
          color: #333;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
        }

        .required {
          color: #dc3545;
        }

        .form-navigation {
          margin-top: 32px;
        }

        .nav-button {
          padding: 12px 24px;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .nav-button-primary {
          background-color: #007bff;
          color: white;
        }

        .nav-button-primary:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default BasicDetails;