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
          eyebrow="Methodology & Validation"
          title="A deliberate path to scale."
          sub="We build products that solve real problems, validating assumptions and refining the MVP with purpose before scaling."
        />

        <div className="relative mt-14 pl-2">
          {/* vertical rail */}
          <div
            aria-hidden
            className="absolute bottom-4 left-[19px] top-4 w-px bg-[#f63d06]/40"
          />
          <div className="space-y-5">
            {PHASES.map((p, i) => {
              const current = p.status === "Current focus"
              return (
                <Reveal key={p.tag} delay={i * 90}>
                  <div className="relative pl-14">
                    <span
                      className={cn(
                        "absolute left-0 top-1 flex size-10 items-center justify-center rounded-full text-sm font-bold shadow-md ring-4 ring-ink",
                        current
                          ? "bg-[#f63d06] text-white"
                          : "border border-white/20 bg-white/20 text-white"
                      )}
                    >
                      {i + 1}
                    </span>
                    <div
                      className={cn(
                        "rounded-2xl border p-6 text-white shadow-lg transition-transform duration-300 hover:-translate-y-0.5",
                        current
                          ? "border-[#f63d06] bg-[#f63d06]"
                          : "border-[#f63d06]/80 bg-[#f63d06]/90"
                      )}
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-white/80">{p.tag}</span>
                        <Badge variant="outline" className="border-white/30 bg-white/20 text-white font-bold">
                          {p.status}
                        </Badge>
                      </div>
                      <h3 className="mt-3 font-display text-xl font-bold text-white">
                        {p.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/90">
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
