// Professional Scroll Animations and Parallax Effects
class ScrollAnimations {
  constructor() {
    this.init();
  }

  init() {
    // Initialize reveal elements
    this.setupRevealElements();
    this.setupParallaxEffects();
    this.setupActiveNavigation();
    this.setupSmoothScroll();
    
    // Run initial check
    this.checkReveal();
    
    // Add scroll listener
    window.addEventListener('scroll', () => {
      this.checkReveal();
      this.updateParallax();
      this.updateActiveNavigation();
    });
  }

  setupRevealElements() {
    // Add reveal classes to elements
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
      const inner = section.querySelector('.inner');
      if (inner && !inner.classList.contains('reveal')) {
        // Add different reveal animations based on section index
        if (index % 3 === 0) {
          inner.classList.add('reveal');
        } else if (index % 3 === 1) {
          inner.classList.add('reveal-from-left');
        } else {
          inner.classList.add('reveal-from-right');
        }
      }
    });

    // Add reveal to project cards with stagger
    const projectCards = document.querySelectorAll('.card-custom');
    projectCards.forEach((card, index) => {
      if (!card.classList.contains('reveal')) {
        card.classList.add('reveal');
        card.style.transitionDelay = `${index * 0.1}s`;
      }
    });

    // Add reveal to skill badges with stagger
    const skillBadges = document.querySelectorAll('.skill-badge');
    skillBadges.forEach((badge, index) => {
      if (!badge.classList.contains('reveal')) {
        badge.classList.add('reveal');
        badge.style.transitionDelay = `${index * 0.05}s`;
      }
    });
  }

  checkReveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-from-left, .reveal-from-right');
    
    reveals.forEach(element => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  }

  setupParallaxEffects() {
    // Add parallax to avatar
    const avatar = document.querySelector('.avatar');
    if (avatar) {
      avatar.classList.add('parallax-element');
      avatar.dataset.speed = '0.5';
    }

    // Add parallax to section titles
    const titles = document.querySelectorAll('h1');
    titles.forEach(title => {
      title.classList.add('parallax-element');
      title.dataset.speed = '0.3';
    });
  }

  updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }

  setupActiveNavigation() {
    // Get all sections and nav links
    this.sections = document.querySelectorAll('section[id]');
    this.navLinks = document.querySelectorAll('nav a[href^="#"]');
  }

  updateActiveNavigation() {
    if (!this.sections || !this.navLinks) return;
    
    const scrollPos = window.scrollY + 100;
    
    this.sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      
      if (scrollPos >= top && scrollPos < top + height) {
        this.navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  setupSmoothScroll() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Add hover effect enhancement
  static enhanceHoverEffects() {
    // Add ripple effect to buttons
    document.querySelectorAll('.btn-gradient').forEach(button => {
      button.addEventListener('mouseenter', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ScrollAnimations();
  ScrollAnimations.enhanceHoverEffects();
});

// Add ripple effect styles
const rippleStyles = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;

// Inject ripple styles
const styleSheet = document.createElement('style');
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);
