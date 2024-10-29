import React, { useState, useEffect } from 'react';
import { CompactCryptoDashboardGenerator } from './CompactCryptoDashboardGenerator';
import { motion } from 'framer-motion';

const AIPipeline = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('Analyzing prompt...');

  useEffect(() => {
    const steps = [
      'Analyzing prompt...',
      'Gathering market data...',
      'Designing layout...',
      'Generating visualizations...',
      'Finalizing dashboard...',
    ];

    let currentStepIndex = 0;
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 2;
          if (newProgress % 20 === 0 && currentStepIndex < steps.length - 1) {
            currentStepIndex++;
            setCurrentStep(steps[currentStepIndex]);
          }
          return newProgress;
        });
      } else {
        clearInterval(interval);
        onComplete();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="ai-pipeline-section">
      <div className="pipeline-left">
        <div className="pipeline-label">AI Pipeline</div>
        <h2>Building sites,<br />end-to-end.</h2>
        <div className="pipeline-steps">
          <div className="pipeline-step active">
            <div className="step-line" />
            <p className="step-title">{currentStep}</p>
            <p className="step-description">KortexAI analyzes your request.</p>
          </div>
        </div>
        <div className="progress-container">
          <div className="progress-header">
            <span className="progress-label">Progress</span>
            <span className="progress-value">{progress}%</span>
          </div>
          <div className="progress-bar">
            <motion.div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      <div className="preview-screen">
        <div className="screen-header">
          <div className="screen-controls">
            <div className="screen-control"></div>
            <div className="screen-control"></div>
            <div className="screen-control"></div>
          </div>
          <div className="dora-badge">
            Dora AI
          </div>
        </div>
        <div className="screen-content">
          <CompactCryptoDashboardGenerator />
        </div>
      </div>
    </div>
  );
};

export default AIPipeline;
