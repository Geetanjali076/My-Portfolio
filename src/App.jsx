import React, { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Projects from "./components/Projects"
import Skills from "./components/Skills"
import About from "./components/About"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import ThemeToggle from "./components/ThemeToggle"
import ParticleBackground from "./components/ParticleBackground.jsx"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import "./utils/scrollAnimations.js"

export default function App() {
  const [activeSection, setActiveSection] = useState('home')
  
  // Listen for navigation changes
  useEffect(() => {
    const handleNavChange = (event) => {
      const { section } = event.detail
      setActiveSection(section)
    }
    
    window.addEventListener('navSectionChange', handleNavChange)
    
    // Set initial section from URL
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      setActiveSection(hash)
    }
    
    return () => {
      window.removeEventListener('navSectionChange', handleNavChange)
    }
  }, [])
  
  return (
    <>
      <ParticleBackground />
      <Navbar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      {/* Only render the active section */}
      {activeSection === 'home' && <Home />}
      {activeSection === 'work' && <Projects />}
      {activeSection === 'skills' && <Skills />}
      {activeSection === 'about' && <About />}
      {activeSection === 'contact' && <Contact />}
      
      <ThemeToggle />
      <Footer />
    </>
  )
}
