import React from "react"

export default function Home() {
  return (
    <section id="home">
      <div className="inner text-center">
        <div className="avatar">
          <img src="/my-image.jpeg" alt="Profile" />
        </div>
        <h1>Hello, I'm Geetanjali Kushwaha</h1>
        <p>
          <b>Aspiring Data Engineer | Real-Time Analytics & Data Pipelines</b>
        </p>
        <p className="subheading">
          Building scalable data pipelines, real-time analytics systems, and interactive dashboards using Python, SQL, Kafka, Spark, and Power BI.
        </p>
        <a href="#work" className="btn btn-gradient">See My Projects</a>
        <a href="/GEETANJALI KUSHWAHA RESUME.pdf" className="btn btn-gradient" download>
          Download Resume
        </a>
      </div>
    </section>
  )
}
