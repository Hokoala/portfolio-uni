"use client";
import { useState } from "react";
import ProjectModal from "./ProjectModal";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  type: "Stage" | "Projet perso" | "SAE";
  year: string;
  semester: string;
  role?: string;
  duration?: string;
  competences: string[];
  techs: string[];
  context: string;
  analysis: string;
  bilan: string;
  link?: string;
  images?: string[];
  traces?: { label: string; type: "image" | "link"; href?: string }[];
  sections?: { title: string; text: string; image?: string }[];
}

export default function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        style={{
          borderTop: "1px solid var(--border)",
          padding: "0",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "center",
            padding: "28px 0",
            gap: "16px",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
              <span className="tag">{project.type}</span>
              <span style={{ fontSize: "0.72rem", color: "var(--muted)", letterSpacing: "0.06em" }}>
                {project.year} · {project.semester}
              </span>
              {project.duration && (
                <span style={{ fontSize: "0.72rem", color: "var(--muted)", letterSpacing: "0.06em" }}>
                  · {project.duration}
                </span>
              )}
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.01em" }}>
              {project.title}
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>{project.subtitle}</p>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "4px" }}>
              {project.competences.map((c) => (
                <span key={c} className="tag-outline">{c}</span>
              ))}
              {project.techs.slice(0, 5).map((t) => (
                <span key={t} style={{ fontSize: "0.7rem", color: "var(--muted)", fontFamily: "monospace", padding: "2px 6px", background: "#f0f0ee", borderRadius: "2px" }}>{t}</span>
              ))}
              {project.techs.length > 5 && (
                <span style={{ fontSize: "0.7rem", color: "var(--muted)", fontFamily: "monospace", padding: "2px 6px" }}>
                  +{project.techs.length - 5}
                </span>
              )}
            </div>
          </div>
          <span style={{
            fontSize: "1.4rem",
            color: "var(--muted)",
            display: "inline-block",
            lineHeight: 1,
          }}>→</span>
        </div>
      </div>

      {open && (
        <ProjectModal project={project} onClose={() => setOpen(false)} />
      )}
    </>
  );
}

export type { Project };
