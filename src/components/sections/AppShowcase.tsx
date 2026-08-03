import { Container } from "@/components/Container"
import { SectionHeading } from "@/components/SectionHeading"
import { Reveal } from "@/components/Reveal"
import { Carousel } from "@/components/Carousel"
import { PhoneMockup } from "@/components/app/PhoneMockup"
import {
  HomeScreen,
  LiveJourneyScreen,
  PlannerScreen,
} from "@/components/app/screens"

const SHOWCASE = [
  {
    screen: <HomeScreen />,
    title: "Plan your commute",
    text: "Set your origin and destination, then compare recommended routes, fares and departure times.",
  },
  {
    screen: <PlannerScreen />,
    title: "Your day, planned",
    text: "Save every journey for the day and see total travel time, stops and operators at a glance.",
  },
  {
    screen: <LiveJourneyScreen />,
    title: "Live journey tracking",
    text: "Follow your trip stop by stop with next-stop timing, get-off alerts and live route progress.",
  },
]

export function AppShowcase() {
  return (
    <section id="app" className="relative py-16 sm:py-20 md:py-28">
      <Container>
        <SectionHeading
          align="center"
          index="04"
          eyebrow="Journey Experience"
          title="The commuter experience, redesigned."
          sub="A first look at the Commuttr app, built around three moments: planning the trip, saving your day, and riding it live."
        />

        <Reveal delay={100} className="mt-16">
          <Carousel
            label="Commuttr app screens"
            slideLabels={SHOWCASE.map((s) => s.title)}
            gridClassName="lg:grid-cols-3 lg:gap-x-6"
          >
            {SHOWCASE.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center text-center"
              >
                <PhoneMockup>{item.screen}</PhoneMockup>
                <h3 className="mt-8 font-display text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-1.5 max-w-[18rem] text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </div>
            ))}
          </Carousel>
        </Reveal>
      </Container>
    </section>
  )
}
