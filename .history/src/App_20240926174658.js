import React, { useState } from 'react';
import './App.css';

function App() {
  const [tooltip, setTooltip] = useState({ display: false, x: 0, y: 0, content: '' });

  const handleMouseEnter = (event, content) => {
    setTooltip({
      display: true,
      x: event.clientX,
      y: event.clientY,
      content: content,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, display: false });
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="logo">KortexAI</div>
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

      {/* Main Section */}
      <section className="main-section">
        <div className="light-effect"></div>
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

      {/* Footer Section */}
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

        {/* New Line Graph Section */}
        <section className="line-graph-section">
          <svg className="line-graph" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
            {/* Dashed line */}
            <path
              d="M 50 250 Q 150 150 250 200 T 450 160 T 650 240"
              stroke="#888"
              strokeWidth="2"
              strokeDasharray="5,5"
              fill="transparent"
            />
            {/* Solid line */}
            <path
              d="M 50 250 Q 150 200 250 120 T 450 130 T 650 80"
              stroke="orange"
              strokeWidth="3"
              fill="transparent"
            />
            {/* Graph points */}
            <circle cx="50" cy="250" r="5" fill="#FFF" onMouseEnter={(e) => handleMouseEnter(e, '30 min')} onMouseLeave={handleMouseLeave} />
            <circle cx="250" cy="120" r="5" fill="#FFF" onMouseEnter={(e) => handleMouseEnter(e, '20 min')} onMouseLeave={handleMouseLeave} />
            <circle cx="450" cy="130" r="5" fill="#FFF" onMouseEnter={(e) => handleMouseEnter(e, '28 min')} onMouseLeave={handleMouseLeave} />
            <circle cx="650" cy="80" r="5" fill="#FFF" onMouseEnter={(e) => handleMouseEnter(e, '25 min')} onMouseLeave={handleMouseLeave} />
          </svg>

          {/* Tooltip */}
          {tooltip.display && (
            <div
              className="tooltip"
              style={{ left: tooltip.x + 10, top: tooltip.y - 30 }}
            >
              {tooltip.content}
            </div>
          )}
        </section>
      </footer>
    </div>
  );
}

export default App;
