import React, { useState, useEffect } from 'react';
import { CompactCryptoDashboardGenerator } from './CompactCryptoDashboardGenerator';

const AIPipeline = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      title: 'Analyzing prompt...',
      description: 'KortexAI helps determine the subject and style of your site.'
    },
    {
      title: 'Crafting designs...',
      description: 'Next, it helps craft original images and copy within a responsive layout.'
    },
    {
      title: 'Tweak, iterate, publish!',
      description: "The site's generated — your turn to bring out the design chops."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress(prev => {
          const newProgress = prev + 2;
          if (newProgress % 33 === 0) {
            setCurrentStep(current => (current + 1) % steps.length);
          }
          return newProgress;
        });
      } else {
        clearInterval(interval);
        onComplete();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [progress, onComplete]);

  return (
    <div className="ai-pipeline-section">
      <div className="pipeline-left">
        <div className="pipeline-label">AI Pipeline</div>
        <h2 className="pipeline-title">Building sites,<br />end-to-end.</h2>
        <div className="pipeline-steps">
          {steps.map((step, index) => (
            <div key={index} className={`pipeline-step ${index === currentStep ? 'active' : ''}`}>
              <div className="step-indicator" />
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="pipeline-right">
        <CompactCryptoDashboardGenerator />
      </div>
    </div>
  );
};

export default AIPipeline;
