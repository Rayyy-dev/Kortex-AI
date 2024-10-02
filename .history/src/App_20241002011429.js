import React, { useEffect, useRef, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import './App.css';

function FAQItem({ question, answer, index }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`faq-card ${isActive ? 'active' : ''}`} onClick={() => setIsActive(!isActive)}>
      <div className="faq-card-inner">
        <div className="faq-card-front">
          <span className="faq-number">{(index + 1).toString().padStart(2, '0')}</span>
          <h3>{question}</h3>
          <div className="faq-icon">{isActive ? '−' : '+'}</div>
        </div>
        <div className="faq-card-back">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const backgroundRef = useRef(null);
  const mainSectionRef = useRef(null);
  const parallaxRef = useRef(null);

  useEffect(() => {
    const background = backgroundRef.current;
    if (!background) return;

    const createParticle = () => {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
      background.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 15000);
    };

    // Create initial particles
    for (let i = 0; i < 30; i++) {
      createParticle();
    }

    const particleInterval = setInterval(createParticle, 500);

    return () => {
      clearInterval(particleInterval);
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

  const faqData = [
    {
      question: "How do I activate KortexAI?",
      answer: "Log into your account, navigate to 'AI Systems', click 'Activate' next to KortexAI, and follow the setup instructions to customize your AI experience."
    },
    {
      question: "How is KortexAI different from other AI tools?",
      answer: "KortexAI features advanced neural networks, real-time learning, and seamless multi-platform integration, offering superior accuracy in data analysis, NLP, and predictive modeling."
    },
    {
      question: "What's included in my KortexAI plan?",
      answer: "Usage varies by tier. Basic plans include 100 AI processing hours/month, while premium plans offer unlimited usage. Check your dashboard for plan details and usage stats."
    },
    {
      question: "Can KortexAI generate 3D assets or animations?",
      answer: "Yes, KortexAI excels in creating 3D assets and animations. It can generate high-quality 3D models, textures, and animations from text or 2D inputs, as well as custom web animation code."
    }
  ];

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

        <div className="background-section" ref={backgroundRef}>
          <div className="background-content">
            <div className="ai-solution-box">
              <h2>AI Solutions</h2>
              <p>Describe your issue and let our AI generate a solution for you!</p>
              
              {/* New AI Pipeline Section */}
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
                    <div className="get-started-container">
                      <button className="get-started-btn">Get Started</button>
                    </div>
                  </div>
                  <div className="ai-pipeline-visual">
                    <div className="ai-orb">
                      <div className="ai-orb-inner"></div>
                    </div>
                    <p className="generating-text">Generating your solution... 93%</p>
                  </div>
                </div>
              </div>

              {/* Existing input and output areas */}
              <div className="input-group">
                <input type="text" placeholder="Enter your issue here..." />
                <button className="generate-btn">Generate Solution</button>
              </div>
              <div className="solution-output">
                <p>AI-generated solution will appear here...</p>
              </div>
            </div>

            {/* New FAQ Section */}
            <div className="faq-section">
              <h2 className="faq-title">Frequently Asked Questions</h2>
              <div className="faq-list">
                {faqData.map((item, index) => (
                  <FAQItem key={index} question={item.question} answer={item.answer} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* New footer content */}
        <div className="footer-links">
          <div className="footer-column">
            <h3>Explore</h3>
            <ul>
              <li><a href="#">AI Systems</a></li>
              <li><a href="#">Modules</a></li>
              <li><a href="#">KortexAI Studio <span className="beta-tag">BETA</span></a></li>
              <li><a href="#">KortexAI API <span className="new-tag">NEW</span></a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Resources</h3>
            <ul>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">KortexAI Community</a></li>
              <li><a href="#">Become a Partner</a></li>
              <li><a href="#">Research Collaborations</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Company</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>KortexAI © 2024. All Rights Reserved</p>
          <div className="social-links">
            {/* Add social media links here */}
          </div>
          <div className="awards">
            <span className="award-text">AI Excellence Award 2023</span>
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