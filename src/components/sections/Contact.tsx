import * as React from "react"
import { AlertCircle, CheckCircle2, Loader2, Mail, MapPin, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Container } from "@/components/Container"
import { CONTACT } from "@/data/content"
import { trackEvent } from "@/lib/analytics"

const EMPTY = { name: "", email: "", org: "", message: "" }

export function Contact() {
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "sent" | "error"
  >("idle")
  const [error, setError] = React.useState("")
  const [form, setForm] = React.useState(EMPTY)

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Honeypot: bots fill hidden fields, humans don't. Pretend success.
    if (new FormData(e.currentTarget).get("_gotcha")) {
      setStatus("sent")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const trimmedName = form.name.trim()
    const trimmedEmail = form.email.trim().toLowerCase()
    const trimmedOrg = form.org.trim()
    const trimmedMsg = form.message.trim()

    if (!trimmedName || !trimmedEmail || !trimmedMsg) {
      setError("Please fill out all required fields.")
      setStatus("error")
      return
    }

    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address.")
      setStatus("error")
      return
    }

    setStatus("submitting")
    setError("")

    try {
      const res = await fetch(CONTACT.formEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          organisation: trimmedOrg,
          message: trimmedMsg,
        }),
      })

      if (res.ok) {
        const data: { result?: string; status?: string; error?: string } | null =
          await res.json().catch(() => null)

        if (data?.error) {
          setError(data.error)
          setStatus("error")
          return
        }

        trackEvent("contact_submit", { organisation: trimmedOrg })
        trackEvent("partner_enquiry", { organisation: trimmedOrg })
        setForm(EMPTY)
        setStatus("sent")
        return
      }

      const data: { error?: string; errors?: { message?: string }[] } | null =
        await res.json().catch(() => null)
      setError(
        data?.error ||
          data?.errors?.map((x) => x.message).filter(Boolean).join(" ") ||
          "That didn't go through. Please try again."
      )
      setStatus("error")
    } catch {
      setError(
        `Couldn't reach the server. Check your connection, or email us at ${CONTACT.email}.`
      )
      setStatus("error")
    }
  }

  const submitting = status === "submitting"

  return (
    <section id="contact" className="relative py-16 sm:py-20 md:py-28">
      <Container>
        <div className="overflow-hidden rounded-none border border-white/[0.08] bg-carbon">
          <div className="grid lg:grid-cols-2">
            {/* Pitch */}
            <div className="relative p-8 md:p-12">
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="eyebrow text-mist">Partner with Us</span>
                </div>
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
                    <span className="flex size-10 items-center justify-center rounded-none bg-white/[0.04] text-signal ring-1 ring-white/10">
                      <Mail className="size-4" />
                    </span>
                    {CONTACT.email}
                  </a>
                  <div className="flex items-center gap-3 text-sm text-white/90">
                    <span className="flex size-10 items-center justify-center rounded-none bg-white/[0.04] text-signal ring-1 ring-white/10">
                      <MapPin className="size-4" />
                    </span>
                    {CONTACT.hq}
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="border-t border-white/8 bg-ink/40 p-8 md:border-l md:border-t-0 md:p-12">
              {status === "sent" ? (
                <div className="flex h-full flex-col items-center justify-center py-8 text-center">
                    <CheckCircle2 className="size-8 text-signal" />
                  <h3 className="mt-5 font-display text-xl font-semibold text-white">
                    Message sent
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                    Thanks for reaching out &ndash; we&rsquo;ll get back to you soon.
                    Prefer to reach us directly? {CONTACT.email}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => setStatus("idle")}
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
                        disabled={submitting}
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
                        disabled={submitting}
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
                      disabled={submitting}
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
                      disabled={submitting}
                      value={form.message}
                      onChange={update("message")}
                      placeholder="Tell us about your interest in Commuttr…"
                      className="min-h-28"
                    />
                  </div>
                  {/* Honeypot — hidden from people, catnip for bots. */}
                  <input
                    type="text"
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />

                  {status === "error" && (
                    <p
                      role="alert"
                      className="flex items-start gap-2 border border-destructive/40 bg-destructive/10 p-3 text-sm text-white"
                    >
                      <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        Sending<Loader2 className="size-4 animate-spin" />
                      </>
                    ) : (
                      <>
                        Send message <Send className="size-4" />
                      </>
                    )}
                  </Button>
                  <p className="text-center text-xs text-mist">
                    We&rsquo;ll only use your information to respond to your enquiry. By submitting this form, you agree to our{" "}
                    <a
                      href="/privacy"
                      onClick={(e) => {
                        e.preventDefault()
                        if (window.location.pathname !== "/privacy") {
                          window.history.pushState({}, "", "/privacy")
                          window.dispatchEvent(new Event("popstate"))
                        }
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }}
                      className="text-signal underline-offset-4 hover:underline font-medium"
                    >
                      Privacy Policy
                    </a>
                    .
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
