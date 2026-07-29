import { Nav } from "@/components/sections/Nav"
import { Hero } from "@/components/sections/Hero"
import { Problem } from "@/components/sections/Problem"
import { Products } from "@/components/sections/Products"
import { AppShowcase } from "@/components/sections/AppShowcase"
import { HowItWorks } from "@/components/sections/HowItWorks"
import { Principles } from "@/components/sections/Principles"
import { Audiences } from "@/components/sections/Audiences"
import { Roadmap } from "@/components/sections/Roadmap"
import { Ecosystem } from "@/components/sections/Ecosystem"
import { Team } from "@/components/sections/Team"
import { Faq } from "@/components/sections/Faq"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/sections/Footer"

export default function App() {
  return (
    <div className="relative min-h-screen bg-ink">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Products />
        <AppShowcase />
        <HowItWorks />
        <Principles />
        <Audiences />
        <Roadmap />
        <Ecosystem />
        <Team />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
