import React from "react"

export default function Contact() {
  return (
    <section id="contact">
      <div className="inner text-center">
        <h1>Contact</h1>
        <p>Excited to contribute and grow in technical environments.</p>
        <div className="contact-icons">
          <a href="mailto:your-email@example.com">
            <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="Email" />
          </a>
          <a href="https://www.linkedin.com/in/your-linkedin/" target="_blank" rel="noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/145/145807.png" alt="LinkedIn" />
          </a>
          <a href="https://github.com/your-github" target="_blank" rel="noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" alt="GitHub" />
          </a>
        </div>
      </div>
    </section>
  )
}
