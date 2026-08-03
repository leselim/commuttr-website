import type { LucideIcon } from "lucide-react"
import {
  Banknote,
  Building2,
  BusFront,
  GraduationCap,
  Layers,
  MapPinned,
  Network,
  Route,
  ShieldAlert,
  ShieldCheck,
  UserRound,
} from "lucide-react"

export type Feature = { icon: LucideIcon; title: string; text: string }

export const NAV_LINKS = [
  { label: "Problem", href: "#problem" },
  { label: "What we build", href: "#product" },
  { label: "How it works", href: "#how" },
  { label: "Methodology", href: "#roadmap" },
  { label: "Audience", href: "#who" },
  { label: "Team", href: "#team" },
] as const

export const PROBLEMS: Feature[] = [
  {
    icon: Network,
    title: "Fragmented Information",
    text: "Routes and transport information are spread across multiple disconnected sources.",
  },
  {
    icon: ShieldAlert,
    title: "Journey Uncertainty",
    text: "Commuters often don't know the fastest, safest, or most reliable option before leaving.",
  },
  {
    icon: Route,
    title: "Poor Visibility",
    text: "Travel times, estimated fares and multi-modal transfers are difficult to compare.",
  },
  {
    icon: BusFront,
    title: "Outdated Commuter Experience",
    text: "Public transport still lacks modern journey planning tools designed around commuters.",
  },
]

export const PRODUCTS: Feature[] = [
  {
    icon: Route,
    title: "Intelligent Journey Planning",
    text: "Compare routes across taxis, buses and trains in one unified view.",
  },
  {
    icon: MapPinned,
    title: "Discover Better Routes",
    text: "Find the best way to reach your destination with multi-modal directions.",
  },
  {
    icon: Network,
    title: "Compare Transport Options",
    text: "Evaluate travel times, transit modes, and transfers side-by-side.",
  },
  {
    icon: Banknote,
    title: "Fare Estimation",
    text: "Estimate travel costs and budget your commute before you leave home.",
  },
  {
    icon: Layers,
    title: "Transit Information",
    text: "Access reliable transport schedules and route data in one place.",
  },
  {
    icon: ShieldCheck,
    title: "Saved Journeys",
    text: "Quickly access frequently travelled routes for smarter, faster travel decisions.",
  },
]

export const STEPS: Feature[] = [
  {
    icon: MapPinned,
    title: "1. Enter your destination",
    text: "Type where you want to go to instantly discover available transport routes.",
  },
  {
    icon: Route,
    title: "2. Compare options & fares",
    text: "Compare travel times, routes, and estimated fares across buses, trains, and taxis.",
  },
  {
    icon: BusFront,
    title: "3. Travel with confidence",
    text: "Choose the best journey for your commute and navigate public transport effortlessly.",
  },
]

export type Audience = { icon: LucideIcon; title: string; text: string; points: string[] }

export const AUDIENCES: Audience[] = [
  {
    icon: UserRound,
    title: "For commuters",
    text: "Plan everyday travel with complete clarity, accurate routes, and fare visibility.",
    points: [
      "Discover better routes",
      "Compare transport options & estimated costs",
      "Save time planning travel & travel with confidence",
    ],
  },
  {
    icon: BusFront,
    title: "For transport operators",
    text: "Improve route visibility, reach more commuters, and support digital transit intelligence.",
    points: [
      "Improve commuter access to transport information",
      "Increase network & route visibility",
      "Reach more commuters & support smarter mobility",
    ],
  },
  {
    icon: Building2,
    title: "For businesses & institutions",
    text: "Provide employees and students with reliable transit insights and travel planning.",
    points: [
      "Support employee mobility planning",
      "Support student travel & commute insights",
      "Enable smarter travel planning & prepare for future innovation",
    ],
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
    tag: "Phase 1: Current Focus",
    title: "Discovery, validation and Journey Planning MVP",
    text: "Understand commuter needs, validate assumptions through research and stakeholder engagement, and build an intelligent journey planning platform that solves real mobility challenges.",
    status: "Current focus",
  },
  {
    tag: "Phase 2: Next",
    title: "Pilot Launch & Market Validation",
    text: "Launch controlled pilots, gather real commuter feedback, validate product-market fit and continuously improve the journey planning experience.",
    status: "Next",
  },
  {
    tag: "Phase 3: Later",
    title: "Growth & Scale",
    text: "Expand partnerships, grow the user base and evolve Commuttr into a broader connected mobility platform based on validated customer needs.",
    status: "Later",
  },
]

export const PARTNERS: Feature[] = [
  {
    icon: BusFront,
    title: "Transport Operators",
    text: "Helping improve commuter access to transport information.",
  },
  {
    icon: ShieldCheck,
    title: "Government & Strategic Partners",
    text: "Supporting innovation in connected public mobility.",
  },
  {
    icon: GraduationCap,
    title: "Businesses & Institutions",
    text: "Exploring smarter mobility experiences for employees and students.",
  },
]

export type Member = {
  name: string
  role: string
  initials: string
  bio: string
  /** Cloudinary portrait. `f_auto,q_auto` serves WebP/AVIF at a sane weight
   *  instead of the multi-MB source PNG; `w_640` caps it at 2x the rendered size. */
  image: string
  linkedin: string
}

export const TEAM: Member[] = [
  {
    name: "Leseli Morakile",
    role: "Founder, CEO & Product Lead",
    initials: "LM",
    bio: "Leads company vision, business strategy, product roadmap and strategic partnerships, building South Africa's intelligent journey planning platform.",
    image:
      "https://res.cloudinary.com/kxv83rmw/image/upload/f_auto,q_auto,w_640/v1785748126/Leseli_Team_Image_bhtdra.png",
    linkedin: "https://www.linkedin.com/in/leseli-morakile-b71551210/",
  },
  {
    name: "Mukhethwa Ravele",
    role: "Founder & Backend Engineering Lead",
    initials: "MR",
    bio: "Owns backend architecture, transit data pipelines, routing engine, and infrastructure, building a scalable, robust, and high-performance platform.",
    image:
      "https://res.cloudinary.com/kxv83rmw/image/upload/v1785755420/Mukhethwa_Team_Image_Four_ta8hu2.png",
    linkedin: "https://www.linkedin.com/in/mukhethwa-ravele/",
  },
]


export const FAQS = [
  {
    q: "What is Commuttr building today?",
    a: "Commuttr is an intelligent journey planning platform built for South African commuters. We help people discover routes, compare transport options, estimate journey costs, and navigate public transport with confidence.",
  },
  {
    q: "Which transport options are supported?",
    a: "Commuttr integrates route and schedule data across minibus taxis, bus networks (like MyCiTi and Golden Arrow), and Metrorail trains in one place.",
  },
  {
    q: "What is Commuttr's long-term vision?",
    a: "Commuttr is starting with intelligent journey planning, with a long-term vision of building a more connected digital mobility experience for South Africa.",
  },
  {
    q: "How do I join the waitlist?",
    a: "Click 'Join the Waitlist' today to be among the first commuters to test Commuttr's intelligent journey planner when we launch.",
  },
] as const

export const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/commuttr/posts/?feedView=all" },
  { label: "Instagram", href: "https://www.instagram.com/p/DbiYzVECBAw/" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61591064297485" },
] as const

export const CONTACT = {
  email: "hellocommuttr@gmail.com",
  hq: "Cape Town, Western Cape, South Africa",
  /** Formspree endpoint backing the contact form. Public by design. */
  formEndpoint: "https://formspree.io/f/mqerrlvz",
} as const
