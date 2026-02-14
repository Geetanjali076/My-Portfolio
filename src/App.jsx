import React from "react"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Projects from "./components/Projects"
import Experience from "./components/Experience"
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
  return (
    <>
      <ParticleBackground />
      <Navbar />
      <Home />
      <Projects />
      <Experience />
      <Skills />
      <About />
      <Contact />
      <ThemeToggle />
      <Footer />
    </>
  )
}
