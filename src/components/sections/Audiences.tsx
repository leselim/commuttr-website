import { Check } from "lucide-react"

import { Container } from "@/components/Container"
import { SectionHeading } from "@/components/SectionHeading"
import { Reveal } from "@/components/Reveal"
import { AUDIENCES } from "@/data/content"

export function Audiences() {
  return (
    <section id="who" className="relative bg-carbon/40 py-24 md:py-28">
      <Container>
        <SectionHeading
          index="05"
          eyebrow="Value proposition"
          title="Built for everyone who moves the city."
          sub="One connected ecosystem creating value for commuters, transport operators and the businesses that support them."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {AUDIENCES.map((a, i) => {
            const Icon = a.icon
            return (
              <Reveal key={a.title} delay={i * 90}>
                <div className="flex h-full flex-col rounded-2xl border border-white/[0.07] bg-carbon p-7">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-signal/10 text-signal ring-1 ring-signal/20">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-white">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {a.text}
                  </p>
                  <ul className="mt-5 space-y-2.5 border-t border-white/[0.07] pt-5">
                    {a.points.map((point) => (
                      <li key={point} className="flex items-center gap-2.5 text-sm text-white/90">
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-signal/15 text-signal">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
