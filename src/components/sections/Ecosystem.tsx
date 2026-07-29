import { ArrowRight, Compass } from "lucide-react"

import { Container } from "@/components/Container"
import { SectionHeading } from "@/components/SectionHeading"
import { Reveal } from "@/components/Reveal"
import { PARTNERS } from "@/data/content"

export function Ecosystem() {
  return (
    <section id="ecosystem" className="relative border-t border-white/[0.06] py-24 md:py-28">
      <Container>
        {/* Vision Header */}
        <SectionHeading
          index="07"
          eyebrow="Building the Future of Connected Mobility"
          title="Every great journey begins with knowing the best way to travel."
          sub="Commuttr is starting with intelligent journey planning today. As we grow, we'll continue building solutions that make public transport simpler, smarter and more connected."
        />

        {/* Vision Card */}
        <Reveal delay={100} className="mt-12">
          <div className="relative overflow-hidden rounded-none border border-[#f63d06] bg-[#f63d06] p-6 text-white shadow-xl md:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-none border border-white/30 bg-white/20 text-white">
                <Compass className="size-6" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-white/80">
                  Our Vision
                </p>
                <p className="mt-1 font-display text-base font-semibold leading-relaxed text-white md:text-lg">
                  &ldquo;Commuttr is starting with intelligent journey planning, with a long-term vision of building a more connected digital mobility experience for South Africa.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Partners Section */}
        <div className="mt-16">
          <h3 className="text-xl font-bold text-white">Mobility & Ecosystem Partners</h3>
          <p className="mt-1 text-sm text-muted-foreground">Collaborating with operators, institutions, and communities to shape connected transit.</p>
          
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {PARTNERS.map((p, i) => {
              const Icon = p.icon
              return (
                <Reveal key={p.title} delay={(i % 3) * 80}>
                  <div className="flex h-full flex-col justify-between rounded-none border border-[#f63d06] bg-[#f63d06] p-6 text-white shadow-lg transition-transform duration-300 hover:-translate-y-1">
                    <div>
                      <span className="flex size-11 items-center justify-center rounded-none border border-white/30 bg-white/20 text-white">
                        <Icon className="size-5" />
                      </span>
                      <h4 className="mt-5 font-display text-base font-bold text-white">
                        {p.title}
                      </h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/90">
                        {p.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              )
            })}

            {/* CTA tile */}
            <Reveal delay={160}>
              <a
                href="#contact"
                className="group flex h-full flex-col justify-between rounded-none border-2 border-white bg-white p-6 text-[#f63d06] shadow-xl transition-transform duration-300 hover:-translate-y-1"
              >
                <div>
                  <h4 className="font-display text-base font-bold text-black">
                    Become a partner
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                    Support smarter travel planning and connected public mobility across South Africa.
                  </p>
                </div>
                <span className="mt-5 flex items-center gap-2 text-sm font-bold text-[#f63d06]">
                  Start a conversation
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
