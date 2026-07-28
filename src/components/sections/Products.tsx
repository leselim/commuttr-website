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
          eyebrow="Our services & products"
          title="One platform for the whole journey."
          sub="Delivered in phases starting with an MVP that validates the core, then expanding into a broader mobility ecosystem."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {PRODUCTS.map((p, i) => {
            const Icon = p.icon
            return (
              <Reveal key={p.title} delay={(i % 2) * 90}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-carbon p-7 transition-colors duration-300 hover:border-signal/40">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-signal/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="flex items-start justify-between">
                    <span className="flex size-12 items-center justify-center rounded-xl signal-gradient text-primary-foreground shadow-[0_10px_30px_-12px_rgba(255,69,0,0.8)]">
                      <Icon className="size-6" />
                    </span>
                    <ArrowUpRight className="size-5 text-mist transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-signal" />
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
