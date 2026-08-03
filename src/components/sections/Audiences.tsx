import { Check } from "lucide-react"

import { Container } from "@/components/Container"
import { SectionHeading } from "@/components/SectionHeading"
import { Reveal } from "@/components/Reveal"
import { AUDIENCES } from "@/data/content"

export function Audiences() {
  return (
    <section id="who" className="relative py-16 sm:py-20 md:py-28">
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
                  <span className="flex size-11 items-center justify-center rounded-none bg-white text-[#f63d06]">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-white">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/90">
                    {a.text}
                  </p>
                  {/* Absorbs uneven intro-copy heights so every card's rule and
                      bullet list start on the same line across the row. */}
                  <div aria-hidden className="flex-1" />
                  <ul className="mt-5 space-y-2.5 border-t border-white/20 pt-5">
                    {a.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm font-medium leading-5 text-white">
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-none bg-white/20 text-white">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        <span className="min-w-0 flex-1">{point}</span>
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
