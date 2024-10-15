import React, { useEffect, useRef, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area, LabelList } from 'recharts';
import './App.css';

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
  const [performanceData, setPerformanceData] = useState([
    { name: 'Day 1', value: 70 },
    { name: 'Day 2', value: 85 },
    { name: 'Day 3', value: 60 },
    { name: 'Day 4', value: 90 },
    { name: 'Day 5', value: 75 },
    { name: 'Day 6', value: 80 },
    { name: 'Day 7', value: 95 }
  ]);

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
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        setPerformanceData(prevData => {
          const newData = [...prevData];
          const lastValue = newData[newData.length - 1].value;
          const newValue = Math.max(0, Math.min(100, lastValue + (Math.random() * 10 - 5)));
          newData.push({ name: `Day ${(newData.length % 7) + 1}`, value: newValue });
          if (newData.length > 7) newData.shift();
          return newData;
        });
      }, 2000);

      return () => {
        clearInterval(interval);
      };
    }, 5000); // 5-second delay before starting the loop

    return () => clearTimeout(delay);
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
        <nav className="nav">
          <ul>
            {['home', 'ai-systems', 'modules', 'features', 'pricing', 'faq'].map((item) => (
              <li key={item}>
                <a href={`#${item}`} onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(`#${item}`);
                }}>
                  {item.charAt(0).toUpperCase() + item.slice(1).replace('-', ' ')}
                </a>
              </li>
            ))}
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

      <div className="partner-strip">
        <div className="partner-strip-content">
          <span>Vercel</span>
          <span>Loom</span>
          <span>Cash App</span>
          <span>Zapier</span>
          <span>Ramp</span>
          <span>Raycast</span>
          <span>OpenAI</span>
          <span>DeepMind</span>
          <span>IBM Watson</span>
          <span>Google AI</span>
          <span>Microsoft Azure</span>
          <span>Amazon AWS</span>
        </div>
      </div>

      <section className="performance-metrics">
        <h2>AI Performance Metrics</h2>
        <div className="graph-container">
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4a4af0" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4a4af0" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
              <XAxis 
                dataKey="name" 
                stroke="#ffffff" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12, fill: 'rgba(255, 255, 255, 0.7)' }}
              />
              <YAxis 
                stroke="#ffffff" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12, fill: 'rgba(255, 255, 255, 0.7)' }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ stroke: 'rgba(255, 255, 255, 0.2)', strokeWidth: 1 }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#4a4af0" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorValue)"
                dot={{ r: 4, fill: "#4a4af0", stroke: "#ffffff", strokeWidth: 2 }}
                activeDot={{ r: 6, fill: "#ffffff", stroke: "#4a4af0", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <footer className="footer-section">
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
                      <div className={`ai-pipeline-step ${activeStep === 0 ? 'active' : ''}`}>
                        <span className="step-icon">✨</span>
                        <h4>Analyzing prompt...</h4>
                        <p>KortexAI determines the subject and context of your issue.</p>
                      </div>
                      <div className={`ai-pipeline-step ${activeStep === 1 ? 'active' : ''}`}>
                        <span className="step-icon">🔧</span>
                        <h4>Crafting solutions...</h4>
                        <p>Next, it generates tailored solutions based on the analysis.</p>
                      </div>
                      <div className={`ai-pipeline-step ${activeStep === 2 ? 'active' : ''}`}>
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
                    <p className="generating-text">Generating your solution... {generatingProgress}%</p>
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