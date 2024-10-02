import React, { useEffect, useRef } from 'react';
import './App.css';

function App() {
  const mainSectionRef = useRef(null);

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

    // Scroll animation
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        if (isVisible) {
          el.classList.add('animate');
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', animateOnScroll);
      clearInterval(particleInterval);
    };
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
      <section ref={mainSectionRef} className="main-section">
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
        <div className="defi-horizons animate-on-scroll">
          <span>Exploring AI Horizons</span>
        </div>
        <div className="partners animate-on-scroll">
          <div className="partner">Vercel</div>
          <div className="partner">Loom</div>
          <div className="partner">Cash App</div>
          <div className="partner">Zapier</div>
          <div className="partner">Ramp</div>
          <div className="partner">Raycast</div>
        </div>

        <div className="graph-section animate-on-scroll">
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
