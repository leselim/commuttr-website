import type { ReactNode } from "react"
import { ArrowRight, BadgeCheck, MapPin, Navigation } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PhoneMockup } from "@/components/app/PhoneMockup"
import { JourneyScreen } from "@/components/app/screens"

function FloatingChip({
  className,
  icon,
  title,
  sub,
}: {
  className?: string
  icon: ReactNode
  title: string
  sub: string
}) {
  return (
    <div
      className={`absolute hidden items-center gap-2.5 whitespace-nowrap rounded-2xl border border-white/10 bg-carbon/90 px-3.5 py-2.5 shadow-2xl backdrop-blur-md xl:flex ${className ?? ""}`}
    >
      <span className="flex size-8 items-center justify-center rounded-full bg-signal/12 text-signal">
        {icon}
      </span>
      <div className="leading-tight">
        <p className="text-xs font-semibold text-white">{title}</p>
        <p className="text-[10px] text-mist">{sub}</p>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
      {/* Background grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-mesh opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-6 md:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Copy */}
        <div className="max-w-xl">
          <h1 className="display text-[2.6rem] font-bold leading-[1.03] text-white sm:text-6xl">
            Journey planning built for{" "}
            <span className="text-[#f63d06]">South African</span> commuters.
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Commuttr helps commuters discover routes, compare transport options, estimate
            fares, and navigate public transport with confidence. We&rsquo;re starting with
            intelligent journey planning, with a long-term vision of building a more
            connected digital mobility experience for South Africa.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <a href="#contact">
                Join the Waitlist <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#how">See How It Works</a>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-mist">
            <span className="flex items-center gap-2">
              <BadgeCheck className="size-4 text-[#f63d06]" /> Intelligent Journey Planning MVP
            </span>
            <span className="flex items-center gap-2">
              <BadgeCheck className="size-4 text-[#f63d06]" /> Multi-Modal Transport Coverage
            </span>
          </div>
        </div>

        {/* Phone */}
        <div className="relative mx-auto w-[300px] max-w-full">
          <div className="animate-float">
            <PhoneMockup>
              <JourneyScreen />
            </PhoneMockup>
          </div>
          <FloatingChip
            className="top-32 right-full mr-4 animate-float [animation-delay:-2s]"
            icon={<MapPin className="size-4" />}
            title="Fastest route found"
            sub="Khayelitsha ➔ CBD · 42 min"
          />
          <FloatingChip
            className="bottom-32 left-full ml-4 animate-float [animation-delay:-4s]"
            icon={<Navigation className="size-4" />}
            title="Live trip tracking"
            sub="MyCiTi T01 · Departs 07:15"
          />
        </div>
      </div>
    </section>
  )
}
