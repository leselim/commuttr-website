import { HeartHandshake, Trophy } from "lucide-react"

import { Container } from "@/components/Container"
import { Reveal } from "@/components/Reveal"
import { AWARDS } from "@/data/content"

export function Recognition() {
  return (
    <section className="relative py-8 md:py-12">
      <Container>
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-carbon p-8 md:p-10">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
              <div>
                <span className="eyebrow text-signal">Recognition</span>
                <h3 className="display mt-4 text-2xl font-bold text-white md:text-3xl">
                  Award-winning founder leadership.
                </h3>
                <div className="mt-6 space-y-3">
                  {AWARDS.map((a) => (
                    <div
                      key={a.title}
                      className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"
                    >
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-signal/12 text-signal">
                        <Trophy className="size-5" />
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">
                          {a.title}
                        </p>
                        <p className="text-xs text-mist">{a.org}</p>
                      </div>
                      <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-xs text-mist">
                        {a.year}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-gradient-to-br from-signal/[0.08] to-transparent p-6 ring-1 ring-signal/15">
                <HeartHandshake className="size-8 text-signal" />
                <h4 className="mt-4 font-display text-lg font-semibold text-white">
                  Impact-driven by design
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Commuttr exists to expand access to secure financial services,
                  reduce reliance on cash, and support financial inclusion, 
                  towards safer communities and a more accessible digital economy
                  for all.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
