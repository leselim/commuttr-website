import * as React from "react"
import type { LucideIcon } from "lucide-react"
import {
  BatteryFull,
  CalendarDays,
  Compass,
  Navigation,
  Route,
  User,
  Wifi,
} from "lucide-react"

import { cn } from "@/lib/utils"

/* iOS-style status bar */
function StatusBar() {
  return (
    <div className="relative z-10 flex h-11 items-center justify-between px-6 pt-2 text-[11px] font-semibold text-white">
      <span className="font-semibold tracking-tight">9:41</span>
      <div className="flex items-center gap-1.5">
        <span className="flex items-end gap-0.5" aria-hidden>
          <span className="h-1.5 w-0.5 rounded-full bg-white/90" />
          <span className="h-2 w-0.5 rounded-full bg-white/90" />
          <span className="h-2.5 w-0.5 rounded-full bg-white/90" />
          <span className="h-3 w-0.5 rounded-full bg-white/50" />
        </span>
        <Wifi className="size-3.5" strokeWidth={2.5} />
        <BatteryFull className="size-4" strokeWidth={2} />
      </div>
    </div>
  )
}

const TABS: { icon: LucideIcon; label: string; raised?: boolean }[] = [
  { icon: Compass, label: "Explore" },
  { icon: Route, label: "Planner" },
  { icon: Navigation, label: "Go Live", raised: true },
  { icon: CalendarDays, label: "Schedules" },
  { icon: User, label: "Profile" },
]

export function AppTabBar({ active }: { active: number }) {
  return (
    <div className="relative mt-auto border-t border-white/[0.08] bg-[#0c0d10] px-3 pb-4 pt-2.5 backdrop-blur-md">
      <nav className="flex items-end justify-between">
        {TABS.map((tab, i) => {
          const Icon = tab.icon
          const isActive = i === active
          if (tab.raised) {
            return (
              <div key={tab.label} className="-mt-7 flex flex-col items-center">
                <span
                  className={cn(
                    "flex size-11 items-center justify-center rounded-full bg-[#f63d06] text-white shadow-md transition-transform active:scale-95",
                    isActive && "ring-2 ring-white/30 ring-offset-2 ring-offset-[#0c0d10]"
                  )}
                >
                  <Icon className="size-5" strokeWidth={2.4} />
                </span>
              </div>
            )
          }
          return (
            <div
              key={tab.label}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 text-[9.5px] font-medium transition-colors",
                isActive ? "text-[#f63d06] font-semibold" : "text-mist/70"
              )}
            >
              <Icon className="size-4.5" strokeWidth={isActive ? 2.5 : 2} />
              <span>{tab.label}</span>
            </div>
          )
        })}
      </nav>
      {/* Home bar indicator */}
      <div className="mx-auto mt-2.5 h-1 w-28 rounded-full bg-white/20" />
    </div>
  )
}

export function PhoneMockup({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("relative phone-mockup", className)}>
      <div className="relative mx-auto w-[300px] max-w-full rounded-[2.75rem] border border-white/15 bg-[#08080a] p-2.5 shadow-[0_24px_50px_rgba(0,0,0,0.85)] ring-1 ring-white/5">
        {/* Dynamic island */}
        <div className="absolute left-1/2 top-4 z-30 h-7 w-24 -translate-x-1/2 rounded-full bg-black ring-1 ring-white/[0.08]" />
        {/* Screen */}
        <div className="relative flex h-[620px] w-full flex-col overflow-hidden rounded-[2.25rem] bg-ink">
          <StatusBar />
          <div className="no-scrollbar flex flex-1 flex-col overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
