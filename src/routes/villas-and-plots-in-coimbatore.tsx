import { createFileRoute } from "@tanstack/react-router";
import { SeoPageLayout } from "@/components/landing/SeoPageLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  SITE_URL,
  jsonLd,
  breadcrumbJsonLd,
  servicePageJsonLd,
} from "@/lib/seo";
import p4 from "@/assets/photo/4.png";
import p3 from "@/assets/photo/3.png";
import p8 from "@/assets/photo/8.png";
import p6 from "@/assets/photo/6.png";

const PAGE_URL = SITE_URL + "/villas-and-plots-in-coimbatore";

const PAGE_FAQS: { q: string; a: string }[] = [
  {
    q: "What villa and plot options are available in Coimbatore?",
    a: "We offer ready-to-move villas, verified resale villas, and approved residential and commercial plots across Coimbatore, each with complete documentation.",
  },
  {
    q: "Are the plots DTCP/CMDA-approved?",
    a: "We work with approved layouts and provide clear title documentation for every plot, so you can build with confidence.",
  },
  {
    q: "Can I move in immediately after buying a ready-to-move villa?",
    a: "Yes. Our ready-to-move villas are fully finished and inspected before handover, with all documentation in place so you can move in without delay.",
  },
  {
    q: "What should I check before buying a resale villa?",
    a: "Ownership history, outstanding dues, and fair market valuation matter most. We verify all three before listing any resale villa, so you buy with full transparency.",
  },
];

const description =
  "Ready-to-move villas, verified resale villas, and approved residential & commercial plots in Coimbatore from Sanctus Property OPC Pvt Ltd — with clear title documentation and end-to-end support.";

export const Route = createFileRoute("/villas-and-plots-in-coimbatore")({
  head: () => ({
    meta: [
      { title: "Villas & Plots in Coimbatore | Sanctus Property OPC Pvt Ltd" },
      { name: "description", content: description },
      { property: "og:title", content: "Villas & Plots in Coimbatore | Sanctus Property OPC Pvt Ltd" },
      { property: "og:description", content: description },
      { property: "og:url", content: PAGE_URL },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Inter:wght@300;400;500;600&display=swap",
      },
      { rel: "canonical", href: PAGE_URL },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: jsonLd(
          servicePageJsonLd({
            name: "Villas & Plots in Coimbatore",
            description,
            url: PAGE_URL,
          }),
        ),
      },
      {
        type: "application/ld+json",
        children: jsonLd(
          breadcrumbJsonLd([
            { name: "Home", url: SITE_URL + "/" },
            { name: "Villas & Plots in Coimbatore", url: PAGE_URL },
          ]),
        ),
      },
      {
        type: "application/ld+json",
        children: jsonLd({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: PAGE_FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }),
      },
    ],
  }),
  component: VillasPlotsPage,
});

function VillasPlotsPage() {
  return (
    <SeoPageLayout>
      {/* Hero */}
      <section className="pt-16 pb-8 md:pt-24 md:pb-12 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
          <span className="h-px w-8 bg-[var(--color-gold)]" />
          Coimbatore · Tamil Nadu
        </div>
        <h1 className="font-display text-4xl md:text-6xl leading-[1.05] max-w-3xl mb-6">
          Villas &amp; Plots in <em className="italic text-[var(--color-gold)]">Coimbatore</em>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Whether you want a ready-to-move villa, a verified resale property, or an approved plot to build
          on, Sanctus Property OPC Pvt Ltd offers all three in Coimbatore — with clear documentation and
          honest guidance at every step.
        </p>
      </section>

      {/* What we offer */}
      <section className="py-16 px-6 lg:px-10 max-w-7xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl mb-8">Villas &amp; plots we offer</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-display text-xl mb-2">Ready to Move Villas</h3>
            <p className="text-muted-foreground leading-relaxed">
              Fully finished, quality-checked villas with complete documentation — move in as soon as the
              handover is complete, with no construction wait.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl mb-2">Resale Villas</h3>
            <p className="text-muted-foreground leading-relaxed">
              Verified pre-owned villas with transparent ownership history and fair market valuation, backed
              by end-to-end transfer support.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl mb-2">Residential Plots</h3>
            <p className="text-muted-foreground leading-relaxed">
              Approved residential plots with clear title and site development support, ready for you to
              build the home you've planned.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl mb-2">Commercial Plots</h3>
            <p className="text-muted-foreground leading-relaxed">
              Approved commercial plots in high-visibility Coimbatore locations, with flexible sizes and
              investment-ready titles.
            </p>
          </div>
        </div>
      </section>

      {/* How buying works */}
      <section className="py-16 px-6 lg:px-10 max-w-7xl mx-auto bg-secondary">
        <h2 className="font-display text-3xl md:text-4xl mb-8">How buying works</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { n: "01", t: "Site Visit", d: "We show you villas or plots that match your budget and location preference." },
            { n: "02", t: "Verification", d: "We verify approvals, title and ownership history before you decide." },
            { n: "03", t: "Documentation", d: "Our team prepares and supports every document required." },
            { n: "04", t: "Registration", d: "We guide you through registration to a smooth, worry-free handover." },
          ].map((s) => (
            <div key={s.n}>
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{s.n}</span>
              <h3 className="font-display text-xl mt-2 mb-2">{s.t}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Sanctus */}
      <section className="py-16 px-6 lg:px-10 max-w-7xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl mb-8">Why Sanctus Property</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Approved & verified.</strong> Every plot and villa comes
            with checked title and documentation.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">No middlemen.</strong> As both builder and real estate
            provider, we manage the process directly.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Support after the sale.</strong> Documentation and
            registration support don't stop once you've paid.
          </p>
        </div>
      </section>

      {/* Photo grid */}
      <section className="py-16 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 gap-6">
          <img
            src={p4}
            alt="Ready to move villa with designer elevation in Coimbatore"
            className="w-full h-auto rounded-xl"
          />
          <img
            src={p3}
            alt="Independent villa for sale in Coimbatore"
            className="w-full h-auto rounded-xl"
          />
          <img
            src={p8}
            alt="Multi-storey villa available in Coimbatore"
            className="w-full h-auto rounded-xl"
          />
          <img
            src={p6}
            alt="Compact villa on an approved plot in Coimbatore"
            className="w-full h-auto rounded-xl"
          />
        </div>
      </section>

      {/* Areas we serve */}
      <section className="py-16 px-6 lg:px-10 max-w-7xl mx-auto bg-secondary">
        <h2 className="font-display text-3xl md:text-4xl mb-4">Areas we serve in Coimbatore</h2>
        <p className="text-muted-foreground leading-relaxed max-w-3xl mb-4">
          We offer villas and plots across Coimbatore, including Saravanampatti, Peelamedu, Vadavalli,
          Singanallur, RS Puram, Ganapathy, Kalapatti, Thudiyalur and across Coimbatore district. Prefer to
          build from scratch? See our{" "}
          <a href="/construction-company-in-coimbatore" className="text-[var(--color-gold)] hover:underline">
            construction services
          </a>
          , or explore our full{" "}
          <a href="/real-estate-company-in-coimbatore" className="text-[var(--color-gold)] hover:underline">
            real estate services
          </a>{" "}
          in Coimbatore.
        </p>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 lg:px-10 max-w-7xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl mb-8">Frequently asked questions</h2>
        <div className="max-w-3xl">
          <Accordion type="single" collapsible>
            {PAGE_FAQS.map((faq, i) => (
              <AccordionItem key={faq.q} value={`faq-${i}`}>
                <AccordionTrigger className="font-display text-lg text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </SeoPageLayout>
  );
}
