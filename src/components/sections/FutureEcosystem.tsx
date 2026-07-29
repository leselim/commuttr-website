import {
  Award,
  Banknote,
  Briefcase,
  Building2,
  CalendarDays,
  QrCode,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react"

import { Container } from "@/components/Container"
import { SectionHeading } from "@/components/SectionHeading"
import { Reveal } from "@/components/Reveal"

const FUTURE_FEATURES = [
  {
    icon: Wallet,
    title: "Digital Mobility Wallet",
    description: "Store travel funds securely for everyday commuting.",
  },
  {
    icon: Banknote,
    title: "Cashless Transport Payments",
    description: "Pay participating operators digitally without cash.",
  },
  {
    icon: QrCode,
    title: "QR Ticketing",
    description: "Board participating transport quickly using digital tickets.",
  },
  {
    icon: CalendarDays,
    title: "Monthly Travel Passes",
    description: "Manage recurring travel subscriptions digitally.",
  },
  {
    icon: Award,
    title: "Rewards & Loyalty",
    description: "Earn benefits and discounts as you commute.",
  },
  {
    icon: TrendingUp,
    title: "Travel Insights",
    description: "View travel history, spending and mobility analytics.",
  },
  {
    icon: Users,
    title: "Family Accounts",
    description: "Support family mobility from one central account.",
  },
  {
    icon: Briefcase,
    title: "Business & Student Mobility",
    description: "Travel management for institutions and enterprises.",
  },
  {
    icon: Building2,
    title: "Operator Integrations",
    description: "Connected payments and ticketing across multiple transport operators.",
  },
]

export function FutureEcosystem() {
  return (
    <section id="coming-soon" className="relative py-24 md:py-28 bg-ink border-t border-white/[0.06]">
      <Container>
        <SectionHeading
          index="05"
          eyebrow="Coming Soon"
          title="Journey Planning Today. Connected Mobility Tomorrow."
          sub="Journey planning is our first step. Our long-term roadmap expands into a connected digital mobility ecosystem."
        />

        {/* Feature Grid */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FUTURE_FEATURES.map((item, i) => {
            const Icon = item.icon
            return (
              <Reveal key={item.title} delay={(i % 3) * 80}>
                <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-white/[0.08] bg-carbon p-6 transition-colors duration-300 hover:border-[#f63d06]/40">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex size-11 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#f63d06]">
                        <Icon className="size-5" />
                      </span>
                      <span className="rounded-full border border-[#f63d06]/30 bg-[#f63d06]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#f63d06]">
                        COMING SOON
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Bottom Vision Statement */}
        <Reveal delay={200} className="mt-12">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 border-l-4 border-l-[#f63d06] bg-carbon p-6 md:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#f63d06]/10 text-[#f63d06]">
                <Sparkles className="size-6" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#f63d06]">
                  Our Long-Term Ambition
                </p>
                <p className="mt-1 text-base font-medium leading-relaxed text-white md:text-lg">
                  &ldquo;Today we&rsquo;re helping South Africans plan better journeys. Tomorrow we&rsquo;ll connect public transport through digital payments, ticketing and intelligent mobility services. Our ambition is to build South Africa&rsquo;s most connected digital mobility ecosystem.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
