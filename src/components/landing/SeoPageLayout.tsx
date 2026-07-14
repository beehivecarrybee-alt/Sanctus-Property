import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import ecLogo from "@/assets/logofor E and C_.png";

export function SeoPageLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        background: "var(--color-background)",
        color: "var(--color-foreground)",
        fontFamily: "var(--font-sans)",
        minHeight: "100vh",
      }}
    >
      {/* ── Masthead ── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: "color-mix(in oklab, var(--color-background) 88%, transparent)",
          backdropFilter: "blur(14px) saturate(120%)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 1.5rem",
            height: "5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a
            href="/"
            style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none", color: "inherit" }}
          >
            <img src={ecLogo} alt="Sanctus Property" style={{ height: "2.75rem", width: "auto", objectFit: "contain" }} />
            <div style={{ lineHeight: 1.3 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", letterSpacing: "-0.02em" }}>
                Sanctus Property
              </div>
              <div
                style={{
                  fontSize: "0.625rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.25em",
                  color: "var(--color-muted-foreground)",
                }}
              >
                Real Estate &amp; Construction Company
              </div>
            </div>
          </a>
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              borderRadius: "9999px",
              padding: "0.5rem 1.25rem",
              fontSize: "0.875rem",
              background: "var(--color-foreground)",
              color: "var(--color-background)",
              textDecoration: "none",
              transition: "background 200ms",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-gold)";
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-foreground)";
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-background)";
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      <main style={{ paddingTop: "5rem" }}>{children}</main>

      {/* ── CTA Strip ── */}
      <section style={{ background: "var(--color-foreground)", padding: "5rem 1.5rem" }}>
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "0.6875rem",
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "var(--color-gold)",
                marginBottom: "0.5rem",
              }}
            >
              Let's build
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "var(--color-background)",
              }}
            >
              Have a project in Coimbatore?
            </h2>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <a
              href="/#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                borderRadius: "9999px",
                padding: "0.875rem 2rem",
                fontSize: "0.9rem",
                fontWeight: 500,
                background: "var(--color-gold)",
                color: "var(--ink)",
                textDecoration: "none",
                transition: "opacity 200ms",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.85")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
            >
              Start your enquiry →
            </a>
            <a
              href="tel:+917845840069"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                borderRadius: "9999px",
                padding: "0.875rem 2rem",
                fontSize: "0.9rem",
                fontWeight: 500,
                border: "1px solid color-mix(in oklab, var(--color-background) 30%, transparent)",
                color: "var(--color-background)",
                textDecoration: "none",
                transition: "opacity 200ms",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.75")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
            >
              +91 78458 40069
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          borderTop: "1px solid var(--color-border)",
          padding: "2.5rem 1.5rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "1rem",
          fontSize: "0.8rem",
          color: "var(--color-muted-foreground)",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <span>© {new Date().getFullYear()} Sanctus Property OPC Pvt Ltd. All rights reserved.</span>
        <Link
          to="/"
          style={{ color: "inherit", textDecoration: "none" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--color-gold)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "inherit")}
        >
          ← Return to Home
        </Link>
      </footer>
    </div>
  );
}
