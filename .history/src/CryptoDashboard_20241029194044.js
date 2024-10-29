import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CryptoDashboardPreview from './CryptoDashboardPreview';

const AIPipeline = ({ onComplete, onReset }) => {
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState('Analyzing Request');
    const [stepDescription, setStepDescription] = useState('KortexAI analyzes your request.');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let progressTimer;
        let pauseTimer;

        const startProgress = () => {
            // Start new progress
            const duration = 6000; // 6 seconds to reach 100%
            const interval = 30; // Update every 30ms
            const increment = (interval / duration) * 100;
            let currentProgress = 0;

            progressTimer = setInterval(() => {
                currentProgress += increment;
                
                if (currentProgress >= 100) {
                    clearInterval(progressTimer);
                    setProgress(100);
                    
                    // Wait 5 seconds at 100%
                    pauseTimer = setTimeout(() => {
                        setProgress(0); // Reset to 0
                        startProgress(); // Start again
                    }, 5000);
                } else {
                    setProgress(Math.min(currentProgress, 100));
                }
            }, interval);
        };

        startProgress();

        return () => {
            clearInterval(progressTimer);
            clearTimeout(pauseTimer);
        };
    }, []);

    // Update steps based on progress
    useEffect(() => {
        if (progress < 25) {
            setCurrentStep('Analyzing Request');
            setStepDescription('KortexAI analyzes your request.');
        } else if (progress < 50) {
            setCurrentStep('Processing Data');
            setStepDescription('Organizing and processing crypto data.');
        } else if (progress < 75) {
            setCurrentStep('Generating Components');
            setStepDescription('Creating dashboard components.');
        } else if (progress < 95) {
            setCurrentStep('Finalizing Dashboard');
            setStepDescription('Applying final touches and optimizations.');
        } else {
            setCurrentStep('Complete');
            setStepDescription('Your dashboard is ready!');
            setIsLoading(false);
        }
    }, [progress]);

    return (
        <div className="ai-pipeline-section">
            <div className="pipeline-left">
                <h2>AI Pipeline</h2>
                <h3>Building sites, end-to-end.</h3>

                <motion.div 
                    className="pipeline-step"
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="step-content">
                        <p className="step-title">{currentStep}</p>
                        <p className="step-description">{stepDescription}</p>
                    </div>
                </motion.div>

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
                            transition={{ duration: 0.3 }}
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
                    <CryptoDashboardPreview progress={progress} />
                </div>
            </div>
        </div>
    );
};

export default AIPipeline;
