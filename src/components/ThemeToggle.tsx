import * as React from "react"
import { Moon, Sun } from "lucide-react"

import { useTheme } from "@/lib/theme"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
  showLabel?: boolean
}

export function ThemeToggle({ className, showLabel = false }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={cn(
          "flex size-9 items-center justify-center rounded-none border border-border bg-card text-foreground transition-colors hover:border-signal/50 hover:text-signal",
          className
        )}
      >
        <span className="size-4" />
      </button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "group relative flex items-center justify-center rounded-none border border-border bg-card/60 p-2 text-foreground transition-all duration-300 hover:border-signal/50 hover:bg-card hover:text-signal focus-visible:ring-1 focus-visible:ring-signal",
        showLabel ? "w-full gap-2.5 px-3 py-2 text-sm" : "size-9",
        className
      )}
    >
      <div className="relative flex size-4 items-center justify-center">
        <Sun
          className={cn(
            "absolute size-4 transition-all duration-300",
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100 text-amber-500"
          )}
        />
        <Moon
          className={cn(
            "absolute size-4 transition-all duration-300",
            isDark
              ? "rotate-0 scale-100 opacity-100 text-signal"
              : "-rotate-90 scale-0 opacity-0"
          )}
        />
      </div>
      {showLabel && (
        <span className="font-medium text-foreground">
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </button>
  )
}
