import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Bitcoin, DollarSign, Coins } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const CryptoDashboardPreview = ({ progress }) => {
  const [data, setData] = useState([
    { name: 'Bitcoin', symbol: 'BTC', price: 45123, change: 2.5, icon: Bitcoin, color: '#F7931A' },
    { name: 'Ethereum', symbol: 'ETH', price: 3017, change: -0.8, icon: DollarSign, color: '#627EEA' },
    { name: 'Ripple', symbol: 'XRP', price: 0.75, change: 1.2, icon: Coins, color: '#23292F' },
  ]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Reset visibility when progress goes back to 0
    if (progress === 0) {
      setIsVisible(false);
    }
    // Show dashboard when progress is complete
    if (progress === 100) {
      setIsVisible(true);
    }
  }, [progress]);

  // Price update effect
  useEffect(() => {
    let interval;
    if (isVisible) {
      interval = setInterval(() => {
        setData(prevData => 
          prevData.map(crypto => ({
            ...crypto,
            price: crypto.price * (1 + (Math.random() * 0.02 - 0.01)),
            change: parseFloat((Math.random() * 5 - 2.5).toFixed(2))
          }))
        );
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isVisible]);

  return (
    <div className="dashboard-content">
      <AnimatePresence mode="wait">
        {!isVisible ? (
          <motion.div 
            key="loading"
            className="loading-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Generating Crypto Dashboard...
          </motion.div>
        ) : (
          <motion.div 
            key="dashboard"
            className="crypto-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Crypto Dashboard</h2>
            <div className="crypto-grid">
              {data.map((crypto) => (
                <div key={crypto.symbol} className="crypto-card">
                  <div className="crypto-header">
                    <crypto.icon className="crypto-icon" style={{ color: crypto.color }} />
                    <span className="crypto-symbol">{crypto.symbol}</span>
                  </div>
                  <div className="crypto-price">${crypto.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}</div>
                  <div className={`crypto-change ${crypto.change >= 0 ? 'positive' : 'negative'}`}>
                    {crypto.change >= 0 ? '+' : ''}{crypto.change}%
                  </div>
                </div>
              ))}
            </div>
            <div className="chart-container">
              <h3>Price Chart</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartPoints}>
                  <XAxis dataKey="name" stroke="#ffffff40" />
                  <YAxis stroke="#ffffff40" />
                  <Tooltip />
                  {data.map((crypto) => (
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CryptoDashboardPreview;
