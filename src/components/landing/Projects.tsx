import p1 from "@/assets/photo/1.png";
import p2 from "@/assets/photo/2.png";
import p3 from "@/assets/photo/3.png";
import p4 from "@/assets/photo/4.png";
import p5 from "@/assets/photo/5.png";
import p6 from "@/assets/photo/6.png";
import p7 from "@/assets/photo/7.png";
import p8 from "@/assets/photo/8.png";
import p9 from "@/assets/photo/9.png";
import p10 from "@/assets/photo/10.png";

const PROJECTS = [
  { title: "Signature Elevation Villa", type: "Residential · Designer Elevation", year: "2025", img: p4 },
  { title: "Twin-Tone Family Villa", type: "Residential · Independent House", year: "2024", img: p3 },
  { title: "Urban Designer Home", type: "Residential · Multi-Storey", year: "2025", img: p8 },
  { title: "Louvre Facade Residence", type: "Residential · Under Construction", year: "2026", img: p5 },
  { title: "Compact Modern Home", type: "Residential · Independent House", year: "2024", img: p6 },
  { title: "Housewarming Handover", type: "Residential · Completed & Delivered", year: "2026", img: p2 },
  { title: "Fitness Studio Fit-Out", type: "Commercial · Interior", year: "2026", img: p1 },
  { title: "Community Landmark Build", type: "Institutional · Completed", year: "2025", img: p10 },
  { title: "G Square Builder Partner", type: "Recognition · Partnership", year: "2026", img: p7 },
  { title: "Builder Partnership Meet", type: "Recognition · G Square Group", year: "2026", img: p9 },
];

import { useEffect, useRef, useState } from "react";

export function Projects() {
  const outerRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const atStartRef = useRef(true);
  const atEndRef = useRef(false);

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    if (!outer || !track || !wrapper) return;

    const mm = window.matchMedia("(min-width: 768px)");

    const update = () => {
      rafRef.current = null;
      const rect = outer.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollRange = outer.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), scrollRange);
      const progress = scrollRange > 0 ? scrolled / scrollRange : 0;
      const maxX = track.scrollWidth - track.offsetWidth;
      track.style.transform = `translateX(-${progress * maxX}px)`;

      const nextAtStart = scrolled <= 0;
      const nextAtEnd = scrolled >= scrollRange;
      if (nextAtStart !== atStartRef.current) {
        atStartRef.current = nextAtStart;
        setAtStart(nextAtStart);
      }
      if (nextAtEnd !== atEndRef.current) {
        atEndRef.current = nextAtEnd;
        setAtEnd(nextAtEnd);
      }
    };

    const onScroll = () => {
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(update);
    };

    const dragRef = { dragging: false, lastX: 0, ratio: 0, pointerId: 0 };

    const onPointerDown = (e: PointerEvent) => {
      const vh = window.innerHeight;
      const scrollRange = outer.offsetHeight - vh;
      const maxX = track.scrollWidth - track.offsetWidth;
      dragRef.dragging = true;
      dragRef.lastX = e.clientX;
      dragRef.ratio = maxX > 0 ? scrollRange / maxX : 0;
      dragRef.pointerId = e.pointerId;
      try {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
      } catch {
        /* no-op: pointer capture may already be released/unsupported */
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragRef.dragging) return;
      const deltaX = dragRef.lastX - e.clientX;
      if (Math.abs(deltaX) < 1) return;
      e.preventDefault();
      window.scrollBy({ top: deltaX * dragRef.ratio });
      dragRef.lastX = e.clientX;
    };

    const onPointerUp = (e: PointerEvent) => {
      dragRef.dragging = false;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        /* no-op: pointer capture may already be released/unsupported */
      }
    };

    const start = () => {
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      wrapper.addEventListener("pointerdown", onPointerDown);
      wrapper.addEventListener("pointermove", onPointerMove, { passive: false });
      wrapper.addEventListener("pointerup", onPointerUp);
      wrapper.addEventListener("pointercancel", onPointerUp);
    };

    const stop = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      wrapper.removeEventListener("pointerdown", onPointerDown);
      wrapper.removeEventListener("pointermove", onPointerMove);
      wrapper.removeEventListener("pointerup", onPointerUp);
      wrapper.removeEventListener("pointercancel", onPointerUp);
      dragRef.dragging = false;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      track.style.transform = "";
    };

    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        start();
      } else {
        stop();
      }
    };

    if (mm.matches) start();
    mm.addEventListener("change", onChange);

    return () => {
      mm.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  const stepScroll = (direction: 1 | -1) => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;
    const vh = window.innerHeight;
    const scrollRange = outer.offsetHeight - vh;
    const maxX = track.scrollWidth - track.offsetWidth;
    if (maxX <= 0 || scrollRange <= 0) return;
    const ratio = scrollRange / maxX;
    const firstCard = track.children[0] as HTMLElement | undefined;
    const cardWidth = firstCard?.getBoundingClientRect().width ?? 0;
    const stepPixels = cardWidth + 24;
    window.scrollBy({ top: direction * stepPixels * ratio, behavior: "smooth" });
  };

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
              Our <em className="italic text-[var(--color-gold)]">portfolio</em>
            </h2>
          </div>
          <div className="flex items-center gap-5">
            <a href="#contact" className="text-sm hover:text-[var(--color-gold)] transition">
              All work →
            </a>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => stepScroll(-1)}
                disabled={atStart}
                aria-label="Previous project"
                className="h-10 w-10 rounded-full flex items-center justify-center text-white bg-black/30 backdrop-blur hover:bg-black/50 transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => stepScroll(1)}
                disabled={atEnd}
                aria-label="Next project"
                className="h-10 w-10 rounded-full flex items-center justify-center text-white bg-black/30 backdrop-blur hover:bg-black/50 transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal scrolling track */}
        <div
          ref={wrapperRef}
          className="overflow-hidden cursor-grab active:cursor-grabbing"
          style={{ touchAction: "pan-y" }}
        >
          <div
            ref={trackRef}
            className="flex gap-6 px-6 lg:px-10 will-change-transform"
            style={{ transition: "transform 0.05s linear" }}
          >
            {PROJECTS.map((p, i) => (
              <article key={p.title} className="shrink-0 group">
                <div className="relative w-fit overflow-hidden rounded-xl bg-muted h-[52vh] min-h-[320px] max-h-[540px]">
                  <img
                    src={p.img}
                    alt={`${p.title} — ${p.type} | Sanctus Property, Coimbatore`}
                    loading="lazy"
                    className="h-full w-auto object-contain transition-transform duration-700 group-hover:scale-105"
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
          Our <em className="italic text-[var(--color-gold)]">portfolio</em>
        </h2>
      </div>
      <div className="space-y-10">
        {PROJECTS.map((p, i) => (
          <article key={p.title}>
            <div className="relative overflow-hidden rounded-xl bg-muted">
              <img src={p.img} alt={`${p.title} — ${p.type} | Sanctus Property, Coimbatore`} loading="lazy" className="w-full h-auto" />
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
