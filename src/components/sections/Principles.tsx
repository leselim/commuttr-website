import { Compass, Search, Target, Users } from "lucide-react"

import { Container } from "@/components/Container"
import { SectionHeading } from "@/components/SectionHeading"
import { Reveal } from "@/components/Reveal"

const PRINCIPLES = [
  {
    icon: Target,
    title: "Purpose Before Features",
    text: "We focus on solving meaningful commuter problems instead of building features for the sake of innovation.",
  },
  {
    icon: Search,
    title: "Research-Led Decisions",
    text: "Every product decision is informed by research, validation and real-world commuter insights.",
  },
  {
    icon: Compass,
    title: "Focus Before Scale",
    text: "We're intentionally building one exceptional product before expanding into a broader mobility ecosystem.",
  },
  {
    icon: Users,
    title: "Built Through Collaboration",
    text: "We believe better public transport experiences are created by working alongside commuters, transport operators and strategic partners.",
  },
]

export function Principles() {
  return (
    <section id="principles" className="relative border-t border-white/[0.06] py-24 md:py-28">
      <Container>
        <SectionHeading
          index="05"
          eyebrow="Our Principles"
          title="How we build Commuttr."
          sub="Great mobility products aren't built by adding more features. They're built by deeply understanding the people who use them. At Commuttr, every decision we make is guided by research, validation and a commitment to solving real commuter challenges."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => {
            const Icon = p.icon
            return (
              <Reveal key={p.title} delay={i * 80}>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-[#f63d06] bg-[#f63d06] p-6 text-white shadow-lg transition-transform duration-300 hover:-translate-y-1">
                  <div>
                    <span className="flex size-11 items-center justify-center rounded-xl border border-white/30 bg-white/20 text-white">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-bold text-white">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/90">
                      {p.text}
                    </p>
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
