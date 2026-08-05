import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Plus } from "lucide-react"

import { Container } from "@/components/Container"
import { SectionHeading } from "@/components/SectionHeading"
import { Reveal } from "@/components/Reveal"
import { PRODUCTS } from "@/data/content"

const EXPANDED_DETAILS: Record<string, { subtitle: string; text: string }> = {
  "Intelligent Journey Planning": {
    subtitle: "Bringing every transport option together in one place.",
    text: "Commuttr combines minibus taxis, buses, and trains into a unified journey planner. Users receive optimal end-to-end route recommendations from origin to destination without switching between multiple apps.",
  },
  "Discover Better Routes": {
    subtitle: "Find smarter ways to travel every day.",
    text: "Explore multiple route alternatives that balance travel time, convenience, and affordability. Commuttr simplifies public transit, helping both daily commuters and first-time travelers move with total confidence.",
  },
  "Compare Transport Options": {
    subtitle: "Choose the journey that works best for you.",
    text: "Compare travel times, transit modes, and transfer requirements side-by-side. Whether speed, cost, or convenience matters most, evaluate all options before departing.",
  },
  "Fare Estimation": {
    subtitle: "Know your travel costs before you leave.",
    text: "Access upfront estimated fares across transport operators before starting your trip. Plan your daily travel budget effortlessly and avoid unexpected transport expenses.",
  },
  "Transit Information": {
    subtitle: "Reliable transport information when you need it most.",
    text: "Access essential schedules, station details, and route updates in a single unified view. Eliminate transit uncertainty with clear, centralized information.",
  },
  "Saved Journeys": {
    subtitle: "Your regular trips, always ready.",
    text: "Save your daily commute and frequent routes for instant access. Revisit preferred travel options with a single tap, eliminating repetitive destination lookups.",
  },
}

export function Products() {
  return (
    <section id="product" className="relative py-16 sm:py-20 md:py-28">
      {/* soft top divider glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
      <Container>
        <SectionHeading
          index="02"
          eyebrow="What We're Building Today"
          title="Intelligent journey planning for South Africa."
          sub="Our current focus is building an intuitive MVP that helps commuters discover routes, compare transport options, and estimate travel costs."
        />

        {/* Traditional stacked accordion. Radix `single` + `collapsible` gives
            single-open behaviour natively — no external state to keep in sync. */}
        <AccordionPrimitive.Root
          type="single"
          collapsible
          className="mt-14 border-t border-white/10"
        >
          {PRODUCTS.map((p, index) => {
            const Icon = p.icon
            const details = EXPANDED_DETAILS[p.title]

            return (
              <Reveal key={p.title} delay={Math.min(index, 3) * 70}>
                <AccordionPrimitive.Item
                  value={`item-${index}`}
                  className="border-b border-white/10 transition-colors data-[state=open]:bg-white/[0.02]"
                >
                  <AccordionPrimitive.Header asChild>
                    <h3>
                      <AccordionPrimitive.Trigger className="group flex w-full cursor-pointer select-none items-center gap-4 py-5 text-left outline-none sm:gap-5 sm:py-6">
                        <span className="flex size-11 shrink-0 items-center justify-center border border-white/[0.08] bg-white/[0.04] text-[#f63d06] transition-colors group-hover:border-[#f63d06]/40 group-data-[state=open]:border-[#f63d06] group-data-[state=open]:bg-[#f63d06] group-data-[state=open]:text-white">
                          <Icon className="size-5" />
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="block font-display text-base font-bold text-white transition-colors group-hover:text-signal sm:text-lg">
                            {p.title}
                          </span>
                          <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                            {p.text}
                          </span>
                        </span>

                        <Plus className="size-5 shrink-0 text-mist transition-transform duration-200 group-hover:text-signal group-data-[state=open]:rotate-45" />
                      </AccordionPrimitive.Trigger>
                    </h3>
                  </AccordionPrimitive.Header>

                  <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    {details && (
                      <div className="pb-6 sm:pl-16">
                        <div className="border-l-2 border-[#f63d06] pl-4">
                          <p className="font-display text-sm font-bold text-white">
                            {details.subtitle}
                          </p>
                          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                            {details.text}
                          </p>
                        </div>
                      </div>
                    )}
                  </AccordionPrimitive.Content>
                </AccordionPrimitive.Item>
              </Reveal>
            )
          })}
        </AccordionPrimitive.Root>
      </Container>
    </section>
  )
}
