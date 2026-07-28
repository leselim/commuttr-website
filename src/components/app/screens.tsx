import * as React from "react"
import {
  ArrowDownLeft,
  Bell,
  BusFront,
  Car,
  ChevronRight,
  Clock,
  CreditCard,
  MapPin,
  Plus,
  ScanLine,
  Send,
  TrainFront,
  Zap,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { AppTabBar } from "./PhoneMockup"

/* ---------------- shared bits ---------------- */

function Avatar({ initials }: { initials: string }) {
  return (
    <span className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-surface-2 to-black text-[11px] font-semibold text-white ring-1 ring-white/10">
      {initials}
    </span>
  )
}

function IconChip({
  children,
  label,
}: {
  children: React.ReactNode
  label: string
}) {
  return (
    <button className="flex flex-col items-center gap-1.5">
      <span className="flex size-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-signal">
        {children}
      </span>
      <span className="text-[10px] font-medium text-mist">{label}</span>
    </button>
  )
}

/* ---------------- Wallet screen ---------------- */

const TRIPS = [
  {
    icon: BusFront,
    title: "MyCiTi · Table View",
    meta: "Today · 07:42",
    amount: "−R 13.50",
    inflow: false,
  },
  {
    icon: Car,
    title: "Minibus taxi · Wynberg",
    meta: "Yesterday · 17:20",
    amount: "−R 12.00",
    inflow: false,
  },
  {
    icon: ArrowDownLeft,
    title: "Top up · Capitec",
    meta: "Mon · 08:05",
    amount: "+R 200.00",
    inflow: true,
  },
]

export function WalletScreen() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 overflow-hidden px-5 pt-1">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Avatar initials="TN" />
            <div className="leading-tight">
              <p className="text-[11px] text-mist">Good morning</p>
              <p className="text-sm font-semibold text-white">Thandi N.</p>
            </div>
          </div>
          <button className="relative flex size-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white">
            <Bell className="size-4" />
            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-signal" />
          </button>
        </header>

        {/* Balance card */}
        <div className="relative mt-4 overflow-hidden rounded-2xl signal-gradient p-4 text-black">
          <div
            aria-hidden
            className="absolute -right-6 -top-10 size-28 rounded-full bg-white/20 blur-xl"
          />
          <p className="text-[11px] font-semibold uppercase tracking-wider text-black/60">
            Wallet balance
          </p>
          <p className="mt-1 font-mono text-[28px] font-bold leading-none tracking-tight">
            R 480.50
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="font-mono text-xs text-black/70">•••• 4021</span>
            <span className="flex items-center gap-1 rounded-full bg-black/85 px-3 py-1 text-[11px] font-semibold text-white">
              <Plus className="size-3.5" /> Top up
            </span>
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-4 grid grid-cols-4">
          <IconChip label="Top up">
            <Plus className="size-5" />
          </IconChip>
          <IconChip label="Scan">
            <ScanLine className="size-5" />
          </IconChip>
          <IconChip label="Send">
            <Send className="size-5" />
          </IconChip>
          <IconChip label="Cards">
            <CreditCard className="size-5" />
          </IconChip>
        </div>

        {/* Recent trips */}
        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm font-semibold text-white">Recent trips</p>
          <button className="flex items-center text-[11px] text-mist">
            See all <ChevronRight className="size-3.5" />
          </button>
        </div>
        <div className="mt-2 space-y-1.5">
          {TRIPS.map((t) => {
            const Icon = t.icon
            return (
              <div
                key={t.title}
                className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2.5"
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-white/[0.05] text-white">
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1 leading-tight">
                  <p className="truncate text-[12.5px] font-medium text-white">
                    {t.title}
                  </p>
                  <p className="text-[10.5px] text-mist">{t.meta}</p>
                </div>
                <span
                  className={cn(
                    "font-mono text-[12.5px] font-semibold",
                    t.inflow ? "text-emerald-400" : "text-white"
                  )}
                >
                  {t.amount}
                </span>
              </div>
            )
          })}
        </div>
      </div>
      <AppTabBar active={0} />
    </div>
  )
}

/* ---------------- Pay screen ---------------- */

function QrCode() {
  const n = 25
  const cells: React.ReactNode[] = []
  const inFinder = (x: number, y: number) => {
    const box = (bx: number, by: number) =>
      x >= bx && x < bx + 7 && y >= by && y < by + 7
    return box(0, 0) || box(0, n - 7) || box(n - 7, 0)
  }
  const inLogo = (x: number, y: number) => x >= 10 && x <= 14 && y >= 10 && y <= 14
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (inFinder(x, y) || inLogo(x, y)) continue
      if ((x * 7 + y * 13 + x * y * 3) % 5 < 2) {
        cells.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} />)
      }
    }
  }
  const Finder = ({ ox, oy }: { ox: number; oy: number }) => (
    <>
      <rect x={ox} y={oy} width={7} height={7} rx={1.6} fill="#0a0a0b" />
      <rect x={ox + 1} y={oy + 1} width={5} height={5} rx={1} fill="#fff" />
      <rect x={ox + 2} y={oy + 2} width={3} height={3} rx={0.6} fill="#0a0a0b" />
    </>
  )
  return (
    <svg viewBox="0 0 25 25" className="size-full" shapeRendering="crispEdges">
      <g fill="#0a0a0b">{cells}</g>
      <Finder ox={0} oy={0} />
      <Finder ox={n - 7} oy={0} />
      <Finder ox={0} oy={n - 7} />
      <rect x={10} y={10} width={5} height={5} rx={1.2} fill="#ff4500" />
      <circle cx={12.5} cy={12.5} r={0.9} fill="#fff" />
    </svg>
  )
}

export function PayScreen() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col px-5 pt-1">
        <header className="flex items-center justify-center">
          <p className="text-sm font-semibold text-white">Pay for your trip</p>
        </header>

        {/* Segmented control */}
        <div className="mx-auto mt-4 flex w-44 rounded-full border border-white/[0.08] bg-white/[0.03] p-1 text-[11px] font-medium">
          <span className="flex-1 rounded-full bg-white py-1.5 text-center text-black">
            QR code
          </span>
          <span className="flex-1 py-1.5 text-center text-mist">Tap</span>
        </div>

        {/* QR card */}
        <div className="mx-auto mt-5 w-full max-w-[220px] rounded-3xl bg-white p-5 shadow-[0_20px_50px_-20px_rgba(255,69,0,0.5)]">
          <QrCode />
        </div>
        <p className="mx-auto mt-3 max-w-[190px] text-center text-[11px] leading-relaxed text-mist">
          Show this to the driver or hold it to the reader to pay instantly.
        </p>

        {/* Fare summary */}
        <div className="mt-auto space-y-2 pb-1">
          <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
            <span className="flex size-9 items-center justify-center rounded-full bg-signal/12 text-signal">
              <BusFront className="size-4" />
            </span>
            <div className="flex-1 leading-tight">
              <p className="text-[12.5px] font-medium text-white">
                MyCiTi · Route T01
              </p>
              <p className="text-[10.5px] text-mist">Adult · single fare</p>
            </div>
            <span className="font-mono text-sm font-semibold text-white">
              R 13.50
            </span>
          </div>
          <button className="flex h-12 w-full items-center justify-center gap-2 rounded-full signal-gradient text-sm font-semibold text-primary-foreground">
            Confirm & pay R 13.50
          </button>
        </div>
      </div>
      <AppTabBar active={2} />
    </div>
  )
}

/* ---------------- Journey screen ---------------- */

function RouteMap() {
  return (
    <svg viewBox="0 0 300 150" className="h-full w-full">
      <rect width="300" height="150" fill="#101013" />
      {/* city blocks */}
      <g fill="rgba(255,255,255,0.03)">
        <rect x="14" y="16" width="52" height="34" rx="4" />
        <rect x="80" y="10" width="46" height="30" rx="4" />
        <rect x="150" y="18" width="60" height="26" rx="4" />
        <rect x="228" y="12" width="52" height="40" rx="4" />
        <rect x="20" y="96" width="58" height="40" rx="4" />
        <rect x="120" y="104" width="60" height="34" rx="4" />
        <rect x="214" y="98" width="66" height="42" rx="4" />
      </g>
      {/* faint streets */}
      <g stroke="rgba(255,255,255,0.06)" strokeWidth="1">
        <line x1="0" y1="70" x2="300" y2="66" />
        <line x1="108" y1="0" x2="112" y2="150" />
        <line x1="205" y1="0" x2="208" y2="150" />
      </g>
      {/* route glow + line */}
      <path
        d="M40 118 C 90 118, 96 60, 150 58 S 236 40, 264 30"
        fill="none"
        stroke="rgba(255,69,0,0.25)"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M40 118 C 90 118, 96 60, 150 58 S 236 40, 264 30"
        fill="none"
        stroke="#ff4500"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* mid stop */}
      <circle cx="150" cy="58" r="4" fill="#0a0a0b" stroke="#ff4500" strokeWidth="2.5" />
      {/* origin */}
      <circle cx="40" cy="118" r="6" fill="#0a0a0b" stroke="#fff" strokeWidth="3" />
      {/* destination pin */}
      <g transform="translate(264 30)">
        <circle r="9" fill="#ff4500" />
        <circle r="3" fill="#fff" />
      </g>
    </svg>
  )
}

const ROUTES = [
  {
    icon: BusFront,
    mode: "MyCiTi bus",
    time: "42 min",
    fare: "R 15.00",
    depart: "Departs 07:15",
    tag: "Fastest",
    highlight: true,
  },
  {
    icon: TrainFront,
    mode: "Metrorail",
    time: "55 min",
    fare: "R 10.50",
    depart: "Departs 07:20",
    tag: "Cheapest",
    highlight: false,
  },
]

export function JourneyScreen() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col px-5 pt-1">
        <header className="flex items-center justify-center">
          <p className="text-sm font-semibold text-white">Plan a journey</p>
        </header>

        {/* From / To */}
        <div className="relative mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3">
          <div className="flex items-center gap-3 pb-2.5">
            <span className="size-2.5 rounded-full border-2 border-white" />
            <span className="text-[12.5px] font-medium text-white">Khayelitsha</span>
          </div>
          <div className="ml-[4px] h-px w-[calc(100%-8px)] bg-white/[0.08]" />
          <div className="flex items-center gap-3 pt-2.5">
            <MapPin className="size-3.5 text-signal" />
            <span className="text-[12.5px] font-medium text-white">Cape Town CBD</span>
          </div>
          <span className="absolute left-[18px] top-1/2 -my-2 h-4 w-px -translate-y-1/2 bg-white/15" />
        </div>

        {/* Map */}
        <div className="mt-3 overflow-hidden rounded-2xl border border-white/[0.06]">
          <div className="h-[130px] w-full">
            <RouteMap />
          </div>
        </div>

        {/* Options */}
        <p className="mt-4 text-[11px] font-medium uppercase tracking-wider text-mist">
          3 routes found
        </p>
        <div className="mt-2 space-y-2">
          {ROUTES.map((r) => {
            const Icon = r.icon
            return (
              <div
                key={r.mode}
                className={cn(
                  "flex items-center gap-3 rounded-xl border px-3 py-2.5",
                  r.highlight
                    ? "border-signal/40 bg-signal/[0.07]"
                    : "border-white/[0.06] bg-white/[0.02]"
                )}
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-white/[0.06] text-signal">
                  <Icon className="size-4" />
                </span>
                <div className="flex-1 leading-tight">
                  <p className="text-[12.5px] font-medium text-white">{r.mode}</p>
                  <p className="flex items-center gap-1 text-[10.5px] text-mist">
                    <Clock className="size-3" /> {r.depart}
                  </p>
                </div>
                <div className="text-right leading-tight">
                  <p className="font-mono text-[12.5px] font-semibold text-white">
                    {r.time}
                  </p>
                  <p className="flex items-center justify-end gap-1 text-[10.5px] text-signal-glow">
                    {r.highlight && <Zap className="size-3" />} {r.fare}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <AppTabBar active={1} />
    </div>
  )
}
