import * as React from "react"
import type { LucideIcon } from "lucide-react"
import {
  BatteryFull,
  House,
  Route,
  ScanLine,
  User,
  Wallet,
  Wifi,
} from "lucide-react"

import { cn } from "@/lib/utils"

/* iOS-style status bar */
function StatusBar() {
  return (
    <div className="relative z-10 flex h-11 items-center justify-between px-6 pt-1 text-[11px] font-semibold text-white">
      <span className="font-mono tracking-tight">9:41</span>
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
  { icon: House, label: "Home" },
  { icon: Route, label: "Trips" },
  { icon: ScanLine, label: "Pay", raised: true },
  { icon: Wallet, label: "Wallet" },
  { icon: User, label: "Profile" },
]

export function AppTabBar({ active }: { active: number }) {
  return (
    <div className="relative mt-auto border-t border-white/[0.06] bg-carbon/95 px-3 pb-5 pt-2.5 backdrop-blur">
      <nav className="flex items-end justify-between">
        {TABS.map((tab, i) => {
          const Icon = tab.icon
          const isActive = i === active
          if (tab.raised) {
            return (
              <div key={tab.label} className="-mt-7 flex flex-col items-center">
                <span
                  className={cn(
                    "flex size-12 items-center justify-center rounded-full signal-gradient text-primary-foreground shadow-[0_8px_20px_-4px_rgba(255,69,0,0.7)]",
                    isActive && "ring-2 ring-signal/40 ring-offset-2 ring-offset-carbon"
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
                "flex flex-1 flex-col items-center gap-1 text-[9px] font-medium",
                isActive ? "text-signal" : "text-mist/70"
              )}
            >
              <Icon className="size-5" strokeWidth={isActive ? 2.6 : 2} />
              <span>{tab.label}</span>
            </div>
          )
        })}
      </nav>
      <div className="mx-auto mt-3 h-1 w-28 rounded-full bg-white/25" />
    </div>
  )
}

export function PhoneMockup({
  children,
  className,
  glow = true,
}: {
  children: React.ReactNode
  className?: string
  glow?: boolean
}) {
  return (
    <div className={cn("relative", className)}>
      {glow && (
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -z-10 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/25 blur-[90px] animate-pulse-glow"
        />
      )}
      <div className="relative mx-auto w-[300px] max-w-full rounded-[2.75rem] border border-white/10 bg-[#050506] p-2.5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(255,255,255,0.04)]">
        {/* Dynamic island */}
        <div className="absolute left-1/2 top-4 z-30 h-7 w-24 -translate-x-1/2 rounded-full bg-black ring-1 ring-white/[0.06]" />
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
