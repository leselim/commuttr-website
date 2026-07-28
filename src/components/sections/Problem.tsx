import { Container } from "@/components/Container"
import { SectionHeading } from "@/components/SectionHeading"
import { Reveal } from "@/components/Reveal"
import { PROBLEMS } from "@/data/content"

export function Problem() {
  return (
    <section id="problem" className="relative py-24 md:py-28">
      <Container>
        <SectionHeading
          index="01"
          eyebrow="The commuter problem"
          title={
            <>
              Public transport still runs on cash and it&rsquo;s costing
              everyone.
            </>
          }
          sub="Millions of South Africans rely on public transport every day, yet the system stays fragmented, cash-dependent and disconnected, creating security risks and an inconsistent experience."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {PROBLEMS.map((p, i) => {
            const Icon = p.icon
            return (
              <Reveal key={p.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-white/[0.07] bg-carbon p-6 transition-colors duration-300 hover:border-white/15">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-signal/10 text-signal ring-1 ring-signal/20">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
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
