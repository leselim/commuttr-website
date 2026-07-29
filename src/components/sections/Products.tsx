import * as React from "react"
import { Minus, Plus } from "lucide-react"

import { Container } from "@/components/Container"
import { SectionHeading } from "@/components/SectionHeading"
import { Reveal } from "@/components/Reveal"
import { PRODUCTS } from "@/data/content"

const EXPANDED_DETAILS: Record<string, { subtitle: string; body: string[] }> = {
  "Intelligent Journey Planning": {
    subtitle: "Bringing every transport option together in one place.",
    body: [
      "Commuttr helps commuters discover the most efficient way to travel by combining taxis, buses and trains into one seamless journey planner. Instead of switching between multiple apps or relying on local knowledge, users receive a complete route recommendation from their starting point to their destination.",
      "The planner intelligently evaluates available transport options, estimates travel times and provides the most practical journey based on real-world transit networks.",
    ],
  },
  "Discover Better Routes": {
    subtitle: "Find smarter ways to travel every day.",
    body: [
      "Instead of showing only one route, Commuttr presents multiple journey options that balance travel time, convenience and affordability. Users can explore alternative routes, compare transfers and choose the option that best suits their schedule.",
      "The platform is designed to reduce uncertainty and make public transport easier to navigate, especially for first-time commuters or those travelling to unfamiliar destinations.",
    ],
  },
  "Compare Transport Options": {
    subtitle: "Choose the journey that works best for you.",
    body: [
      "Every commuter has different priorities. Some want the fastest route, while others want the lowest fare or the fewest transfers.",
      "Commuttr compares available transport options side by side, allowing commuters to evaluate estimated travel time, transport modes, number of transfers and overall journey convenience before making a decision.",
    ],
  },
  "Fare Estimation": {
    subtitle: "Know your travel costs before you leave.",
    body: [
      "Unexpected transport costs can disrupt daily budgets. Commuttr provides estimated fares before a journey begins, helping commuters understand how much they are likely to spend.",
      "As the platform grows, fare estimates will become increasingly accurate across multiple transport operators, giving users greater confidence when planning their daily travel.",
    ],
  },
  "Transit Information": {
    subtitle: "Reliable transport information when you need it most.",
    body: [
      "Commuttr brings together essential transport information into a single experience, helping commuters access station details, service availability and journey updates without searching multiple sources.",
      "The goal is to reduce uncertainty and give commuters greater confidence throughout every stage of their journey.",
    ],
  },
  "Saved Journeys": {
    subtitle: "Your regular trips, always ready.",
    body: [
      "Many commuters travel the same routes every day. Commuttr allows users to save frequently travelled journeys for quick access, making daily planning faster and more convenient.",
      "With saved journeys, commuters can revisit their preferred routes instantly without repeatedly entering the same destinations.",
    ],
  },
}

export function Products() {
  const [expandedId, setExpandedId] = React.useState<string | null>(null)

  const toggleExpand = (title: string) => {
    setExpandedId((prev) => (prev === title ? null : title))
  }

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

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => {
            const Icon = p.icon
            const isExpanded = expandedId === p.title
            const details = EXPANDED_DETAILS[p.title]

            return (
              <Reveal key={p.title} delay={(i % 2) * 90}>
                <div
                  onClick={() => toggleExpand(p.title)}
                  className="group relative flex h-full cursor-pointer select-none flex-col justify-between overflow-hidden rounded-2xl border border-[#f63d06] bg-[#f63d06] p-7 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                >
                  <div>
                    {/* Header with icon & Plus/Minus indicator */}
                    <div className="flex items-start justify-between">
                      <span className="flex size-12 items-center justify-center rounded-xl border border-white/30 bg-white/20 text-white">
                        <Icon className="size-6" />
                      </span>
                      <span
                        aria-label={isExpanded ? "Collapse details" : "Expand details"}
                        className="flex size-9 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white transition-all active:scale-95 group-hover:bg-white/30"
                      >
                        {isExpanded ? (
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

                    {/* Smooth Accordion Content Expansion */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isExpanded
                          ? "grid-rows-[1fr] opacity-100 mt-5 pt-5 border-t border-white/25"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        {details && (
                          <div className="space-y-3 text-sm leading-relaxed text-white">
                            <p className="font-bold text-white text-base">
                              {details.subtitle}
                            </p>
                            {details.body.map((paragraph, idx) => (
                              <p key={idx} className="text-white/90 text-sm leading-relaxed">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
