import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CryptoDashboardPreview from './CryptoDashboardPreview';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Bitcoin, DollarSign, Coins, ArrowUpRight, ArrowDownRight } from 'lucide-react';

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
        // Reset progress after completion for loop
        setTimeout(() => {
          setProgress(0);
          currentStepIndex = 0;
          setCurrentStep(steps[0]);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div className="ai-pipeline-section">
      <div className="pipeline-left">
        <h2>AI Pipeline</h2>
        <h3>Building sites, end-to-end.</h3>
        
        <div className="pipeline-step">
          <div className="step-content">
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
          <div className="window-controls">
            <div className="window-control close"></div>
            <div className="window-control minimize"></div>
            <div className="window-control maximize"></div>
          </div>
          <span className="kortex-badge">KortexAI</span>
        </div>
        <div className="screen-content">
          <div className="crypto-dashboard">
            <CryptoDashboardPreview progress={progress} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPipeline;
