import React, { useEffect, useState } from "react"

export default function Footer() {
  const [text, setText] = useState("")
  const fullText = "I will give my best forever in my career and my life."

  useEffect(() => {
  let i = 0
  let timer
  function typeWriter() {
    if (i < fullText.length) {
      setText(prev => prev + fullText.charAt(i))
      i++
      timer = setTimeout(typeWriter, 50)
    }
  }
  typeWriter()
  return () => clearTimeout(timer) // clean up timer
}, [])


  return (
    <footer>
      <span id="footerText" className="done">{text}</span>
    </footer>
  )
}
