import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CryptoDashboardPreview from './CryptoDashboardPreview';

const AIPipeline = ({ onComplete, onReset }) => {
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState('Analyzing Request');
    const [stepDescription, setStepDescription] = useState('KortexAI analyzes your request.');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let progressTimer;
        let resetTimer;

        const startProgress = () => {
            // Reset progress smoothly
            setProgress(0);
            
            // Start new progress after a short delay
            setTimeout(() => {
                progressTimer = setInterval(() => {
                    setProgress(prev => {
                        if (prev >= 100) {
                            clearInterval(progressTimer);
                            // Reset after completion
                            resetTimer = setTimeout(startProgress, 1000);
                            return 100;
                        }
                        return prev + 1;
                    });
                }, 60);
            }, 300);
        };

        if (isVisible) {
            startProgress();
        }

        return () => {
            clearInterval(progressTimer);
            clearTimeout(resetTimer);
        };
    }, [isVisible]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                    setProgress(0);
                }
            },
            { threshold: 0.2 }
        );

        const section = document.querySelector('.ai-pipeline-section');
        if (section) {
            observer.observe(section);
        }

        return () => observer.disconnect();
    }, []);

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
        }
    }, [progress]);

    return (
        <div className="ai-pipeline-section">
            <div className="pipeline-left">
                <h2>AI Pipeline</h2>
                <h3>Building sites, end-to-end.</h3>

                <div className="pipeline-step">
                    <motion.div 
                        className="step-content"
                        key={currentStep}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="step-title">{currentStep}</p>
                        <p className="step-description">{stepDescription}</p>
                    </motion.div>
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
