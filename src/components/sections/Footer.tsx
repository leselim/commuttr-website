import { Mail, MapPin } from "lucide-react"

import { Container } from "@/components/Container"
import { Separator } from "@/components/ui/separator"
import { Wordmark } from "@/components/brand/Wordmark"
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/brand/SocialIcons"
import { CONTACT, SOCIALS } from "@/data/content"

const SOCIAL_ICONS = {
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
} as const

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Journey planner", href: "/#product" },
      { label: "See the app", href: "/#app" },
      { label: "How it works", href: "/#how" },
      { label: "Join the waitlist", href: "/#waitlist" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "The problem", href: "/#problem" },
      { label: "Ecosystem", href: "/#ecosystem" },
      { label: "Leadership", href: "/#team" },
      { label: "Partner with us", href: "/partner" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
]

export function Footer() {
  const handleNav = (href: string) => (e: React.MouseEvent) => {
    if (href.startsWith("/partner")) {
      e.preventDefault()
      if (window.location.pathname !== "/partner") {
        window.history.pushState({}, "", "/partner")
        window.dispatchEvent(new Event("popstate"))
      }
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else if (href.startsWith("/#")) {
      const hash = href.replace("/", "")
      if (window.location.pathname !== "/") {
        e.preventDefault()
        window.history.pushState({}, "", href)
        window.dispatchEvent(new Event("popstate"))
        setTimeout(() => {
          const el = document.querySelector(hash)
          if (el) el.scrollIntoView({ behavior: "smooth" })
        }, 100)
      }
    }
  }
  return (
    <footer className="border-t border-white/[0.08] bg-ink">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          <div className="max-w-xs">
            <Wordmark className="text-2xl" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Helping South Africans discover, plan and navigate public transport
              with confidence.
            </p>

            <ul className="-ml-2 mt-5 flex items-center gap-1">
              {SOCIALS.map((s) => {
                const Icon = SOCIAL_ICONS[s.label]
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Commuttr on ${s.label}`}
                      className="flex size-11 items-center justify-center text-white/70 transition-colors hover:text-signal"
                    >
                      <Icon className="size-5" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="eyebrow text-mist">{col.heading}</p>
              <ul className="mt-2 space-y-0.5 lg:mt-4 lg:space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={handleNav(link.href)}
                      className="inline-block py-2 text-sm text-white/80 transition-colors hover:text-signal lg:py-0"
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
                  className="flex items-center gap-2.5 py-2 text-sm break-all text-white/80 transition-colors hover:text-signal lg:py-0"
                >
                  <Mail className="size-4 shrink-0 text-signal" />
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/80">
                <MapPin className="mt-0.5 size-4 shrink-0 text-signal" />
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
