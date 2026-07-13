import { FAQS } from "@/lib/seo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  return (
    <section id="faq" className="relative py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
          <span className="h-px w-8 bg-[var(--color-gold)]" />
          FAQs
        </div>
        <h2 className="font-display text-4xl md:text-5xl leading-[1.05] mb-12 max-w-3xl">
          Answers, <em className="italic text-[var(--color-gold)]">up front.</em>
        </h2>

        <div className="max-w-3xl">
          <Accordion type="single" collapsible>
            {FAQS.map((faq, i) => (
              <AccordionItem key={faq.q} value={`faq-${i}`}>
                <AccordionTrigger className="font-display text-lg md:text-xl text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
