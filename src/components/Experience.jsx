import React from "react"

const experiences = [
  {
    title: "Data Engineer (Contract)",
    company: "Toss Consultancy Services",
    duration: "Dec 2025 – Present",
    points: [
      "Working on internal data engineering and analytics projects.",
      "Assisting in building and maintaining data pipelines using Python and SQL.",
      "Supporting data extraction, transformation, and reporting workflows.",
      "Creating dashboards and reports for business insights.",
      "Collaborating with team members to resolve data-related issues."
    ]
  },
  {
    title: "Python Developer Intern",
    company: "Toss Consultancy Services", 
    duration: "Aug 2025 – Nov 2025",
    points: [
      "Developed and tested Python-based scripts for automation and data handling.",
      "Assisted in backend development and basic database operations.",
      "Worked on debugging and improving existing code.",
      "Gained hands-on experience in software development practices."
    ]
  }
]

export default function Experience() {
  return (
    <section id="experience" className="container text-center">
      <div className="inner">
        <h1>Experience</h1>
        <p>Professional journey and growth</p>
        
        <div className="experience-grid">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-card">
              <div className="experience-header">
                <h3>{exp.title}</h3>
                <div className="company">{exp.company}</div>
                <div className="duration">{exp.duration}</div>
              </div>
              
              <div className="experience-points">
                {exp.points.map((point, pointIndex) => (
                  <div key={pointIndex} className="point-item">
                    <span className="point-bullet">•</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
