import React, { useEffect, useRef, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
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
    const mainSection = mainSectionRef.current;
    if (!mainSection) return;

    const createParticle = () => {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
      mainSection.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 15000);
    };

    // Create initial particles
    for (let i = 0; i < 30; i++) {
      createParticle();
    }

    const particleInterval = setInterval(createParticle, 500);

    return () => clearInterval(particleInterval);
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="App">
      <header className="header">
        <div className="logo">KortexAI
          .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #000000;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: none;
}

.logo {
  font-size: 1.8rem;
  font-weight: bold;
  color: #ffffff;
}

.nav {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}

.nav ul {
  list-style: none;
  display: flex;
  gap: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 5px;
}

.nav ul li {
  display: inline-block;
  padding: 8px 15px;
  border-radius: 15px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.nav ul li:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.nav ul li a {
  color: #ffffff;
  text-decoration: none;
}

.nav ul li.protection {
  display: flex;
  align-items: center;
}

.nav ul li.protection .icon-shield {
  margin-left: 5px;
  font-size: 1rem;
}

.create-account-btn {
  background-color: #ffffff;
  color: #000000;
  padding: 8px 15px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.create-account-btn::before {
  content: '👤';
  margin-right: 5px;
}

.create-account-btn:hover {
  background-color: rgba(255, 255, 255, 0.8);
}
        </div>
        <nav className="nav">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#ai-systems">AI Systems</a></li>
            <li><a href="#modules">Modules</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li className="protection">
              <a href="#protection">Protection</a>
              <span className="icon-shield">🛡</span>
            </li>
          </ul>
        </nav>
        <button className="create-account-btn">Create Account</button>
      </header>

      <section ref={mainSectionRef} className="main-section">
        <div className="content-container">
          <h1 className="main-title">AI-Powered Solutions for the Future</h1>
          <p className="main-subtitle">
            Empowering tomorrow with cutting-edge AI technology.
          </p>
          <div className="buttons">
            <button className="open-app-btn">Explore AI</button>
            <button className="discover-more-btn">Learn More</button>
          </div>
        </div>
      </section>

      <footer className="footer-section">
        <div className="defi-horizons">
          <span>Exploring AI Horizons</span>
        </div>
        <div className="partners">
          <div className="partner">Vercel</div>
          <div className="partner">Loom</div>
          <div className="partner">Cash App</div>
          <div className="partner">Zapier</div>
          <div className="partner">Ramp</div>
          <div className="partner">Raycast</div>
        </div>

        <div className="graph-section">
          <h2 className="graph-title">AI Performance Metrics</h2>
          <div className="graph-container">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="name" stroke="#ffffff" axisLine={false} tickLine={false} />
                <YAxis stroke="#ffffff" axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#4a4af0"
                  strokeWidth={3}
                  dot={{ r: 6, fill: "#4a4af0", stroke: "#ffffff", strokeWidth: 2 }}
                  activeDot={{ r: 8, fill: "#ffffff", stroke: "#4a4af0", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
