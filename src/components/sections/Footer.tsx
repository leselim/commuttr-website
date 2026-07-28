import { Mail, MapPin } from "lucide-react"

import { Container } from "@/components/Container"
import { Separator } from "@/components/ui/separator"
import { Wordmark } from "@/components/brand/Wordmark"
import { CONTACT } from "@/data/content"

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Mobility wallet", href: "#product" },
      { label: "See the app", href: "#app" },
      { label: "How it works", href: "#how" },
      { label: "Roadmap", href: "#roadmap" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "The problem", href: "#problem" },
      { label: "Ecosystem", href: "#ecosystem" },
      { label: "Leadership", href: "#team" },
      { label: "FAQ", href: "#faq" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-ink">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          <div className="max-w-xs">
            <Wordmark className="text-2xl" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The unified digital mobility ecosystem — helping South Africans
              move, pay and access public transport with confidence.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="eyebrow text-mist">{col.heading}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-white/80 transition-colors hover:text-signal"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="eyebrow text-mist">Get in touch</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-2.5 text-sm text-white/80 transition-colors hover:text-signal"
                >
                  <Mail className="size-4 text-signal" />
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/80">
                <MapPin className="size-4 text-signal" />
                {CONTACT.hq}
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-9" />

        <div className="flex flex-col items-center justify-between gap-3 text-xs text-mist sm:flex-row">
          <p>© 2026 Commuttr. All rights reserved.</p>
          <p>Pre-seed · Validation &amp; MVP · Built in South Africa</p>
        </div>
      </Container>
    </footer>
  )
}
