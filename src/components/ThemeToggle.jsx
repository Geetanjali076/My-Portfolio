import React, { useState } from "react"

export default function ThemeToggle() {
  const [light, setLight] = useState(false)

  const toggleTheme = () => {
    document.body.classList.toggle("light")
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
