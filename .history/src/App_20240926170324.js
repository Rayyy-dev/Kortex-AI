import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './App.css';

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Three.js background
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const material = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x4a4af0,
    });

    const particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);

    camera.position.z = 2;

    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };

    animate();

    // Graph animation
    const bars = document.querySelectorAll('.graph-bar');
    const lines = document.querySelectorAll('.graph-line');
    
    bars.forEach((bar, index) => {
      const height = bar.getAttribute('data-height');
      setTimeout(() => {
        bar.style.height = `${height}%`;
        if (index < bars.length - 1) {
          lines[index].style.transform = 'scaleX(1)';
        }
      }, 500 + index * 300);
    });
  }, []);

  return (
    <div className="App">
      <canvas ref={canvasRef} style={{position: 'fixed', top: 0, left: 0, zIndex: -1}} />
      {/* Header */}
      <header className="header">
        <div className="logo">CortexAI</div>
        <nav className="nav">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#defi-app">AI Systems</a></li>
            <li><a href="#assets">Modules</a></li>
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
          <h1 className="main-title">AI-Powered Systems for Tomorrow</h1>
          <p className="main-subtitle">
            Enhance security, efficiency, and innovation with AI.
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
          <span>AI Horizons</span>
        </div>

        <div className="partners">
          <span className="partner floating" style={{animationDelay: '0s'}}>Vercel</span>
          <span className="partner floating" style={{animationDelay: '0.5s'}}>Loom</span>
          <span className="partner floating" style={{animationDelay: '1s'}}>Cash App</span>
          <span className="partner floating" style={{animationDelay: '1.5s'}}>Loops</span>
          <span className="partner floating" style={{animationDelay: '2s'}}>Zapier</span>
          <span className="partner floating" style={{animationDelay: '2.5s'}}>Ramp</span>
          <span className="partner floating" style={{animationDelay: '3s'}}>Raycast</span>
        </div>

        <div className="graph-section">
          <div className="graph-container">
            <div className="graph-y-axis"></div>
            <div className="graph-x-axis"></div>
            <div className="graph-bar" data-height="60">
              <div className="graph-dot"></div>
            </div>
            <div className="graph-line" style={{top: '40%'}}></div>
            <div className="graph-bar" data-height="80">
              <div className="graph-dot"></div>
            </div>
            <div className="graph-line" style={{top: '20%'}}></div>
            <div className="graph-bar" data-height="40">
              <div className="graph-dot"></div>
            </div>
            <div className="graph-line" style={{top: '60%'}}></div>
            <div className="graph-bar" data-height="90">
              <div className="graph-dot"></div>
            </div>
            <div className="graph-line" style={{top: '10%'}}></div>
            <div className="graph-bar" data-height="70">
              <div className="graph-dot"></div>
            </div>
          </div>
          <div className="graph-label">AI Performance Metrics</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
