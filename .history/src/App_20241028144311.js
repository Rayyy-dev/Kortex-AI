import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area, LabelList } from 'recharts';
import './App.css';
import { CompactCryptoDashboardGenerator } from './CryptoDashboard';
import AIPipeline from './CryptoDashboard';

function FAQItem({ question, answer }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`faq-item ${isActive ? 'active' : ''}`} onClick={() => setIsActive(!isActive)}>
      <h3>{question}<span className="faq-toggle">{isActive ? '-' : '+'}</span></h3>
      <div className="faq-answer">
        <p>{answer}</p>
      </div>
    </div>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const backgroundRef = useRef(null);
  const mainSectionRef = useRef(null);
  const parallaxRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [generatingProgress, setGeneratingProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const aiPipelineRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGeneratingProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveStep(0);
          const interval = setInterval(() => {
            setActiveStep((prevStep) => {
              if (prevStep >= 2) {
                clearInterval(interval);
                return 2;
              }
              return prevStep + 1;
            });
          }, 2000);

          return () => clearInterval(interval);
        }
      });
    }, options);

    if (aiPipelineRef.current) {
      observer.observe(aiPipelineRef.current);
    }

    return () => {
      if (aiPipelineRef.current) {
        observer.unobserve(aiPipelineRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
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
      answer: "To activate KortexAI, simply log into your account and navigate to the 'AI Systems' section. Click on the 'Activate' button next to KortexAI, and follow the on-screen instructions to set up and customize your AI experience."
    },
    {
      question: "How is KortexAI different from other AI tools?",
      answer: "KortexAI stands out with its advanced neural network architecture, real-time learning capabilities, and seamless integration across multiple platforms. Our AI offers unparalleled accuracy and efficiency in data analysis, natural language processing, and predictive modeling."
    },
    {
      question: "How much usage is included with my KortexAI plan?",
      answer: "Usage limits vary depending on your subscription tier. Our basic plan includes up to 100 hours of AI processing time per month, while our premium plans offer unlimited usage. Check your account dashboard for detailed information on your current plan and usage statistics."
    },
    {
      question: "Can KortexAI generate 3D assets or site animations?",
      answer: "Yes, KortexAI has advanced capabilities in generating 3D assets and creating dynamic site animations. Our AI can produce high-quality 3D models, textures, and animations based on text descriptions or 2D references. For web animations, KortexAI can generate custom CSS and JavaScript code to bring your site to life."
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (sectionId) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      <header className="header">
        <div className="logo">KortexAI</div>
        <nav className={`nav ${menuOpen ? 'active' : ''}`}>
          <ul>
            {['home', 'ai-systems', 'modules', 'features', 'pricing', 'faq'].map((item) => (
              <li key={item}>
                <a href={`#${item}`} onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(`#${item}`);
                  setMenuOpen(false);
                }}>
                  {item.charAt(0).toUpperCase() + item.slice(1).replace('-', ' ')}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button className="create-account-btn">Create Account</button>
        <div className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
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

      <div className="partner-strip">
        <div className="partner-strip-content">
          {/* First set of partners */}
          <span>Zapier</span>
          <span>Ramp</span>
          <span>Raycast</span>
          <span>OpenAI</span>
          <span>Vercel</span>
          <span>Stripe</span>
          <span>MongoDB</span>
          <span>AWS</span>
          {/* Duplicate set for seamless loop */}
          <span>Cloudflare</span>
          <span>Google</span>
          <span>Microsoft</span>
          <span>DeepMind</span>
          <span>IBM</span>
          <span>Amazon</span>
          <span>Apple</span>
          <span>Salesforce</span>
        </div>
      </div>

      <section className="performance-metrics">
        <motion.div 
          className="metrics-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="metrics-header">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              AI Performance Metrics
            </motion.h2>
            <motion.p 
              className="metrics-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Showing AI system performance over time
            </motion.p>
          </div>

          <div className="metrics-grid">
            {[
              { name: "Accuracy", value: 95, icon: "⊕", change: 2.3 },
              { name: "Speed", value: 88, icon: "⚡", change: 1.7 },
              { name: "Efficiency", value: 78, icon: "◈", change: 3.1 },
              { name: "Reliability", value: 92, icon: "◊", change: 0.9 }
            ].map((metric, index) => (
              <motion.div
                key={metric.name}
                className="metric-box"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <div className="metric-header">
                  <h3>{metric.name}</h3>
                  <span className="metric-icon">{metric.icon}</span>
                </div>
                <div className="metric-value">{metric.value}%</div>
                <div className="metric-progress">
                  <motion.div 
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="metrics-footer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="trend-info">
              <div className="trend-badge">
                +5.2% <span className="trend-arrow">↗</span>
              </div>
              <span className="trend-text">Performance increase this month</span>
            </div>
            <div className="period">Q1 2024</div>
          </motion.div>
        </motion.div>
      </section>

      <footer className="footer-section">
        <div className="background-section" ref={backgroundRef}>
          <div className="background-content">
            <div className="ai-solution-box">
              <h2>AI Solutions</h2>
              <p>Describe your issue and let our AI generate a solution for you!</p>
              
              {/* New AI Pipeline Section */}
              <div className="ai-pipeline-section">
                <AIPipeline onComplete={() => console.log('Generation complete')} />
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
                  <FAQItem key={index} question={item.question} answer={item.answer} />
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

      {showBackToTop && (
        <button className="back-to-top" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
}

export default App;
