import React from "react"

const dataEngineeringSkills = [
  "Python", "SQL", "PostgreSQL", "Kafka", "Spark", 
  "Airflow", "Docker", "Power BI", "AWS (S3, IAM)", "GitHub"
]

const skillCategories = {
  "Data Engineering": ["Kafka", "Spark", "ETL", "Pipelines"],
  "Analytics": ["Power BI", "SQL", "Dashboards"],
  "DevOps": ["Docker", "GitHub"]
}

export default function Skills() {
  return (
    <section id="skills" className="container text-center">
      <div className="inner">
        <h1>✨ Skills</h1>
        <p>Technologies I work with:</p>
        
        {/* Main Skills Grid */}
        <div className="d-flex flex-wrap justify-content-center">
          {dataEngineeringSkills.map((skill, i) => (
            <span key={i} className="skill-badge">{skill}</span>
          ))}
        </div>
        
        {/* Skill Categories */}
        <div className="skill-categories">
          {Object.entries(skillCategories).map(([category, skills]) => (
            <div key={category} className="skill-category">
              <h3>{category}</h3>
              <div className="category-skills">
                {skills.map((skill, i) => (
                  <span key={i} className="category-badge">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
