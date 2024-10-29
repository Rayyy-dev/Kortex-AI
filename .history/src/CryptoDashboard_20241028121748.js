import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CryptoDashboardPreview = ({ progress }) => {
  return (
    <motion.div 
      className="crypto-dashboard-preview"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="dashboard-content">
        {progress < 100 ? (
          <div className="loading-indicator">
            Generating Crypto Dashboard...
          </div>
        ) : (
          <div className="dashboard-layout">
            {/* Add your actual dashboard content here */}
            <h2>Crypto Dashboard</h2>
            <div className="crypto-stats">
              {/* Add your dashboard components */}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const AIPipeline = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  const steps = [
    {
      title: 'Analyzing prompt...',
      description: 'KortexAI analyzes your request.'
    },
    {
      title: 'Gathering market data...',
      description: 'Collecting real-time crypto market information.'
    },
    {
      title: 'Designing layout...',
      description: 'Creating responsive dashboard structure.'
    },
    {
      title: 'Generating visualizations...',
      description: 'Building interactive charts and metrics.'
    },
    {
      title: 'Finalizing dashboard...',
      description: 'Polishing and optimizing the interface.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => {
          const newProgress = Math.min(prev + 2, 100);
          if (newProgress % 20 === 0) {
            setCurrentStepIndex(Math.min(Math.floor(newProgress / 20), steps.length - 1));
          }
          return newProgress;
        });
      } else {
        clearInterval(interval);
        onComplete?.();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [progress, onComplete]);

  return (
    <div className="ai-pipeline-section">
      <div className="pipeline-left">
        <div className="pipeline-label">AI Pipeline</div>
        <h2 className="pipeline-title">Building<br />sites,<br />end-to-end.</h2>
        <div className="pipeline-step-container">
          <div className="pipeline-line" />
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`pipeline-step ${index === currentStepIndex ? 'active' : ''}`}
            >
              <div className="step-dot" />
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
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
          <CryptoDashboardPreview progress={progress} />
        </div>
      </div>
    </div>
  );
};

export default AIPipeline;