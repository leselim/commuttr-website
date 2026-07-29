import { Check } from "lucide-react"

import { Container } from "@/components/Container"
import { SectionHeading } from "@/components/SectionHeading"
import { Reveal } from "@/components/Reveal"
import { AUDIENCES } from "@/data/content"

export function Audiences() {
  return (
    <section id="who" className="relative py-24 md:py-28">
      <Container>
        <SectionHeading
          index="06"
          eyebrow="Value proposition"
          title="Built for everyone who moves the city."
          sub="Creating value for commuters, transport operators, and the institutions that support them."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {AUDIENCES.map((a, i) => {
            const Icon = a.icon
            return (
              <Reveal key={a.title} delay={i * 90}>
                <div className="flex h-full flex-col rounded-none border border-[#f63d06] bg-[#f63d06] p-7 text-white shadow-lg transition-transform duration-300 hover:-translate-y-1">
                  <span className="flex size-11 items-center justify-center rounded-none border border-white/30 bg-white/20 text-white">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-white">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/90">
                    {a.text}
                  </p>
                  <ul className="mt-5 space-y-2.5 border-t border-white/20 pt-5">
                    {a.points.map((point) => (
                      <li key={point} className="flex items-center gap-2.5 text-sm font-medium text-white">
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-none bg-white/20 text-white">
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
