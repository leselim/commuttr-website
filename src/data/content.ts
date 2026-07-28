import type { LucideIcon } from "lucide-react"
import {
  Banknote,
  Building2,
  BusFront,
  GraduationCap,
  Landmark,
  MapPinned,
  Network,
  Route,
  ScanLine,
  ShieldAlert,
  ShieldCheck,
  Store,
  UserRound,
  UsersRound,
  Wallet,
} from "lucide-react"

export type Feature = { icon: LucideIcon; title: string; text: string }

export const NAV_LINKS = [
  { label: "Problem", href: "#problem" },
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Team", href: "#team" },
] as const

export const PROBLEMS: Feature[] = [
  {
    icon: Banknote,
    title: "Cash-dependent",
    text: "Fares still rely on physical cash, making them slow to collect, risky to carry and difficult to track or budget for.",
  },
  {
    icon: Network,
    title: "Fragmented",
    text: "Taxis, buses and trains operate in disconnected silos, with no single place to plan, pay, or see what a trip costs.",
  },
  {
    icon: ShieldAlert,
    title: "Insecure",
    text: "Cash handling creates security risks for commuters and operators alike, and leaves riders with no digital record.",
  },
]

export const PRODUCTS: Feature[] = [
  {
    icon: Wallet,
    title: "Digital mobility wallet",
    text: "A secure mobile wallet to store funds digitally and get ready to pay for transport without relying on physical cash.",
  },
  {
    icon: ScanLine,
    title: "Cashless transport payments",
    text: "QR and contactless payments that simplify fare collection and cut the operational load of handling cash.",
  },
  {
    icon: Route,
    title: "Journey planning & transit intelligence",
    text: "Integrated transport information to discover routes, estimate travel costs, and make more informed decisions.",
  },
  {
    icon: UsersRound,
    title: "Managed wallet features",
    text: "Tools for employers, parents and organisations to allocate transport funds, monitor spending, and support mobility.",
  },
]

export const STEPS: Feature[] = [
  {
    icon: Wallet,
    title: "Top up your wallet",
    text: "Load funds into your secure Commuttr wallet from your bank or card, so everything is ready before you reach the rank or station.",
  },
  {
    icon: ScanLine,
    title: "Tap or scan to pay",
    text: "Pay your fare with a QR code or contactless tap. No fumbling for change, and every trip is recorded automatically.",
  },
  {
    icon: MapPinned,
    title: "Plan every journey",
    text: "See routes, estimated costs and departure times across operators, then travel with your whole trip in one app.",
  },
]

export type Audience = { icon: LucideIcon; title: string; text: string; points: string[] }

export const AUDIENCES: Audience[] = [
  {
    icon: UserRound,
    title: "For commuters",
    text: "Greater convenience, clearer visibility over spending, and a simpler way to pay for everyday travel.",
    points: ["One wallet for every trip", "No cash, no loose change", "See what a journey costs first"],
  },
  {
    icon: BusFront,
    title: "For transport operators",
    text: "A chance to modernise fare collection, reduce cash handling, and improve day-to-day operational efficiency.",
    points: ["Digital fare collection", "Less cash to reconcile", "Clearer ridership insight"],
  },
  {
    icon: Building2,
    title: "For businesses & employers",
    text: "Better ways to manage employee and student mobility while supporting digital financial inclusion.",
    points: ["Allocate travel funds", "Monitor mobility spend", "Support staff & students"],
  },
]

export type Phase = {
  tag: string
  title: string
  text: string
  status: "Current focus" | "Next" | "Later"
}

export const PHASES: Phase[] = [
  {
    tag: "Phase 1",
    title: "Discovery, validation & MVP",
    text: "Understanding commuter needs, validating assumptions through research and stakeholder engagement, and building the MVP that addresses real mobility challenges.",
    status: "Current focus",
  },
  {
    tag: "Phase 2",
    title: "Pilot launch & market validation",
    text: "Controlled pilots with selected users, operators and partners to validate product–market fit, measure adoption, and optimise the platform on real-world usage.",
    status: "Next",
  },
  {
    tag: "Phase 3",
    title: "Growth & scale",
    text: "Expanding partnerships, growing the user base, adding mobility services, and improving continuously through user insights and data-driven decisions.",
    status: "Later",
  },
]

export const PARTNERS: Feature[] = [
  {
    icon: BusFront,
    title: "Transport operators",
    text: "Modernising fare collection and improving the commuter experience through digital mobility.",
  },
  {
    icon: Landmark,
    title: "Financial & payment partners",
    text: "Powering secure digital payments, wallet infrastructure, and financial inclusion for everyday commuters.",
  },
  {
    icon: GraduationCap,
    title: "Employers & institutions",
    text: "Exploring smarter mobility that simplifies employee and student transport while improving access.",
  },
  {
    icon: Store,
    title: "Merchants & local business",
    text: "Creating future opportunities for rewards, commuter benefits, and value-added services.",
  },
  {
    icon: ShieldCheck,
    title: "Government & strategic partners",
    text: "Working towards partnerships that support innovation, digital transformation and connected mobility.",
  },
]

export type Member = { name: string; role: string; initials: string; bio: string }

export const TEAM: Member[] = [
  {
    name: "Leseli Morakile",
    role: "Founder, CEO & Product Lead",
    initials: "LM",
    bio: "Leads company vision, business strategy, product roadmap and strategic partnerships, ensuring the platform delivers meaningful value while driving growth.",
  },
  {
    name: "Mukhethwa Ravele",
    role: "Founder & Backend Engineering Lead",
    initials: "MR",
    bio: "Owns backend architecture, APIs, wallet services, payment integration and security, building a reliable, high performance, scalable cloud platform.",
  },
  {
    name: "Thokozani Ledwaba",
    role: "Founder & Frontend Engineering Lead",
    initials: "TL",
    bio: "Owns the mobile and web interfaces, user experience, accessibility and responsive design to deliver an intuitive, seamless commuter experience.",
  },
]

export type Award = { icon: LucideIcon; title: string; org: string; year: string }

export const AWARDS: Award[] = [
  {
    icon: Landmark,
    title: "Founder of the Year Under 30 — Finalist",
    org: "FOYA Awards · representing South Africa across Africa",
    year: "2024",
  },
  {
    icon: ShieldCheck,
    title: "Young Entrepreneur Award — Top 10 Winner",
    org: "UN Women",
    year: "2024",
  },
]

export const FAQS = [
  {
    q: "Is my money safe with Commuttr?",
    a: "Security and trust are core values. Commuttr is being built as a secure, reliable and transparent platform, with wallet infrastructure and payments developed alongside financial and payment partners.",
  },
  {
    q: "Which taxis, buses and trains will it work with?",
    a: "We're engaging transport operators and taxi associations to modernise fare collection. Coverage grows through our pilot programmes as more operators join the ecosystem.",
  },
  {
    q: "When can I use the app?",
    a: "Commuttr is in the validation and MVP phase. A controlled pilot with selected users and operators comes next, before a wider rollout. Join the early-access list to be first in line.",
  },
  {
    q: "How do I partner with Commuttr?",
    a: "We're actively engaging operators, payment providers, employers, merchants and government stakeholders. Reach out through the contact form and our team will be in touch.",
  },
] as const

export const CONTACT = {
  email: "hellocommuttr@gmail.com",
  hq: "Cape Town, Western Cape, South Africa",
} as const
