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
                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-carbon p-7 transition-colors duration-300 hover:border-[#f63d06]/50">
                  <div className="flex items-start justify-between">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-[#f63d06] text-white">
                      <Icon className="size-6" />
                    </span>
                    <ArrowUpRight className="size-5 text-mist transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-[#f63d06]" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
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
