import React, { useState } from "react"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className={`burger ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
        <span></span><span></span><span></span>
      </div>
      <nav className={open ? "show" : ""}>
        <a href="#home" onClick={() => setOpen(false)}>Home</a>
        <a href="#work" onClick={() => setOpen(false)}>Projects</a>
        <a href="#skills" onClick={() => setOpen(false)}>Skills</a>
        <a href="#about" onClick={() => setOpen(false)}>About</a>
        <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
      </nav>
    </>
  )
}
