import React, { useState, useEffect, useRef } from "react"
import "./Projects.css"

export default function Projects() {
  const [currentSlide, setCurrentSlide] = useState(1) // Start at 1 (first real slide)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalSlide, setModalSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [transitionEnabled, setTransitionEnabled] = useState(true)
  const autoPlayRef = useRef(null)
  
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
      title: "Pipeline Dashboard",
      description: "Main dashboard view with real-time metrics"
    },
    {
      src: "/bulk-pipeline-working.png", 
      title: "Bulk Processing",
      description: "Bulk purchase order processing interface"
    },
    {
      src: "/sales-overview.png",
      title: "Sales Analytics",
      description: "Comprehensive sales overview dashboard"
    },
    {
      src: "/monitoring-image.png?v=2",
      title: "System Monitoring",
      description: "Real-time system monitoring and alerts"
    },
    {
      src: "/customer-and-payment.png",
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
    // Notify navbar of modal state change
    window.dispatchEvent(new CustomEvent('modalStateChange', { 
      detail: { isOpen: isModalOpen } 
    }))
    
    if (isModalOpen) {
      // Save current scroll position
      const savedScrollY = window.scrollY
      
      // Store scroll position in multiple places for reliability
      document.body.setAttribute('data-scroll-y', savedScrollY.toString())
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.top = `-${savedScrollY}px`
    } else {
      // Restore scroll position
      let scrollY = document.body.style.top
      const fallbackScroll = document.body.getAttribute('data-scroll-y')
      
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
      
      let targetScrollY = 0
      
      if (scrollY && scrollY !== '0px') {
        targetScrollY = parseInt(scrollY || '0') * -1
      } else if (fallbackScroll) {
        targetScrollY = parseInt(fallbackScroll)
      } else {
        // Force scroll to projects section as last resort
        const workSection = document.getElementById('work')
        if (workSection) {
          const navbar = document.querySelector('nav')
          const navbarHeight = navbar ? navbar.offsetHeight : 80
          targetScrollY = workSection.offsetTop - navbarHeight - 40
        }
      }
      
      // Use multiple methods to ensure scroll happens
      setTimeout(() => {
        window.scrollTo(0, targetScrollY)
        document.documentElement.scrollTop = targetScrollY
        document.body.scrollTop = targetScrollY
      }, 100)
      
      // Clean up
      document.body.removeAttribute('data-scroll-y')
    }
    
    return () => {
      // Cleanup on unmount
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
      document.body.removeAttribute('data-modal-section')
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

  const openModal = (index) => {
    setModalSlide(index)
    setIsModalOpen(true)
    setIsAutoPlay(false) // Stop auto-play when modal opens
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setIsAutoPlay(true) // Resume auto-play when modal closes
  }

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
        <p>Blending innovative design with top-notch development.</p>
        
        {/* Real-time Purchase Order Pipeline Project */}
        <div className="project-showcase">
          <h2 className="project-title">🚀 Real-time Purchase Order Pipeline</h2>
          <p className="project-description">
            A comprehensive real-time purchase order management system with advanced analytics, 
            automated workflows, and seamless integration capabilities.
          </p>
          
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
                          openModal(originalIndex)
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
          </div>
        </div>
      )}
    </section>
  )
}
