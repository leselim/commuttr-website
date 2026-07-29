import {
  ArrowLeft,
  ArrowRightLeft,
  BusFront,
  ChevronRight,
  Footprints,
  MapPin,
  RefreshCw,
  SlidersHorizontal,
  Star,
  TrainFront,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { AppTabBar } from "./PhoneMockup"

/* ---------------- 1. Journey Screen: Route Options ---------------- */

const ROUTE_OPTIONS = [
  {
    icon: BusFront,
    iconBg: "bg-[#f63d06]",
    title: "MyCiTi T01 Express",
    times: "07:15 AM ➔ 07:57 AM",
    details: "52 min · 1 transfer · Civic Station",
    price: "R 16.00",
    status: "IN TRANSIT",
    statusColor: "text-emerald-400",
    highlight: true,
  },
  {
    icon: BusFront,
    iconBg: "bg-[#e11d48]",
    title: "MyCiTi D01",
    times: "07:22 AM ➔ 08:08 AM",
    details: "46 min · 0 transfers · Civic Station",
    price: "R 16.00",
    status: "DELAYED",
    statusColor: "text-amber-400",
    highlight: false,
  },
  {
    icon: TrainFront,
    iconBg: "bg-emerald-600",
    title: "Metrorail",
    times: "07:18 AM ➔ 08:05 AM",
    details: "47 min · 1 transfer · Cape Town",
    price: "R 14.00",
    status: "ON TIME",
    statusColor: "text-emerald-400",
    highlight: false,
  },
  {
    icon: Footprints,
    iconBg: "bg-indigo-600",
    title: "Walk + MyCiTi",
    times: "07:20 AM ➔ 08:12 AM",
    details: "52 min · 1 transfer · Civic Station",
    price: "R 16.00",
    status: "ON TIME",
    statusColor: "text-emerald-400",
    highlight: false,
  },
]

export function JourneyScreen() {
  return (
    <div className="flex flex-1 flex-col bg-[#0c0d10] text-white">
      <div className="flex flex-1 flex-col px-3.5 pt-2">
        {/* Top Header */}
        <header className="flex items-center justify-between py-1">
          <button className="flex size-7 items-center justify-center rounded-full text-mist transition-colors hover:text-white">
            <ArrowLeft className="size-4" />
          </button>
          <h2 className="text-[13px] font-bold tracking-tight text-white">Route options</h2>
          <button className="flex size-7 items-center justify-center rounded-full text-mist transition-colors hover:text-white">
            <Star className="size-4" />
          </button>
        </header>

        {/* Origin / Destination Search Card */}
        <div className="mt-2 rounded-2xl border border-white/[0.08] bg-[#14151a] p-2.5 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-1 flex-col gap-2 min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <span className="size-2 shrink-0 rounded-full bg-[#f63d06]" />
                <span className="truncate text-[11.5px] font-medium text-white">Current location</span>
              </div>
              <div className="flex items-center gap-2 min-w-0">
                <MapPin className="size-3.5 shrink-0 text-[#f63d06]" />
                <span className="truncate text-[11.5px] font-medium text-white">Cape Town Civic Centre</span>
              </div>
            </div>
            <button className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold text-mist hover:bg-white/[0.08] hover:text-white">
              Edit
            </button>
          </div>

          <div className="mt-2.5 flex items-center justify-between border-t border-white/[0.06] pt-2 text-[10.5px]">
            <button className="flex items-center gap-1 font-semibold text-mist">
              Depart now <span className="text-[9px]">▾</span>
            </button>
            <button className="flex items-center gap-1 font-semibold text-mist">
              <SlidersHorizontal className="size-3 text-[#f63d06]" /> Filter
            </button>
          </div>
        </div>

        {/* Section Title */}
        <p className="mt-2.5 text-[10.5px] font-bold uppercase tracking-wider text-[#f63d06]">
          Recommended
        </p>

        {/* Route Options Cards */}
        <div className="mt-1.5 space-y-2">
          {ROUTE_OPTIONS.map((r) => {
            const Icon = r.icon
            return (
              <div
                key={r.title}
                className={cn(
                  "flex items-center justify-between rounded-2xl border p-2.5 transition-colors",
                  r.highlight
                    ? "border-[#f63d06]/40 bg-[#f63d06]/[0.08]"
                    : "border-white/[0.06] bg-[#14151a]"
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-xl text-white shadow-sm",
                      r.iconBg
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1 leading-tight">
                    <div className="flex items-center justify-between gap-1.5">
                      <p className="truncate text-[12px] font-bold text-white">{r.title}</p>
                      {/* Text-only minimal status indicator */}
                      <span className={cn("text-[9px] font-bold uppercase tracking-wider shrink-0", r.statusColor)}>
                        {r.status}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] font-semibold text-white">{r.times}</p>
                    <div className="mt-0.5 flex items-center justify-between text-[9.5px] text-mist">
                      <span className="truncate">{r.details}</span>
                      <span className="font-bold text-white pl-1 shrink-0">{r.price}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="size-4 shrink-0 text-mist/60 ml-1.5" />
              </div>
            )
          })}
        </div>
      </div>
      <AppTabBar active={1} />
    </div>
  )
}

/* ---------------- 2. Navigation Screen: Route Details ---------------- */

export function NavigationScreen() {
  return (
    <div className="flex flex-1 flex-col bg-[#0c0d10] text-white">
      <div className="flex flex-1 flex-col px-3.5 pt-2">
        {/* Top Header */}
        <header className="flex items-center justify-between py-1">
          <button className="flex size-7 items-center justify-center rounded-full text-mist transition-colors hover:text-white">
            <ArrowLeft className="size-4" />
          </button>
          <h2 className="text-[13px] font-bold tracking-tight text-white">Route details</h2>
          <button className="flex size-7 items-center justify-center rounded-full text-mist transition-colors hover:text-white">
            <Star className="size-4" />
          </button>
        </header>

        {/* Summary Card */}
        <div className="mt-2 rounded-2xl border border-white/[0.08] bg-[#14151a] p-2.5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-[#f63d06] px-2.5 py-0.5 text-[10px] font-bold text-white">
              MyCiTi T01 Express
            </span>
            {/* Text-only minimal status indicator */}
            <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">
              IN TRANSIT
            </span>
          </div>

          <p className="mt-2 text-[14px] font-bold text-white">07:15 AM ➔ 07:57 AM</p>
          <div className="mt-1 flex items-center justify-between text-[10px] text-mist">
            <span>52 min · 1 transfer · Civic Station</span>
            <span className="font-bold text-white">R 16.00</span>
          </div>
        </div>

        {/* Timeline Stepper */}
        <div className="relative mt-3 flex-1 px-1">
          {/* Vertical Connecting Line */}
          <div
            aria-hidden
            className="absolute left-[17px] top-4 bottom-4 w-0.5 bg-white/15"
          />

          {/* Stepper Nodes */}
          <div className="space-y-4">
            {/* Step 1: Start Walk */}
            <div className="relative flex items-start gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#f63d06] text-white shadow-sm ring-4 ring-[#0c0d10]">
                <Footprints className="size-3" />
              </span>
              <div className="min-w-0 flex-1 pt-0.5 leading-tight">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[#f63d06]">07:15</span>
                  <p className="text-[11.5px] font-bold text-white">Current location</p>
                </div>
                <p className="mt-0.5 text-[10px] text-mist">Walk 600 m (7 min)</p>
              </div>
            </div>

            {/* Step 2: Bus Boarding Station Card */}
            <div className="relative flex items-start gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#f63d06] text-white shadow-sm ring-4 ring-[#0c0d10]">
                <BusFront className="size-3" />
              </span>
              <div className="min-w-0 flex-1 pt-0.5 leading-tight">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[#f63d06]">07:22</span>
                  <p className="text-[11.5px] font-bold text-white">Civic Centre Station</p>
                </div>
                
                {/* Station Leg Detail Card */}
                <div className="mt-1.5 rounded-xl border border-white/[0.08] bg-[#14151a] p-2">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#f63d06]/20 px-2 py-0.5 text-[9.5px] font-bold text-[#f63d06]">
                      MyCiTi T01 Express
                    </span>
                    {/* Text-only minimal status indicator */}
                    <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">IN TRANSIT</span>
                  </div>
                  <p className="mt-1 text-[9.5px] text-mist">Via St George&rsquo;s Mall · Final Step</p>
                </div>
              </div>
            </div>

            {/* Step 3: Transfer Station */}
            <div className="relative flex items-start gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-white/20 bg-[#14151a] text-white ring-4 ring-[#0c0d10]">
                <ArrowRightLeft className="size-3" />
              </span>
              <div className="min-w-0 flex-1 pt-0.5 leading-tight">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-mist">07:45</span>
                  <p className="text-[11.5px] font-semibold text-white">Civic Station</p>
                </div>
                <p className="mt-0.5 text-[10px] text-mist">Transfer 4 min</p>
              </div>
            </div>

            {/* Step 4: Final Destination Pin */}
            <div className="relative flex items-start gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#f63d06] text-white shadow-sm ring-4 ring-[#0c0d10]">
                <MapPin className="size-3" />
              </span>
              <div className="min-w-0 flex-1 pt-0.5 leading-tight">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[#f63d06]">07:57</span>
                  <p className="text-[11.5px] font-bold text-white">Cape Town Civic Centre</p>
                </div>
                <p className="mt-0.5 text-[10px] text-mist">Final destination</p>
              </div>
            </div>
          </div>
        </div>

        {/* Start Navigation CTA */}
        <button className="mt-2.5 w-full rounded-full bg-[#f63d06] py-2.5 text-center text-[12px] font-bold text-white shadow-md transition-colors hover:bg-[#f63d06]/90">
          Start navigation
        </button>
      </div>
      <AppTabBar active={2} />
    </div>
  )
}

/* ---------------- 3. Schedules Screen: Station Board ---------------- */

const STATION_DEPARTURES = [
  {
    icon: BusFront,
    iconBg: "bg-[#f63d06]",
    route: "MyCiTi T01 Express",
    dest: "Table View · Platform D",
    status: "IN TRANSIT",
    statusColor: "text-emerald-400",
    time: "2 min",
  },
  {
    icon: BusFront,
    iconBg: "bg-[#e11d48]",
    route: "MyCiTi D01",
    dest: "Woodstock · Platform C",
    status: "DELAYED",
    statusColor: "text-amber-400",
    time: "8 min",
  },
  {
    icon: TrainFront,
    iconBg: "bg-emerald-600",
    route: "Metrorail",
    dest: "Bellville · Platform A",
    status: "ON TIME",
    statusColor: "text-emerald-400",
    time: "12 min",
  },
  {
    icon: BusFront,
    iconBg: "bg-amber-600",
    route: "Golden Arrow 106",
    dest: "Sea Point · Platform B",
    status: "ON TIME",
    statusColor: "text-emerald-400",
    time: "15 min",
  },
]

export function SchedulesScreen() {
  return (
    <div className="flex flex-1 flex-col bg-[#0c0d10] text-white">
      <div className="flex flex-1 flex-col px-3.5 pt-2">
        {/* Top Header */}
        <header className="flex items-center justify-between py-1">
          <button className="flex size-7 items-center justify-center rounded-full text-mist transition-colors hover:text-white">
            <ArrowLeft className="size-4" />
          </button>
          <h2 className="text-[13px] font-bold tracking-tight text-white">Station board</h2>
          <button className="flex size-7 items-center justify-center rounded-full text-mist transition-colors hover:text-white">
            <RefreshCw className="size-3.5" />
          </button>
        </header>

        {/* Station Title Header */}
        <div className="mt-2 leading-tight">
          <p className="text-[10px] font-semibold text-mist">Real-Time Station Board</p>
          <h3 className="text-[14px] font-bold text-white">Cape Town Civic Centre</h3>
          <p className="mt-0.5 text-[9.5px] text-mist/70">Updated just now</p>
        </div>

        {/* Mode Filter Pills */}
        <div className="mt-2.5 flex items-center gap-1.5 text-[10px]">
          <span className="rounded-full bg-[#f63d06] px-3 py-1 font-bold text-white shadow-sm">
            All
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-medium text-mist">
            MyCiTi
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-medium text-mist">
            Metrorail
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-medium text-mist">
            Golden Arrow
          </span>
        </div>

        {/* Departure Board Items */}
        <div className="mt-3 space-y-2">
          {STATION_DEPARTURES.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.route}
                className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-[#14151a] p-2.5"
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-xl text-white shadow-sm",
                      s.iconBg
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1 leading-tight">
                    <div className="flex items-center justify-between gap-1">
                      <p className="truncate text-[12px] font-bold text-white">{s.route}</p>
                      {/* Text-only minimal status indicator */}
                      <span className={cn("text-[9px] font-bold uppercase tracking-wider shrink-0", s.statusColor)}>
                        {s.status}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-[10px] text-mist">{s.dest}</p>
                  </div>
                </div>

                <div className="pl-3 text-right shrink-0">
                  <span className="text-[12.5px] font-bold text-white">{s.time}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* View Full Timetable Link */}
        <button className="mt-3 flex items-center justify-center gap-1 text-[10.5px] font-semibold text-mist hover:text-white">
          View full timetable <ChevronRight className="size-3" />
        </button>
      </div>
      <AppTabBar active={3} />
    </div>
  )
}
