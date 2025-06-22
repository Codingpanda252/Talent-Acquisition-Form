import React, { useReducer, useState } from 'react';
import Stepper from './components/Stepper';
import BasicDetails from './components/BasicDetails';
import DocumentUpload from './components/DocumentUpload';
import StatementOfPurpose from './components/StatementOfPurpose';
import InterviewAvailability from './components/InterviewAvailability';
import Success from './components/Success';
import './index.css';

const initialState = {
  basicDetails: {},
  documents: {},
  sop: {},
  interview: {},
  errors: {}
};

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_BASIC':
      return { ...state, basicDetails: action.payload };
    case 'SET_DOCS':
      return { ...state, documents: action.payload };
    case 'SET_SOP':
      return { ...state, sop: action.payload };
    case 'SET_INTERVIEW':
      return { ...state, interview: action.payload };
    case 'SET_ERRORS':
      return { ...state, errors: action.payload };
    case 'CLEAR_ERRORS':
      return { ...state, errors: {} };
    default:
      return state;
  }
}

const stepHeaderContent = {
  1: {
    title: 'Basic Details Form',
    description: 'Collect information from candidates on their education, work experience, and contact number.',
  },
  2: {
    title: 'Document Collection Form',
    description: 'Upload academic, employment, and financial documents to proceed with application processing.',
  },
  3: {
    title: 'Statement of Purpose Form',
    description: 'Provide detailed answers about your goals, experiences, and values to support your application.',
  },
  4: {
    title: 'Interview Availability Form',
    description: 'Let us know your preferred time, timezone, and medium for scheduling your interview.',
  },
};

const App = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [step, setStep] = useState(1);

  const next = () => setStep(prev => Math.min(prev + 1, 5));
  const back = () => setStep(prev => Math.max(prev - 1, 1));
  const goToStep = (s) => setStep(s);

  const currentStepHeader = stepHeaderContent[step];

  const handleBasicNext = (data) => {
    const { name, email, phone } = data;
    const errors = {};
    
    if (!name) errors.name = 'Please fill out this field.';
    if (!email) errors.email = 'Please fill out this field.';
    if (!phone) errors.phone = 'Please fill out this field.';
    
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', payload: errors });
      return;
    }
    
    dispatch({ type: 'CLEAR_ERRORS' });
    dispatch({ type: 'SET_BASIC', payload: data });
    next();
  };

  const handleDocumentNext = (data) => {
    const requiredDocs = ['resume', 'transcript', 'idProof'];
    const docLabels = {
      resume: 'Resume/CV',
      transcript: 'Academic Transcript', 
      idProof: 'ID Proof'
    };
    const errors = {};

    for (let doc of requiredDocs) {
      if (!data[doc]) {
        errors[doc] = 'Please fill out this field.';
      }
    }
    
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', payload: errors });
      return;
    }
    
    dispatch({ type: 'CLEAR_ERRORS' });
    dispatch({ type: 'SET_DOCS', payload: data });
    next();
  };

  const handleSOPNext = (data) => {
    const questions = ['q1', 'q2', 'q3'];
    const errors = {};

    for (let field of questions) {
      if (!data[field]) {
        errors[field] = 'Please fill out this field.';
      } else if (data[field].split(' ').length > 300) {
        errors[field] = 'Please ensure your answer is under 300 words.';
      }
    }
    
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', payload: errors });
      return;
    }
    
    dispatch({ type: 'CLEAR_ERRORS' });
    dispatch({ type: 'SET_SOP', payload: data });
    next();
  };

  const handleInterviewNext = (data) => {
    const { date, time, timezone, medium } = data;
    const errors = {};
    
    if (!date) errors.date = 'Please fill out this field.';
    if (!time) errors.time = 'Please fill out this field.';
    if (!timezone) errors.timezone = 'Please fill out this field.';
    if (!medium) errors.medium = 'Please fill out this field.';
    
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', payload: errors });
      return;
    }
    
    dispatch({ type: 'CLEAR_ERRORS' });
    dispatch({ type: 'SET_INTERVIEW', payload: data });
    next();
  };

  return (
    <div className="main-layout" style={{ overflow: 'hidden', height: '100vh' }}>
      <aside className="template-sidebar">
        <ul className="template-list">
          <li className="template-item" onClick={() => goToStep(1)}>New Form</li>
          <h2 className="sidebar-title">Explore the following Templates:</h2>
          <li className={`template-item ${step === 1 ? 'active' : ''}`} onClick={() => goToStep(1)}>Details Collection</li>
          <li className={`template-item ${step === 2 ? 'active' : ''}`} onClick={() => goToStep(2)}>Document Collection</li>
          <li className={`template-item ${step === 3 ? 'active' : ''}`} onClick={() => goToStep(3)}>Statement of Purpose</li>
          <li className={`template-item ${step === 4 ? 'active' : ''}`} onClick={() => goToStep(4)}>Interview Availability</li>
        </ul>
      </aside>

      <main className="form-preview-area" style={{ overflow: 'auto', height: '100vh' }}>
        <header className="form-header">
          <p className="form-subtitle">Please fill out all steps to complete your submission.</p>
        </header>

        <Stepper step={step} />

        <div className="form-preview-header">
          <div className="form-preview-title">{currentStepHeader.title}</div>
          <div className="form-preview-description">{currentStepHeader.description}</div>
          <div className="form-instructions">
            Provide the following information to process your application
          </div>
        </div>

        <div className="form-card">
          {step === 1 && <BasicDetails next={handleBasicNext} dispatch={dispatch} data={state.basicDetails} errors={state.errors} />}
          {step === 2 && <DocumentUpload next={handleDocumentNext} back={back} dispatch={dispatch} data={state.documents} errors={state.errors} />}
          {step === 3 && <StatementOfPurpose next={handleSOPNext} back={back} dispatch={dispatch} data={state.sop} errors={state.errors} />}
          {step === 4 && <InterviewAvailability next={handleInterviewNext} back={back} dispatch={dispatch} data={state.interview} errors={state.errors} />}
          {step === 5 && <Success state={state} />}
        </div>
      </main>
    </div>
  );
};

export default App;