import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
      document.body.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 5000);
    };

    const particleInterval = setInterval(createParticle, 200);

    return () => clearInterval(particleInterval);
  }, []);

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
          <span className="partner">Vercel</span>
          <span className="partner">Loom</span>
          <span className="partner">Cash App</span>
          <span className="partner">Zapier</span>
          <span className="partner">Ramp</span>
          <span className="partner">Raycast</span>
        </div>

        <div className="graph-section">
          <div className="graph-container">
            <div className="graph-bar" data-value="70"></div>
            <div className="graph-bar" data-value="85"></div>
            <div className="graph-bar" data-value="60"></div>
            <div className="graph-bar" data-value="90"></div>
          </div>
          <div className="graph-label">AI Performance Metrics</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
