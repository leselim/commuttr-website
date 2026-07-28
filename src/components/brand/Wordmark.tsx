import { cn } from "@/lib/utils"

/** The Commuttr wordmark — lowercase Poppins with the signature signal dot. */
export function Wordmark({
  className,
  dotClassName,
}: {
  className?: string
  dotClassName?: string
}) {
  return (
    <span
      className={cn(
        "font-display text-xl font-extrabold lowercase tracking-tight text-white",
        className
      )}
    >
      commuttr<span className={cn("text-signal", dotClassName)}>.</span>
    </span>
  )
}
