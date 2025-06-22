import React, { useState } from 'react';

const StatementOfPurpose = ({ next, back, dispatch, data }) => {
  const [formData, setFormData] = useState(data);
  const [error, setError] = useState('');

  const questions = [
    "Tell me about a time you were asked to do something you had never done before. How did you react? What did you learn?",
    "Tell me about the last time something significant didn't go according to plan at work. What was your role? What was the outcome?",
    "What are the three things that are most important to you in a job?"
  ];

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const required = ['q1', 'q2', 'q3'];
    for (let field of required) {
      if (!formData[field] || formData[field].split(' ').length > 300) {
        setError('All questions are required and must be under 300 words.');
        return;
      }
    }
    dispatch({ type: 'SET_SOP', payload: formData });
    next();
  };

  return (
    <div className="form-section">
      {['q1', 'q2', 'q3'].map((field, index) => (
        <div key={field} className="form-group">
          <label className="form-label">
            {index + 1}. {questions[index]}<span className="required">*</span>
          </label>
          <textarea
            name={field}
            className="form-textarea"
            placeholder="Enter a description for the long answer"
            value={formData[field] || ''}
            onChange={handleChange}
          />
          <div className={`word-count ${formData[field] && formData[field].split(' ').length > 300 ? 'over-limit' : ''}`}>
            {formData[field] ? formData[field].split(' ').length : 0}/300 word limit
          </div>
        </div>
      ))}
      {error && <p className="error-message">{error}</p>}
      <div className="form-navigation">
        <button className="nav-button nav-button-secondary" onClick={back}>Back</button>
        <button className="nav-button nav-button-primary" onClick={handleSubmit}>Next</button>
      </div>
    </div>
  );
};

export default StatementOfPurpose;