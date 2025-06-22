import React from 'react';

const Success = ({ state }) => {
  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M2.25 12a9.75 9.75 0 1119.5 0 9.75 9.75 0 01-19.5 0zm14.03-2.28a.75.75 0 10-1.06-1.06L10.5 13.44l-1.72-1.72a.75.75 0 10-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l4.25-4.25z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="success-title">Form Submitted Successfully!</h2>
        <p className="success-message">
          Thank you for submitting your application. We'll be in touch shortly.
        </p>
      </div>
    </div>
  );
};

export default Success;
