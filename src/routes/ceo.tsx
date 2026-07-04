import { createFileRoute, Link } from "@tanstack/react-router";
import ecLogo from "@/assets/logofor E and C_.png";
import ceoPortrait from "@/assets/photo/c2.png";

export const Route = createFileRoute("/ceo")({
  head: () => ({
    meta: [
      { title: "A. Charles Sandeep — Founder & CEO | Sanctus Property OPC Pvt Ltd" },
      {
        name: "description",
        content:
          "Meet the visionary behind Sanctus Property OPC Pvt Ltd — A. Charles Sandeep, Founder & CEO. Learn about his philosophy, milestones, and the mission driving Sanctus Property OPC Pvt Ltd.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  component: CeoPage,
});



const PILLARS = [
  {
    icon: "◈",
    title: "Integrity",
    desc: "Every commitment is honoured. Every project is delivered with transparency and accountability.",
  },
  {
    icon: "◉",
    title: "Excellence",
    desc: "From foundation to finish, we pursue perfection — no shortcuts, no compromises.",
  },
  {
    icon: "◎",
    title: "Legacy",
    desc: "We build not just structures, but lasting legacies that enrich communities for generations.",
  },
];

function CeoPage() {
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
          backgroundColor:
            "color-mix(in oklab, var(--color-background) 88%, transparent)",
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
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <img
              src={ecLogo}
              alt="Sanctus Property"
              style={{ height: "2.75rem", width: "auto", objectFit: "contain" }}
            />
            <div style={{ lineHeight: 1.3 }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.125rem",
                  letterSpacing: "-0.02em",
                }}
              >
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
              (e.currentTarget as HTMLAnchorElement).style.background =
                "var(--color-gold)";
              (e.currentTarget as HTMLAnchorElement).style.color =
                "var(--ink)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "var(--color-foreground)";
              (e.currentTarget as HTMLAnchorElement).style.color =
                "var(--color-background)";
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section
        style={{
          paddingTop: "10rem",
          paddingBottom: "6rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "5rem",
            alignItems: "center",
          }}
        >
          {/* Portrait */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
            <div
              style={{
                position: "relative",
                width: "320px",
                height: "380px",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow:
                  "0 30px 80px rgba(0,0,0,0.12), 0 0 0 1px var(--color-border)",
                background:
                  "linear-gradient(145deg, oklch(0.92 0.04 75), oklch(0.80 0.08 70))",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              {/* Decorative silhouette / avatar */}
              <img
                src={ceoPortrait}
                alt="A. Charles Sandeep — Founder & CEO, Sanctus Property"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />

              {/* Gold accent bar at bottom */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background:
                    "linear-gradient(to right, var(--color-gold), oklch(0.82 0.16 80))",
                }}
              />
            </div>

            {/* Name card under portrait */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "0.6875rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.22em",
                  color: "var(--color-gold)",
                  marginBottom: "0.4rem",
                }}
              >
                Founder &amp; Chief Executive Officer
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  letterSpacing: "-0.02em",
                }}
              >
                A. Charles Sandeep
              </div>
            </div>
          </div>

          {/* Bio text */}
          <div>
            <p
              style={{
                fontSize: "0.6875rem",
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "var(--color-gold)",
                marginBottom: "1rem",
              }}
            >
              A Message from the CEO
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                marginBottom: "1.75rem",
              }}
            >
              Building Places
              <br />
              <em style={{ fontStyle: "italic", color: "var(--color-gold)" }}>
                People are Proud to Call Home
              </em>
            </h1>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                fontSize: "0.9375rem",
                lineHeight: 1.8,
                color: "var(--color-muted-foreground)",
                maxWidth: "560px",
              }}
            >
              <p>
                At Sanctus Property, we believe that a home is more than four
                walls — it is where life's most meaningful moments unfold. From
                the very first stone laid to the handing over of keys, our
                commitment to craftsmanship, transparency, and lasting value
                remains unwavering.
              </p>
              <p>
                With over a decade of experience transforming skylines across
                Tamil Nadu, I am proud to lead a team that combines traditional
                building wisdom with modern innovation. Every project we
                undertake is a promise — to our clients, to the community, and
                to the future.
              </p>
              <p>
                We don't just build structures. We create legacies.
              </p>
            </div>

            <div
              style={{
                marginTop: "2.5rem",
                paddingTop: "2rem",
                borderTop: "1px solid var(--color-border)",
                display: "flex",
                gap: "3rem",
                flexWrap: "wrap",
              }}
            >
              {[
                { value: "15+", label: "Years of Experience" },
                { value: "200+", label: "Projects Delivered" },
                { value: "₹500Cr+", label: "Portfolio Value" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "2rem",
                      fontWeight: 600,
                      color: "var(--color-gold)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      color: "var(--color-muted-foreground)",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="hairline" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ height: "1px", background: "linear-gradient(to right, transparent, var(--color-border), transparent)" }} />
      </div>

      {/* ── Leadership Pillars ── */}
      <section
        style={{
          padding: "6rem 1.5rem",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p
            style={{
              fontSize: "0.6875rem",
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              color: "var(--color-gold)",
              marginBottom: "0.75rem",
            }}
          >
            Leadership Philosophy
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
            }}
          >
            Principles That Drive Us Forward
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "2rem",
          }}
        >
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              style={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "12px",
                padding: "2.5rem",
                transition: "box-shadow 300ms, transform 300ms",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 12px 40px rgba(0,0,0,0.08)";
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(0)";
              }}
            >
              <div
                style={{
                  fontSize: "1.75rem",
                  color: "var(--color-gold)",
                  marginBottom: "1.25rem",
                }}
              >
                {pillar.icon}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.25rem",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  marginBottom: "0.75rem",
                }}
              >
                {pillar.title}
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.75,
                  color: "var(--color-muted-foreground)",
                }}
              >
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>



      {/* ── Quote Block ── */}
      <section
        style={{
          padding: "7rem 1.5rem",
          textAlign: "center",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <blockquote>
          <span
            style={{
              display: "block",
              fontSize: "3rem",
              color: "var(--color-gold)",
              lineHeight: 1,
              marginBottom: "1rem",
              fontFamily: "Georgia, serif",
            }}
          >
            &ldquo;
          </span>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.4rem, 3vw, 2.1rem)",
              fontStyle: "italic",
              fontWeight: 400,
              lineHeight: 1.45,
              letterSpacing: "-0.015em",
              color: "var(--color-foreground)",
              marginBottom: "2rem",
            }}
          >
            Greatness is not in the height of the building, but in the
            substance of its foundation — and the trust of those who call it
            home.
          </p>
          <footer
            style={{
              fontSize: "0.8rem",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "var(--color-muted-foreground)",
            }}
          >
            — A. Charles Sandeep, Founder &amp; CEO, Sanctus Property
          </footer>
        </blockquote>
      </section>

      {/* ── CTA Strip ── */}
      <section
        style={{
          background: "var(--color-foreground)",
          padding: "5rem 1.5rem",
        }}
      >
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
              Connect with us
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
              Begin Your Journey with Sanctus
            </h2>
          </div>
          <a
            href="tel:+919629873298"
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
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.85")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")
            }
          >
            +91 96298 73298 →
          </a>
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
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color =
              "var(--color-gold)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color = "inherit")
          }
        >
          ← Return to Home
        </Link>
      </footer>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
