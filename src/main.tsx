import { StrictMode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BorderGlow from "./components/BorderGlow";
import Grainient from "./components/Grainient";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const gmailComposeUrl =
  "https://mail.google.com/mail/?view=cm&fs=1&to=0120tyronexu@gmail.com";

const stats = [
  { value: "2nd / 80", label: "overall placement out of 80 teams in a ME 2110 robotics competition" },
  { value: "1st", label: "overall in the Grassroots Motorsports $2,000 Challenge with Wreck Racing" },
  { value: "$2K", label: "race-car build constraint engineered around for competition" },
  { value: "$10K+", label: "sales generated as a Vector Marketing sales intern" },
];

const wreckMedia = [
  {
    src: "/wreck-race-car.webp",
    label: "Competition car",
    alt: "Wreck Racing competition car at the Grassroots Motorsports event",
  },
  {
    src: "/wreck-wing-shop.webp",
    label: "Fabricated aero",
    alt: "Wreck Racing rear aero mounted on the race car in the shop",
  },
  {
    src: "/wreck-fea-wing.webp",
    label: "FEA validation",
    alt: "FEA result plot for a wing component",
  },
  {
    src: "/wreck-cfd-flow.webp",
    label: "CFD airflow study",
    alt: "CFD airflow simulation around the Wreck Racing car",
    size: "wide",
  },
  {
    src: "/wreck-cad-wing.webp",
    label: "Wing profile CAD",
    alt: "CAD profile for a race car wing component",
  },
  {
    src: "/wreck-fabrication-strip.webp",
    label: "3D printed spoiler",
    alt: "3D printed spoiler component on a work surface",
  },
  {
    src: "/wreck-engine-stand.webp",
    label: "Powertrain packaging",
    alt: "CAD assembly of the engine and support structure",
    video: "/wreck-startup.mp4",
    size: "wide",
  },
  {
    src: "/wreck-cad-mount.webp",
    label: "Engine mount CAD",
    alt: "CAD model of an engine mount component",
  },
  {
    src: "/wreck-race-run-cover.webp",
    label: "Race run",
    alt: "Wreck Racing car on track",
    video: "/wreck-race-run.mov",
    size: "wide",
  },
];

const brzMedia = [
  {
    src: "/brz-sunset-hero.webp",
    label: "BRZ field log",
    alt: "Blue Subaru BRZ photographed under a bright sunset",
  },
  {
    src: "/brz-engine-bay.webp",
    label: "Engine bay baseline",
    alt: "Subaru BRZ engine bay before service work",
    size: "wide",
  },
  {
    src: "/brz-vvt-service.webp",
    label: "VVT diagnosis",
    alt: "VVT solenoid service area in the BRZ engine bay",
  },
  {
    src: "/brz-diagnostic-detail.webp",
    label: "CAD measurement",
    alt: "CAD measurement reference for BRZ engine component spacing",
  },
  {
    src: "/brz-engine-scan.png",
    label: "Engine scan reference",
    alt: "3D scan reference of the Subaru BRZ engine assembly for custom bracket design",
    size: "wide",
  },
  {
    src: "/brz-solenoid-bracket.webp",
    label: "VVT solenoid bracket",
    alt: "Custom bracket installed near the VVT solenoid",
  },
  {
    src: "/brz-timing-cover.webp",
    label: "Timing cover service",
    alt: "Timing cover removed during Subaru BRZ service work",
    size: "wide",
  },
  {
    src: "/brz-timing-chain.webp",
    label: "Timing chain inspection",
    alt: "Subaru BRZ timing chain exposed during service",
  },
  {
    src: "/brz-engine-reassembly.webp",
    label: "Engine reassembly",
    alt: "Subaru BRZ engine reassembled after service",
  },
];

type ProjectMedia = {
  src: string;
  label: string;
  alt: string;
  size?: "wide";
  video?: boolean;
  poster?: string;
};

const roboticsMedia: ProjectMedia[] = [
  {
    src: "/robotics-poster-board-optimized.jpg",
    label: "System presentation board",
    alt: "Presentation board explaining the ME 2110 Goofmobile robot subsystems",
    size: "wide",
  },
  {
    src: "/robotics-drawing-optimized.jpg",
    label: "Assembly drawing",
    alt: "Assembly drawing and bill of materials for the feed luma mechanism",
  },
  {
    src: "/robotics-acc.mov",
    poster: "/robotics-acc-poster.jpg",
    label: "Actuator test",
    alt: "Video of the robotics actuator test",
    video: true,
  },
  {
    src: "/robotics-1.mov",
    poster: "/robotics-1-poster.jpg",
    label: "Mechanism test 01",
    alt: "Video test of the ME 2110 robotics mechanism",
    video: true,
  },
  {
    src: "/robotics-2.mov",
    poster: "/robotics-2-poster.jpg",
    label: "Mechanism test 02",
    alt: "Video test of the ME 2110 robotics mechanism during a run",
    video: true,
    size: "wide",
  },
  {
    src: "/robotics-3.mov",
    poster: "/robotics-3-poster.jpg",
    label: "Placement run",
    alt: "Video of the ME 2110 robotics mechanism placing game pieces",
    video: true,
  },
];

const projects = [
  {
    title: "Wreck Racing",
    type: "Powertrain / Aerodynamics / Fabrication",
    image: "/wreck-race-car.webp",
    description:
      "Designed and fabricated a race vehicle for the $2,000 Grassroots Motorsports Challenge, including suspension components, engine mounts, powertrain packaging, and a CFD-informed rear spoiler.",
  },
  {
    title: "2014 Subaru BRZ Project",
    type: "Diagnostics / Maintenance / Custom Fabrication",
    image: "/brz-sunset-hero.webp",
    description:
      "Diagnosed powertrain issues, completed fluid and sealing service work, fabricated a custom VVT solenoid retention bracket, and added gauges for long-term health monitoring.",
  },
  {
    title: "ME 2110 Robotics Competition",
    type: "Mechanical Design / Robotics Competition",
    image: "/robotics-head-optimized.jpg",
    description:
      "Built an automated ball-bearing sorting mechanism for a 40-second robotics challenge, placing 2nd overall out of 80 teams with a four-person design group.",
  },
];

const strengths = [
  {
    title: "Mechanical Systems Thinking",
    text: "I break complex assemblies into constraints, interfaces, loads, clearances, and testable design decisions.",
  },
  {
    title: "CAD To Fabrication",
    text: "I move from CAD models to physical parts using Fusion 360, SolidWorks, 3D printing, waterjet, welding, mill, and lathe work.",
  },
  {
    title: "Diagnostics And Testing",
    text: "I use OBD-II scanning, data logging, service procedures, and test stands to understand failures before committing to final builds.",
  },
  {
    title: "Hands-On Execution",
    text: "I am comfortable moving from concept to prototype, then refining the design through fitment, validation, repair, and iteration.",
  },
];

const glowColors = ["#d8ff68", "#8aa4ff", "#a3c6c7"];
const glowCardProps = {
  backgroundColor: "rgba(8, 11, 13, 0.72)",
  borderRadius: 8,
  colors: glowColors,
  coneSpread: 24,
  edgeSensitivity: 22,
  fillOpacity: 0.24,
  glowColor: "82 100 72",
  glowIntensity: 0.62,
  glowRadius: 34,
};

function App() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [isNavFloating, setIsNavFloating] = useState(false);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!root || reduceMotion) return;

    const ctx = gsap.context(() => {
      const smooth = "power4.out";
      const precise = "expo.out";

      document.body.classList.add("is-opening");
      gsap.set(".opening-panel", { scaleY: 1, transformOrigin: "top" });
      gsap.set(".nav", { autoAlpha: 0, y: -34 });
      gsap.set(".hero-photo img", { filter: "blur(10px)", scale: 1.16, yPercent: 4 });
      gsap.set(".hero-title-text", { scaleY: 0.42, transformOrigin: "bottom", yPercent: 116 });
      gsap.set(".hero-kicker, .hero-summary, .hero-actions, .hero-tags", {
        autoAlpha: 0,
        y: 34,
      });

      const intro = gsap.timeline({ defaults: { ease: smooth } });
      intro
        .to(".opening-panel", { duration: 1.35, scaleY: 0, ease: "power3.inOut" })
        .to(".hero-photo img", { duration: 2.2, filter: "blur(0px)", scale: 1, yPercent: 0 }, 0.1)
        .to(
          ".hero-title-text",
          {
            duration: 1.55,
            scaleY: 1,
            yPercent: 0,
            stagger: 0.14,
            ease: precise,
          },
          0.58,
        )
        .to(".nav", { duration: 1.1, autoAlpha: 1, y: 0 }, 0.82)
        .to(
          ".hero-kicker, .hero-summary, .hero-actions, .hero-tags",
          { duration: 1.05, autoAlpha: 1, y: 0, stagger: 0.12 },
          1.08,
        )
        .call(() => document.body.classList.remove("is-opening"));

      gsap.utils.toArray<HTMLElement>(".motion-section").forEach((section) => {
        const title = section.querySelector(".section-title");
        const kicker = section.querySelector(".kicker");
        const body = section.querySelectorAll(".motion-copy");
        const cards = section.querySelectorAll(".motion-card");

        if (title) {
          gsap.from(title, {
            scrollTrigger: {
              trigger: section,
              start: "top 72%",
              once: true,
            },
            autoAlpha: 0,
            clipPath: "inset(0 0 100% 0)",
            duration: 1.45,
            ease: precise,
            scaleY: 0.76,
            transformOrigin: "bottom",
            y: 92,
          });
        }

        if (kicker || body.length) {
          gsap.from([kicker, ...Array.from(body)].filter((item): item is Element => Boolean(item)), {
            scrollTrigger: {
              trigger: section,
              start: "top 76%",
              once: true,
            },
            autoAlpha: 0,
            duration: 1.05,
            ease: smooth,
            stagger: 0.08,
            y: 34,
          });
        }

        if (cards.length) {
          gsap.from(cards, {
            scrollTrigger: {
              trigger: section,
              start: "top 66%",
              once: true,
            },
            autoAlpha: 0,
            clipPath: "inset(18% 0 0 0)",
            duration: 1.2,
            ease: smooth,
            stagger: 0.13,
            y: 78,
          });
        }
      });

      gsap.utils.toArray<HTMLElement>(".image-reveal").forEach((wrap) => {
        const image = wrap.querySelector("img");
        if (!image) return;

        gsap.fromTo(
          wrap,
          { clipPath: "inset(0 0 100% 0)" },
          {
            scrollTrigger: {
              trigger: wrap,
              start: "top 78%",
              once: true,
            },
            clipPath: "inset(0 0 0% 0)",
            duration: 1.35,
            ease: "power3.inOut",
          },
        );

        if (wrap.matches(".wreck-hero-media, .brz-hero-media, .project-image")) {
          gsap.fromTo(
            image,
            { scale: 1.12, yPercent: 8 },
            {
              scrollTrigger: {
                trigger: wrap,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
              ease: "none",
              scale: 1.02,
              yPercent: -6,
            },
          );
        }
      });
    }, root);

    return () => {
      document.body.classList.remove("is-opening");
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsNavFloating(!entry.isIntersecting),
      { rootMargin: "-96px 0px 0px 0px", threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <main ref={rootRef}>
      <section className="hero" id="home">
        <div className="opening-panel" aria-hidden="true" />
        <div className="hero-photo" aria-hidden="true">
          <img src="/hero-tyrone-wide.jpg" alt="" decoding="async" />
        </div>

        <nav
          className={`nav${isNavFloating ? " is-floating" : ""}`}
          aria-label="Primary navigation"
        >
          <a className="mark" href="#home" aria-label="Tyrone Xu home">
            TX
          </a>
          <div className="nav-links">
            <a href="#profile">Profile</a>
            <a href="#projects">Projects</a>
            <a href="#strengths">Strengths</a>
            <a href="#contact">Contact</a>
          </div>
          <a
            className="nav-cta"
            href={gmailComposeUrl}
            target="_blank"
            rel="noreferrer"
          >
            Contact
          </a>
        </nav>

        <div className="hero-inner">
          <div className="hero-content">
            <p className="hero-kicker">Mechanical Engineer / Automotive Focus</p>
            <h1 className="hero-title">
              <span className="title-mask">
                <span className="hero-title-text">Tyrone Xu</span>
              </span>
            </h1>
            <p className="hero-summary motion-copy">
              Georgia Tech mechanical engineering student. I take mechanical
              systems from concept to CAD to physical testing.
            </p>
            <div className="hero-actions">
              <a href="#projects">View Projects</a>
              <a href={gmailComposeUrl} target="_blank" rel="noreferrer">
                Contact Me
              </a>
            </div>
            <div className="hero-tags" aria-label="Engineering focus areas">
              <span>Mechanical Systems</span>
              <span>Design</span>
              <span>Fabrication</span>
              <span>Testing</span>
            </div>
          </div>
        </div>
      </section>

      <div className="below-hero">
        <div className="below-hero-grain" aria-hidden="true">
          <Grainient
            color1="#9fb8a8"
            color2="#020405"
            color3="#0b2d33"
            timeSpeed={0.14}
            colorBalance={0.08}
            warpStrength={0.72}
            warpFrequency={3.8}
            warpSpeed={0.9}
            warpAmplitude={74}
            blendAngle={-24}
            blendSoftness={0.16}
            rotationAmount={360}
            noiseScale={1.45}
            grainAmount={0.06}
            grainScale={2.1}
            grainAnimated={false}
            contrast={1.18}
            gamma={1}
            saturation={0.48}
            centerX={-0.18}
            centerY={0.05}
            zoom={1.04}
          />
        </div>

        <section className="profile shell motion-section" id="profile">
          <BorderGlow className="portrait-card glow-card motion-card" {...glowCardProps}>
            <div className="image-reveal">
            <img src="/profile-picture.jpg" alt="Tyrone Xu profile portrait" loading="lazy" decoding="async" />
            </div>
            <div className="portrait-meta">
              <span>Based in Atlanta</span>
              <span>Georgia Tech</span>
            </div>
          </BorderGlow>

          <div className="profile-copy">
            <p className="kicker">Profile</p>
            <h2 className="section-title">Mechanical engineering rooted in systems, fabrication, and testing.</h2>
            <p className="motion-copy">
              I'm Tyrone Xu, a mechanical engineering student at Georgia Tech.
              I like taking a mechanical problem from a sketch to a working part
              through CAD, fabrication, and testing.
            </p>
            <p className="motion-copy">
              Most of that experience has been automotive: building a race car
              from the ground up with Wreck Racing and keeping my own Subaru BRZ
              running and improving. But I've also taken that same
              design-build-test approach outside of cars, placing 2nd out of 80
              teams in a robotics design competition.
            </p>
          </div>

          <div className="stats-grid" aria-label="Project data">
            {stats.map((item, index) => (
              <BorderGlow
                className="stat-card glow-card motion-card"
                key={item.value}
                animated={index === 0}
                {...glowCardProps}
              >
                <div className="motion-card-content">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
                </div>
              </BorderGlow>
            ))}
          </div>
        </section>

        <section className="projects shell motion-section" id="projects">
          <div className="section-heading">
            <p className="kicker">Selected Projects</p>
            <h2 className="section-title">Selected mechanical projects, built under real constraints.</h2>
          </div>

          <div className="project-list">
            {projects.map((project, index) =>
              index === 0 ? (
                <BorderGlow className="wreck-feature glow-card motion-card" key={project.title} {...glowCardProps}>
                  <article className="wreck-case">
                    <div className="wreck-copy">
                      <video
                        className="wreck-heading-video"
                        src="/wreck-cfd-bg.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        aria-hidden="true"
                      />
                      <span>01 / {project.type}</span>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="wreck-metrics" aria-label="Wreck Racing highlights">
                        <strong>$2,000</strong>
                        <span>challenge budget</span>
                        <strong>1st</strong>
                        <span>overall result</span>
                      </div>
                    </div>

                    <div className="wreck-hero-media image-reveal">
                      <img src={wreckMedia[0].src} alt={wreckMedia[0].alt} loading="lazy" decoding="async" />
                      <span>{wreckMedia[0].label}</span>
                    </div>

                    <div className="wreck-media-grid">
                      {wreckMedia.slice(1).map((item, mediaIndex) => (
                        <figure
                          className={`wreck-media-tile image-reveal motion-card${
                            item.size === "wide" ? " is-wide" : ""
                          }${item.video ? " has-hover-video" : ""}`}
                          key={item.src}
                          onMouseEnter={(event) => {
                            const video = event.currentTarget.querySelector("video");
                            if (!video) return;
                            video.muted = false;
                            video.volume = 0.2;
                            void video.play().catch(() => undefined);
                          }}
                          onMouseLeave={(event) => {
                            const video = event.currentTarget.querySelector("video");
                            if (!video) return;
                            video.pause();
                            video.currentTime = 0;
                            video.muted = true;
                          }}
                        >
                          <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                          {item.video ? (
                            <video
                              className="wreck-hover-video"
                              src={item.video}
                              loop
                              playsInline
                              preload="none"
                              aria-hidden="true"
                            />
                          ) : null}
                          <figcaption>{item.label}</figcaption>
                        </figure>
                      ))}
                    </div>
                  </article>
                </BorderGlow>
              ) : index === 1 ? (
                <BorderGlow className="brz-feature glow-card motion-card" key={project.title} {...glowCardProps}>
                  <article className="brz-case">
                    <div className="brz-hero-media image-reveal">
                      <img src={brzMedia[0].src} alt={brzMedia[0].alt} loading="lazy" decoding="async" />
                      <span>{brzMedia[0].label}</span>
                    </div>
                    <div className="brz-copy">
                      <span>
                        {String(index + 1).padStart(2, "0")} / {project.type}
                      </span>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="brz-tags" aria-label="BRZ project focus">
                        <span>Diagnostics</span>
                        <span>Maintenance</span>
                        <span>Custom Fabrication</span>
                      </div>
                    </div>

                    <div className="brz-media-grid">
                      {brzMedia.slice(1).map((item) => (
                        <figure
                          className={`brz-media-tile image-reveal motion-card${
                            item.size === "wide" ? " is-wide" : ""
                          }`}
                          key={item.src}
                        >
                          <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                          <figcaption>{item.label}</figcaption>
                        </figure>
                      ))}
                    </div>
                  </article>
                </BorderGlow>
              ) : index === 2 ? (
                <BorderGlow className="robotics-feature glow-card motion-card" key={project.title} {...glowCardProps}>
                  <article className="robotics-case">
                    <div className="robotics-copy">
                      <span>
                        {String(index + 1).padStart(2, "0")} / {project.type}
                      </span>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="robotics-metrics" aria-label="Robotics competition highlights">
                        <div>
                          <strong>2nd / 80</strong>
                          <span>overall placement</span>
                        </div>
                        <div>
                          <strong>40s</strong>
                          <span>challenge run</span>
                        </div>
                        <div>
                          <strong>4</strong>
                          <span>person design team</span>
                        </div>
                      </div>
                    </div>
                    <div className="robotics-visual image-reveal">
                      <img
                        src={project.image}
                        alt={`${project.title} mechanism preview`}
                        loading="lazy"
                        decoding="async"
                      />
                      <figcaption>ME 2110 robotics competition</figcaption>
                    </div>
                    <div className="robotics-media-grid">
                      {roboticsMedia.map((item) => (
                        <figure
                          className={`robotics-media-tile image-reveal motion-card${
                            item.size === "wide" ? " is-wide" : ""
                          }${item.video ? " has-video" : ""}`}
                          key={item.src}
                          onMouseEnter={(event) => {
                            const video = event.currentTarget.querySelector("video");
                            if (!video) return;
                            video.currentTime = 0;
                            void video.play().catch(() => undefined);
                          }}
                          onMouseLeave={(event) => {
                            const video = event.currentTarget.querySelector("video");
                            if (!video) return;
                            video.pause();
                            video.currentTime = 0;
                          }}
                        >
                          {item.video ? (
                            <video
                              src={item.src}
                              poster={item.poster}
                              aria-label={item.alt}
                              muted
                              playsInline
                              preload="metadata"
                            />
                          ) : (
                            <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                          )}
                          <figcaption>{item.label}</figcaption>
                        </figure>
                      ))}
                    </div>
                  </article>
                </BorderGlow>
              ) : (
                <BorderGlow className="project-card glow-card motion-card" key={project.title} {...glowCardProps}>
                  <article className="project-card-layout">
                    <div className="project-image image-reveal">
                      <img src={project.image} alt={`${project.title} preview`} loading="lazy" decoding="async" />
                    </div>
                    <div className="project-info">
                      <span>
                        {String(index + 1).padStart(2, "0")} / {project.type}
                      </span>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                    </div>
                  </article>
                </BorderGlow>
              ),
            )}
          </div>
        </section>

        <section className="strengths shell motion-section" id="strengths">
          <div className="section-heading">
            <p className="kicker">Strengths</p>
            <h2 className="section-title">Capabilities shaped by design, fabrication, and validation.</h2>
          </div>

          <div className="strength-grid">
            {strengths.map((strength) => (
              <BorderGlow className="strength-card glow-card motion-card" key={strength.title} {...glowCardProps}>
                <span />
                <h3>{strength.title}</h3>
                <p>{strength.text}</p>
              </BorderGlow>
            ))}
          </div>
        </section>

        <section className="final-contact motion-section" id="contact">
          <div className="final-inner">
            <p className="kicker">Contact</p>
            <h2 className="section-title">Let's build mechanical systems that are thoughtful, testable, and real.</h2>
            <div className="final-actions motion-card">
              <a href={gmailComposeUrl} target="_blank" rel="noreferrer">
                Start a conversation
              </a>
              <a
                href="https://www.linkedin.com/in/tyrone-xu/"
                target="_blank"
                rel="noreferrer"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
