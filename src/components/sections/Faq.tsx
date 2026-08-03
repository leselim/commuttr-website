import { Container } from "@/components/Container"
import { SectionHeading } from "@/components/SectionHeading"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CONTACT, FAQS } from "@/data/content"

export function Faq() {
  return (
    <section id="faq" className="relative py-16 sm:py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              index="09"
              eyebrow="Frequently Asked Questions"
              title={
                <>
                  Questions,
                  <br />
                  answered.
                </>
              }
            />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Still curious? Write to us at{" "}
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-signal underline-offset-4 hover:underline"
              >
                {CONTACT.email}
              </a>
              .
            </p>
          </div>

          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  )
}
