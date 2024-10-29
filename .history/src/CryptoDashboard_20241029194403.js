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
        let resetTimer;

        const startProgress = () => {
            // Reset progress
            setProgress(0);
            
            // Smooth progress animation
            const startTime = Date.now();
            const duration = 6000; // 6 seconds to reach 100%

            const updateProgress = () => {
                const elapsed = Date.now() - startTime;
                const newProgress = Math.min((elapsed / duration) * 100, 100);
                
                setProgress(Math.round(newProgress));

                if (newProgress < 100) {
                    progressTimer = requestAnimationFrame(updateProgress);
                } else {
                    // Wait 5 seconds at 100% then restart
                    resetTimer = setTimeout(startProgress, 5000);
                }
            };

            progressTimer = requestAnimationFrame(updateProgress);
        };

        startProgress();

        return () => {
            cancelAnimationFrame(progressTimer);
            clearTimeout(resetTimer);
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
                        <div 
                            className="progress-fill"
                            style={{ transform: `scaleX(${progress / 100})` }}
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
