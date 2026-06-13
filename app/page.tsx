"use client";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import { projects, competences } from "@/data/content";
import { useState, useEffect, useRef } from "react";

function ParallaxHero() {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * 0.35);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={ref}
      className="rsp-hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 40px 60px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "-20px",
          fontSize: "clamp(200px, 35vw, 420px)",
          fontWeight: 800,
          letterSpacing: "-0.05em",
          color: "transparent",
          WebkitTextStroke: "1px #e0e0e0",
          transform: `translateY(calc(-50% + ${offset}px))`,
          transition: "transform 0.1s linear",
          userSelect: "none",
          lineHeight: 1,
          zIndex: 0,
        }}
        aria-hidden
      >
        BUT
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: "900px" }}>
        <Reveal direction="up" delay={100}>
          <p style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "20px" }}>
            Portfolio universitaire · BUT MMI · 2023—2026
          </p>
        </Reveal>

        <Reveal direction="up" delay={200}>
          <h1 style={{ fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 0.95, marginBottom: "32px" }}>
            Jean Michel<br />
            <span style={{ color: "var(--muted)" }}>LE.</span>
          </h1>
        </Reveal>

        <Reveal direction="up" delay={350}>
          <p style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "var(--muted)", maxWidth: "520px", lineHeight: 1.6, marginBottom: "40px" }}>
            Je construis ce qui me manque — un SaaS médical, un outil CLI, un portfolio en 3D.
            Étudiant BUT MMI à Troyes, je vise l&apos;ingénierie logicielle.
          </p>
        </Reveal>

        <Reveal direction="up" delay={500}>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <a
              href="#projets"
              style={{ display: "inline-block", background: "var(--foreground)", color: "var(--background)", padding: "12px 28px", fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none", borderRadius: "2px", transition: "opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Voir les projets
            </a>
            <a
              href="#competences"
              style={{ display: "inline-block", border: "1px solid var(--foreground)", color: "var(--foreground)", padding: "12px 28px", fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none", borderRadius: "2px", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--foreground)"; e.currentTarget.style.color = "var(--background)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--foreground)"; }}
            >
              Compétences
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal direction="none" delay={800} style={{ position: "absolute", bottom: "40px", right: "40px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "1px", height: "50px", background: "linear-gradient(to bottom, transparent, var(--muted))", animation: "scrollLine 2s ease-in-out infinite" }} />
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", writingMode: "vertical-rl" }}>Scroll</p>
        </div>
      </Reveal>

      <style>{`@keyframes scrollLine { 0%,100%{opacity:0.3;transform:scaleY(0.8)} 50%{opacity:1;transform:scaleY(1)} }`}</style>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { value: "3", label: "Années de BUT" },
    { value: "5", label: "Compétences BUT" },
    { value: "6+", label: "Projets" },
    { value: "2026", label: "Promo diplôme" },
  ];
  return (
    <Reveal direction="up">
      <div className="rsp-stats-grid" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", margin: "0 40px" }}>
        {stats.map((s, i) => (
          <div key={i} className={i > 0 ? "rsp-stats-item" : ""} style={{ padding: "28px 0", borderRight: i < stats.length - 1 ? "1px solid var(--border)" : "none", paddingLeft: i > 0 ? "32px" : "0" }}>
            <p style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.02em" }}>{s.value}</p>
            <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "4px" }}>{s.label}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

function ProjectsSection() {
  return (
    <section id="projets" className="rsp-section" style={{ padding: "100px 40px 60px" }}>
      <Reveal direction="left">
        <div className="rsp-projects-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px" }}>
          <div>
            <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "10px" }}>01 / Projets</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>Les projets<br />qui m&apos;ont forgé.</h2>
          </div>
          <p className="rsp-projects-desc" style={{ fontSize: "0.85rem", color: "var(--muted)", maxWidth: "280px", textAlign: "right", lineHeight: 1.6 }}>
            Stage, SAE, projets perso — du SaaS médical à la borne d&apos;arcade, six projets qui racontent trois ans de formation.
          </p>
        </div>
      </Reveal>
      <div>
        {projects.map((project, i) => (
          <Reveal key={project.id} direction="up" delay={i * 80}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
        <div style={{ borderTop: "1px solid var(--border)" }} />
      </div>
    </section>
  );
}

function CompetencesSection() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <section id="competences" className="rsp-section" style={{ padding: "100px 40px 60px" }}>
      <Reveal direction="left">
        <div style={{ marginBottom: "48px" }}>
          <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "10px" }}>02 / Compétences</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>Cinq compétences,<br />trois niveaux.</h2>
        </div>
      </Reveal>
      <div className="rsp-comp-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
        {competences.map((c, i) => (
          <Reveal key={c.id} direction="up" delay={i * 60}>
            <div
              onClick={() => setActive(active === c.id ? null : c.id)}
              className="rsp-comp-item"
              style={{ borderTop: "1px solid var(--border)", borderRight: i % 2 === 0 ? "1px solid var(--border)" : "none", padding: "32px 28px", cursor: "pointer", transition: "background 0.2s", background: active === c.id ? "var(--foreground)" : "transparent", color: active === c.id ? "var(--background)" : "var(--foreground)" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div>
                  <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: active === c.id ? "rgba(248,248,246,0.6)" : "var(--muted)", display: "block", marginBottom: "6px" }}>{c.code} · {c.level}</span>
                  <h3 style={{ fontSize: "1.4rem", fontWeight: 700, letterSpacing: "-0.01em" }}>{c.label}</h3>
                </div>
                <span style={{ fontSize: "1.2rem", opacity: 0.4, transition: "transform 0.3s", transform: active === c.id ? "rotate(45deg)" : "none", display: "inline-block" }}>+</span>
              </div>
              <p style={{ fontSize: "0.82rem", lineHeight: 1.55, color: active === c.id ? "rgba(248,248,246,0.75)" : "var(--muted)" }}>{c.description}</p>
              <div style={{ maxHeight: active === c.id ? "200px" : "0", overflow: "hidden", transition: "max-height 0.4s ease" }}>
                <p style={{ fontSize: "0.82rem", lineHeight: 1.65, marginTop: "16px", borderTop: "1px solid rgba(248,248,246,0.2)", paddingTop: "16px" }}>{c.detail}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <div style={{ borderTop: "1px solid var(--border)" }} />
    </section>
  );
}

const skillCategories = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "Vue.js", "Nuxt.js", "Astro", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Backend & BDD",
    items: ["Node.js", "Python", "PostgreSQL", "Prisma"],
  },
  {
    label: "Outils & DevOps",
    items: ["Git", "Docker", "Figma"],
  },
];

function AboutSection() {
  return (
    <section id="apropos" className="rsp-section" style={{ padding: "100px 40px 120px" }}>
      <Reveal direction="left">
        <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "10px" }}>03 / À propos</p>
      </Reveal>

      <div className="rsp-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start", marginTop: "32px", marginBottom: "64px" }}>
        <Reveal direction="up" delay={100}>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
            Développeur web,<br /><span style={{ color: "var(--muted)" }}>futur ingénieur logiciel.</span>
          </h2>
        </Reveal>
        <Reveal direction="up" delay={200}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--muted)" }}>
              Bonjour, je suis Jean Michel LE, développeur web passionné et futur ingénieur logiciel. Étudiant en MMI (Métiers du Multimédia et de l&apos;Internet), je construis des applications web modernes et des outils qui résolvent de vrais problèmes.
            </p>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--muted)" }}>
              Ce portfolio universitaire documente trois années de formation, de stages et de projets personnels réalisés dans le cadre du BUT MMI à l&apos;IUT de Troyes.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "12px", flexWrap: "wrap" }}>
              {[
                { label: "GitHub", href: "https://github.com/Hokoala" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/jean-michel-le/" },
                { label: "Portfolio", href: "https://jean-michel-le.dev" },
              ].map(link => (
                <a key={link.label} href={link.href} style={{ fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--foreground)", textDecoration: "none", borderBottom: "1px solid var(--border)", paddingBottom: "2px", transition: "border-color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--foreground)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
                >{link.label} ↗</a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal direction="up" delay={100}>
        <div style={{ borderTop: "1px solid var(--border)" }}>
          {skillCategories.map((cat, i) => (
            <div
              key={cat.label}
              className="rsp-skills-row"
              style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr",
                alignItems: "start",
                padding: "24px 0",
                borderBottom: "1px solid var(--border)",
                gap: "40px",
              }}
            >
              <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", paddingTop: "3px" }}>
                {cat.label}
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {cat.items.map(item => (
                  <span
                    key={item}
                    style={{ fontSize: "0.78rem", fontFamily: "monospace", padding: "4px 10px", background: "#f0f0ee", borderRadius: "2px", color: "var(--foreground)" }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "24px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <p style={{ fontSize: "0.75rem", color: "var(--muted)" }}>Jean Michel LE · BUT MMI IUT de Troyes · 2023—2026</p>
      <p style={{ fontSize: "0.75rem", color: "var(--muted)" }}>Portfolio universitaire</p>
    </footer>
  );
}

export default function Home() {
  return (
    <main>
      <Nav />
      <ParallaxHero />
      <StatsBar />
      <ProjectsSection />
      <CompetencesSection />
      <AboutSection />
      <Footer />
    </main>
  );
}
