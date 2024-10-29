import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CryptoDashboardPreview = () => {
  return (
    <motion.div 
      className="crypto-dashboard-preview"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="dashboard-content">
        <div className="loading-indicator">
          Generating Crypto Dashboard...
        </div>
      </div>
    </motion.div>
  );
};

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
        onComplete?.();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="ai-pipeline-section">
      <div className="pipeline-left">
        <div className="pipeline-label">AI Pipeline</div>
        <h2 className="pipeline-title">Building<br />sites,<br />end-to-end.</h2>
        <div className="pipeline-step-container">
          <div className="pipeline-line" />
          <div className="pipeline-step active">
            <div className="step-dot" />
            <div className="step-content">
              <h3>{currentStep}</h3>
              <p>KortexAI analyzes your request.</p>
            </div>
          </div>
        </div>
        <div className="progress-section">
          <div className="progress-label">PROGRESS</div>
          <div className="progress-bar">
            <motion.div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="progress-value">{progress}%</div>
        </div>
      </div>

      <div className="preview-screen">
        <div className="screen-header">
          <div className="screen-controls">
            <div className="control red" />
            <div className="control yellow" />
            <div className="control green" />
          </div>
          <div className="kortex-badge">KortexAI</div>
        </div>
        <div className="screen-content">
          <div className="generating-text">
            Generating Crypto Dashboard...
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPipeline;
