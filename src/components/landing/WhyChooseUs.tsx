const STATS = [
  { n: "150+", l: "Upcoming builds" },
  { n: "2026", l: "Sanctus Era" },
  { n: "₪5.0B", l: "Projected value" },
  { n: "Pure", l: "Architecture" },
];

const REASONS = [
  { t: "In-house from day one", b: "Architects, engineers and project managers under the same roof — no middlemen, no translation loss." },
  { t: "Materials we'd live with", b: "We specify the stone, the steel, the joinery. If we wouldn't put it in our own home, it doesn't go in yours." },
  { t: "On time, on budget", b: "Fixed-price contracts with milestone transparency. 96% of projects delivered on or ahead of schedule." },
];

export function WhyChooseUs() {
  return (
    <section id="about" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
            <span className="h-px w-8 bg-[var(--color-gold)]" />
            Why Sanctus Property
          </div>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.05] mb-8">
            We make the<br /><em className="italic text-[var(--color-gold)]">right choice</em>.
          </h2>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
              alt="Construction crew on site"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="md:col-span-7 md:pt-20">
          <div className="space-y-10">
            {REASONS.map((r, i) => (
              <div key={r.t} className="flex gap-6 border-b border-border pb-10 last:border-0">
                <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] pt-2">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-2xl md:text-3xl mb-3">{r.t}</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-md">{r.b}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border rounded-xl overflow-hidden">
            {STATS.map((s) => (
              <div key={s.l} className="bg-background p-6">
                <div className="font-display text-3xl md:text-4xl">{s.n}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
