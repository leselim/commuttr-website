import * as React from "react"
import { ArrowRight, CheckCircle2, Mail, MapPin, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Container } from "@/components/Container"
import { CONTACT } from "@/data/content"

export function Contact() {
  const [sent, setSent] = React.useState(false)
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    org: "",
    message: "",
  })

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const subject = encodeURIComponent(
      `Commuttr enquiry — ${form.name || "New enquiry"}`
    )
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nOrganisation: ${form.org}\n\n${form.message}`
    )
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section id="contact" className="relative py-24 md:py-28">
      <Container>
        <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-carbon">
          <div className="grid lg:grid-cols-2">
            {/* Pitch */}
            <div className="relative p-8 md:p-12">
              <div className="relative">
                <span className="eyebrow text-signal">Partner with Commuttr</span>
                <h2 className="display mt-4 text-3xl font-bold text-white md:text-4xl">
                  Let&rsquo;s build the future of mobility together.
                </h2>
                <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
                  Join us as we build connected public mobility through
                  innovation, collaboration and strategic partnerships whether
                  you&rsquo;re a commuter, operator, or future partner.
                </p>

                <div className="mt-8 space-y-3">
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="flex items-center gap-3 text-sm text-white/90 transition-colors hover:text-signal"
                  >
                    <span className="flex size-10 items-center justify-center rounded-xl bg-white/[0.04] text-signal ring-1 ring-white/10">
                      <Mail className="size-4" />
                    </span>
                    {CONTACT.email}
                  </a>
                  <div className="flex items-center gap-3 text-sm text-white/90">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-white/[0.04] text-signal ring-1 ring-white/10">
                      <MapPin className="size-4" />
                    </span>
                    {CONTACT.hq}
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="border-t border-white/[0.08] bg-ink/40 p-8 md:border-l md:border-t-0 md:p-12">
              {sent ? (
                <div className="flex h-full flex-col items-center justify-center py-8 text-center">
                  <span className="flex size-14 items-center justify-center rounded-full bg-signal/12 text-signal">
                    <CheckCircle2 className="size-7" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-white">
                    Your email is on its way
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                    We&rsquo;ve opened your email app with the details ready to
                    send. Prefer to reach us directly? {CONTACT.email}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => setSent(false)}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        required
                        value={form.name}
                        onChange={update("name")}
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={update("email")}
                        placeholder="you@email.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="org">Organisation (optional)</Label>
                    <Input
                      id="org"
                      value={form.org}
                      onChange={update("org")}
                      placeholder="Company, operator or institution"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="message">How can we help?</Label>
                    <Textarea
                      id="message"
                      required
                      value={form.message}
                      onChange={update("message")}
                      placeholder="Tell us about your interest in Commuttr…"
                      className="min-h-28"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Send message <Send className="size-4" />
                  </Button>
                  <p className="flex items-center justify-center gap-1.5 text-center text-xs text-mist">
                    Opens in your email app. Nothing is sent automatically.
                    <ArrowRight className="size-3" />
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
