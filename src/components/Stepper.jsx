import React from 'react';

const Stepper = ({ step }) => {
  const steps = ['Basic Details', 'Documents', 'SOP', 'Availability', 'Done'];

  return (
    <div className="progress-container">
      <div className="progress-steps">
        {steps.map((label, index) => (
          <div key={index} className="step-item">
            <div className={`step-icon ${
              index + 1 < step
                ? 'completed'
                : index + 1 === step
                ? 'active'
                : 'inactive'
            }`}>
              {index + 1}
            </div>
            <div className="step-label">
              <span
                className={`step-text ${
                  index + 1 < step
                    ? 'completed'
                    : index + 1 === step
                    ? 'active'
                    : 'inactive'
                }`}
              >
                {label}
              </span>
            </div>
            {index !== steps.length - 1 && (
              <div
                className={`step-connector ${index + 1 < step ? 'completed' : ''}`}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;