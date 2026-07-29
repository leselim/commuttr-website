import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Minus, Plus } from "lucide-react"

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
  // Radix UI Single Accordion Root value state
  // Initial state is empty string "" (all cards start 100% collapsed on page load)
  const [activeValue, setActiveValue] = React.useState<string>("")

  return (
    <section id="product" className="relative py-24 md:py-28">
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

        <AccordionPrimitive.Root
          type="single"
          collapsible
          value={activeValue}
          onValueChange={setActiveValue}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PRODUCTS.map((p, index) => {
            const Icon = p.icon
            const itemValue = `item-${index}`
            const isOpen = activeValue === itemValue
            const details = EXPANDED_DETAILS[p.title]

            return (
              <Reveal key={p.title} delay={(index % 2) * 90}>
                <AccordionPrimitive.Item
                  value={itemValue}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[#f63d06] bg-[#f63d06] p-7 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                >
                  <AccordionPrimitive.Header asChild>
                    <AccordionPrimitive.Trigger className="w-full text-left outline-none cursor-pointer select-none">
                      <div className="flex items-start justify-between">
                        <span className="flex size-12 items-center justify-center rounded-xl border border-white/30 bg-white/20 text-white">
                          <Icon className="size-6" />
                        </span>
                        <span className="flex size-9 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white transition-all group-hover:bg-white/30">
                          {isOpen ? (
                            <Minus className="size-5 transition-transform duration-200" />
                          ) : (
                            <Plus className="size-5 transition-transform duration-200" />
                          )}
                        </span>
                      </div>

                      <h3 className="mt-6 font-display text-xl font-bold text-white">
                        {p.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-white/90">
                        {p.text}
                      </p>
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>

                  <AccordionPrimitive.Content className="overflow-hidden transition-all duration-300 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    {details && (
                      <div className="mt-4 border-t border-white/25 pt-4 space-y-2 text-sm leading-relaxed text-white">
                        <p className="font-bold text-white text-sm">
                          {details.subtitle}
                        </p>
                        <p className="text-white/90 text-xs leading-relaxed">
                          {details.text}
                        </p>
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
