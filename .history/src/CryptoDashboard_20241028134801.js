import React from 'react';

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
