import React, { useEffect, useRef, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import './App.css';

function App() {
  const mainSectionRef = useRef(null);
  const parallaxRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const mainSection = mainSectionRef.current;
    const parallaxSection = parallaxRef.current;
    if (!mainSection || !parallaxSection) return;

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

    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      parallaxSection.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(particleInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const performanceData = [
    { name: 'Accuracy', value: 70 },
    { name: 'Speed', value: 85 },
    { name: 'Efficiency', value: 60 },
    { name: 'Reliability', value: 90 }
  ];

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
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

        <div className="ai-pipeline-section">
          <div className="ai-pipeline-content">
            <div className="ai-pipeline-text">
              <h3 className="ai-pipeline-subtitle">AI Pipeline</h3>
              <h2 className="ai-pipeline-title">Generating solutions, end-to-end.</h2>
              <div className="ai-pipeline-steps">
                <div className="ai-pipeline-step active">
                  <span className="step-icon">✨</span>
                  <h4>Analyzing prompt...</h4>
                  <p>KortexAI determines the subject and context of your issue.</p>
                </div>
                <div className="ai-pipeline-step">
                  <span className="step-icon">🔧</span>
                  <h4>Crafting solutions...</h4>
                  <p>Next, it generates tailored solutions based on the analysis.</p>
                </div>
                <div className="ai-pipeline-step">
                  <span className="step-icon">🚀</span>
                  <h4>Review and implement!</h4>
                  <p>The solution is ready – your turn to put it into action.</p>
                </div>
              </div>
              <button className="get-started-btn">Get Started →</button>
            </div>
            <div className="ai-pipeline-visual">
              <div className="ai-orb">
                <div className="ai-orb-inner"></div>
              </div>
              <p className="generating-text">Generating your solution... 93%</p>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Solutions Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="ai-solution-box">
              <h2>AI Solutions</h2>
              <p>Describe your issue and let our AI generate a solution for you!</p>
              <div className="input-group">
                <input type="text" placeholder="Enter your issue here..." />
                <button className="generate-btn">Generate Solution</button>
              </div>
              <div className="solution-output">
                <p>AI-generated solution will appear here...</p>
              </div>
            </div>
            <button className="close-modal-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
