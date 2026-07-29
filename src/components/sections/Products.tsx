import * as React from "react"
import { Minus, Plus } from "lucide-react"

import { Container } from "@/components/Container"
import { SectionHeading } from "@/components/SectionHeading"
import { Reveal } from "@/components/Reveal"
import { PRODUCTS } from "@/data/content"

const EXPANDED_DETAILS: Record<string, { subtitle: string; points: string[] }> = {
  "Route Discovery & Planning": {
    subtitle: "Complete itinerary intelligence before you travel:",
    points: [
      "Full station itineraries for MyCiTi, Metrorail & taxi ranks",
      "Precise walking distance & transit connection guidance",
      "Per-leg estimated fare calculations across all travel modes",
    ],
  },
  "Multi-Modal Option Comparison": {
    subtitle: "Compare travel trade-offs at a single glance:",
    points: [
      "Fastest vs. most economical route rankings",
      "Transfer time & interchange risk indicators",
      "Customizable modal filters for bus, train & taxi preference",
    ],
  },
  "Real-Time Transit Timetables": {
    subtitle: "Live station board data directly on your phone:",
    points: [
      "Real-time countdown timetables for major urban stations",
      "Platform & boarding bay location assignments",
      "Live vehicle occupancy & seat availability estimates",
    ],
  },
  "Step-by-Step Trip Navigation": {
    subtitle: "Guided turn-by-turn journey execution:",
    points: [
      "Live step progress tracking with upcoming stop alerts",
      "Station transfer guidance at major transit hubs",
      "Dynamic estimated arrival time (ETA) countdowns",
    ],
  },
  "Multi-Modal Transport Coverage": {
    subtitle: "Comprehensive South African mobility integration:",
    points: [
      "MyCiTi BRT express & feeder route network",
      "Metrorail passenger line timetable schedules",
      "Minibus taxi rank locations & primary feeder corridors",
    ],
  },
  "Commuter Insights & Guidance": {
    subtitle: "Proactive travel alerts & route confidence:",
    points: [
      "Real-time network delay & service alert notifications",
      "Automatic alternative route rerouting suggestions",
      "Peak-hour commuting pattern & travel time insights",
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
                  className="group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-[#f63d06] bg-[#f63d06] p-7 text-white shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <div>
                    {/* Header with single Plus / Minus toggle icon */}
                    <div className="flex items-start justify-between">
                      <span className="flex size-12 items-center justify-center rounded-xl border border-white/30 bg-white/20 text-white">
                        <Icon className="size-6" />
                      </span>
                      <span
                        aria-label={isExpanded ? "Collapse details" : "Expand details"}
                        className="flex size-9 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white transition-transform active:scale-90 group-hover:bg-white/30"
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

                    {/* Smooth Accordion Content */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isExpanded ? "grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-white/20" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        {details && (
                          <div className="space-y-2 text-xs leading-relaxed text-white/95">
                            <p className="font-bold text-white uppercase tracking-wider text-[10px]">
                              {details.subtitle}
                            </p>
                            <ul className="space-y-1.5 pt-1">
                              {details.points.map((pt) => (
                                <li key={pt} className="flex items-start gap-1.5">
                                  <span className="mt-1 size-1 shrink-0 rounded-full bg-white" />
                                  <span>{pt}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Clean bottom text indicator without duplicate plus icon */}
                  <div className="mt-6 flex items-center text-xs font-bold uppercase tracking-wider text-white/80 group-hover:text-white">
                    <span>{isExpanded ? "Show Less" : "Click to Explore Feature Details"}</span>
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
