const PROJECTS = [
  {
    title: "Sample Residence A",
    type: "Residential · Sample City",
    year: "2026",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Sample Commercial B",
    type: "Mixed-use · Sample District",
    year: "2026",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Sample Pavilion C",
    type: "Hospitality · Sample Town",
    year: "2026",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Sample Workshop D",
    type: "Adaptive Reuse · Sample Area",
    year: "2026",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Sample Estate E",
    type: "Private Home · Sample Region",
    year: "2026",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=80",
  },
];

import { useEffect, useRef } from "react";

export function Projects() {
  const outerRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;

    const mm = window.matchMedia("(min-width: 768px)");
    if (!mm.matches) return;

    const update = () => {
      rafRef.current = null;
      const rect = outer.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollRange = outer.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), scrollRange);
      const progress = scrollRange > 0 ? scrolled / scrollRange : 0;
      const maxX = track.scrollWidth - track.offsetWidth;
      track.style.transform = `translateX(-${progress * maxX}px)`;
    };

    const onScroll = () => {
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollMultiplier = PROJECTS.length + 0.5;

  return (
    <section
      ref={outerRef}
      id="projects"
      className="relative hidden md:block"
      style={{ height: `${scrollMultiplier * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-secondary">
        {/* Header */}
        <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-12 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
              <span className="h-px w-8 bg-[var(--color-gold)]" />
              Selected work
            </div>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02]">
              Sample <em className="italic text-[var(--color-gold)]">portfolio</em>
            </h2>
          </div>
          <a href="#contact" className="text-sm hover:text-[var(--color-gold)] transition">
            All work →
          </a>
        </div>

        {/* Horizontal scrolling track */}
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-6 px-6 lg:px-10 will-change-transform"
            style={{ transition: "transform 0.05s linear" }}
          >
            {PROJECTS.map((p, i) => (
              <article key={p.title} className="shrink-0 w-[min(520px,78vw)] group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.3em] text-white/90 bg-black/30 backdrop-blur px-3 py-1.5 rounded-full">
                    {String(i + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
                  </div>
                </div>
                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <h3 className="font-display text-2xl">{p.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{p.type}</p>
                  </div>
                  <span className="text-xs text-muted-foreground tracking-[0.2em]">{p.year}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <ProgressBar outerRef={outerRef} />
      </div>
    </section>
  );
}

function ProgressBar({ outerRef }: { outerRef: React.RefObject<HTMLElement | null> }) {
  const barRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const bar = barRef.current;
    if (!outer || !bar) return;

    const update = () => {
      rafRef.current = null;
      const rect = outer.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = outer.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      bar.style.width = `${pct}%`;
    };

    const onScroll = () => {
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [outerRef]);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground/10">
      <div
        ref={barRef}
        className="h-full bg-[var(--color-gold)] transition-[width] duration-75"
        style={{ width: "0%" }}
      />
    </div>
  );
}

/* ── Mobile vertical stack ── */
export function ProjectsMobile() {
  return (
    <section id="projects-mobile" className="md:hidden py-20 bg-secondary px-6">
      <div className="mb-10 text-center">
        <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
          <span className="h-px w-8 bg-[var(--color-gold)]" />
          Selected work
          <span className="h-px w-8 bg-[var(--color-gold)]" />
        </div>
        <h2 className="font-display text-4xl leading-[1.02]">
          Sample <em className="italic text-[var(--color-gold)]">portfolio</em>
        </h2>
      </div>
      <div className="space-y-10">
        {PROJECTS.map((p, i) => (
          <article key={p.title}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
              <img src={p.img} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.3em] text-white/90 bg-black/30 backdrop-blur px-3 py-1.5 rounded-full">
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <h3 className="font-display text-2xl">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{p.type}</p>
              </div>
              <span className="text-xs text-muted-foreground">{p.year}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
