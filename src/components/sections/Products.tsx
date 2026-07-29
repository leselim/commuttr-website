import { ArrowUpRight } from "lucide-react"

import { Container } from "@/components/Container"
import { SectionHeading } from "@/components/SectionHeading"
import { Reveal } from "@/components/Reveal"
import { PRODUCTS } from "@/data/content"

export function Products() {
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
            return (
              <Reveal key={p.title} delay={(i % 2) * 90}>
                <div className="group relative h-full overflow-hidden rounded-none border border-[#f63d06] bg-[#f63d06] p-7 text-white shadow-lg transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex items-start justify-between">
                    <span className="flex size-12 items-center justify-center rounded-none border border-white/30 bg-white/20 text-white">
                      <Icon className="size-6" />
                    </span>
                    <ArrowUpRight className="size-5 text-white/80 transition-all duration-300 group-hover:scale-110 group-hover:text-white" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/90">
                    {p.text}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
