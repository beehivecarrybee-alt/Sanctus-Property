import ecLogo from "@/assets/logofor E and C_.png";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-11 w-11 rounded-full overflow-hidden border border-[var(--color-gold)]/30 shadow-sm">
              <img src={ecLogo} alt="E & C" className="h-full w-full object-cover" />
            </div>
            <div>
              <div className="font-display text-lg">Sanctus Property</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Real Estate · Property</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Designing and delivering landmark properties since 2026.
          </p>
        </div>
        <div className="md:col-span-2">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Studio</div>
          <ul className="space-y-2 text-sm">
            <li>About</li><li>Team</li><li>Press</li><li>Careers</li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Work</div>
          <ul className="space-y-2 text-sm">
            <li>Residential</li><li>Commercial</li><li>Construction</li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Contact</div>
          <p className="text-sm leading-relaxed">
            Coimbatore,<br />Tamil Nadu, India<br />
            <a href="tel:+917845840069" className="hover:text-[var(--color-gold)] transition-colors">+91 78458 40069</a><br />
            <a href="mailto:sanctuspropertyopc@gmail.com" className="hover:text-[var(--color-gold)] transition-colors">sanctuspropertyopc@gmail.com</a>
          </p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Sanctus Property OPC Pvt Ltd. All rights reserved.</span>
          <span>Crafted with care in Sanctus Property.</span>
        </div>
      </div>
    </footer>
  );
}
