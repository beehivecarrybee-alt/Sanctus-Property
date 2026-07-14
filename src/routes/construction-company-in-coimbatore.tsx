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
import p5 from "@/assets/photo/5.png";
import p4 from "@/assets/photo/4.png";
import p1 from "@/assets/photo/1.png";
import p10 from "@/assets/photo/10.png";

const PAGE_URL = SITE_URL + "/construction-company-in-coimbatore";

const PAGE_FAQS: { q: string; a: string }[] = [
  {
    q: "How much does house construction cost in Coimbatore?",
    a: "Construction cost depends on your plot size, floor plan, and the finishes you choose. We offer a free consultation and site visit, then provide a fixed-price quote so there are no surprises once work begins.",
  },
  {
    q: "Do you handle both residential and commercial construction?",
    a: "Yes. We build custom homes, apartments and villas as well as offices, retail and commercial spaces — with in-house architects, engineers and project teams handling every stage.",
  },
  {
    q: "Can I visit ongoing construction sites before hiring you?",
    a: "Yes, we're happy to arrange a visit to a current or completed project so you can see our workmanship and quality standards firsthand.",
  },
  {
    q: "Do you also handle electrical and plumbing work?",
    a: "Yes. Our in-house electrical and plumbing teams handle wiring, panel work, and plumbing fit-out for both residential and commercial projects, so you don't need to coordinate separate contractors.",
  },
];

const description =
  "Sanctus Property OPC Pvt Ltd is a construction company in Coimbatore offering residential & commercial construction, and electrical & plumbing services with in-house teams and transparent, fixed-price delivery.";

export const Route = createFileRoute("/construction-company-in-coimbatore")({
  head: () => ({
    meta: [
      { title: "Construction Company in Coimbatore | Sanctus Property OPC Pvt Ltd" },
      { name: "description", content: description },
      { property: "og:title", content: "Construction Company in Coimbatore | Sanctus Property OPC Pvt Ltd" },
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
            name: "Construction Company in Coimbatore",
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
            { name: "Construction Company in Coimbatore", url: PAGE_URL },
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
  component: ConstructionPage,
});

function ConstructionPage() {
  return (
    <SeoPageLayout>
      {/* Hero */}
      <section className="pt-16 pb-8 md:pt-24 md:pb-12 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
          <span className="h-px w-8 bg-[var(--color-gold)]" />
          Coimbatore · Tamil Nadu
        </div>
        <h1 className="font-display text-4xl md:text-6xl leading-[1.05] max-w-3xl mb-6">
          Construction Company in <em className="italic text-[var(--color-gold)]">Coimbatore</em>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Sanctus Property OPC Pvt Ltd is a Coimbatore-based construction company delivering residential
          and commercial buildings from foundation to finishing detail. With in-house architects, engineers
          and project teams, we take full responsibility for the build — no subcontracted middlemen, no
          translation loss between drawing and site.
        </p>
      </section>

      {/* What we build */}
      <section className="py-16 px-6 lg:px-10 max-w-7xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl mb-8">What we build</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-display text-xl mb-2">Residential Construction</h3>
            <p className="text-muted-foreground leading-relaxed">
              Custom homes, independent houses and boutique apartment buildings, designed and built around
              how people actually live in Coimbatore's climate and neighbourhoods.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl mb-2">Commercial Construction</h3>
            <p className="text-muted-foreground leading-relaxed">
              Offices, retail units and commercial spaces engineered for performance and longevity, delivered
              on the schedule your business depends on.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl mb-2">Electrical & Plumbing</h3>
            <p className="text-muted-foreground leading-relaxed">
              In-house electrical and plumbing teams handle wiring, panel work and plumbing fit-out for both
              residential and commercial projects — one point of contact, start to finish.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl mb-2">Renovation & Retrofit</h3>
            <p className="text-muted-foreground leading-relaxed">
              Structural additions, interior renovation and retrofit work for existing homes and commercial
              properties across Coimbatore.
            </p>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="py-16 px-6 lg:px-10 max-w-7xl mx-auto bg-secondary">
        <h2 className="font-display text-3xl md:text-4xl mb-8">How we work</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { n: "01", t: "Consultation", d: "We discuss your requirement, budget and timeline, and visit your site." },
            { n: "02", t: "Design & Approvals", d: "Our architects prepare drawings and handle the necessary approvals." },
            { n: "03", t: "Construction", d: "Our own crews execute the build with milestone-based quality checks." },
            { n: "04", t: "Handover", d: "You receive a finished, inspected property with complete documentation." },
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
            <strong className="text-foreground">In-house from day one.</strong> Architects, engineers and
            project managers under the same roof — no middlemen, no translation loss.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Transparent, fixed-price contracts.</strong> You know the
            cost upfront, with milestone transparency throughout the build.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">On time delivery.</strong> Our own crews and project
            management keep builds on schedule, from foundation to keys.
          </p>
        </div>
      </section>

      {/* Photo grid */}
      <section className="py-16 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 gap-6">
          <img
            src={p5}
            alt="Three-storey residential construction project in Coimbatore by Sanctus Property"
            className="w-full h-auto rounded-xl"
          />
          <img
            src={p4}
            alt="Completed designer-elevation villa construction in Coimbatore"
            className="w-full h-auto rounded-xl"
          />
          <img
            src={p1}
            alt="Commercial interior fit-out construction in Coimbatore"
            className="w-full h-auto rounded-xl"
          />
          <img
            src={p10}
            alt="Completed community building construction in Coimbatore"
            className="w-full h-auto rounded-xl"
          />
        </div>
      </section>

      {/* Areas we serve */}
      <section className="py-16 px-6 lg:px-10 max-w-7xl mx-auto bg-secondary">
        <h2 className="font-display text-3xl md:text-4xl mb-4">Areas we serve in Coimbatore</h2>
        <p className="text-muted-foreground leading-relaxed max-w-3xl mb-4">
          We take up construction projects across Coimbatore, including Saravanampatti, Peelamedu,
          Vadavalli, Singanallur, RS Puram, Ganapathy, Kalapatti, Thudiyalur and across Coimbatore district.
          See our{" "}
          <a href="/#projects" className="text-[var(--color-gold)] hover:underline">
            completed portfolio
          </a>
          , or explore our{" "}
          <a href="/real-estate-company-in-coimbatore" className="text-[var(--color-gold)] hover:underline">
            real estate services
          </a>{" "}
          and{" "}
          <a href="/villas-and-plots-in-coimbatore" className="text-[var(--color-gold)] hover:underline">
            villas & plots
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
