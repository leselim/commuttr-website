import { ArrowRight } from "lucide-react"

import { Container } from "@/components/Container"
import { SectionHeading } from "@/components/SectionHeading"
import { Reveal } from "@/components/Reveal"
import { PARTNERS } from "@/data/content"

export function Ecosystem() {
  return (
    <section id="ecosystem" className="relative py-24 md:py-28">
      <Container>
        <SectionHeading
          index="07"
          eyebrow="Ecosystem partners"
          title="We're building an ecosystem, not just an app."
          sub="Meaningful change in public mobility only happens through collaboration. We're engaging the organisations, institutions and communities that shape everyday transport."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PARTNERS.map((p, i) => {
            const Icon = p.icon
            return (
              <Reveal key={p.title} delay={(i % 3) * 80}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-white/[0.07] bg-carbon p-6 transition-colors duration-300 hover:border-white/15">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-signal/10 text-signal ring-1 ring-signal/20">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-white">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
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
              className="group flex h-full flex-col justify-between rounded-2xl border border-signal/30 bg-signal/[0.06] p-6 transition-colors hover:bg-signal/[0.1]"
            >
              <h3 className="font-display text-base font-semibold text-white">
                Become a partner
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Help shape, validate and strengthen connected public mobility
                across South Africa.
              </p>
              <span className="mt-5 flex items-center gap-2 text-sm font-semibold text-signal-glow">
                Start a conversation
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
