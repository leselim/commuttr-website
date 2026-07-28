import { Container } from "@/components/Container"
import { SectionHeading } from "@/components/SectionHeading"
import { Reveal } from "@/components/Reveal"
import { STEPS } from "@/data/content"

export function HowItWorks() {
  return (
    <section id="how" className="relative py-24 md:py-28">
      <Container>
        <SectionHeading
          index="04"
          eyebrow="How it works"
          title="Three steps from cash to connected."
          sub="Getting around shouldn't take a wallet full of coins. With Commuttr it takes a phone."
        />

        <div className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {/* connecting rail (desktop) */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent md:block"
          />
          {STEPS.map((s, i) => {
            const Icon = s.icon
            return (
              <Reveal key={s.title} delay={i * 100}>
                <div className="relative flex flex-col items-start">
                  <span className="relative z-10 flex size-12 items-center justify-center rounded-full signal-gradient text-primary-foreground shadow-[0_10px_30px_-12px_rgba(255,69,0,0.8)] ring-4 ring-ink">
                    <Icon className="size-5" />
                  </span>
                  <span className="eyebrow mt-5 text-signal">Step 0{i + 1}</span>
                  <h3 className="mt-2 font-display text-lg font-semibold text-white">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.text}
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
