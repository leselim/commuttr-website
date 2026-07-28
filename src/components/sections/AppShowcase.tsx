import { Container } from "@/components/Container"
import { SectionHeading } from "@/components/SectionHeading"
import { Reveal } from "@/components/Reveal"
import { PhoneMockup } from "@/components/app/PhoneMockup"
import {
  JourneyScreen,
  PayScreen,
  WalletScreen,
} from "@/components/app/screens"

const SHOWCASE = [
  {
    screen: <WalletScreen />,
    title: "Your mobility wallet",
    text: "Balance, top-ups and every trip in one secure place.",
  },
  {
    screen: <PayScreen />,
    title: "Tap or scan to pay",
    text: "QR and contactless fares. No cash, no loose change.",
  },
  {
    screen: <JourneyScreen />,
    title: "Plan any journey",
    text: "Routes, costs and times across every operator.",
  },
]

export function AppShowcase() {
  return (
    <section id="app" className="relative overflow-hidden py-24 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[30rem] w-[42rem] max-w-full -translate-x-1/2 rounded-full bg-signal/10 blur-[130px]"
      />
      <Container>
        <SectionHeading
          align="center"
          index="03"
          eyebrow="See the app"
          title="The commuter experience, redesigned."
          sub="A first look at the Commuttr app where the wallet, cashless fare payments and journey planning work together."
        />

        <div className="mt-16 grid justify-items-center gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6">
          {SHOWCASE.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 120}
              className={i === 2 ? "sm:col-span-2 lg:col-span-1" : undefined}
            >
              <div className="flex flex-col items-center text-center">
                <PhoneMockup glow={i === 1}>{item.screen}</PhoneMockup>
                <h3 className="mt-8 font-display text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-1.5 max-w-[16rem] text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
