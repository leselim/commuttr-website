import { cn } from "@/lib/utils"
import { Container } from "@/components/Container"
import { SectionHeading } from "@/components/SectionHeading"
import { Reveal } from "@/components/Reveal"
import { PHASES } from "@/data/content"

export function Roadmap() {
  const currentIndex = Math.max(
    0,
    PHASES.findIndex((p) => p.status === "Current focus")
  )

  return (
    <section id="roadmap" className="relative py-16 sm:py-20 md:py-28">
      <Container>
        <SectionHeading
          index="07"
          eyebrow="Methodology & Validation"
          title="A deliberate path to scale."
          sub="We build products that solve real problems, validating assumptions and refining the MVP with purpose before scaling."
        />

        <div className="mt-14">
          {PHASES.map((p, i) => {
            const done = i < currentIndex
            const current = i === currentIndex
            const isLast = i === PHASES.length - 1

            return (
              <Reveal key={p.tag} delay={i * 90}>
                <div className="flex gap-5">
                  {/* Marker + rail. The rail sits in a centred flex column under
                      the marker, so it stays straight however tall a card grows. */}
                  <div className="flex w-10 shrink-0 flex-col items-center">
                    <span
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center text-sm font-bold",
                        done || current
                          ? "bg-[#f63d06] text-white"
                          : "border border-[#f63d06]/35 bg-background text-[#f63d06]/70"
                      )}
                    >
                      {i + 1}
                    </span>
                    {!isLast && (
                      <span
                        aria-hidden
                        className={cn(
                          "w-px flex-1",
                          done ? "bg-[#f63d06]" : "bg-border"
                        )}
                      />
                    )}
                  </div>

                  <div className={cn("min-w-0 flex-1", !isLast && "pb-5")}>
                    <div
                      className={cn(
                        "border p-6 transition-transform duration-300 hover:-translate-y-0.5",
                        current
                          ? "border-[#f63d06] bg-[#f63d06] shadow-lg"
                          : done
                            ? "border-[#f63d06]/50 bg-[#f63d06]/15"
                            : "border-border bg-card"
                      )}
                    >
                      <span
                        className={cn(
                          "flex items-center gap-2 text-xs font-bold uppercase tracking-wider",
                          current ? "text-white/80" : "text-mist"
                        )}
                      >
                        {current && (
                          <span
                            aria-hidden
                            className="size-1.5 animate-pulse bg-white motion-reduce:animate-none"
                          />
                        )}
                        {p.tag}
                      </span>
                      <h3 className={cn("mt-3 font-display text-xl font-bold", current ? "text-white" : "text-foreground")}>
                        {p.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-2 max-w-2xl text-sm leading-relaxed",
                          current ? "text-white/90" : "text-mist"
                        )}
                      >
                        {p.text}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
