"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "20px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        background: scrolled ? "rgba(248,248,246,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      <Link href="/" style={{ fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.05em", textDecoration: "none", color: "var(--foreground)" }}>
        JML
      </Link>
      <div style={{ display: "flex", gap: "32px" }}>
        {[
          { label: "Projets", href: "#projets" },
          { label: "Compétences", href: "#competences" },
          { label: "À propos", href: "#apropos" },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            style={{
              fontSize: "0.82rem",
              fontWeight: 500,
              letterSpacing: "0.04em",
              color: "var(--muted)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--foreground)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
