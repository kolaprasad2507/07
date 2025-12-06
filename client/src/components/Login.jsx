import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Sparkles, Heart } from 'lucide-react';
import '../styles/Login.css';

const Login = () => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [particles, setParticles] = useState([]);
  
  const navigate = useNavigate();
  const correctPin = '1234'; // Hard-coded PIN

  // Create heart particles
  const createHeartParticles = (x, y) => {
    const newParticles = [];
    for (let i = 0; i < 8; i++) {
      newParticles.push({
        id: Date.now() + i,
        x,
        y,
        size: 15 + Math.random() * 20,
        delay: Math.random() * 0.5,
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
    
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)));
    }, 2000);
  };

  // Handle PIN input with validation
  const handlePinChange = (e) => {
    const value = e.target.value;
    
    // Only allow numbers and limit to 4 digits
    if (/^\d*$/.test(value) && value.length <= 4) {
      setPin(value);
      if (error) setError('');
      
      // Add floating hearts on each digit entry
      if (value.length > 0) {
        const rect = e.target.getBoundingClientRect();
        createHeartParticles(rect.left + rect.width / 2, rect.top);
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (pin.length !== 4) {
      setError('PIN must be exactly 4 digits');
      return;
    }

    setIsSubmitting(true);
    
    // Create celebration hearts
    const hearts = [];
    for (let i = 0; i < 15; i++) {
      hearts.push({
        id: Date.now() + i,
        x: Math.random() * 100,
        delay: Math.random() * 1,
        size: 20 + Math.random() * 30,
      });
    }
    setFloatingHearts(hearts);

    // Simulate API call delay
    setTimeout(() => {
      if (pin === correctPin) {
        setShowSuccess(true);
        
        // Create success particles
        createHeartParticles(window.innerWidth / 2, window.innerHeight / 2);
        
        // Navigate to Home after success animation
        setTimeout(() => {
          navigate('/home');
        }, 1500);
      } else {
        setError('Invalid PIN');
        setIsSubmitting(false);
        setFloatingHearts([]);
        
        // Shake animation for error
        const input = document.querySelector('.pin-input');
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 500);
      }
    }, 800);
  };

  return (
    <div className="login-container">
      {/* Background floating hearts */}
      <div className="floating-hearts-bg" aria-hidden="true">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="floating-heart-item"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${5 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${20 + Math.random() * 30}px`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Success celebration hearts */}
      {floatingHearts.map((heart) => (
        <div
          key={heart.id}
          className="celebration-heart"
          style={{
            left: `${heart.x}%`,
            fontSize: `${heart.size}px`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          ❤️
        </div>
      ))}

      {/* Click particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="click-particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          💕
        </div>
      ))}

      <div className="login-content">
        {/* Decorative elements */}
        <div className="corner-decor top-left">✨</div>
        <div className="corner-decor top-right">💖</div>
        <div className="corner-decor bottom-left">💝</div>
        <div className="corner-decor bottom-right">✨</div>

        {/* Header */}
        <div className="login-header">
          <div className="sparkle-icon">
            <Sparkles size={32} />
          </div>
          <h1 className="login-title">Welcome Back 💫</h1>
          <p className="login-subtitle">Enter your special PIN to continue</p>
        </div>

        {/* Main form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="pin" className="input-label">
              <Lock className="label-icon" size={18} />
              Enter Pin
            </label>
            
            <div className="pin-input-wrapper">
              <input
                id="pin"
                type="password"
                value={pin}
                onChange={handlePinChange}
                className={`pin-input ${error ? 'error' : ''}`}
                placeholder="••••"
                maxLength={4}
                inputMode="numeric"
                pattern="\d*"
                autoComplete="off"
                disabled={isSubmitting || showSuccess}
                aria-label="Enter 4-digit PIN"
                aria-describedby={error ? "pin-error" : "pin-help"}
              />
              
              {/* PIN indicator dots - Fixed alignment */}
              <div className="pin-indicator">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className={`pin-dot ${index < pin.length ? 'filled' : ''}`}
                  />
                ))}
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div id="pin-error" className="error-message">
                {error}
              </div>
            )}

            {/* Help text */}
            <div id="pin-help" className="help-text">
              Enter exactly 4 digits
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className={`submit-btn ${isSubmitting ? 'submitting' : ''} ${showSuccess ? 'success' : ''}`}
            disabled={pin.length !== 4 || isSubmitting || showSuccess}
          >
            {showSuccess ? (
              <>
                <span className="success-icon">🎉</span>
                Access Granted!
              </>
            ) : isSubmitting ? (
              <>
                <span className="spinner" />
                Verifying...
              </>
            ) : (
              'Unlock the Magic 🔓'
            )}
          </button>
        </form>

        {/* Decorative footer */}
        <div className="login-footer">
          <div className="hearts-row">
            {[...Array(5)].map((_, i) => (
              <Heart
                key={i}
                className="heart-icon"
                style={{ animationDelay: `${i * 0.3}s` }}
                size={20}
              />
            ))}
          </div>
          <p className="footer-note">For my special someone only 💕</p>
        </div>
      </div>

      {/* Success overlay */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-content">
            <div className="success-sparkle">✨</div>
            <h2 className="success-title">Welcome! 🥰</h2>
            <p className="success-message">Taking you to the birthday celebration...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;