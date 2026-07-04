import { useEffect, useRef } from "react";
import { TOTAL_FRAMES, frameUrls } from "@/data/frames";

interface Props {
  images: HTMLImageElement[];
}

export function Hero({ images }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const currentFrame = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const first = images[0];
    if (first) {
      const setSize = () => {
        const w = first.naturalWidth || 1280;
        const h = first.naturalHeight || 720;
        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(first, 0, 0);
      };
      if (first.complete) setSize();
      else first.onload = setSize;
    }

    const draw = (idx: number) => {
      const img = images[idx];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    const update = () => {
      rafRef.current = null;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = total > 0 ? scrolled / total : 0;
      const target = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * (TOTAL_FRAMES - 1)));
      if (target !== currentFrame.current) {
        currentFrame.current = target;
        draw(target);
      }
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
  }, [images]);

  return (
    <section ref={sectionRef} id="home" className="relative" style={{ height: "350vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="mx-auto max-w-7xl h-full px-6 lg:px-10 grid md:grid-cols-12 gap-8 content-start items-start md:items-center pt-20 md:pt-24 pb-8">

          {/* Copy */}
          <div className="md:col-span-5 z-10 order-2 md:order-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              <span className="h-px w-6 bg-[var(--color-gold)]" />
              Est. 2026 · Coimbatore
            </div>
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95]">
              Spaces that<br />
              <em className="italic text-[var(--color-gold)]">inspire</em> and<br />
              endure.
            </h1>
            <p className="mt-6 text-sm md:text-lg text-muted-foreground max-w-md mx-auto md:mx-0 leading-relaxed">
              Sanctus Property designs, develops and delivers residential and commercial
              landmarks — from foundation to finishing detail.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <a href="#projects" className="inline-flex items-center gap-3 rounded-full bg-foreground text-background px-6 py-3 text-sm hover:bg-[var(--color-gold)] hover:text-ink transition-colors">
                View portfolio <span aria-hidden>→</span>
              </a>
              <a href="#contact" className="inline-flex items-center gap-3 text-sm hover:text-[var(--color-gold)] transition-colors">
                Start your project <span aria-hidden>↗</span>
              </a>
            </div>
          </div>

          {/* Canvas */}
          <div className="md:col-span-7 order-1 md:order-2 relative">
            {/* Vertical Decorative Line (Architectural Accent) */}
            <div className="hidden md:block absolute -left-5 top-12 bottom-12 w-[1.5px] bg-[var(--color-gold)]/60 z-20 pointer-events-none" />

            {/* Offset decorative backing frame */}
            <div className="hidden md:block absolute -bottom-4 -right-4 w-full h-full rounded-2xl border border-[var(--color-gold)]/20 z-0 pointer-events-none" />

            {/* Main image frame */}
            <div className="relative aspect-[4/3] md:aspect-[5/4] w-full rounded-2xl overflow-hidden bg-muted shadow-[0_8px_16px_-4px_rgba(0,0,0,0.12),0_32px_64px_-8px_rgba(0,0,0,0.22),0_64px_120px_-16px_rgba(0,0,0,0.18),0_0_0_1px_rgba(201,136,58,0.12)] z-10">
              <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/80 mix-blend-difference">
                <span>Scroll to explore</span>
                <span>{TOTAL_FRAMES} frames</span>
              </div>
            </div>

            {/* Corner brackets — Top Left */}
            <div className="hidden md:block absolute -top-2.5 -left-2.5 z-20 pointer-events-none">
              <div className="w-5 h-[1.5px] bg-[var(--color-gold)]" />
              <div className="w-[1.5px] h-5 bg-[var(--color-gold)] -mt-[1.5px]" />
            </div>
            {/* Corner brackets — Top Right */}
            <div className="hidden md:flex absolute -top-2.5 -right-2.5 z-20 pointer-events-none flex-col items-end">
              <div className="w-5 h-[1.5px] bg-[var(--color-gold)]" />
              <div className="w-[1.5px] h-5 bg-[var(--color-gold)] -mt-[1.5px] self-end" />
            </div>
            {/* Corner brackets — Bottom Left */}
            <div className="hidden md:block absolute -bottom-2.5 -left-2.5 z-20 pointer-events-none">
              <div className="w-[1.5px] h-5 bg-[var(--color-gold)]" />
              <div className="w-5 h-[1.5px] bg-[var(--color-gold)]" />
            </div>
            {/* Corner brackets — Bottom Right */}
            <div className="hidden md:flex absolute -bottom-2.5 -right-2.5 z-20 pointer-events-none flex-col items-end">
              <div className="w-[1.5px] h-5 bg-[var(--color-gold)] self-end" />
              <div className="w-5 h-[1.5px] bg-[var(--color-gold)]" />
            </div>

            {/* Top metadata badge */}
            <div className="hidden md:flex absolute -top-7 right-0 z-20 items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-muted-foreground pointer-events-none">
              <span className="text-[var(--color-gold)]/80">Est. 2026</span>
              <span className="h-px w-6 bg-[var(--color-gold)]/40" />
              <span>Sanctus Property</span>
            </div>

            {/* Right-side vertical label */}
            <div className="hidden md:flex absolute -right-8 top-1/2 -translate-y-1/2 z-20 pointer-events-none flex-col items-center gap-2">
              <span className="h-12 w-px bg-[var(--color-gold)]/30" />
              <span
                className="text-[8px] uppercase tracking-[0.35em] text-muted-foreground"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                Property
              </span>
              <span className="h-12 w-px bg-[var(--color-gold)]/30" />
            </div>
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          <span>Scroll</span>
          <span className="h-8 w-px bg-foreground/40 animate-pulse" />
        </div>
      </div>
      {/* Preload (browser hint, real preload happens in parent) */}
      <link rel="preload" as="image" href={frameUrls[0]} />
    </section>
  );
}
