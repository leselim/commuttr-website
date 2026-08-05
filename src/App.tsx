import * as React from "react"

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
import { Waitlist } from "@/components/sections/Waitlist"
import { PartnerPage } from "@/components/pages/PartnerPage"
import { PrivacyPage } from "@/components/pages/PrivacyPage"
import { Footer } from "@/components/sections/Footer"

export default function App() {
  const [path, setPath] = React.useState(() => window.location.pathname)

  React.useEffect(() => {
    const onLocationChange = () => {
      setPath(window.location.pathname)
    }
    window.addEventListener("popstate", onLocationChange)
    return () => window.removeEventListener("popstate", onLocationChange)
  }, [])

  const isPartnerPage =
    path === "/partner" ||
    path === "/contact" ||
    path === "/partner-with-us"

  const isPrivacyPage =
    path === "/privacy" ||
    path === "/privacy-policy"

  return (
    <div className="relative min-h-screen bg-ink">
      <Nav />
      <main>
        {isPartnerPage ? (
          <PartnerPage />
        ) : isPrivacyPage ? (
          <PrivacyPage />
        ) : (
          <>
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
            <Waitlist />
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}
