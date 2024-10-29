import React from 'react';
import { motion } from 'framer-motion';

export const CompactCryptoDashboardGenerator = () => {
  return (
    <motion.div 
      className="crypto-dashboard-preview"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Your crypto dashboard content will go here */}
      <div className="dashboard-content">
        <div className="loading-indicator">
          Generating Crypto Dashboard...
        </div>
      </div>
    </motion.div>
  );
};
