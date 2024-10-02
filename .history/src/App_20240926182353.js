import React, { useEffect, useRef, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import './App.css';

function App() {
  const mainSectionRef = useRef(null);
  const [performanceData, setPerformanceData] = useState([
    { name: 'Accuracy', value: 70 },
    { name: 'Speed', value: 85 },
    { name: 'Efficiency', value: 60 },
    { name: 'Reliability', value: 90 }
  ]);

  useEffect(() => {
    // ... (previous particle effect code remains unchanged)
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="App">
      {/* ... (previous header and main section code remains unchanged) */}

      {/* Footer Section */}
      <footer className="footer-section">
        <div className="defi-horizons">
          <span>Exploring AI Horizons</span>
        </div>
        <div className="partners">
          {/* ... (partners remain unchanged) */}
        </div>

        <div className="graph-section">
          <h2 className="graph-title">AI Performance Metrics</h2>
          <div className="graph-container">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis dataKey="name" stroke="#ffffff" axisLine={false} tickLine={false} />
                <YAxis stroke="#ffffff" axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#4a4af0" radius={[10, 10, 0, 0]}>
                  {performanceData.map((entry, index) => (
                    <rect key={`rect-${index}`} fill={`url(#colorGradient-${index})`} />
                  ))}
                </Bar>
                <defs>
                  {performanceData.map((entry, index) => (
                    <linearGradient key={`gradient-${index}`} id={`colorGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8080ff" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#4a4af0" stopOpacity={1}/>
                    </linearGradient>
                  ))}
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;