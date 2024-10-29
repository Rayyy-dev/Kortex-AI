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

export const CompactCryptoDashboardGenerator = () => {
  const [stage, setStage] = useState('typing');

  useEffect(() => {
    if (progress === 100) {
      setStage('dashboard');
    } else if (progress > 0) {
      setStage('generating');
    }
  }, [progress]);

  return (
    <motion.div 
      className="crypto-dashboard-preview"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="dashboard-content">
        {stage === 'typing' && (
          <div className="loading-indicator">
            Generating Crypto Dashboard...
          </div>
        )}
        {stage === 'generating' && (
          <div className="loading-indicator">
            Generating Crypto Dashboard...
          </div>
        )}
        {stage === 'dashboard' && <Dashboard />}
      </div>
    </motion.div>
  );
};
