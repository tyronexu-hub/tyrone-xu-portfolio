const highlights = [
  { label: "Georgia Tech", value: "B.S. Mechanical Engineering" },
  { label: "Motorsports", value: "Powertrain and aerodynamics engineer" },
  { label: "Availability", value: "Fall 2026 internship and beyond" },
];

const gmailComposeUrl =
  "https://mail.google.com/mail/?view=cm&fs=1&to=0120tyronexu@gmail.com";

const skills = [
  "Fusion 360",
  "SolidWorks",
  "SolidWorks Simulation",
  "MATLAB",
  "Python",
  "C/C++",
  "CNC machining",
  "Mill and lathe",
  "Waterjet",
  "Laser cutting",
  "3D printing",
  "Welding",
  "OBD-II diagnostics",
  "Data logging",
  "Dyno tuning",
];

const experiences = [
  {
    role: "Powertrain and Aerodynamics Engineer",
    org: "Wreck Racing, Georgia Tech Motorsports Club",
    date: "Aug 2023 - Present",
    points: [
      "Designed, fabricated, and validated a custom race vehicle under a $2,000 budget constraint.",
      "Engineered suspension A-arms, custom engine mounts, and drivetrain packaging for a 4.2L Audi V8 swap into a Dodge Conquest.",
      "Built an engine test stand, used OBD-II diagnostics and data logging, and refined calibration before final installation.",
      "Designed and 3D printed a rear spoiler, iterating CFD geometry and checking mount strength with SolidWorks FEA.",
    ],
  },
  {
    role: "Skills Coordinator",
    org: "Wreck Racing, Georgia Tech Motorsports Club",
    date: "Spring 2025 - Present",
    points: [
      "Manage access to the Student Competition Center Common Machining Area and coordinate onboarding for new members.",
      "Serve on the executive board, supporting shop certification standards across CNC, lathe, mill, welding, and fabrication equipment.",
    ],
  },
  {
    role: "Sales Intern",
    org: "Vector Marketing",
    date: "May 2024 - Aug 2024",
    points: [
      "Generated $10,000+ in sales while ranking among the top new representatives in the region.",
      "Delivered 10+ product demos per week and maintained an 86% close rate.",
    ],
  },
];

const projects = [
  {
    name: "ME 2110 Robotics Design Competition",
    result: "2nd overall out of 80 teams",
    detail:
      "Designed and fabricated an automated ball-bearing slider ramp mechanism that classified and routed objects by geometry in a 40-second challenge.",
    tags: ["CAD", "3D printing", "Laser cutting", "Subsystem integration"],
  },
  {
    name: "2014 Subaru BRZ Performance and Maintenance",
    result: "Powertrain diagnostics and custom fabrication",
    detail:
      "Diagnosed fluid ingress, completed timing cover and oil pan reseals, fabricated a custom VVT solenoid retention bracket, and installed oil pressure and temperature gauges.",
    tags: ["SolidWorks", "Waterjet", "Welding", "OEM service procedures"],
  },
  {
    name: "Audi V8 Race Car Swap",
    result: "Custom mounts, packaging, and test stand",
    detail:
      "Resolved alignment, clearance, and chassis mounting constraints while preparing the engine for installation through off-vehicle testing.",
    tags: ["Fusion 360", "Engine calibration", "Fabrication", "Data logging"],
  },
];

export default function Home() {
  return (
    <main className="site-shell">
      <nav className="topbar" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Tyrone Xu home">
          TX
        </a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="top" className="hero section">
        <div className="hero-copy">
          <p className="eyebrow">Mechanical Engineering - Automotive Focus</p>
          <h1>Tyrone Xu</h1>
          <p className="lede">
            Georgia Tech mechanical engineering student building race vehicles,
            powertrain systems, fabricated mechanisms, and practical diagnostic
            solutions from CAD through test.
          </p>
          <div className="hero-actions">
            <a
              className="button primary"
              href={gmailComposeUrl}
              target="_blank"
              rel="noreferrer"
            >
              Contact me
            </a>
            <a className="button secondary" href="/Tyrone_Xu_Resume.pdf">
              Resume
            </a>
            <a
              className="button secondary"
              href="https://www.linkedin.com/in/tyrone-xu/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Engineering profile summary">
          <div className="visual-header">
            <span>Race vehicle systems</span>
            <span>CAD to fabrication</span>
          </div>
          <div className="blueprint">
            <div className="chassis rail-one" />
            <div className="chassis rail-two" />
            <div className="node node-a" />
            <div className="node node-b" />
            <div className="node node-c" />
            <div className="engine-block">
              <span>4.2L V8</span>
            </div>
            <div className="spoiler">
              <span>CFD + FEA</span>
            </div>
          </div>
          <div className="visual-footer">
            <span>Fusion 360</span>
            <span>SolidWorks</span>
            <span>Machining</span>
          </div>
        </div>
      </section>

      <section className="stats-band" aria-label="Profile highlights">
        {highlights.map((item) => (
          <div className="stat" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </section>

      <section id="work" className="section split">
        <div>
          <p className="eyebrow">Experience</p>
          <h2>Hands-on engineering with real constraints.</h2>
        </div>
        <div className="timeline">
          {experiences.map((item) => (
            <article className="timeline-item" key={`${item.role}-${item.org}`}>
              <div className="timeline-meta">
                <span>{item.date}</span>
              </div>
              <h3>{item.role}</h3>
              <p className="org">{item.org}</p>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="section">
        <div className="section-heading">
          <p className="eyebrow">Selected projects</p>
          <h2>Built, tested, repaired, and iterated.</h2>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.name}>
              <span className="project-result">{project.result}</span>
              <h3>{project.name}</h3>
              <p>{project.detail}</p>
              <div className="tag-row">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className="section skills-section">
        <div>
          <p className="eyebrow">Technical toolkit</p>
          <h2>Design, fabricate, diagnose, and validate.</h2>
        </div>
        <div className="skill-cloud">
          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div>
          <p className="eyebrow">Open to internships</p>
          <h2>Available Fall 2026 and beyond.</h2>
          <p>
            I am looking for mechanical, manufacturing, automotive, and
            powertrain-focused internship opportunities where practical design
            and hands-on execution matter.
          </p>
        </div>
        <div className="contact-actions">
          <a
            className="button primary"
            href={gmailComposeUrl}
            target="_blank"
            rel="noreferrer"
          >
            0120tyronexu@gmail.com
          </a>
          <a
            className="button secondary"
            href="https://www.linkedin.com/in/tyrone-xu/"
            target="_blank"
            rel="noreferrer"
          >
            linkedin.com/in/tyrone-xu
          </a>
        </div>
      </section>
    </main>
  );
}
