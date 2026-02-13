import React, { useState, useEffect } from "react"

export default function ThemeToggle() {
  const [light, setLight] = useState(() => {
    // Load theme from localStorage on initial render
    const savedTheme = localStorage.getItem('theme')
    return savedTheme === 'light'
  })

  useEffect(() => {
    // Apply theme on component mount and when theme changes
    if (light) {
      document.body.classList.add("light")
      localStorage.setItem('theme', 'light')
    } else {
      document.body.classList.remove("light")
      localStorage.setItem('theme', 'dark')
    }
  }, [light])

  const toggleTheme = () => {
    setLight(!light)
  }

  return (
    <div id="themeToggle" className="theme-toggle" onClick={toggleTheme}>
      <img
        id="themeIcon"
        src={light
          ? "https://cdn-icons-png.flaticon.com/512/6714/6714978.png"
          : "https://cdn-icons-png.flaticon.com/512/869/869869.png"
        }
        alt="toggle"
      />
    </div>
  )
}
