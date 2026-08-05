import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The section header device — a small numbered eyebrow (mirroring the
 * corporate profile's 01–09 numbering) above a rounded-display title.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  sub,
  align = "left",
  className,
}: {
  index?: string
  eyebrow: string
  title: React.ReactNode
  sub?: React.ReactNode
  align?: "left" | "center"
  className?: string
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3",
          align === "center" && "justify-center"
        )}
      >
        {index && (
          <span className="font-mono text-sm font-medium text-signal">{index}</span>
        )}
        <span className="eyebrow text-mist">{eyebrow}</span>
      </div>
      <h2 className="display mt-4 text-3xl font-bold text-white sm:text-4xl md:text-[2.7rem]">
        {title}
      </h2>
      {sub && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{sub}</p>
      )}
    </div>
  )
}
