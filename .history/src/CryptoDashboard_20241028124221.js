import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Bitcoin, DollarSign, Coins, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Add the TypewriterText component
const TypewriterText = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, 100);
      return () => clearTimeout(timeoutId);
    } else {
      onComplete?.();
    }
  }, [displayedText, text, onComplete]);

  return <span className="typewriter-text">{displayedText}</span>;
};

// Add the Dashboard component with your crypto implementation
const Dashboard = () => {
  // Reference your existing crypto dashboard implementation
  const cryptoData = [
    { name: 'Bitcoin', symbol: 'BTC', price: 45123, change: 2.5, icon: Bitcoin, color: '#F7931A' },
    { name: 'Ethereum', symbol: 'ETH', price: 3017, change: -0.8, icon: DollarSign, color: '#627EEA' },
    { name: 'Ripple', symbol: 'XRP', price: 0.75, change: 1.2, icon: Coins, color: '#23292F' },
  ];

  const chartData = [
    { name: 'Mon', BTC: 44000, ETH: 3000, XRP: 0.70 },
    { name: 'Tue', BTC: 45000, ETH: 3100, XRP: 0.72 },
    { name: 'Wed', BTC: 46000, ETH: 3050, XRP: 0.74 },
    { name: 'Thu', BTC: 45500, ETH: 3020, XRP: 0.73 },
    { name: 'Fri', BTC: 45123, ETH: 3017, XRP: 0.75 },
  ];

  return (
    <div className="crypto-dashboard">
      {/* Reference your existing dashboard implementation */}
      <h2>Crypto Dashboard</h2>
      <div className="crypto-grid">
        {cryptoData.map((crypto) => (
          <div key={crypto.symbol} className="crypto-card">
            <div className="crypto-header">
              <crypto.icon className="crypto-icon" style={{ color: crypto.color }} />
              <span className="crypto-symbol">{crypto.symbol}</span>
            </div>
            <div className="crypto-price">${crypto.price.toLocaleString()}</div>
            <div className={`crypto-change ${crypto.change >= 0 ? 'positive' : 'negative'}`}>
              {crypto.change >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              <span>{Math.abs(crypto.change)}%</span>
            </div>
          </div>
        ))}
      </div>
      <div className="chart-container">
        <h3>Price Chart</h3>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={chartData}>
            <XAxis dataKey="name" stroke="#ffffff40" />
            <YAxis stroke="#ffffff40" />
            <Tooltip />
            {cryptoData.map((crypto) => (
              <Line 
                key={crypto.symbol}
                type="monotone"
                dataKey={crypto.symbol}
                stroke={crypto.color}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Update the CryptoDashboardPreview component
const CryptoDashboardPreview = ({ progress }) => {
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
          <TypewriterText
            text="generate a crypto dashboard"
            onComplete={() => {}}
          />
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

// Update the AIPipeline component
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
  }, [progress, onComplete]);

  return (
    <div className="ai-pipeline-container">
      <div className="ai-pipeline-split">
        {/* Left side - Pipeline */}
        <div className="pipeline-content">
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

        {/* Right side - Preview */}
        <div className="preview-container">
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
      </div>
    </div>
  );
};

export default AIPipeline;
