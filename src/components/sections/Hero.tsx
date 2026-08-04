import { ArrowRight, BadgeCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PhoneMockup } from "@/components/app/PhoneMockup"
import { HomeScreen } from "@/components/app/screens"

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
      {/* Background grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-mesh opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:gap-14 sm:px-6 md:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Copy */}
        <div className="max-w-xl">
          <h1 className="display text-[2.05rem] font-bold leading-[1.05] text-white min-[360px]:text-[2.6rem] sm:text-5xl lg:text-6xl">
            Journey planning built for{" "}
            <span className="text-[#f63d06]">South African</span> commuters.
          </h1>

          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
            Commuttr helps commuters discover routes, compare transport options, estimate
            fares, and navigate public transport with confidence. We&rsquo;re starting with
            intelligent journey planning, with a long-term vision of building a more
            connected digital mobility experience for South Africa.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <a href="#waitlist">
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
        <div className="relative mx-auto w-[340px] max-w-full">
          <div className="animate-float">
            <PhoneMockup>
              <HomeScreen />
            </PhoneMockup>
          </div>
        </div>
      </div>
    </section>
  )
}
