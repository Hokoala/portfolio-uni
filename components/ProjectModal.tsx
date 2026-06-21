"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Project } from "./ProjectCard";

export default function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <>
    {lightbox && (
      <div
        onClick={() => setLightbox(null)}
        style={{
          position: "fixed", inset: 0, zIndex: 2000,
          background: "rgba(0,0,0,0.92)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "zoom-out",
          padding: "24px",
        }}
      >
        <img
          src={lightbox}
          alt=""
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: "2px" }}
          onClick={e => e.stopPropagation()}
        />
      </div>
    )}
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex" }}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute", inset: 0,
          background: visible ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0)",
          backdropFilter: visible ? "blur(3px)" : "blur(0px)",
          transition: "background 0.4s ease, backdrop-filter 0.4s ease",
          cursor: "pointer",
        }}
      />

      {/* Drawer */}
      <div style={{
        position: "relative",
        marginLeft: "auto",
        width: "min(800px, 100vw)",
        height: "100vh",
        overflowY: "auto",
        background: "var(--background)",
        zIndex: 1,
        transform: visible ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1)",
        display: "flex",
        flexDirection: "column",
      }}>

        {/* Sticky top bar */}
        <div className="rsp-modal-bar" style={{
          position: "sticky", top: 0,
          background: "var(--background)",
          borderBottom: "1px solid var(--border)",
          padding: "18px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 10,
        }}>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <span className="tag">{project.type}</span>
            <span style={{ fontSize: "0.72rem", color: "var(--muted)", letterSpacing: "0.06em" }}>
              {project.year} · {project.semester}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em",
              textTransform: "uppercase", color: "var(--muted)",
              display: "flex", gap: "8px", alignItems: "center",
              padding: 0,
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--foreground)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
          >
            Fermer
            <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>×</span>
          </button>
        </div>

        {/* Content */}
        <div className="rsp-modal-content" style={{ padding: "52px 40px 64px", flex: 1 }}>

          {/* Title block */}
          <h2 style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.0,
            marginBottom: "14px",
          }}>
            {project.title}
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.5, marginBottom: "36px" }}>
            {project.subtitle}
          </p>

          {/* Meta row */}
          {(project.role || project.duration) && (
            <div style={{
              display: "flex", gap: "40px", flexWrap: "wrap",
              paddingBottom: "32px", marginBottom: "32px",
              borderBottom: "1px solid var(--border)",
            }}>
              {project.role && (
                <div>
                  <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "6px" }}>Rôle</p>
                  <p style={{ fontSize: "0.9rem" }}>{project.role}</p>
                </div>
              )}
              {project.duration && (
                <div>
                  <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "6px" }}>Durée</p>
                  <p style={{ fontSize: "0.9rem" }}>{project.duration}</p>
                </div>
              )}
            </div>
          )}

          {/* Tags */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "44px" }}>
            {project.competences.map((c) => (
              <span key={c} className="tag-outline">{c}</span>
            ))}
            {project.techs.map((t) => (
              <span key={t} style={{ fontSize: "0.7rem", color: "var(--muted)", fontFamily: "monospace", padding: "2px 8px", background: "#f0f0ee", borderRadius: "2px" }}>{t}</span>
            ))}
          </div>

          {/* 3-col content */}
          <div className="rsp-modal-3col" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "28px",
            paddingBottom: "44px",
            marginBottom: "44px",
            borderBottom: "1px solid var(--border)",
          }}>
            {[
              { label: "Contexte", text: project.context },
              { label: "Analyse & démarche", text: project.analysis },
              { label: "Bilan", text: project.bilan },
            ].map(({ label, text }) => (
              <div key={label}>
                <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "12px" }}>
                  {label}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {text.split("\n\n").map((para, i) => (
                    <p key={i} style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "var(--foreground)" }}>{para}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Video */}
          {project.video && (
            <div style={{ marginBottom: "44px" }}>
              <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "16px" }}>
                Démonstration
              </p>
              <video
                src={`/video/${project.video}`}
                controls
                playsInline
                style={{ width: "100%", borderRadius: "2px", background: "#f0f0ee", display: "block" }}
              />
            </div>
          )}

          {/* Images grid */}
          {project.images && project.images.length > 0 && (
            <div style={{ marginBottom: "44px" }}>
              <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "16px" }}>
                Visuels
              </p>
              <div style={{
                display: "grid",
                gridTemplateColumns: project.images.length === 1
                  ? "1fr"
                  : "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "10px",
              }}>
                {project.images.map((img, i) => (
                  <div
                    key={i}
                    style={{
                      aspectRatio: "16/10",
                      overflow: "hidden",
                      background: "#f0f0ee",
                      borderRadius: "2px",
                    }}
                  >
                    <img
                      src={`/images/${img}`}
                      alt={`${project.title} — visuel ${i + 1}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", cursor: "zoom-in" }}
                      onClick={() => setLightbox(`/images/${img}`)}
                      onError={(e) => { (e.currentTarget.parentElement!.style.background) = "#e8e8e6"; }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sections éditoriales */}
          {project.sections && project.sections.length > 0 && (
            <div style={{ marginBottom: "44px" }}>
              {project.sections.map((section, i) => (
                <div
                  key={i}
                  className={section.image ? "rsp-modal-2col" : ""}
                  style={{
                    display: "grid",
                    gridTemplateColumns: section.image ? "1fr 1fr" : "1fr",
                    gap: "32px",
                    alignItems: "start",
                    paddingBottom: "40px",
                    marginBottom: "40px",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <div>
                    <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "12px" }}>
                      {section.title}
                    </p>
                    <p style={{ fontSize: "0.875rem", lineHeight: 1.75, color: "var(--foreground)" }}>
                      {section.text}
                    </p>
                  </div>
                  {section.image && (
                    <div style={{ overflow: "hidden", background: section.image.endsWith(".svg") ? "#1a1a1a" : "#f0f0ee", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center", padding: section.image.endsWith(".svg") ? "32px" : "0" }}>
                      <img
                        src={`/images/${section.image}`}
                        alt={section.title}
                        style={{ width: "100%", height: "auto", display: "block", cursor: "zoom-in" }}
                        onClick={() => setLightbox(`/images/${section.image!}`)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Traces */}
          {project.traces && project.traces.length > 0 && (
            <div style={{ marginBottom: "44px" }}>
              <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "4px" }}>
                Traces de réalisation
              </p>
              <div>
                {project.traces.map((trace, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 0",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <span style={{
                      fontSize: "0.65rem",
                      color: "var(--muted)",
                      fontFamily: "monospace",
                      padding: "2px 6px",
                      background: "#f0f0ee",
                      borderRadius: "2px",
                      flexShrink: 0,
                    }}>
                      {trace.type === "image" ? "img" : "url"}
                    </span>
                    {trace.href ? (
                      <a
                        href={trace.href}
                        target={trace.href.startsWith("/") ? "_self" : "_blank"}
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--foreground)",
                          textDecoration: "none",
                          borderBottom: "1px solid var(--border)",
                          paddingBottom: "1px",
                          transition: "border-color 0.2s",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--foreground)")}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
                      >
                        {trace.label} ↗
                      </a>
                    ) : (
                      <span style={{ fontSize: "0.875rem", color: "var(--muted)" }}>{trace.label}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          {project.link && (
            <a
              href={project.link}
              target={project.link.startsWith("/") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                background: "var(--foreground)",
                color: "var(--background)",
                padding: "13px 32px",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: "2px",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Voir le projet ↗
            </a>
          )}
        </div>
      </div>
    </div>
    </>,
    document.body
  );
}
