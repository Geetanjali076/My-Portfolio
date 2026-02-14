import React, { useState, useEffect, useRef } from "react"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const isNavigating = useRef(false)
  
  const navItems = [
    { id: "home", label: "Home" },
    { id: "work", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" }
  ]

  // Get current hash section
  const getCurrentHashSection = () => {
    const hash = window.location.hash.replace('#', '')
    return navItems.find(item => item.id === hash) ? hash : "home"
  }

  // Smooth scroll to section
  const scrollToSection = (sectionId, smooth = true) => {
    const element = document.getElementById(sectionId)
    if (!element) return

    // Get navbar height with mobile consideration
    const navbar = document.querySelector('nav')
    let navbarHeight = 80 // Default
    
    if (navbar) {
      // Check if we're in mobile view
      const isMobile = window.innerWidth <= 767
      if (isMobile) {
        // Mobile navbar is positioned differently, use smaller offset
        navbarHeight = 60
      } else {
        navbarHeight = navbar.offsetHeight
      }
    }
    
    // Get accurate element position
    const elementTop = element.offsetTop
    const offsetPosition = elementTop - navbarHeight - (window.innerWidth <= 767 ? 0 : 10)

    // Force scroll with multiple methods
    window.scrollTo({
      top: offsetPosition,
      left: 0,
      behavior: smooth ? 'smooth' : 'auto'
    })
    
    // Backup methods for mobile compatibility
    setTimeout(() => {
      document.documentElement.scrollTop = offsetPosition
      document.body.scrollTop = offsetPosition
    }, smooth ? 100 : 0)
    
    setActiveSection(sectionId)
  }

  // Handle direct navigation (URL hash changes)
  useEffect(() => {
    const handleHashNavigation = () => {
      if (isNavigating.current) return
      
      const targetSection = getCurrentHashSection()
      isNavigating.current = true
      
      // Wait for DOM to be ready
      setTimeout(() => {
        const element = document.getElementById(targetSection)
        if (element) {
          // Get navbar height with mobile consideration
          const navbar = document.querySelector('nav')
          let navbarHeight = 80 // Default
          
          if (navbar) {
            const isMobile = window.innerWidth <= 767
            if (isMobile) {
              navbarHeight = 60
            } else {
              navbarHeight = navbar.offsetHeight
            }
          }
          
          const elementTop = element.offsetTop
          const offsetPosition = elementTop - navbarHeight - (window.innerWidth <= 767 ? 0 : 10)
          
          // Force scroll to exact position
          window.scrollTo(0, offsetPosition)
          document.documentElement.scrollTop = offsetPosition
          document.body.scrollTop = offsetPosition
          
          setActiveSection(targetSection)
          
          // Double-check after animation
          setTimeout(() => {
            window.scrollTo(0, offsetPosition)
            document.documentElement.scrollTop = offsetPosition
            document.body.scrollTop = offsetPosition
          }, 300)
        }
        isNavigating.current = false
      }, 100)
    }

    // Initial load
    handleHashNavigation()
    
    // Hash changes
    window.addEventListener('hashchange', handleHashNavigation)
    
    return () => {
      window.removeEventListener('hashchange', handleHashNavigation)
    }
  }, [])

  // Handle scroll-based section detection
  useEffect(() => {
    let scrollTimeout
    
    const handleScroll = () => {
      // Skip if we're currently navigating
      if (isNavigating.current) {
        return
      }
      
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        const sections = document.querySelectorAll('section[id]')
        const navbar = document.querySelector('nav')
        const navbarHeight = navbar ? navbar.offsetHeight : 80
        const scrollPos = window.scrollY + navbarHeight + 10 // Reduced offset for mobile

        for (const section of sections) {
          const top = section.offsetTop
          const height = section.offsetHeight
          const id = section.getAttribute('id')

          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id)
            
            // Update URL hash to match current section
            if (window.location.hash !== `#${id}`) {
              window.history.replaceState(null, null, `#${id}`)
            }
            break
          }
        }
      }, 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  // Handle navigation clicks
  const handleNavClick = (sectionId) => {
    setOpen(false)
    isNavigating.current = true
    
    // Update URL
    window.history.pushState(null, null, `#${sectionId}`)
    
    // Immediate scroll to section
    const element = document.getElementById(sectionId)
    if (element) {
      // Get navbar height with mobile consideration
      const navbar = document.querySelector('nav')
      let navbarHeight = 80 // Default
      
      if (navbar) {
        const isMobile = window.innerWidth <= 767
        if (isMobile) {
          navbarHeight = 60
        } else {
          navbarHeight = navbar.offsetHeight
        }
      }
      
      const elementTop = element.offsetTop
      const offsetPosition = elementTop - navbarHeight - (window.innerWidth <= 767 ? 0 : 10)
      
      // Force immediate scroll
      window.scrollTo(0, offsetPosition)
      document.documentElement.scrollTop = offsetPosition
      document.body.scrollTop = offsetPosition
      
      setActiveSection(sectionId)
      
      // Double-check after smooth animation
      setTimeout(() => {
        window.scrollTo(0, offsetPosition)
        document.documentElement.scrollTop = offsetPosition
        document.body.scrollTop = offsetPosition
      }, 400)
    }
    
    // Reset navigation flag
    setTimeout(() => {
      isNavigating.current = false
    }, 800)
  }

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
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(item.id)
              }}
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
