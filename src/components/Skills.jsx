import React from "react"

const skills = [
  "Networking (VLAN, DHCP, OSPF, ACL, NAT, SSH)",
  "Java","Crawling","HTML","CSS","JavaScript",
  "React","Cisco Packet Tracer","GitHub","Postman",
  "MySQL","DSA","OOP","DBMS"
]

export default function Skills() {
  return (
    <section id="skills" className="container text-center">
      <div className="inner">
        <h1>Skills</h1>
        <p>Frameworks, tools & languages I use:</p>
        <div className="d-flex flex-wrap justify-content-center">
          {skills.map((s,i) => <span key={i} className="skill-badge">{s}</span>)}
        </div>
      </div>
    </section>
  )
}
