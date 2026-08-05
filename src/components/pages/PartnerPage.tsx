import * as React from "react"
import { ArrowLeft } from "lucide-react"

import { Container } from "@/components/Container"
import { Contact } from "@/components/sections/Contact"

export function PartnerPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="pt-24 pb-12 sm:pt-28 md:pt-32">
      <Container className="mb-6">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault()
            window.history.pushState({}, "", "/")
            window.dispatchEvent(new Event("popstate"))
          }}
          className="inline-flex items-center gap-2 text-sm font-medium text-mist transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4 text-signal" /> Back to Commuttr Home
        </a>
      </Container>
      <Contact />
    </div>
  )
}
