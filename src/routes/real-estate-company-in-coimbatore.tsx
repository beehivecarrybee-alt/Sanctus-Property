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
import p3 from "@/assets/photo/3.png";
import p6 from "@/assets/photo/6.png";
import p2 from "@/assets/photo/2.png";

const PAGE_URL = SITE_URL + "/real-estate-company-in-coimbatore";

const PAGE_FAQS: { q: string; a: string }[] = [
  {
    q: "What real estate services does Sanctus Property offer in Coimbatore?",
    a: "We offer approved residential and commercial plots, fully finished ready-to-move villas, and verified resale villas — with complete documentation support at every step.",
  },
  {
    q: "Are your plots and villas legally verified?",
    a: "Yes. We provide clear title and documentation for our plots, and every resale villa comes with verified ownership history before it's listed.",
  },
  {
    q: "Do you help with registration and paperwork?",
    a: "Yes, our team supports you through documentation and registration so the buying process is straightforward, whether it's a plot, a new villa, or a resale property.",
  },
  {
    q: "Can I get a fair valuation for a resale property?",
    a: "Yes. We assess resale villas for fair market value based on location, condition and current Coimbatore market rates before listing them.",
  },
];

const description =
  "Sanctus Property OPC Pvt Ltd is a real estate company in Coimbatore offering approved residential & commercial plots, ready-to-move villas, and verified resale villas with transparent documentation.";

export const Route = createFileRoute("/real-estate-company-in-coimbatore")({
  head: () => ({
    meta: [
      { title: "Real Estate Company in Coimbatore | Sanctus Property OPC Pvt Ltd" },
      { name: "description", content: description },
      { property: "og:title", content: "Real Estate Company in Coimbatore | Sanctus Property OPC Pvt Ltd" },
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
            name: "Real Estate Company in Coimbatore",
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
            { name: "Real Estate Company in Coimbatore", url: PAGE_URL },
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
  component: RealEstatePage,
});

function RealEstatePage() {
  return (
    <SeoPageLayout>
      {/* Hero */}
      <section className="pt-16 pb-8 md:pt-24 md:pb-12 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
          <span className="h-px w-8 bg-[var(--color-gold)]" />
          Coimbatore · Tamil Nadu
        </div>
        <h1 className="font-display text-4xl md:text-6xl leading-[1.05] max-w-3xl mb-6">
          Real Estate Company in <em className="italic text-[var(--color-gold)]">Coimbatore</em>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Sanctus Property OPC Pvt Ltd is a Coimbatore-based real estate company offering approved plots,
          ready-to-move villas and verified resale properties — backed by the same in-house team that
          constructs our buildings, so every property comes with transparent documentation and honest
          valuation.
        </p>
      </section>

      {/* What we offer */}
      <section className="py-16 px-6 lg:px-10 max-w-7xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl mb-8">What we offer</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-display text-xl mb-2">Residential Plots</h3>
            <p className="text-muted-foreground leading-relaxed">
              Approved residential plots in prime Coimbatore locations, with clear title and documentation,
              ready for you to build the home you've always wanted.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl mb-2">Commercial Plots</h3>
            <p className="text-muted-foreground leading-relaxed">
              Strategically located commercial plots suited for retail, office and mixed-use development,
              with flexible sizes and investment-ready titles.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl mb-2">Ready to Move Villas</h3>
            <p className="text-muted-foreground leading-relaxed">
              Fully finished villas, inspected and handover-ready — move in without waiting through a
              construction cycle, with complete documentation provided.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl mb-2">Resale Villas</h3>
            <p className="text-muted-foreground leading-relaxed">
              Verified pre-owned villas with transparent ownership history, fair market valuation and a
              smooth, supported transfer process.
            </p>
          </div>
        </div>
      </section>

      {/* How buying works */}
      <section className="py-16 px-6 lg:px-10 max-w-7xl mx-auto bg-secondary">
        <h2 className="font-display text-3xl md:text-4xl mb-8">How buying works</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { n: "01", t: "Site Visit", d: "We show you available plots or villas matching your budget and requirement." },
            { n: "02", t: "Verification", d: "We verify title, approvals and ownership history before you commit." },
            { n: "03", t: "Documentation", d: "Our team prepares and supports every document you need to proceed." },
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
            <strong className="text-foreground">Verified titles.</strong> Every plot and resale property
            comes with clear, checked documentation before you buy.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Fair valuation.</strong> We assess resale properties
            honestly against current Coimbatore market rates.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">End-to-end support.</strong> From site visit to
            registration, our team is with you at every step.
          </p>
        </div>
      </section>

      {/* Photo grid */}
      <section className="py-16 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-6">
          <img
            src={p3}
            alt="Independent villa available through Sanctus Property in Coimbatore"
            className="w-full h-auto rounded-xl"
          />
          <img
            src={p6}
            alt="Compact modern home for sale in Coimbatore"
            className="w-full h-auto rounded-xl"
          />
          <img
            src={p2}
            alt="Villa handover to homeowner in Coimbatore"
            className="w-full h-auto rounded-xl"
          />
        </div>
      </section>

      {/* Areas we serve */}
      <section className="py-16 px-6 lg:px-10 max-w-7xl mx-auto bg-secondary">
        <h2 className="font-display text-3xl md:text-4xl mb-4">Areas we serve in Coimbatore</h2>
        <p className="text-muted-foreground leading-relaxed max-w-3xl mb-4">
          We take up real estate projects across Coimbatore, including Saravanampatti, Peelamedu,
          Vadavalli, Singanallur, RS Puram, Ganapathy, Kalapatti, Thudiyalur and across Coimbatore district.
          Looking to build instead? See our{" "}
          <a href="/construction-company-in-coimbatore" className="text-[var(--color-gold)] hover:underline">
            construction services
          </a>
          , or browse{" "}
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
