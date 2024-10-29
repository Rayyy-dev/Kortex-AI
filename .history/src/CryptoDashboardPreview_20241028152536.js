import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Bitcoin, DollarSign, Coins } from 'lucide-react';

const CryptoDashboardPreview = ({ progress }) => {
  const [data, setData] = useState([
    { name: 'Bitcoin', symbol: 'BTC', price: 45123, change: 2.5, icon: Bitcoin, color: '#F7931A' },
    { name: 'Ethereum', symbol: 'ETH', price: 3017, change: -0.8, icon: DollarSign, color: '#627EEA' },
    { name: 'Ripple', symbol: 'XRP', price: 0.75, change: 1.2, icon: Coins, color: '#23292F' },
  ]);

  const [chartPoints, setChartPoints] = useState([
    { name: 'Mon', BTC: 44000, ETH: 3000, XRP: 0.70 },
    { name: 'Tue', BTC: 45000, ETH: 3100, XRP: 0.72 },
    { name: 'Wed', BTC: 46000, ETH: 3050, XRP: 0.74 },
    { name: 'Thu', BTC: 45500, ETH: 3020, XRP: 0.73 },
    { name: 'Fri', BTC: 45123, ETH: 3017, XRP: 0.75 },
  ]);

  // Add price update loop
  useEffect(() => {
    let interval;
    // Only start the price updates when progress is 100
    if (progress === 100) {
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
  }, [progress]);

  return (
    <div className="dashboard-content">
      {progress < 100 ? (
        <motion.div 
          className="loading-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          Generating Crypto Dashboard...
        </motion.div>
      ) : (
        <motion.div 
          className="crypto-dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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
    </div>
  );
};

export default CryptoDashboardPreview;
