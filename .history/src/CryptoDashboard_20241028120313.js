"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Bitcoin, DollarSign, Coins, ArrowUpRight, ArrowDownRight, Sparkles } from 'lucide-react';

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

const TypewriterText = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, 100);
      return () => clearTimeout(timeoutId);
    } else {
      onComplete();
    }
  }, [displayedText, text, onComplete]);

  return <span>{displayedText}</span>;
};

const AIPipeline = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      title: 'Analyzing prompt...',
      description: 'KortexAI helps determine the subject and style of your site.'
    },
    {
      title: 'Crafting designs...',
      description: 'Next, it helps craft original images and copy within a responsive layout.'
    },
    {
      title: 'Tweak, iterate, publish!',
      description: "The site's generated — your turn to bring out the design chops."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress(prev => {
          const newProgress = prev + 2;
          if (newProgress % 33 === 0) {
            setCurrentStep(current => (current + 1) % steps.length);
          }
          return newProgress;
        });
      } else {
        clearInterval(interval);
        onComplete();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [progress, onComplete]);

  return (
    <div className="ai-pipeline-section">
      <div className="pipeline-left">
        <div className="pipeline-label">AI Pipeline</div>
        <h2 className="pipeline-title">Building sites,<br />end-to-end.</h2>
        <div className="pipeline-steps">
          {steps.map((step, index) => (
            <div key={index} className={`pipeline-step ${index === currentStep ? 'active' : ''}`}>
              <div className="step-indicator" />
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="pipeline-right">
        <CompactCryptoDashboardGenerator />
      </div>
    </div>
  );
};

const Dashboard = () => (
  <div className="crypto-dashboard">
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
      <div className="chart">
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={chartData}>
            <XAxis dataKey="name" stroke="#ffffff40" tick={{fontSize: 10}} />
            <YAxis stroke="#ffffff40" tick={{fontSize: 10}} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#2a2a3e', border: 'none', color: '#fff', fontSize: '12px' }}
              itemStyle={{ color: '#fff' }}
            />
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
  </div>
);

export const CompactCryptoDashboardGenerator = () => {
  const [stage, setStage] = useState('typing');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStage(stage === 'typing' ? 'pipeline' : stage === 'pipeline' ? 'dashboard' : 'typing');
    }, stage === 'typing' ? 3000 : stage === 'pipeline' ? 5000 : 5000);

    return () => clearTimeout(timer);
  }, [stage]);

  return (
    <div className="ai-pipeline-container">
      <AnimatePresence mode="wait">
        {stage === 'typing' && (
          <motion.div
            key="typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="typewriter-container"
          >
            <TypewriterText
              text="generate a crypto website"
              onComplete={() => {}}
            />
          </motion.div>
        )}
        {stage === 'pipeline' && (
          <motion.div
            key="pipeline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AIPipeline onComplete={() => {}} />
          </motion.div>
        )}
        {stage === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <Dashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
