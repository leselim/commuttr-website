import { cn } from "@/lib/utils"
import { Container } from "@/components/Container"
import { SectionHeading } from "@/components/SectionHeading"
import { Reveal } from "@/components/Reveal"
import { Badge } from "@/components/ui/badge"
import { PHASES } from "@/data/content"

export function Roadmap() {
  return (
    <section id="roadmap" className="relative py-24 md:py-28">
      <Container>
        <SectionHeading
          index="06"
          eyebrow="Methodology & validation"
          title="A deliberate path to scale."
          sub="We build products that solve real problems validating assumptions and refining the MVP with purpose before scaling."
        />

        <div className="relative mt-14 pl-2">
          {/* vertical rail */}
          <div
            aria-hidden
            className="absolute bottom-4 left-[19px] top-4 w-px bg-gradient-to-b from-signal/50 via-white/12 to-transparent"
          />
          <div className="space-y-5">
            {PHASES.map((p, i) => {
              const current = p.status === "Current focus"
              return (
                <Reveal key={p.tag} delay={i * 90}>
                  <div className="relative pl-14">
                    <span
                      className={cn(
                        "absolute left-0 top-1 flex size-10 items-center justify-center rounded-full font-mono text-sm font-bold ring-4 ring-ink",
                        current
                          ? "signal-gradient text-primary-foreground shadow-[0_8px_24px_-8px_rgba(255,69,0,0.8)]"
                          : "border border-white/12 bg-surface text-mist"
                      )}
                    >
                      {i + 1}
                    </span>
                    <div
                      className={cn(
                        "rounded-2xl border p-6 transition-colors",
                        current
                          ? "border-signal/30 bg-signal/[0.05]"
                          : "border-white/[0.07] bg-carbon"
                      )}
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="eyebrow text-mist">{p.tag}</span>
                        <Badge variant={current ? "signal" : "outline"}>
                          {p.status}
                        </Badge>
                      </div>
                      <h3 className="mt-3 font-display text-xl font-semibold text-white">
                        {p.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                        {p.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
