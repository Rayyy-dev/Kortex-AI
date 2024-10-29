import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CryptoDashboardPreview from './CryptoDashboardPreview';

const AIPipeline = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState('Analyzing Request');

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    onComplete();
                    return 100;
                }
                return prev + 10;
            });
        }, 800);

        return () => clearInterval(timer);
    }, [onComplete]);

    useEffect(() => {
        if (progress < 30) {
            setCurrentStep('Analyzing Request');
        } else if (progress < 60) {
            setCurrentStep('Generating Components');
        } else if (progress < 90) {
            setCurrentStep('Finalizing Dashboard');
        } else {
            setCurrentStep('Complete');
        }
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

            <div className="preview-container">
                <CryptoDashboardPreview progress={progress} />
            </div>
        </div>
    );
};

export default AIPipeline;

const CryptoDashboard = () => {
    return (
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
                    {/* Your existing dashboard content */}
                </div>
            </div>
        </div>
    );
};

export default CryptoDashboard;
