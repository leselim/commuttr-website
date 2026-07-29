import { Container } from "@/components/Container"
import { SectionHeading } from "@/components/SectionHeading"
import { Reveal } from "@/components/Reveal"
import { PhoneMockup } from "@/components/app/PhoneMockup"
import {
  JourneyScreen,
  NavigationScreen,
  SchedulesScreen,
} from "@/components/app/screens"

const SHOWCASE = [
  {
    screen: <JourneyScreen />,
    title: "Smart journey planner",
    text: "Optimal multi-modal routes, transit filters, and real-time travel times.",
  },
  {
    screen: <NavigationScreen />,
    title: "Live trip navigation",
    text: "Real-time turn-by-turn route guidance, progress tracking and arrival alerts.",
  },
  {
    screen: <SchedulesScreen />,
    title: "Real-time station boards",
    text: "Live departure timetables, platform updates and vehicle occupancy levels.",
  },
]

export function AppShowcase() {
  return (
    <section id="app" className="relative overflow-hidden py-24 md:py-28">
      <Container>
        <SectionHeading
          align="center"
          index="04"
          eyebrow="Journey Experience"
          title="The commuter experience, redesigned."
          sub="A first look at the Commuttr app centered entirely on intelligent journey planning, live trip navigation, and real-time transit timetables."
        />

        <div className="mt-16 grid justify-items-center gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6">
          {SHOWCASE.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 120}
              className={i === 2 ? "sm:col-span-2 lg:col-span-1" : undefined}
            >
              <div className="flex flex-col items-center text-center">
                <PhoneMockup>{item.screen}</PhoneMockup>
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
