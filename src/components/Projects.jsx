import React from "react"

export default function Projects() {
  return (
    <section id="work" className="container text-center">
      <div className="inner">
        <h1>Featured Projects</h1>
        <p>Blending innovative design with top-notch development.</p>
        <div className="row g-4 mt-4">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card-custom h-100">
              <h3>🖧 Networking Project</h3>
              <p>Packet Tracer with VLAN, DHCP, OSPF, ACL setup.</p>
              <a href="/network-project.pkt" download className="btn btn-gradient">Download File</a>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card-custom h-100">
              <h3>⚛ React Project</h3>
              <p>Interactive web app built with React.</p>
              <a href="https://your-react-live-link.com" target="_blank" rel="noreferrer" className="btn btn-gradient">Live Demo</a>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card-custom h-100">
              <h3>💡 Quote Web</h3>
              <p>Motivational quotes generator.</p>
              <a href="https://your-quoteweb-live-link.com" target="_blank" rel="noreferrer" className="btn btn-gradient">Live Demo</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
