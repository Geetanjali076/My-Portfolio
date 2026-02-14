import React, { useState, useEffect, useRef } from "react"
import "./Projects.css"

export default function Projects() {
  const [currentSlide, setCurrentSlide] = useState(1) // Start at 1 (first real slide)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalSlide, setModalSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [transitionEnabled, setTransitionEnabled] = useState(true)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [modalType, setModalType] = useState('image') // 'image' or 'video'
  const autoPlayRef = useRef(null)
  const modalVideoRef = useRef(null)
  
  // Calculate the correct transform based on current slide
  const getTransform = () => {
    // Position 0 = clone of last, Position 1-6 = real slides, Position 7 = clone of first
    return `translateX(-${currentSlide * 100}%)`
  }
  
  // Calculate current dot index based on current slide
  const getCurrentDotIndex = () => {
    if (currentSlide === 0) {
      return pipelineImages.length - 1 // Last dot when at clone 0
    } else if (currentSlide === pipelineImages.length + 1) {
      return 0 // First dot when at clone 7
    } else {
      return currentSlide - 1 // Normal mapping
    }
  }
  
  const pipelineImages = [
    {
      src: "/pipeline-home.png",
      videoSrc: "/Working-Pipeline.mp4",
      title: "Pipeline Dashboard",
      description: "Main dashboard view with real-time metrics"
    },
    {
      src: "/bulk-pipeline-working.png", 
      videoSrc: "/Working-Pipeline.mp4",
      title: "Bulk Processing",
      description: "Bulk purchase order processing interface"
    },
    {
      src: "/sales-overview.png",
      videoSrc: "/Working-Pipeline.mp4",
      title: "Sales Analytics",
      description: "Comprehensive sales overview dashboard"
    },
    {
      src: "/monitoring-image.png?v=2",
      videoSrc: "/Working-Pipeline.mp4",
      title: "System Monitoring",
      description: "Real-time system monitoring and alerts"
    },
    {
      src: "/customer-and-payment.png",
      videoSrc: "/Working-Pipeline.mp4",
      title: "Customer & Payment",
      description: "Customer management and payment processing"
    }
  ]

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay) {
      autoPlayRef.current = setInterval(() => {
        nextSlide()
      }, 2000) // Change every 2 seconds
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlay, currentSlide])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      // Save current scroll position
      const savedScrollY = window.scrollY
      
      // Store scroll position
      document.body.setAttribute('data-scroll-y', savedScrollY.toString())
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.top = `-${savedScrollY}px`
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top
      const fallbackScroll = document.body.getAttribute('data-scroll-y')
      
      // Calculate target scroll position
      let targetScrollY = 0
      
      if (scrollY && scrollY !== '0px') {
        targetScrollY = parseInt(scrollY || '0') * -1
      } else if (fallbackScroll) {
        targetScrollY = parseInt(fallbackScroll)
      }
      
      // Restore body styles first
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
      
      // Force scroll restoration with multiple methods
      setTimeout(() => {
        window.scrollTo(0, targetScrollY)
        document.documentElement.scrollTop = targetScrollY
        document.body.scrollTop = targetScrollY
        
        // Double-check scroll position
        setTimeout(() => {
          if (window.scrollY !== targetScrollY) {
            window.scrollTo(0, targetScrollY)
          }
        }, 100)
      }, 50)
      
      // Clean up
      document.body.removeAttribute('data-scroll-y')
    }
    
    return () => {
      // Cleanup on unmount
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
      document.body.removeAttribute('data-scroll-y')
    }
  }, [isModalOpen])

  const nextSlide = () => {
    if (currentSlide >= pipelineImages.length) { // When reaching position 7 (after 6 images)
      // Go to clone of first slide (position 7) with animation
      setCurrentSlide(pipelineImages.length + 1) // Move to clone of first slide
    } else {
      setCurrentSlide(prev => prev + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide <= 0) {
      setTransitionEnabled(false)
      setCurrentSlide(pipelineImages.length)
      setTimeout(() => {
        setTransitionEnabled(true)
        setCurrentSlide(pipelineImages.length - 1)
      }, 50)
    } else {
      setCurrentSlide(prev => prev - 1)
    }
  }

  const goToSlide = (index) => {
    setCurrentSlide(index + 1) // +1 because of cloned first slide
  }

  const handleTransitionEnd = () => {
    // Only handle clone boundaries when transition is enabled
    if (!transitionEnabled) return
    
    if (currentSlide === 0) {
      setTransitionEnabled(false)
      setCurrentSlide(pipelineImages.length) // Jump to last real slide (6)
      setTimeout(() => {
        setTransitionEnabled(true)
      }, 50)
    } else if (currentSlide === pipelineImages.length + 1) { // When reaching position 7 (after 6 images)
      setTransitionEnabled(false)
      setCurrentSlide(1) // Jump to first real slide
      setTimeout(() => {
        setTransitionEnabled(true)
      }, 50)
    }
  }

  const openModal = (index, type = 'image') => {
    setModalSlide(index)
    setModalType(type)
    setIsModalOpen(true)
    setIsAutoPlay(false) // Stop auto-play when modal opens
    setIsVideoPlaying(true) // Start video playing when modal opens
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setIsAutoPlay(true) // Resume auto-play when modal closes
    setIsVideoPlaying(false) // Pause video when modal closes
    
    // Navigate to home section
    window.history.pushState(null, null, '#home')
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    
    // Trigger navbar active state update
    const navbarEvent = new Event('hashchange')
    window.dispatchEvent(navbarEvent)
  }

  const toggleVideoPlay = () => {
    if (modalVideoRef.current) {
      if (isVideoPlaying) {
        modalVideoRef.current.pause()
      } else {
        modalVideoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  // Handle ESC key for closing modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isModalOpen) {
        closeModal()
      }
    }

    document.addEventListener('keydown', handleEscKey)
    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [isModalOpen])

  // Auto-play video when modal slide changes
  useEffect(() => {
    if (isModalOpen && modalVideoRef.current) {
      modalVideoRef.current.play()
      setIsVideoPlaying(true)
    }
  }, [modalSlide, isModalOpen])

  const modalNextSlide = () => {
    setModalSlide((prev) => (prev + 1) % pipelineImages.length)
  }

  const modalPrevSlide = () => {
    setModalSlide((prev) => (prev - 1 + pipelineImages.length) % pipelineImages.length)
  }

  // Create slides array with clones for infinite loop
  const allSlides = [
    pipelineImages[pipelineImages.length - 1], // Clone last slide
    ...pipelineImages, // All original slides
    pipelineImages[0] // Clone first slide
  ]

  return (
    <section id="work" className="container text-center">
      <div className="inner">
        <h1>Featured Projects</h1>        
        {/* Real-time Purchase Order Pipeline Project */}
        <div className="project-showcase">
          <h2 className="project-title">🚀 Real-Time Purchase Order Analytics Pipeline</h2>
          <p className="project-description">
            A production-style data engineering project that processes real-time purchase order data using Kafka, Spark, PostgreSQL, and Power BI to deliver business insights.
          </p>
          
          {/* Project Tags */}
          <div className="project-tags">
            <span className="tag">Kafka</span>
            <span className="tag">Spark</span>
            <span className="tag">PostgreSQL</span>
            <span className="tag">Airflow</span>
            <span className="tag">Docker</span>
            <span className="tag">Power BI</span>
            <span className="tag">Python</span>
          </div>
          
          {/* Project Buttons */}
          <div className="project-buttons">
            <a href="https://github.com/Geetanjali076/purchase-order-pipeline" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
              Architecture
            </a>
          </div>
          
          {/* Auto-Sliding Gallery */}
          <div className="auto-gallery">
            <div className="auto-gallery-wrapper">
              <div 
                className="auto-gallery-track"
                style={{ 
                  transform: getTransform(),
                  transition: !transitionEnabled ? 'none' : 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onTransitionEnd={handleTransitionEnd}
                onMouseEnter={() => setIsAutoPlay(false)} // Pause on hover
                onMouseLeave={() => setIsAutoPlay(true)} // Resume on leave
              >
                {allSlides.map((image, index) => (
                  <div key={index} className="auto-gallery-slide">
                    <div className="slide-content">
                      <img 
                        src={image.src} 
                        alt={image.title}
                        className="gallery-image"
                        onClick={() => {
                          // Calculate original index (excluding clones)
                          let originalIndex = index - 1
                          if (originalIndex < 0) originalIndex = pipelineImages.length - 1
                          else if (originalIndex >= pipelineImages.length) originalIndex = 0
                          openModal(originalIndex, 'image')
                        }}
                      />
                      <div className="image-overlay">
                        <h3>{image.title}</h3>
                        <p>{image.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Navigation Arrows */}
              <button 
                className="gallery-arrow gallery-arrow-left"
                onClick={prevSlide}
                onMouseEnter={() => setIsAutoPlay(false)}
                onMouseLeave={() => setIsAutoPlay(true)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <button 
                className="gallery-arrow gallery-arrow-right"
                onClick={nextSlide}
                onMouseEnter={() => setIsAutoPlay(false)}
                onMouseLeave={() => setIsAutoPlay(true)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            {/* Dots Indicator */}
            <div className="gallery-dots">
              {pipelineImages.map((_, index) => (
                <button
                  key={index}
                  className={`gallery-dot ${index === getCurrentDotIndex() ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  onMouseEnter={() => setIsAutoPlay(false)}
                  onMouseLeave={() => setIsAutoPlay(true)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Video Preview Section */}
          <div className="video-preview-section">
            <h3 className="video-preview-title">🎬 Live Demo</h3>
            <div className="video-preview-container">
              <div className="video-preview-card">
                <video
                  className="video-preview-player"
                  autoPlay
                  muted
                  loop
                  playsInline
                  onClick={() => {
                    let originalIndex = getCurrentDotIndex()
                    openModal(originalIndex, 'video')
                  }}
                >
                  <source src={pipelineImages[getCurrentDotIndex()].videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="video-overlay">
                  <p>Click to view full demo</p>
                </div>
              </div>
            </div>
          </div>

          {/* Project Highlights Section */}
          <div className="project-highlights">
            <h3 className="highlights-title">📌 Project Highlights</h3>
            <div className="highlights-grid">
              <div className="highlight-card">
                <div className="highlight-icon">⚡</div>
                <h4>Real-Time Processing</h4>
                <p>Handled streaming data using Kafka & Spark</p>
              </div>
              <div className="highlight-card">
                <div className="highlight-icon">📊</div>
                <h4>Business Analytics</h4>
                <p>Built dashboards in Power BI</p>
              </div>
              <div className="highlight-card">
                <div className="highlight-icon">🔄</div>
                <h4>Automation</h4>
                <p>Scheduled pipelines using Airflow</p>
              </div>
              <div className="highlight-card">
                <div className="highlight-icon">🛠️</div>
                <h4>Deployment</h4>
                <p>Dockerized all services</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {modalType === 'image' ? (
              // Image Modal with full features
              <>
                {/* Modal Title and Description at Top */}
                <div className="modal-header">
                  <h3>{pipelineImages[modalSlide].title}</h3>
                  <p>{pipelineImages[modalSlide].description}</p>
                </div>
                
                {/* Modal Image Below Title */}
                <div className="modal-image-container">
                  <img 
                    src={pipelineImages[modalSlide].src}
                    alt={pipelineImages[modalSlide].title}
                    className="modal-image"
                  />
                </div>
                
                {/* Modal Navigation */}
                <button className="modal-arrow modal-arrow-left" onClick={modalPrevSlide}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                
                <button className="modal-arrow modal-arrow-right" onClick={modalNextSlide}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                
                {/* Modal Dots */}
                <div className="modal-dots">
                  {pipelineImages.map((_, index) => (
                    <button
                      key={index}
                      className={`modal-dot ${index === modalSlide ? 'active' : ''}`}
                      onClick={() => setModalSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              // Video Modal - Clean
              <>
                {/* Modal Video Only */}
                <div className="modal-video-container">
                  <video
                    ref={modalVideoRef}
                    className="modal-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    onClick={toggleVideoPlay}
                  >
                    <source src={pipelineImages[modalSlide].videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Video Play/Pause Control */}
                  <button 
                    className="video-control-btn"
                    onClick={toggleVideoPlay}
                    aria-label={isVideoPlaying ? "Pause video" : "Play video"}
                  >
                    {isVideoPlaying ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect x="6" y="4" width="4" height="16" fill="currentColor"/>
                        <rect x="14" y="4" width="4" height="16" fill="currentColor"/>
                      </svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5 3l14 9-14 9V3z" fill="currentColor"/>
                      </svg>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
