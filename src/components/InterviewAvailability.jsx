import React, { useState } from 'react';

const InterviewAvailability = ({ next, back, dispatch, data }) => {
  const [formData, setFormData] = useState(data);
  const [error, setError] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const required = ['email', 'location', 'date', 'time', 'timezone', 'medium'];
    for (let field of required) {
      if (!formData[field]) {
        setError('All fields are required.');
        return;
      }
    }
    dispatch({ type: 'SET_INTERVIEW', payload: formData });
    next();
  };

  return (
    <div className="form-section">
      <div className="form-grid form-grid-2">
        <div className="form-group">
          <label className="form-label">Email<span className="required">*</span></label>
          <input name="email" className="form-input" value={formData.email || ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Location<span className="required">*</span></label>
          <input name="location" className="form-input" value={formData.location || ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Interview Date<span className="required">*</span></label>
          <input name="date" type="date" className="form-input" value={formData.date || ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Interview Time<span className="required">*</span></label>
          <input name="time" type="time" className="form-input" value={formData.time || ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Time Zone<span className="required">*</span></label>
          <select name="timezone" className="form-select" value={formData.timezone || ''} onChange={handleChange}>
            <option value="">Select Timezone</option>
            <option value="IST">IST</option>
            <option value="UTC">UTC</option>
            <option value="EST">EST</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Interview Medium<span className="required">*</span></label>
          <select name="medium" className="form-select" value={formData.medium || ''} onChange={handleChange}>
            <option value="">Select Medium</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="form-navigation">
        <button className="nav-button nav-button-secondary" onClick={back}>Back</button>
        <button className="nav-button nav-button-primary" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default InterviewAvailability;