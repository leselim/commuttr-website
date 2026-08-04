import * as React from "react"
import { AlertCircle, CheckCircle2, ChevronDown, Loader2, Rocket } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Container } from "@/components/Container"
import { WAITLIST } from "@/data/content"

const EMPTY_WAITLIST = {
  name: "",
  email: "",
  city: "",
  organisation: "",
  transportMode: "",
  consent: false,
}

export function Waitlist() {
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "sent" | "error"
  >("idle")
  const [error, setError] = React.useState("")
  const [form, setForm] = React.useState(EMPTY_WAITLIST)

  const updateField =
    (key: keyof typeof EMPTY_WAITLIST) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const val =
        e.target.type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value
      setForm((f) => ({ ...f, [key]: val }))
    }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Honeypot: bots fill hidden fields, humans don't. Pretend success.
    if (new FormData(e.currentTarget).get("_gotcha")) {
      setStatus("sent")
      return
    }

    if (!form.consent) {
      setError("Please agree to receive product updates to join the waitlist.")
      setStatus("error")
      return
    }

    setStatus("submitting")
    setError("")

    try {
      const res = await fetch(WAITLIST.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          city: form.city.trim(),
          organisation: form.organisation.trim(),
          transportMode: form.transportMode,
        }),
      })

      if (res.ok) {
        const data: { result?: string; status?: string; error?: string } | null =
          await res.json().catch(() => null)

        if (data?.error) {
          setError("Something went wrong while joining the waitlist. Please try again.")
          setStatus("error")
          return
        }

        setForm(EMPTY_WAITLIST)
        setStatus("sent")
        return
      }

      setError("Something went wrong while joining the waitlist. Please try again.")
      setStatus("error")
    } catch {
      setError("Something went wrong while joining the waitlist. Please try again.")
      setStatus("error")
    }
  }

  const submitting = status === "submitting"

  return (
    <section id="waitlist" className="relative py-16 sm:py-20 md:py-28">
      <Container>
        <div className="overflow-hidden rounded-none border border-white/[0.08] bg-carbon">
          <div className="grid lg:grid-cols-2">
            {/* Pitch / Info */}
            <div className="relative p-8 md:p-12">
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-medium text-signal">10</span>
                  <span className="eyebrow text-mist">Early Access & Beta</span>
                </div>
                <h2 className="display mt-4 text-3xl font-bold text-white md:text-4xl">
                  Join the Waitlist
                </h2>
                <div className="mt-5 space-y-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Be among the first to experience a smarter way to navigate public transport in South Africa.
                  </p>
                  <p>
                    Join the Commuttr waitlist to receive early access, beta invitations, product updates and launch announcements.
                  </p>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <div className="flex items-start gap-3 rounded-none border border-white/[0.06] bg-white/[0.02] p-3 text-xs">
                    <Rocket className="mt-0.5 size-4 shrink-0 text-signal" />
                    <div>
                      <div className="font-semibold text-white">Early Beta Access</div>
                      <div className="text-mist">Test features before official rollout</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-none border border-white/[0.06] bg-white/[0.02] p-3 text-xs">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-signal" />
                    <div>
                      <div className="font-semibold text-white">Product Updates</div>
                      <div className="text-mist">Direct updates & release insights</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Waitlist Form */}
            <div className="border-t border-white/8 bg-ink/40 p-8 md:border-l md:border-t-0 md:p-12">
              {status === "sent" ? (
                <div className="flex h-full flex-col items-center justify-center py-8 text-center">
                  <div className="flex size-14 items-center justify-center rounded-none bg-signal/10 ring-1 ring-signal/30 text-2xl">
                    🎉
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-white">
                    You&rsquo;re on the list!
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    Thank you for joining the Commuttr waitlist. We&rsquo;ve also sent a confirmation email. We&rsquo;ll keep you updated with product progress, beta access and launch announcements.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => setStatus("idle")}
                  >
                    Join with another email
                  </Button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="waitlist-name">Full Name</Label>
                      <Input
                        id="waitlist-name"
                        required
                        value={form.name}
                        onChange={updateField("name")}
                        placeholder="e.g. Sipho Ndlovu"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="waitlist-email">Email Address</Label>
                      <Input
                        id="waitlist-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={updateField("email")}
                        placeholder="you@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="waitlist-city">City</Label>
                      <Input
                        id="waitlist-city"
                        required
                        value={form.city}
                        onChange={updateField("city")}
                        placeholder="e.g. Cape Town, Johannesburg"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="waitlist-org">Organisation (optional)</Label>
                      <Input
                        id="waitlist-org"
                        value={form.organisation}
                        onChange={updateField("organisation")}
                        placeholder="Company, school or operator"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="waitlist-transport">Primary Transport Mode (optional)</Label>
                    <div className="relative">
                      <select
                        id="waitlist-transport"
                        value={form.transportMode}
                        onChange={updateField("transportMode")}
                        className="flex h-11 w-full appearance-none rounded-none border border-input bg-white/[0.03] px-4 pr-10 text-sm text-white transition-colors focus-visible:border-signal/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/30 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="" className="bg-carbon text-mist">
                          Select primary transport mode
                        </option>
                        {WAITLIST.transportModes.map((mode) => (
                          <option key={mode} value={mode} className="bg-carbon text-white">
                            {mode}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-3.5 size-4 text-mist" />
                    </div>
                  </div>

                  <div className="pt-2">
                    <label htmlFor="waitlist-consent" className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        id="waitlist-consent"
                        required
                        checked={form.consent}
                        onChange={updateField("consent")}
                        className="mt-1 size-4 rounded-none border-white/20 bg-white/[0.03] text-signal focus:ring-signal focus:ring-offset-0 cursor-pointer accent-signal"
                      />
                      <span className="text-xs leading-relaxed text-muted-foreground transition-colors group-hover:text-white/90">
                        I agree to receive product updates, beta invitations and launch announcements from Commuttr.
                      </span>
                    </label>
                  </div>

                  {/* Honeypot — hidden from humans, catches bots */}
                  <input
                    type="text"
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />

                  {status === "error" && (
                    <div
                      role="alert"
                      className="flex items-start gap-2 border border-destructive/40 bg-destructive/10 p-3 text-sm text-white"
                    >
                      <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
                      <div>{error}</div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        Submitting<Loader2 className="size-4 animate-spin" />
                      </>
                    ) : (
                      <>
                        Join the Waitlist
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
