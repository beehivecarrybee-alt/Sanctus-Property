import { Link } from "@tanstack/react-router";
import ceoPortrait from "@/assets/photo/c2.png";

export function CeoSection() {
  return (
    <section
      id="ceo"
      style={{
        padding: "7rem 1.5rem",
        background: "var(--color-secondary)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "5rem",
          alignItems: "center",
        }}
      >
        {/* ── Portrait card ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "300px",
              height: "360px",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow:
                "0 30px 80px rgba(0,0,0,0.10), 0 0 0 1px var(--color-border)",
              background:
                "linear-gradient(145deg, oklch(0.92 0.04 75), oklch(0.80 0.08 70))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={ceoPortrait}
              alt="A. Charles Sandeep — Founder & CEO, Sanctus Property"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
            {/* Gold accent bar */}
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
                fontSize: "1.4rem",
                letterSpacing: "-0.02em",
              }}
            >
              A. Charles Sandeep
            </div>
            <a
              href="tel:+919629873298"
              style={{
                display: "inline-block",
                marginTop: "0.5rem",
                fontSize: "0.8rem",
                color: "var(--color-muted-foreground)",
                textDecoration: "none",
              }}
            >
              +91 96298 73298
            </a>
          </div>
        </div>

        {/* ── Text side ── */}
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
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              marginBottom: "1.5rem",
            }}
          >
            Building Places{" "}
            <em style={{ fontStyle: "italic", color: "var(--color-gold)" }}>
              People are Proud to Call Home
            </em>
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              fontSize: "0.9375rem",
              lineHeight: 1.8,
              color: "var(--color-muted-foreground)",
              maxWidth: "540px",
              marginBottom: "2rem",
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
              building wisdom with modern innovation. Every project we undertake
              is a promise — to our clients, to the community, and to the
              future.
            </p>
          </div>

          {/* Stats row */}
          <div
            style={{
              paddingTop: "1.75rem",
              borderTop: "1px solid var(--color-border)",
              display: "flex",
              gap: "2.5rem",
              flexWrap: "wrap",
              marginBottom: "2.5rem",
            }}
          >
            {[
              { value: "15+", label: "Years of Experience" },
              { value: "200+", label: "Projects Delivered" },
              { value: "₹500Cr+", label: "Portfolio Value" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2rem",
                    fontWeight: 600,
                    color: "var(--color-gold)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: "var(--color-muted-foreground)",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            to="/ceo"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              borderRadius: "9999px",
              padding: "0.75rem 1.75rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              background: "var(--color-foreground)",
              color: "var(--color-background)",
              textDecoration: "none",
              transition: "background 200ms, color 200ms",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "var(--color-gold)";
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "var(--color-foreground)";
              (e.currentTarget as HTMLAnchorElement).style.color =
                "var(--color-background)";
            }}
          >
            Meet Our CEO →
          </Link>
        </div>
      </div>
    </section>
  );
}
