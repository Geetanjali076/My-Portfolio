import React, { useEffect, useState } from "react"

export default function Footer() {
  const [text, setText] = useState("")
  const fullText = "I will give my best forever in my career and my life."

  useEffect(() => {
    // Reset text when component mounts
    setText("")
    let i = 0
    let timer
    
    function typeWriter() {
      if (i < fullText.length) {
        setText(fullText.substring(0, i + 1)) // Use substring instead of concatenation
        i++
        timer = setTimeout(typeWriter, 100) // Slower speed for better visibility
      } else {
        // Mark as done when typing is complete
        document.getElementById('footerText')?.classList.add('done')
      }
    }
    
    typeWriter()
    return () => clearTimeout(timer) // clean up timer
  }, []) // Empty dependency array ensures this runs only once

  return (
    <footer>
      <span id="footerText">{text}</span>
    </footer>
  )
}
