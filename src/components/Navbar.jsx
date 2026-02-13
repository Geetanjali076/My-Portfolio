import React, { useState, useEffect, useRef } from "react"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const isRestoringRef = useRef(false)
  const modalOpenRef = useRef(false)
  // Set initial active state based on URL hash or default to "home"
  const getInitialSection = () => {
    const hash = window.location.hash.replace('#', '')
    // Validate that the hash corresponds to a valid section
    const validSections = ['home', 'work', 'skills', 'about', 'contact']
    return validSections.includes(hash) ? hash : "home"
  }
  const [activeSection, setActiveSection] = useState(getInitialSection())
  
  // Force update active section when URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      const validSections = ['home', 'work', 'skills', 'about', 'contact']
      
      if (validSections.includes(hash)) {
        setActiveSection(hash)
      }
    }
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange)
    
    // Also check on initial load
    handleHashChange()
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  useEffect(() => {
    let scrollTimeout
    
    const handleScroll = () => {
      // Don't update active section if modal is open or we're restoring
      if (modalOpenRef.current || isRestoringRef.current) {
        return
      }
      
      // Debounce scroll events
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        const sections = document.querySelectorAll('section[id]')
        const navbar = document.querySelector('nav')
        const navbarHeight = navbar ? navbar.offsetHeight : 80
        const scrollPos = window.scrollY + navbarHeight + 40 // Match the same offset used in navigation

        sections.forEach(section => {
          const top = section.offsetTop
          const height = section.offsetHeight
          const id = section.getAttribute('id')

          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id)
          }
        })
      }, 50) // 50ms debounce
    }

    // Listen for modal open/close events
    const handleModalStateChange = (event) => {
      const { isOpen } = event.detail
      modalOpenRef.current = isOpen
      
      if (isOpen) {
        // Modal is opening - save current section
        const navbar = document.querySelector('nav')
        const navbarHeight = navbar ? navbar.offsetHeight : 80
        const scrollPos = window.scrollY + navbarHeight + 40
        
        const sections = document.querySelectorAll('section[id]')
        let currentSection = 'work'
        
        sections.forEach(section => {
          const top = section.offsetTop
          const height = section.offsetHeight
          const id = section.getAttribute('id')
          
          if (scrollPos >= top && scrollPos < top + height) {
            currentSection = id
          }
        })
        
        // Store the current section AND force update active section immediately
        document.body.setAttribute('data-modal-section', currentSection)
        setActiveSection(currentSection) // Force update for mobile too
      } else {
        // Modal is closing - restore the section
        const savedSection = document.body.getAttribute('data-modal-section')
        if (savedSection) {
          isRestoringRef.current = true
          setActiveSection(savedSection) // Force update for mobile
          
          // Update URL hash to match the restored section
          if (savedSection !== 'home') {
            window.history.replaceState(null, null, `#${savedSection}`)
          }
          
          setTimeout(() => {
            isRestoringRef.current = false
          }, 1000) // Longer delay to ensure no interference
          
          document.body.removeAttribute('data-modal-section')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('modalStateChange', handleModalStateChange)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('modalStateChange', handleModalStateChange)
      clearTimeout(scrollTimeout)
    }
  }, [])

  // Handle hash navigation
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      const element = document.getElementById(hash)
      if (element) {
        // Get the navbar height to offset the scroll position
        const navbar = document.querySelector('nav')
        const navbarHeight = navbar ? navbar.offsetHeight : 80
        const elementTop = element.offsetTop
        const offsetPosition = elementTop - navbarHeight - 40 // Increased padding to 40px
        
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
          setActiveSection(hash)
        }, 50)
      }
    }
  }, [])

  const handleNavClick = (sectionId) => {
    setOpen(false)
    
    // Update URL hash
    window.history.replaceState(null, null, `#${sectionId}`)
    
    // Use requestAnimationFrame to ensure DOM is ready before calculating
    requestAnimationFrame(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        // Get the navbar height to offset the scroll position
        const navbar = document.querySelector('nav')
        const navbarHeight = navbar ? navbar.offsetHeight : 80
        const elementTop = element.offsetTop
        const offsetPosition = elementTop - navbarHeight - 40 // Increased padding to 40px
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
        
        // Immediately update active section for better UX
        setActiveSection(sectionId)
      }
    })
  }

  const navItems = [
    { id: "home", label: "Home" },
    { id: "work", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" }
  ]

  return (
    <>
      <div className={`burger ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
        <span></span><span></span><span></span>
      </div>

      <nav className={open ? "show" : ""}>
        <div className="nav-container">
          {navItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className={activeSection === item.id ? "active" : ""}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  )
}
