import { Container } from "@/components/Container"
import { SectionHeading } from "@/components/SectionHeading"
import { Reveal } from "@/components/Reveal"
import { TEAM } from "@/data/content"

export function Team() {
  return (
    <section id="team" className="relative bg-carbon/40 py-24 md:py-28">
      <Container>
        <SectionHeading
          index="08"
          eyebrow="Leadership"
          title="A founding team that ships."
          sub="Strategic business and product leadership paired with deep backend and frontend engineering, creating a foundation for secure, scalable and user centred mobility."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={i * 100}>
              <div className="flex h-full flex-col rounded-2xl border border-white/[0.07] bg-carbon p-7">
                <div className="flex items-center gap-4">
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-surface-2 to-black font-display text-lg font-bold text-white ring-1 ring-white/10">
                    {m.initials}
                  </span>
                  <span
                    aria-hidden
                    className="h-14 w-1 rounded-full signal-gradient"
                  />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">
                  {m.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-signal">{m.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {m.bio}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
