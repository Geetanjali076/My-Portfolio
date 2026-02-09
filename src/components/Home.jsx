import React from "react"

export default function Home() {
  return (
    <section id="home">
      <div className="inner text-center">
        <div className="avatar">
          <img src="/image.png" alt="Profile" />
        </div>
        <h1>Hello, I’m Geetanjali Kushwaha</h1>
        <p>
          Creative <b>Frontend Developer & Network Engineer</b> scalable, secure
          network design make, <b>Crawl & Scrap website.</b>
        </p>
        <a href="#work" className="btn btn-gradient">See My Projects</a>
        <a href="/GEETANJALI KUSHWAHA RESUME.pdf" className="btn btn-gradient" download>
          Download Resume
        </a>
      </div>
    </section>
  )
}
