import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CryptoDashboard = () => {
  const [cryptoData, setCryptoData] = useState([
    { symbol: 'BTC', price: '45,234.21', change: '+2.4%', isPositive: true },
    { symbol: 'ETH', price: '3,234.56', change: '+1.8%', isPositive: true },
    { symbol: 'SOL', price: '98.45', change: '-0.6%', isPositive: false },
  ]);

  const [chartData] = useState([
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 5500 },
  ]);

  return (
    <div className="crypto-dashboard">
      <div className="crypto-grid">
        {cryptoData.map((crypto, index) => (
          <div className="crypto-card" key={index}>
            <div className="crypto-header">
              <span className="crypto-symbol">{crypto.symbol}</span>
              <span className={`crypto-change ${crypto.isPositive ? 'positive' : 'negative'}`}>
                {crypto.change}
              </span>
            </div>
            <div className="crypto-price">${crypto.price}</div>
          </div>
        ))}
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{
                background: 'rgba(26, 26, 38, 0.9)',
                border: '1px solid #4a4af0',
                borderRadius: '5px',
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#7c3aed"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CryptoDashboard;
