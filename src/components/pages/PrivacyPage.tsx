import * as React from "react"
import { ArrowLeft, ShieldCheck } from "lucide-react"

import { Container } from "@/components/Container"
import { CONTACT } from "@/data/content"

export function PrivacyPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const navigateHome = (e: React.MouseEvent) => {
    e.preventDefault()
    window.history.pushState({}, "", "/")
    window.dispatchEvent(new Event("popstate"))
  }

  return (
    <div className="pt-24 pb-16 sm:pt-28 md:pt-36">
      <Container>
        {/* Back Link */}
        <div className="mb-8">
          <a
            href="/"
            onClick={navigateHome}
            className="inline-flex items-center gap-2 text-sm font-medium text-mist transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4 text-signal" /> Back to Commuttr Home
          </a>
        </div>

        {/* Page Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-5 text-signal" />
            <span className="eyebrow text-mist">Legal & Privacy</span>
          </div>
          <h1 className="display mt-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Protecting your personal information with clarity, transparency, and care.
          </p>
          <p className="mt-3 text-xs font-medium text-mist">
            Last Updated: August 5, 2026
          </p>
        </div>

        {/* Policy Content */}
        <div className="mt-12 max-w-4xl space-y-8 text-sm leading-relaxed text-muted-foreground">
          {/* Section 1: Introduction */}
          <section className="rounded-none border border-border bg-card p-6 md:p-8">
            <h2 className="font-display text-lg font-bold text-foreground">
              1. Introduction
            </h2>
            <p className="mt-3">
              Commuttr (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting your personal information and respecting your privacy. This Privacy Policy outlines how we collect, use, store, and safeguard information provided by visitors and commuters using the Commuttr website.
            </p>
          </section>

          {/* Section 2: Information We Collect */}
          <section className="rounded-none border border-border bg-card p-6 md:p-8">
            <h2 className="font-display text-lg font-bold text-foreground">
              2. Information We Collect
            </h2>
            <p className="mt-3">
              We collect personal information that you voluntarily submit to us when interacting with our website, specifically when you join our Waitlist or submit an enquiry through our Contact Us page.
            </p>
            <p className="mt-3 font-semibold text-foreground">
              This information may include:
            </p>
            <ul className="mt-2 space-y-2 list-disc pl-5 text-mist">
              <li>Full name</li>
              <li>Email address</li>
              <li>Organisation or institution (optional)</li>
              <li>City or location</li>
              <li>Primary or preferred mode of transport (optional)</li>
              <li>Messages, questions, or feedback submitted via contact forms</li>
            </ul>
          </section>

          {/* Section 3: Why We Collect Your Information */}
          <section className="rounded-none border border-border bg-card p-6 md:p-8">
            <h2 className="font-display text-lg font-bold text-foreground">
              3. Why We Collect Your Information
            </h2>
            <p className="mt-3">
              The information we collect is used strictly for legitimate business and operational purposes to support our commuters and partners:
            </p>
            <ul className="mt-2 space-y-2 list-disc pl-5 text-mist">
              <li>Responding to user enquiries, feedback, and support requests</li>
              <li>Managing and administering the Commuttr early-access waitlist</li>
              <li>Sharing product updates, feature announcements, and news</li>
              <li>Sending beta testing invitations and release insights</li>
              <li>Improving Commuttr&rsquo;s journey planning tools and platform features</li>
              <li>Communicating with users regarding their expressed interest in Commuttr</li>
            </ul>
          </section>

          {/* Section 4: How We Store Information */}
          <section className="rounded-none border border-border bg-card p-6 md:p-8">
            <h2 className="font-display text-lg font-bold text-foreground">
              4. How We Store Information
            </h2>
            <p className="mt-3">
              Submitted information is securely stored using Google Workspace cloud infrastructure, currently including Google Sheets and related Google Cloud services integrated with our website backend. Access to all stored user data is strictly restricted to authorized members of the Commuttr team who require access for legitimate operational purposes.
            </p>
          </section>

          {/* Section 5: Sharing Information */}
          <section className="rounded-none border border-border bg-card p-6 md:p-8">
            <h2 className="font-display text-lg font-bold text-foreground">
              5. Sharing Information
            </h2>
            <p className="mt-3">
              Commuttr does not sell, rent, trade, or monetize your personal information to any third parties. We will only share information where necessary to operate our website services (such as verified cloud platform providers) or where explicitly required by law, regulation, or legal process.
            </p>
          </section>

          {/* Section 6: Marketing Communications */}
          <section className="rounded-none border border-border bg-card p-6 md:p-8">
            <h2 className="font-display text-lg font-bold text-foreground">
              6. Marketing &amp; Product Communications
            </h2>
            <p className="mt-3">
              By joining the Commuttr waitlist, you agree to receive product updates, beta invitations, launch announcements, and essential service communications. You retain full control over your preferences and may unsubscribe from future communications at any time by contacting us directly.
            </p>
          </section>

          {/* Section 7: Data Security */}
          <section className="rounded-none border border-border bg-card p-6 md:p-8">
            <h2 className="font-display text-lg font-bold text-foreground">
              7. Data Security
            </h2>
            <p className="mt-3">
              We implement reasonable technical and organizational measures to safeguard personal information against unauthorized access, loss, alteration, or disclosure. However, please be aware that no method of transmission over the Internet or electronic storage system can be guaranteed to be 100% secure.
            </p>
          </section>

          {/* Section 8: Your Rights */}
          <section className="rounded-none border border-border bg-card p-6 md:p-8">
            <h2 className="font-display text-lg font-bold text-foreground">
              8. Your Data Rights
            </h2>
            <p className="mt-3">
              You have the right to request access to the personal information we hold about you, request corrections to inaccurate data, request deletion of your information, or withdraw consent for future communications.
            </p>
            <p className="mt-3">
              To exercise any of these rights, please contact our team at:{" "}
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-signal underline-offset-4 hover:underline font-medium"
              >
                {CONTACT.email}
              </a>
            </p>
          </section>

          {/* Section 9: POPIA Compliance */}
          <section className="rounded-none border border-border bg-card p-6 md:p-8">
            <h2 className="font-display text-lg font-bold text-foreground">
              9. POPIA Compliance (South Africa)
            </h2>
            <p className="mt-3">
              Commuttr aims to process all personal information in accordance with the Protection of Personal Information Act (POPIA) of South Africa. We collect only necessary information, handle data lawfully and transparently, and protect user privacy in line with South African data protection principles.
            </p>
          </section>

          {/* Section 10: Changes to this Policy */}
          <section className="rounded-none border border-border bg-card p-6 md:p-8">
            <h2 className="font-display text-lg font-bold text-foreground">
              10. Changes to This Policy
            </h2>
            <p className="mt-3">
              We may update this Privacy Policy from time to time as Commuttr grows and introduces new features. Any updates will be published directly on this page with a revised &ldquo;Last Updated&rdquo; date at the top of the policy.
            </p>
          </section>
        </div>
      </Container>
    </div>
  )
}
