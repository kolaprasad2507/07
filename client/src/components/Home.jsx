import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/Home.css';

const Home = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [particles, setParticles] = useState([]);
  const [showCake, setShowCake] = useState(false);
  const [cakeSlices, setCakeSlices] = useState([
    { id: 1, cut: false, angle: 0 },
    { id: 2, cut: false, angle: 45 },
    { id: 3, cut: false, angle: 90 },
    { id: 4, cut: false, angle: 135 },
    { id: 5, cut: false, angle: 180 },
    { id: 6, cut: false, angle: 225 },
    { id: 7, cut: false, angle: 270 },
    { id: 8, cut: false, angle: 315 },
  ]);
  const [candlesLit, setCandlesLit] = useState(true);
  const [isBlowing, setIsBlowing] = useState(false);
  const [biteMessages, setBiteMessages] = useState([]);
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [celebrationActive, setCelebrationActive] = useState(false);
  const [confettiParticles, setConfettiParticles] = useState([]);
  const [fallingConfetti, setFallingConfetti] = useState([]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [autoPlayInterval, setAutoPlayInterval] = useState(3000);
  const galleryTrackRef = useRef(null);
  const autoPlayTimerRef = useRef(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Birthday celebration emojis state
  const [birthdayEmojis, setBirthdayEmojis] = useState([]);
  
  // Toast notification
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Candle positions
  const [candlePositions] = useState([
    { id: 1, x: 36, y: 48.33 },
    { id: 2, x: 50, y: 43.33 },
    { id: 3, x: 64, y: 48.33 },
  ]);

  // Photo URLs
  const photos = [
    '/assests/photo1.jpg',
    '/assests/photo2.jpg',
    '/assests/photo3.jpg',
    '/assests/photo4.jpg',
    '/assests/photo5.png',
    '/assests/photo6.jpg',
    '/assests/photo7.jpg',
    '/assests/photo8.png',
  ];

  const letterText = `My Dearest Maaaaaa,
On this magical day that brought you into the world, I want to remind you how incredibly special you are. Your smile is my sunrise, your laughter is my favorite melody, and your love is the greatest gift I've ever received.

Every moment with you feels like a beautiful dream. You've painted my world with colors I never knew existed, and my heart finds its home in your embrace.

May this birthday be as radiant and wonderful as you are. You deserve all the happiness in the universe and more.

Your Nanna 💖`;

  // Typing effect for the letter
  useEffect(() => {
    if (showMessage && !isTypingComplete) {
      setDisplayText('');
      let i = 0;
      const typing = setInterval(() => {
        if (i < letterText.length) {
          setDisplayText(letterText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typing);
          setIsTypingComplete(true);
        }
      }, 30);

      return () => clearInterval(typing);
    }
  }, [showMessage, isTypingComplete, letterText]);

  // Auto-play gallery functionality
  useEffect(() => {
    if (showSlideshow && isAutoPlaying) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }

    return () => {
      stopAutoPlay();
    };
  }, [showSlideshow, isAutoPlaying, currentPhotoIndex]);

  const startAutoPlay = () => {
    stopAutoPlay();
    
    autoPlayTimerRef.current = setInterval(() => {
      goToNextPhoto();
    }, autoPlayInterval);
  };

  const stopAutoPlay = () => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const goToNextPhoto = () => {
    const nextIndex = (currentPhotoIndex + 1) % photos.length;
    setCurrentPhotoIndex(nextIndex);
    
    if (galleryTrackRef.current) {
      const slideWidth = galleryTrackRef.current.clientWidth;
      galleryTrackRef.current.scrollTo({
        left: nextIndex * slideWidth,
        behavior: 'smooth'
      });
    }
  };

  const goToPrevPhoto = () => {
    const prevIndex = currentPhotoIndex === 0 ? photos.length - 1 : currentPhotoIndex - 1;
    setCurrentPhotoIndex(prevIndex);
    
    if (galleryTrackRef.current) {
      const slideWidth = galleryTrackRef.current.clientWidth;
      galleryTrackRef.current.scrollTo({
        left: prevIndex * slideWidth,
        behavior: 'smooth'
      });
    }
  };

  // Show toast notification
  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Create falling birthday celebration emojis (🎉 and 🥰)
  const createBirthdayEmojis = () => {
    const newEmojis = [];
    const emojis = ['🎉', '🎉', '🥰', '🎊', '✨', '🎈', '🥳', '🎂', '🎁', '💝', '💖', '💕', '🥰', '🎉', '🥰'];
    
    for (let i = 0; i < 40; i++) {
      const startX = Math.random() * 100;
      const duration = 2 + Math.random() * 2;
      const delay = Math.random() * 1;
      const size = 20 + Math.random() * 30;
      
      // Weight towards 🎉 and 🥰
      let emoji;
      const rand = Math.random();
      if (rand < 0.4) emoji = '🎉';
      else if (rand < 0.7) emoji = '🥰';
      else emoji = emojis[Math.floor(Math.random() * emojis.length)];
      
      // Random rotation and animation variations
      const rotationStart = Math.random() * 360;
      const rotationEnd = rotationStart + 360 + Math.random() * 180;
      const fallDistance = 100 + Math.random() * 50;
      
      newEmojis.push({
        id: Date.now() + i,
        startX,
        size,
        emoji,
        rotationStart,
        rotationEnd,
        fallDistance,
        duration,
        delay,
        opacity: 0.8 + Math.random() * 0.2
      });
    }
    
    setBirthdayEmojis(newEmojis);
    
    // Clear emojis after animation completes
    setTimeout(() => {
      setBirthdayEmojis([]);
    }, (Math.max(...newEmojis.map(e => e.duration + e.delay)) * 1000) + 1000);
  };

  // Create falling confetti particles
  const createFallingConfetti = () => {
    const newConfetti = [];
    const colors = ['#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#118AB2', '#EF476F', '#FFD166', '#9B5DE5', '#00BBF9', '#00F5D4'];
    
    for (let i = 0; i < 80; i++) {
      const startX = Math.random() * 100;
      const endX = startX + (Math.random() - 0.5) * 10;
      const duration = 3 + Math.random() * 2;
      const delay = Math.random() * 1;
      const size = 20 + Math.random() * 30;
      const emoji = Math.random() > 0.5 ? '🎉' : '🥰';
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      newConfetti.push({
        id: Date.now() + i,
        startX,
        endX,
        startY: -10,
        endY: 100,
        size,
        emoji,
        color,
        rotation: Math.random() * 360,
        rotationSpeed: 0.5 + Math.random() * 2,
        duration,
        delay,
        opacity: 0.9 + Math.random() * 0.1
      });
    }
    
    setFallingConfetti(newConfetti);
    
    setTimeout(() => {
      setFallingConfetti([]);
    }, 6000);
  };

  // Celebration effect for first slice with birthday emojis and confetti
  const triggerCelebration = () => {
    setCelebrationActive(true);
    createBirthdayEmojis();
    createFallingConfetti();
    
    const newParticles = [];
    const colors = ['#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#118AB2', '#EF476F', '#FFD166'];
    
    for (let i = 0; i < 60; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 8 + Math.random() * 12,
        rotationX: Math.random() * 360,
        rotationY: Math.random() * 360,
        rotationZ: Math.random() * 360,
        duration: 1.5 + Math.random() * 1.5,
        delay: Math.random() * 0.5,
        fallDistance: 50 + Math.random() * 100
      });
    }
    
    setConfettiParticles(newParticles);
    showToastMessage('First slice cut! Opening gallery... 🎉🥰');
    
    setTimeout(() => {
      setCelebrationActive(false);
    }, 1500);
    
    setTimeout(() => {
      setShowCake(false);
      setShowSlideshow(true);
      setTimeout(() => setConfettiParticles([]), 1000);
    }, 3000);
  };

  // Blow candles with animation
  const handleBlowCandles = (e) => {
    e.stopPropagation();
    if (!candlesLit || isBlowing) return;
    
    setIsBlowing(true);
    
    const blowParticles = [];
    for (let i = 0; i < 20; i++) {
      blowParticles.push({
        id: Date.now() + i,
        x: 50,
        y: 40,
        size: 5 + Math.random() * 10,
        duration: 1 + Math.random(),
        delay: Math.random() * 0.3
      });
    }
    
    setTimeout(() => {
      setCandlesLit(false);
      setIsBlowing(false);
      showToastMessage('Candles blown out! 🎉');
    }, 800);
  };

  // Touch events for mobile gallery swipe
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setIsScrolling(true);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e) => {
    if (!isScrolling) return;
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isScrolling) return;
    
    const swipeThreshold = 50;
    const difference = touchStartX - touchEndX;
    
    if (Math.abs(difference) > swipeThreshold) {
      if (difference > 0) {
        goToNextPhoto();
      } else {
        goToPrevPhoto();
      }
    }
    
    setIsScrolling(false);
    setTouchStartX(0);
    setTouchEndX(0);
  };

  // Manual scroll handling
  const scrollGallery = (direction) => {
    setIsAutoPlaying(false);
    
    if (galleryTrackRef.current) {
      const track = galleryTrackRef.current;
      const scrollAmount = track.clientWidth;
      
      track.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
      
      const newIndex = direction === 'next' 
        ? (currentPhotoIndex + 1) % photos.length
        : currentPhotoIndex === 0 ? photos.length - 1 : currentPhotoIndex - 1;
      
      setCurrentPhotoIndex(newIndex);
    }
  };

  // Update current index when scroll changes
  const handleGalleryScroll = () => {
    if (galleryTrackRef.current) {
      const scrollLeft = galleryTrackRef.current.scrollLeft;
      const slideWidth = galleryTrackRef.current.clientWidth;
      const newIndex = Math.round(scrollLeft / slideWidth);
      if (newIndex !== currentPhotoIndex) {
        setCurrentPhotoIndex(newIndex);
      }
    }
  };

  // Prevent background scroll when modal/overlays are open
  useEffect(() => {
    if (showMessage || showSlideshow) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showMessage, showSlideshow]);

  // Fixed: Particle effect when clicking anywhere
  const handleGlobalClick = (e) => {
    // Don't create particles if clicking on interactive elements
    if (e.target.tagName === 'BUTTON' || 
        e.target.closest('button') || 
        e.target.closest('.modal-content') ||
        e.target.closest('.slideshow-container')) {
      return;
    }
    
    const newParticle = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      createdAt: Date.now(),
    };
    
    setParticles((prev) => [...prev, newParticle]);
    
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 2000);
  };

  // Add this useEffect to attach global click handler
  useEffect(() => {
    document.addEventListener('click', handleGlobalClick);
    
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  // Open letter modal
  const handleLetterClick = (e) => {
    e.stopPropagation();
    setShowMessage(true);
    setIsTypingComplete(false);
  };

  // Close modal
  const handleCloseMessage = () => {
    setShowMessage(false);
    setDisplayText('');
    setIsTypingComplete(false);
  };

  // Navigate to cake section
  const handleGoToCake = () => {
    setShowMessage(false);
    setDisplayText('');
    setIsTypingComplete(false);
    setTimeout(() => setShowCake(true), 300);
  };

  // Round cake slice click with 3D animation
  const handleSliceClick = (sliceId, event) => {
    event.stopPropagation();
    if (candlesLit) return;

    const slice = cakeSlices.find((s) => s.id === sliceId);
    if (!slice || slice.cut) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const newBiteMessage = {
      id: Date.now(),
      x: rect.left + rect.width / 2,
      y: rect.top,
      text: 'Yummy bite! 😋',
    };

    setBiteMessages((prev) => [...prev, newBiteMessage]);
    setTimeout(() => {
      setBiteMessages((prev) => prev.filter((m) => m.id !== newBiteMessage.id));
    }, 2000);

    // Check if this is the first slice being cut
    const isFirstSlice = cakeSlices.filter(s => s.cut).length === 0;
    
    // Apply 3D slice cut animation
    setCakeSlices((prev) => prev.map((s) => (s.id === sliceId ? { ...s, cut: true } : s)));
    
    // Trigger celebration for first slice and navigate to gallery
    if (isFirstSlice) {
      setTimeout(() => {
        triggerCelebration();
      }, 500);
    }
  };

  // Full reset to beginning
  const resetAll = () => {
    setShowSlideshow(false);
    setShowCake(false);
    setShowMessage(false);
    setCurrentPhotoIndex(0);
    setCelebrationActive(false);
    setConfettiParticles([]);
    setFallingConfetti([]);
    setBirthdayEmojis([]);
    setShowToast(false);
    setCandlesLit(true);
    setIsBlowing(false);
    setIsAutoPlaying(true);

    setCakeSlices([
      { id: 1, cut: false, angle: 0 },
      { id: 2, cut: false, angle: 45 },
      { id: 3, cut: false, angle: 90 },
      { id: 4, cut: false, angle: 135 },
      { id: 5, cut: false, angle: 180 },
      { id: 6, cut: false, angle: 225 },
      { id: 7, cut: false, angle: 270 },
      { id: 8, cut: false, angle: 315 },
    ]);
  };

  return (
    <div className="birthday-container">
      {/* floating decorative hearts */}
      <div className="floating-hearts-bg" aria-hidden="true">
        {[...Array(20)].map((_, i) => (
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

      {/* Toast Notification */}
      {showToast && (
        <div className="toast-notification">
          <div className="toast-content">
            <span className="toast-icon">🎉</span>
            <span className="toast-text">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Birthday Celebration Emojis falling from top to bottom */}
      {birthdayEmojis.map((emoji) => (
        <div
          key={emoji.id}
          className="birthday-emoji"
          style={{
            left: `${emoji.startX}%`,
            fontSize: `${emoji.size}px`,
            animationDuration: `${emoji.duration}s`,
            animationDelay: `${emoji.delay}s`,
            '--rotation-start': `${emoji.rotationStart}deg`,
            '--rotation-end': `${emoji.rotationEnd}deg`,
            '--fall-distance': `${emoji.fallDistance}vh`,
            opacity: emoji.opacity,
            zIndex: 9999,
          }}
        >
          {emoji.emoji}
        </div>
      ))}

      {/* Falling Confetti Particles */}
      {fallingConfetti.map((confetti) => (
        <div
          key={confetti.id}
          className="falling-confetti"
          style={{
            left: `${confetti.startX}%`,
            top: `${confetti.startY}%`,
            fontSize: `${confetti.size}px`,
            color: confetti.color,
            '--end-x': `${confetti.endX}%`,
            '--end-y': `${confetti.endY}%`,
            '--rotation': `${confetti.rotation}deg`,
            '--rotation-speed': `${confetti.rotationSpeed}s`,
            animationDuration: `${confetti.duration}s`,
            animationDelay: `${confetti.delay}s`,
            opacity: confetti.opacity,
            zIndex: 9998,
          }}
        >
          {confetti.emoji}
        </div>
      ))}

      {/* 3D Confetti Particles */}
      {confettiParticles.map((particle) => (
        <div
          key={particle.id}
          className="confetti-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            '--rotate-x': `${particle.rotationX}deg`,
            '--rotate-y': `${particle.rotationY}deg`,
            '--rotate-z': `${particle.rotationZ}deg`,
            '--fall-distance': `${particle.fallDistance}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}

      {/* click particles (small hearts) */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="click-particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
          }}
        >
          💖
        </div>
      ))}

      {/* bite messages */}
      {biteMessages.map((msg) => (
        <div
          key={msg.id}
          className="bite-message"
          style={{
            left: `${msg.x}px`,
            top: `${msg.y}px`,
            transform: 'translateX(-50%)',
          }}
        >
          {msg.text}
        </div>
      ))}

      {/* Main content (teddy + letter) */}
      {!showCake && !showSlideshow && (
        <div className="main-content" role="main">
          <div className="teddy-container">
            <svg width="320" height="420" viewBox="0 0 320 420" className="teddy-svg" aria-hidden="true">
              <defs>
                <radialGradient id="furGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#CD853F" />
                  <stop offset="100%" stopColor="#8B4513" />
                </radialGradient>
                <radialGradient id="bellyGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#F4A460" />
                  <stop offset="100%" stopColor="#D2691E" />
                </radialGradient>
                <filter id="softShadow">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                  <feOffset dx="2" dy="2" result="offsetblur" />
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.3" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <circle cx="95" cy="75" r="38" fill="url(#furGradient)" filter="url(#softShadow)" />
              <circle cx="95" cy="78" r="26" fill="#F4A460" />

              <circle cx="225" cy="75" r="38" fill="url(#furGradient)" filter="url(#softShadow)" />
              <circle cx="225" cy="78" r="26" fill="#F4A460" />

              <circle cx="160" cy="120" r="75" fill="url(#furGradient)" filter="url(#softShadow)" />

              <ellipse cx="160" cy="145" rx="45" ry="35" fill="#F4A460" />

              <g filter="url(#softShadow)">
                <ellipse cx="135" cy="110" rx="10" ry="12" fill="#000" />
                <ellipse cx="185" cy="110" rx="10" ry="12" fill="#000" />
                <circle cx="137" cy="107" r="4" fill="#fff" />
                <circle cx="187" cy="107" r="4" fill="#fff" />
              </g>

              <path d="M 120 100 Q 135 95 145 98" stroke="#6B4423" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M 175 98 Q 185 95 200 100" stroke="#6B4423" strokeWidth="2.5" fill="none" strokeLinecap="round" />

              <ellipse cx="160" cy="140" rx="10" ry="12" fill="#000" />
              <ellipse cx="157" cy="137" rx="3" ry="4" fill="#fff" opacity="0.6" />

              <path d="M 145 155 Q 160 165 175 155" stroke="#6B4423" strokeWidth="3" fill="none" strokeLinecap="round" />
              <line x1="160" y1="140" x2="160" y2="155" stroke="#6B4423" strokeWidth="2.5" />

              <circle cx="115" cy="135" r="12" fill="#FFB6C1" opacity="0.6" />
              <circle cx="205" cy="135" r="12" fill="#FFB6C1" opacity="0.6" />

              <ellipse cx="160" cy="280" rx="85" ry="105" fill="url(#furGradient)" filter="url(#softShadow)" />

              <ellipse cx="160" cy="285" rx="55" ry="70" fill="url(#bellyGradient)" />

              <ellipse cx="75" cy="260" rx="28" ry="65" fill="url(#furGradient)" transform="rotate(-25 75 260)" filter="url(#softShadow)" />
              <ellipse cx="68" cy="295" rx="22" ry="22" fill="#F4A460" />

              <ellipse cx="245" cy="260" rx="28" ry="65" fill="url(#furGradient)" transform="rotate(25 245 260)" filter="url(#softShadow)" />
              <ellipse cx="252" cy="295" rx="22" ry="22" fill="#F4A460" />

              <ellipse cx="120" cy="370" rx="32" ry="48" fill="url(#furGradient)" filter="url(#softShadow)" />
              <ellipse cx="120" cy="395" rx="38" ry="22" fill="#F4A460" />
              <ellipse cx="115" cy="395" rx="10" ry="8" fill="#D2691E" />
              <ellipse cx="125" cy="395" rx="10" ry="8" fill="#D2691E" />

              <ellipse cx="200" cy="370" rx="32" ry="48" fill="url(#furGradient)" filter="url(#softShadow)" />
              <ellipse cx="200" cy="395" rx="38" ry="22" fill="#F4A460" />
              <ellipse cx="195" cy="395" rx="10" ry="8" fill="#D2691E" />
              <ellipse cx="205" cy="395" rx="10" ry="8" fill="#D2691E" />

              <path
                d="M 120 275 Q 120 295 130 305 L 190 305 Q 200 295 200 275"
                fill="#CD853F"
                stroke="#8B4513"
                strokeWidth="2.5"
                filter="url(#softShadow)"
              />
              <line x1="120" y1="275" x2="200" y2="275" stroke="#8B4513" strokeWidth="2.5" />

              {[125, 135, 145, 155, 165, 175, 185, 195].map((x, i) => (
                <line key={i} x1={x} y1="278" x2={x} y2="283" stroke="#A0522D" strokeWidth="1" />
              ))}

              <g
                className={`letter-in-pocket ${isHovering ? 'hovered' : ''}`}
                onClick={handleLetterClick}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                role="button"
                aria-label="Open letter"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleLetterClick(e);
                }}
              >
                <rect x="140" y="265" width="40" height="30" fill="#FFF9E6" stroke="#DAA520" strokeWidth="2" rx="2" filter="url(#softShadow)" />
                <path d="M 140 265 L 160 278 L 180 265" fill="#FFE4B5" stroke="#DAA520" strokeWidth="2" />
                <line x1="140" y1="265" x2="160" y2="278" stroke="#DAA520" strokeWidth="2" />
                <line x1="180" y1="265" x2="160" y2="278" stroke="#DAA520" strokeWidth="2" />
                <line x1="145" y1="282" x2="175" y2="282" stroke="#D4AF37" strokeWidth="0.8" opacity="0.5" />
                <line x1="145" y1="286" x2="170" y2="286" stroke="#D4AF37" strokeWidth="0.8" opacity="0.5" />
                <circle cx="160" cy="270" r="7" fill="#FF1493" />
                <path d="M 157 270 L 160 273 L 163 270" stroke="#FFF" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </g>

              <path
                d="M 160 235 L 163 232 Q 165 230 167 232 Q 169 230 171 232 L 174 235 Q 174 238 167 245 L 160 252 L 153 245 Q 146 238 146 235 L 149 232 Q 151 230 153 232 Q 155 230 157 232 Z"
                fill="#FF69B4"
                opacity="0.7"
                filter="url(#softShadow)"
              />
            </svg>

            {isHovering && <div className="hover-tooltip">Click the letter! 💌</div>}
          </div>

          <p className="instruction-text">Click on the letter in the teddy's pocket! ✨</p>
          <p className="instruction-text click-instruction">Or click anywhere for more love! 💕</p>
        </div>
      )}

      {/* Cake scene */}
      {showCake && !showSlideshow && (
        <div className="cake-scene" role="region" aria-label="Cake scene">
          <h1 className="cake-title">Time to Cut Your Birthday Cake 🎂</h1>

          {/* Round cake container for all screen sizes */}
          <div className="round-cake-container" aria-hidden={false}>
            {/* Candles positioned on cake using percentages */}
            {candlesLit && (
              <div className="candles-container">
                {candlePositions.map((candle) => (
                  <div 
                    key={candle.id} 
                    className="candle-wrapper"
                    style={{
                      left: `${candle.x}%`,
                      top: `${candle.y}%`,
                    }}
                  >
                    <div className={`flame ${isBlowing ? 'blowing-out' : ''}`} />
                    <div className="candle-stick" />
                  </div>
                ))}
              </div>
            )}

            <svg 
              viewBox="0 0 500 300" 
              className="round-cake-svg" 
              role="img" 
              aria-label="Birthday cake"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <radialGradient id="cakeBodyGradient" cx="50%" cy="40%">
                  <stop offset="0%" stopColor="#FFF5F7" />
                  <stop offset="50%" stopColor="#FED7E2" />
                  <stop offset="100%" stopColor="#FBB6CE" />
                </radialGradient>
                <linearGradient id="cakeSideGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FED7E2" />
                  <stop offset="100%" stopColor="#F687B3" />
                </linearGradient>
                <radialGradient id="frostingTopGradient" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#FFF5F7" />
                </radialGradient>
                <linearGradient id="pinkFrosting" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFB6C1" />
                  <stop offset="50%" stopColor="#FF69B4" />
                  <stop offset="100%" stopColor="#FF1493" />
                </linearGradient>
                <filter id="cakeShadow">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
                  <feOffset dx="0" dy="8" result="offsetblur" />
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.25" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Cake base shadow */}
              <ellipse cx="250" cy="265" rx="160" ry="20" fill="rgba(0,0,0,0.1)" />
              
              {/* Cake base plate */}
              <ellipse cx="250" cy="255" rx="145" ry="15" fill="#FFF8DC" stroke="#F5DEB3" strokeWidth="2.5" />
              
              {/* Cake side */}
              <ellipse cx="250" cy="235" rx="135" ry="30" fill="url(#cakeSideGradient)" filter="url(#cakeShadow)" />
              
              {/* Cake body */}
              <rect x="115" y="165" width="270" height="70" fill="url(#cakeSideGradient)" filter="url(#cakeShadow)" />
              <ellipse cx="250" cy="165" rx="135" ry="30" fill="url(#cakeBodyGradient)" filter="url(#cakeShadow)" />
              
              {/* Top decorative border */}
              <ellipse cx="250" cy="165" rx="135" ry="30" fill="none" stroke="#FF69B4" strokeWidth="4" opacity="0.7" />
              
              {/* Swirl frosting decoration */}
              <circle cx="250" cy="165" r="25" fill="url(#pinkFrosting)" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
                const rad = angle * Math.PI / 180;
                const x = 250 + 70 * Math.cos(rad);
                const y = 165 + 20 * Math.sin(rad);
                return (
                  <circle key={angle} cx={x} cy={y} r="12" fill="url(#pinkFrosting)" />
                );
              })}
              
              {/* Pink dots decoration */}
              {[...Array(24)].map((_, i) => {
                const angle = (i * 15 * Math.PI) / 180;
                const x = 250 + 110 * Math.cos(angle);
                const y = 165 + 25 * Math.sin(angle);
                return <circle key={i} cx={x} cy={y} r="6" fill="#FF1493" />;
              })}
              
              {/* Cake slices */}
              <g className="cake-top-slices">
                {cakeSlices.map((slice) => {
                  const angleRad = (slice.angle * Math.PI) / 180;
                  const nextAngleRad = ((slice.angle + 45) * Math.PI) / 180;

                  const x1 = 250 + 135 * Math.cos(angleRad);
                  const y1 = 165 + 30 * Math.sin(angleRad);
                  const x2 = 250 + 135 * Math.cos(nextAngleRad);
                  const y2 = 165 + 30 * Math.sin(nextAngleRad);

                  const largeArcFlag = 0;
                  const sectorPath = `M 250 165 L ${x1} ${y1} A 135 30 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

                  return (
                    <g key={slice.id}>
                      {!slice.cut && (
                        <path
                          d={sectorPath}
                          fill="url(#frostingTopGradient)"
                          stroke="#FFB6C1"
                          strokeWidth="2.5"
                          className={`cake-slice ${candlesLit ? 'disabled' : ''}`}
                          onClick={(e) => handleSliceClick(slice.id, e)}
                        />
                      )}
                      {slice.cut && (
                        <g>
                          <line x1="250" y1="165" x2={x1} y2={y1} stroke="#8B4513" strokeWidth="3" strokeDasharray="5,5" className="cut-line" />
                          <line x1="250" y1="165" x2={x2} y2={y2} stroke="#8B4513" strokeWidth="3" strokeDasharray="5,5" className="cut-line" />
                        </g>
                      )}
                    </g>
                  );
                })}
              </g>
              
              {/* Central decoration */}
              <circle cx="250" cy="165" r="12" fill="#FF1493" opacity="0.8" />
              <path 
                d="M 240 155 Q 250 145 260 155 Q 265 160 260 165 Q 250 175 240 165 Q 235 160 240 155 Z" 
                fill="#FF69B4"
                opacity="0.9"
              />
              
              {/* Slice indicators */}
              {cakeSlices.map((slice) => {
                const angleRad = ((slice.angle + 22.5) * Math.PI) / 180;
                const x = 250 + 110 * Math.cos(angleRad);
                const y = 165 + 25 * Math.sin(angleRad);
                return (
                  <circle 
                    key={`indicator-${slice.id}`} 
                    cx={x} 
                    cy={y} 
                    r="3" 
                    fill="#FF1493" 
                    opacity={slice.cut ? "0.3" : "1"}
                  />
                );
              })}
            </svg>
          </div>

          <div className="cake-instructions">
            {candlesLit ? (
              <button 
                type="button" 
                className="blow-candles-btn" 
                onClick={handleBlowCandles}
                disabled={isBlowing}
              >
                {isBlowing ? 'Blowing... 💨' : '🎂 Blow the Candles! 🕯️'}
              </button>
            ) : (
              <p className="instruction-text">Click on the cake slices to cut them! 🍰<br/>
              <small>Cut just one slice to see the gallery!</small></p>
            )}
          </div>
        </div>
      )}

      {/* Photo Gallery Overlay */}
      {showSlideshow && (
        <div className="slideshow-overlay" role="dialog" aria-modal="true">
          <div className="slideshow-container">
            <h1 className="slideshow-title">Beautiful Memories💕</h1>

            {/* Auto-play controls */}
            <div className="auto-play-controls">
              <button 
                className="auto-play-btn" 
                onClick={toggleAutoPlay}
                aria-label={isAutoPlaying ? "Pause auto-play" : "Start auto-play"}
              >
                {isAutoPlaying ? '⏸️ Pause' : '▶️ Play'}
              </button>
            </div>

            {/* Horizontal Scrolling Gallery */}
            <div className="gallery-container">
              <button 
                className="gallery-nav-btn gallery-prev-btn" 
                onClick={() => {
                  setIsAutoPlaying(false);
                  goToPrevPhoto();
                }}
                aria-label="Previous photo"
              >
                <ChevronLeft size={32} />
              </button>

              <div 
                className="gallery-track" 
                ref={galleryTrackRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onScroll={handleGalleryScroll}
              >
                {photos.map((photo, index) => (
                  <div className="gallery-slide" key={index}>
                    <img 
                      src={photo} 
                      alt={`Memory ${index + 1}`} 
                      className="gallery-photo"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://picsum.photos/seed/${index}/600/400`;
                      }}
                    />
                  </div>
                ))}
              </div>

              <button 
                className="gallery-nav-btn gallery-next-btn" 
                onClick={() => {
                  setIsAutoPlaying(false);
                  goToNextPhoto();
                }}
                aria-label="Next photo"
              >
                <ChevronRight size={32} />
              </button>
            </div>

            <div className="gallery-dots">
              {photos.map((_, index) => (
                <button
                  key={index}
                  className={`gallery-dot ${index === currentPhotoIndex ? 'active' : ''}`}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentPhotoIndex(index);
                    if (galleryTrackRef.current) {
                      const slideWidth = galleryTrackRef.current.clientWidth;
                      galleryTrackRef.current.scrollTo({
                        left: index * slideWidth,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  aria-label={`Go to photo ${index + 1}`}
                />
              ))}
            </div>

            <div className="slideshow-controls">
              <button type="button" className="restart-btn" onClick={resetAll}>
                🎉 Start Over
              </button>
            </div>
          </div>

          <div className="slideshow-hearts" aria-hidden="true">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="slideshow-heart"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 5}s`,
                }}
              >
                💖
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Letter modal */}
      {showMessage && (
        <div className="modal-overlay" onClick={handleCloseMessage} role="dialog" aria-modal="true">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={handleCloseMessage} className="close-button" aria-label="Close letter">
              <X size={28} />
            </button>

            <div className="corner-decor top-left">✨</div>
            <div className="corner-decor top-right">💖</div>
            <div className="corner-decor bottom-left">💝</div>
            <div className="corner-decor bottom-right">✨</div>

            <div className="modal-header">
              <div className="sparkle-icon" aria-hidden="true">
                <Sparkles />
              </div>

              <h2 className="modal-title">To My Beautiful Princess 💫</h2>
            </div>

            <div className="letter-body">
              <div className="letter-text-content">
                {displayText}
                {!isTypingComplete && <span className="typing-cursor">|</span>}
              </div>

              {isTypingComplete && (
                <div className="signature-section">
                  <div className="hearts-row" aria-hidden="true">
                    {[...Array(7)].map((_, i) => (
                      <Heart key={i} className="heart-icon" style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>

                  {/* Added "Click for More Surprises" button */}
                  <div className="surprise-button-container">
                    <button className="surprise-button" onClick={handleGoToCake}>
                      🎁 Click for More Surprises! 🎉
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;