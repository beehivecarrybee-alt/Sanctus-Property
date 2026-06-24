import ecLogo from "@/assets/logofor E and C_.jpg";
import { useEffect, useState } from "react";
import { EnquiryDialog } from "./EnquiryDialog";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-50"
        style={{
          backgroundColor: scrolled ? "color-mix(in oklab, var(--color-background) 88%, transparent)" : "transparent",
          backdropFilter: scrolled ? "blur(14px) saturate(120%)" : "none",
          borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
          transition: "all 300ms ease",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="h-11 w-11 rounded-full overflow-hidden border border-[var(--color-gold)]/30 shadow-sm">
              <img src={ecLogo} alt="Sanctus Property" className="h-full w-full object-cover" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg tracking-tight">Sanctus Property</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground select-none">Real Estate · Property</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-foreground/80 hover:text-foreground transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[var(--color-gold)] after:transition-all hover:after:w-full"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop — Enquiry button */}
          <button
            onClick={() => setDialogOpen(true)}
            className="hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm bg-foreground text-background hover:bg-[var(--color-gold)] hover:text-ink transition-colors"
          >
            Enquiry
            <span aria-hidden>→</span>
          </button>

          {/* Mobile hamburger */}
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <span className="block h-px w-6 bg-foreground" />
            <span className="block h-px w-6 bg-foreground" />
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
            <div className="px-6 py-6 flex flex-col gap-5">
              {LINKS.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-base">
                  {l.label}
                </a>
              ))}
              {/* Mobile — Enquiry button */}
              <button
                onClick={() => { setOpen(false); setDialogOpen(true); }}
                className="mt-2 rounded-full bg-foreground text-background py-3 text-center text-sm"
              >
                Enquiry →
              </button>
            </div>
          </div>
        )}
      </header>

      <EnquiryDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}
