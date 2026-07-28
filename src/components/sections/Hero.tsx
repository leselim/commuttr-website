import type { ReactNode } from "react"
import { ArrowRight, BadgeCheck, CheckCircle2, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PhoneMockup } from "@/components/app/PhoneMockup"
import { WalletScreen } from "@/components/app/screens"

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
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-mesh opacity-70 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
        <div className="absolute -right-40 -top-40 size-[36rem] rounded-full bg-signal/20 blur-[120px]" />
        <div className="absolute -left-40 top-40 size-[28rem] rounded-full bg-signal/10 blur-[120px]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-6 md:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Copy */}
        <div className="max-w-xl">
          <Badge variant="signal">
            <Sparkles className="size-3.5" /> Building South Africa&rsquo;s mobility ecosystem
          </Badge>

          <h1 className="display mt-6 text-[2.6rem] font-bold leading-[1.03] text-white sm:text-6xl">
            Move, pay and plan{" "}
            <span className="text-signal-gradient">every journey</span> in one
            app.
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Commuttr turns cash-dependent, fragmented public transport into a
            secure digital experience, a mobility wallet, tap-to-pay fares, and
            smart journey planning for every South African commuter.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <a href="#contact">
                Get early access <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#contact">Partner with us</a>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-mist">
            <span className="flex items-center gap-2">
              <BadgeCheck className="size-4 text-signal" /> FOYA Founder of the Year
              finalist 2024
            </span>
            <span className="flex items-center gap-2">
              <BadgeCheck className="size-4 text-signal" /> UN Women Top 10 · 2024
            </span>
          </div>
        </div>

        {/* Phone */}
        <div className="relative mx-auto w-[300px] max-w-full">
          <div className="animate-float">
            <PhoneMockup>
              <WalletScreen />
            </PhoneMockup>
          </div>
          <FloatingChip
            className="top-32 right-full mr-4 animate-float [animation-delay:-2s]"
            icon={<CheckCircle2 className="size-4" />}
            title="Fare paid"
            sub="MyCiTi · −R 13.50"
          />
          <FloatingChip
            className="bottom-32 left-full ml-4 animate-float [animation-delay:-4s]"
            icon={<ArrowRight className="size-4 -rotate-45" />}
            title="Top-up received"
            sub="+R 200.00"
          />
        </div>
      </div>
    </section>
  )
}
