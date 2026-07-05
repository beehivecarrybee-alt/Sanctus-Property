export function CTASection() {
  return (
    <section id="contact" className="relative py-16 md:py-24 bg-ink text-background overflow-hidden" style={{ backgroundColor: "oklch(0.16 0.008 80)", color: "oklch(0.985 0.008 85)" }}>
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{ background: "radial-gradient(60% 50% at 80% 20%, oklch(0.72 0.13 70 / 0.4), transparent 70%)" }} />
      <div className="mx-auto max-w-7xl px-6 lg:px-10 relative">
        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/50 mb-8">
              <span className="h-px w-8 bg-[var(--color-gold)]" />
              Let's build
            </div>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">
              Have a site,<br />
              a brief, or just<br />
              <em className="italic text-[var(--color-gold)]">an idea?</em>
            </h2>
          </div>
          <div className="md:col-span-5 space-y-6">
            <p className="text-white/70 leading-relaxed">
              Most great properties start with a 30-minute conversation. Sanctus Property will
              guide you honestly from concept through to keys.
            </p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
              <a href="mailto:sanctuspropertyopc@gmail.com" className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-gold)] text-ink px-7 py-4 text-sm hover:bg-background hover:text-ink transition-colors whitespace-nowrap">
                sanctuspropertyopc@gmail.com →
              </a>
              <a href="tel:+917845840069" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm hover:bg-white/10 transition-colors whitespace-nowrap">
                +91 78458 40069
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
