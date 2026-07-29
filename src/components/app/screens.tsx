import {
  Bell,
  BusFront,
  CalendarDays,
  Car,
  Clock,
  Footprints,
  MapPin,
  Navigation,
  SlidersHorizontal,
  TrainFront,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { AppTabBar } from "./PhoneMockup"

/* ---------------- Shared UI Components ---------------- */

function Avatar({ initials }: { initials: string }) {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#1c1d22] text-[11px] font-bold text-white ring-1 ring-white/15">
      {initials}
    </span>
  )
}

function RouteMap() {
  return (
    <svg viewBox="0 0 300 150" className="h-full w-full">
      <rect width="300" height="150" fill="#101013" />
      {/* City grid blocks */}
      <g fill="rgba(255,255,255,0.035)">
        <rect x="14" y="16" width="52" height="34" rx="4" />
        <rect x="80" y="10" width="46" height="30" rx="4" />
        <rect x="150" y="18" width="60" height="26" rx="4" />
        <rect x="228" y="12" width="52" height="40" rx="4" />
        <rect x="20" y="96" width="58" height="40" rx="4" />
        <rect x="120" y="104" width="60" height="34" rx="4" />
        <rect x="214" y="98" width="66" height="42" rx="4" />
      </g>
      {/* Road network */}
      <g stroke="rgba(255,255,255,0.06)" strokeWidth="1">
        <line x1="0" y1="70" x2="300" y2="66" />
        <line x1="108" y1="0" x2="112" y2="150" />
        <line x1="205" y1="0" x2="208" y2="150" />
      </g>
      {/* Active route polyline */}
      <path
        d="M40 118 C 90 118, 96 60, 150 58 S 236 40, 264 30"
        fill="none"
        stroke="rgba(246,61,6,0.25)"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M40 118 C 90 118, 96 60, 150 58 S 236 40, 264 30"
        fill="none"
        stroke="#f63d06"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Mid stop / transit transfer */}
      <circle cx="150" cy="58" r="4.5" fill="#0a0a0b" stroke="#f63d06" strokeWidth="2.5" />
      {/* Origin node */}
      <circle cx="40" cy="118" r="6" fill="#0a0a0b" stroke="#fff" strokeWidth="3" />
      {/* Destination pin */}
      <g transform="translate(264 30)">
        <circle r="9" fill="#f63d06" />
        <circle r="3" fill="#fff" />
      </g>
    </svg>
  )
}

/* ---------------- 1. Journey Planner Screen ---------------- */

const ROUTES = [
  {
    icon: BusFront,
    mode: "MyCiTi T01 Express",
    times: "07:15 ➔ 07:57 AM",
    duration: "42 min",
    details: "Direct · 300m walk",
    fare: "R 24.50",
    tag: "RECOMMENDED",
    status: "On time",
    highlight: true,
  },
  {
    icon: TrainFront,
    mode: "Metrorail Line 1",
    times: "07:20 ➔ 08:12 AM",
    duration: "52 min",
    details: "1 transfer · Civic Station",
    fare: "R 16.00",
    tag: "ECO OPTION",
    status: "On time",
    highlight: false,
  },
  {
    icon: Car,
    mode: "Minibus Taxi + Feeder",
    times: "07:10 ➔ 07:48 AM",
    duration: "38 min",
    details: "Express · Taxi Rank Bay 2",
    fare: "R 28.00",
    tag: "FASTEST",
    status: "On time",
    highlight: false,
  },
]

export function JourneyScreen() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col px-3.5 pt-2">
        {/* User Header */}
        <header className="flex items-center justify-between gap-2 py-1">
          <div className="flex items-center gap-2.5 min-w-0">
            <Avatar initials="LM" />
            <div className="leading-tight min-w-0">
              <p className="text-[10px] font-medium text-mist">Plan a route</p>
              <p className="text-[12.5px] font-bold text-white truncate">Leseli Morakile</p>
            </div>
          </div>
          <button className="relative flex size-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-colors hover:bg-white/[0.08]">
            <Bell className="size-3.5" />
            <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-[#f63d06]" />
          </button>
        </header>

        {/* Origin & Destination Card */}
        <div className="mt-2 rounded-2xl border border-white/[0.08] bg-[#121316] p-3 shadow-sm">
          <div className="flex items-center gap-2.5">
            <span className="flex size-4 shrink-0 items-center justify-center">
              <span className="size-2 rounded-full bg-[#f63d06]" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[9.5px] font-medium uppercase tracking-wider text-mist">From</p>
              <p className="truncate text-[12px] font-semibold text-white">Khayelitsha Central</p>
            </div>
          </div>

          <div className="my-1 ml-[7px] h-2.5 border-l border-dashed border-white/25" />

          <div className="flex items-center gap-2.5">
            <span className="flex size-4 shrink-0 items-center justify-center">
              <MapPin className="size-3.5 text-[#f63d06]" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[9.5px] font-medium uppercase tracking-wider text-mist">To</p>
              <p className="truncate text-[12px] font-semibold text-white">Cape Town CBD (Civic)</p>
            </div>
          </div>
        </div>

        {/* Mode Filter Chips */}
        <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[10.5px]">
          <span className="flex items-center gap-1 rounded-full bg-white px-3 py-1 font-bold text-black shadow-sm shrink-0">
            All Modes
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-medium text-mist shrink-0">
            <BusFront className="size-3 text-[#f63d06]" /> Bus
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-medium text-mist shrink-0">
            <TrainFront className="size-3 text-[#f63d06]" /> Train
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-medium text-mist shrink-0">
            <Car className="size-3 text-[#f63d06]" /> Taxi
          </span>
        </div>

        {/* Section Header */}
        <div className="mt-3 flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-wider text-mist">
            3 Routes Available
          </p>
          <span className="flex items-center gap-1 text-[10px] font-semibold text-[#f63d06]">
            <SlidersHorizontal className="size-3" /> Filter
          </span>
        </div>

        {/* Redesigned Trip Cards */}
        <div className="mt-2 space-y-2">
          {ROUTES.map((r) => {
            const Icon = r.icon
            return (
              <div
                key={r.mode}
                className={cn(
                  "rounded-2xl border p-3 transition-colors",
                  r.highlight
                    ? "border-[#f63d06]/40 bg-[#f63d06]/[0.08]"
                    : "border-white/[0.08] bg-[#121316]"
                )}
              >
                {/* Top Badge Row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[#f63d06]">
                      <Icon className="size-3.5" />
                    </span>
                    <p className="truncate text-[12px] font-bold text-white">{r.mode}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {r.highlight && (
                      <span className="rounded-full bg-[#f63d06]/20 border border-[#f63d06]/30 px-2 py-0.5 text-[8.5px] font-bold uppercase tracking-wider text-[#f63d06]">
                        {r.tag}
                      </span>
                    )}
                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[8.5px] font-semibold text-emerald-400">
                      <span className="size-1 rounded-full bg-emerald-400" />
                      {r.status}
                    </span>
                  </div>
                </div>

                {/* Departure / Arrival Times */}
                <div className="mt-2.5 flex items-baseline justify-between border-t border-white/[0.06] pt-2">
                  <div>
                    <p className="text-[13px] font-bold text-white">{r.times}</p>
                    <p className="mt-0.5 text-[10px] text-mist flex items-center gap-1">
                      <Clock className="size-3" /> {r.duration} · {r.details}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="rounded-lg bg-white/[0.06] border border-white/10 px-2.5 py-1 text-[11px] font-bold text-white">
                      {r.fare}
                    </span>
                  </div>
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

/* ---------------- 2. Live Navigation Screen ---------------- */

export function NavigationScreen() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col px-3.5 pt-2">
        {/* Navigation Header */}
        <header className="flex items-center justify-between gap-3 py-1">
          <p className="truncate text-[12.5px] font-bold tracking-tight text-white">
            Live Navigation
          </p>
          <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[9.5px] font-semibold text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Tracking
          </span>
        </header>

        {/* Live map header block */}
        <div className="relative mt-2 overflow-hidden rounded-2xl border border-white/[0.08]">
          <div className="h-[125px] w-full">
            <RouteMap />
          </div>
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between rounded-xl border border-white/10 bg-carbon/90 px-3 py-2 backdrop-blur-md">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider text-mist">Estimated Arrival</p>
              <p className="text-[12.5px] font-bold text-white">07:57 AM <span className="text-[10px] font-normal text-[#f63d06]">(18m remaining)</span></p>
            </div>
            <span className="flex size-8 items-center justify-center rounded-lg bg-[#f63d06] text-white shadow-sm">
              <Navigation className="size-4" />
            </span>
          </div>
        </div>

        {/* Active route legs timeline */}
        <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-mist">
          Active Trip Steps
        </p>

        <div className="relative mt-2 space-y-2.5">
          {/* Vertical connecting line */}
          <div
            aria-hidden
            className="absolute left-[15px] top-4 bottom-4 w-0.5 border-l border-dashed border-white/20"
          />

          {/* Leg 1: Active Bus Leg */}
          <div className="relative z-10 rounded-2xl border border-[#f63d06]/40 bg-[#f63d06]/[0.08] p-3 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#f63d06] text-white shadow-sm ring-2 ring-ink">
                <BusFront className="size-3.5" />
              </span>
              <div className="min-w-0 flex-1 leading-tight">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[12px] font-bold text-white truncate">MyCiTi T01 Express</p>
                  <span className="rounded bg-[#f63d06]/20 border border-[#f63d06]/30 px-1.5 py-0.5 text-[8.5px] font-bold uppercase tracking-wider text-[#f63d06] shrink-0">
                    IN TRANSIT
                  </span>
                </div>
                <p className="mt-1 text-[10.5px] text-mist truncate">
                  Platform 3 · Civic Centre Station
                </p>
                
                {/* Step progress bar */}
                <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-white/[0.08] pt-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-3/4 rounded-full bg-[#f63d06]" />
                  </div>
                  <span className="text-[9.5px] font-semibold text-mist shrink-0">4 stops left</span>
                </div>
              </div>
            </div>
          </div>

          {/* Leg 2: Redesigned Walking Leg */}
          <div className="relative z-10 rounded-2xl border border-white/[0.08] bg-[#121316] p-3">
            <div className="flex items-start gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-white ring-2 ring-ink">
                <Footprints className="size-3.5" />
              </span>
              <div className="min-w-0 flex-1 leading-tight">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[12px] font-bold text-white truncate">
                    Walk to Destination
                  </p>
                  <span className="rounded-lg bg-white/[0.06] border border-white/10 px-2 py-0.5 text-[10px] font-bold text-white shrink-0">
                    300m · 4 min
                  </span>
                </div>
                <p className="mt-1 text-[10.5px] font-medium text-mist truncate">
                  Via St George&rsquo;s Mall · Final Leg
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AppTabBar active={2} />
    </div>
  )
}

/* ---------------- 3. Station Departure Schedules Screen ---------------- */

const SCHEDULES = [
  {
    modeIcon: BusFront,
    route: "MyCiTi T01 Express",
    dest: "Waterfront Civic",
    time: "In 2 min",
    departs: "07:14 AM",
    platform: "Platform 1",
    status: "On Time",
    load: "Seats free",
    highlight: true,
  },
  {
    modeIcon: BusFront,
    route: "Golden Arrow 104",
    dest: "Bellville Station",
    time: "In 7 min",
    departs: "07:19 AM",
    platform: "Bay 4",
    status: "On Time",
    load: "Medium load",
    highlight: false,
  },
  {
    modeIcon: TrainFront,
    route: "Southern Line 01",
    dest: "Simon's Town",
    time: "In 13 min",
    departs: "07:25 AM",
    platform: "Platform 6",
    status: "On Time",
    load: "Seats free",
    highlight: false,
  },
  {
    modeIcon: BusFront,
    route: "MyCiTi 101 Feeder",
    dest: "Camps Bay",
    time: "In 20 min",
    departs: "07:32 AM",
    platform: "Platform 2",
    status: "On Time",
    load: "Seats free",
    highlight: false,
  },
]

export function SchedulesScreen() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col px-3.5 pt-2">
        {/* Header */}
        <header className="flex items-center justify-between gap-2 py-1">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-medium text-mist">Real-Time Station Board</p>
            <p className="text-[12.5px] font-bold text-white truncate">Cape Town Civic Centre ▾</p>
          </div>
          <span className="flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[9.5px] font-semibold text-mist">
            <CalendarDays className="size-3 text-[#f63d06]" /> Live Board
          </span>
        </header>

        {/* Live departure ticker card */}
        <div className="mt-2 rounded-xl border border-[#f63d06]/20 bg-[#f63d06]/10 px-3 py-2 text-[11px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white min-w-0">
              <span className="size-2 shrink-0 rounded-full bg-[#f63d06] animate-ping" />
              <span className="font-bold text-[11.5px] truncate">Transit Network Active</span>
            </div>
            <span className="text-[9.5px] font-medium text-mist shrink-0">Updated 10s ago</span>
          </div>
        </div>

        {/* Departure Board List */}
        <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-mist">
          Upcoming Departures
        </p>

        <div className="mt-2 space-y-2">
          {SCHEDULES.map((s) => {
            const Icon = s.modeIcon
            return (
              <div
                key={s.route}
                className={cn(
                  "flex items-center justify-between rounded-2xl border p-3 transition-colors",
                  s.highlight
                    ? "border-[#f63d06]/40 bg-[#f63d06]/[0.08]"
                    : "border-white/[0.06] bg-[#121316]"
                )}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[#f63d06]">
                    <Icon className="size-4" />
                  </span>
                  <div className="flex-1 leading-tight min-w-0">
                    <p className="truncate text-[12px] font-bold text-white">{s.route}</p>
                    <p className="mt-0.5 truncate text-[10.5px] text-mist">
                      ➔ {s.dest} · {s.platform}
                    </p>
                  </div>
                </div>

                <div className="text-right leading-tight pl-2 shrink-0">
                  <span className="text-[12px] font-bold text-[#f63d06]">{s.time}</span>
                  <p className="mt-0.5 text-[9.5px] font-semibold text-emerald-400">{s.departs}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <AppTabBar active={3} />
    </div>
  )
}
