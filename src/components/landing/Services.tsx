const SERVICES = [
  {
    n: "01",
    title: "Residential Construction",
    body: "Custom homes, penthouses and boutique apartment buildings designed around how people actually live.",
    points: ["Architectural design", "Interior development", "Turnkey delivery"],
  },
  {
    n: "02",
    title: "Commercial Construction",
    body: "Offices, hospitality and retail spaces engineered for performance, brand and longevity.",
    points: ["Mixed-use towers", "Hospitality fit-out", "Workplace design"],
  },
  {
    n: "03",
    title: "Residential Plots",
    body: "Approved residential plots in prime locations, ready for you to build the home you've always wanted.",
    points: ["Approved layouts", "Clear title & documentation", "Site development"],
  },
  {
    n: "04",
    title: "Commercial Plots",
    body: "Strategically located commercial plots suited for retail, office and mixed-use development.",
    points: ["High-visibility locations", "Flexible plot sizes", "Investment-ready titles"],
  },
  {
    n: "05",
    title: "Ready to Move Villas",
    body: "Fully finished villas, inspected and handover-ready — move in without waiting through a construction cycle.",
    points: ["Quality-checked finish", "Immediate possession", "Complete documentation"],
  },
  {
    n: "06",
    title: "Resale Villas",
    body: "Verified pre-owned villas with transparent history, fair valuation and a smooth transfer process.",
    points: ["Verified ownership", "Fair market valuation", "End-to-end transfer support"],
  },
  {
    n: "07",
    title: "Electrical & Plumbing",
    body: "In-house electrical and plumbing teams for commercial and residential projects — from rough-in to final fittings.",
    points: ["Wiring & panel work", "Plumbing & sanitary fit-out", "Maintenance & repairs"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-32 md:py-40 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
              <span className="h-px w-8 bg-[var(--color-gold)]" />
              What we do
            </div>
            <h2 className="font-display text-4xl md:text-6xl max-w-2xl leading-[1.02]">
              Every discipline.<br />
              <em className="italic text-[var(--color-gold)]">One studio.</em>
            </h2>
          </div>
          <p className="md:max-w-sm text-muted-foreground">
            We control every stage of the build — design, development and construction
            stay under one roof so quality never gets translated.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {SERVICES.map((s) => (
            <article key={s.n} className="bg-background p-8 md:p-10 group hover:bg-secondary transition-colors duration-500">
              <div className="flex items-baseline justify-between mb-12">
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{s.n}</span>
                <span className="h-2 w-2 rounded-full bg-[var(--color-gold)] group-hover:scale-150 transition-transform" />
              </div>
              <h3 className="font-display text-3xl mb-4">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">{s.body}</p>
              <ul className="space-y-3 border-t border-border pt-6">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center justify-between text-sm">
                    <span>{p}</span>
                    <span aria-hidden className="text-muted-foreground">→</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
