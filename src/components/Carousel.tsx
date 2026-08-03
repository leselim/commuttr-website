import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Scroll-snap carousel below `lg`, static grid from `lg` up.
 *
 * Native scrolling does the work — the dots only mirror scroll position and
 * scroll back to a slide when clicked, so touch momentum stays untouched.
 */
export function Carousel({
  label,
  slideLabels,
  gridClassName,
  children,
}: {
  /** Accessible name for the carousel as a whole. */
  label: string
  /** One label per slide, used for the dot buttons and slide announcements. */
  slideLabels: string[]
  /** Column classes applied from `lg` up, e.g. `lg:grid-cols-3`. */
  gridClassName: string
  children: React.ReactNode
}) {
  const trackRef = React.useRef<HTMLDivElement>(null)
  const [active, setActive] = React.useState(0)
  const slides = React.Children.toArray(children)
  const count = slides.length

  React.useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const slideWidth = track.scrollWidth / count
        if (!slideWidth) return
        setActive(
          Math.max(0, Math.min(count - 1, Math.round(track.scrollLeft / slideWidth)))
        )
      })
    }
    track.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      track.removeEventListener("scroll", onScroll)
    }
  }, [count])

  const goTo = (i: number) => {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({
      left: (track.scrollWidth / count) * i,
      behavior: "smooth",
    })
  }

  return (
    <>
      <div
        ref={trackRef}
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        className={cn(
          "no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 sm:-mx-6 sm:gap-6 sm:px-6 md:-mx-8 md:px-8",
          "lg:mx-0 lg:grid lg:overflow-visible lg:px-0",
          gridClassName
        )}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}: ${slideLabels[i] ?? ""}`}
            className="w-full shrink-0 snap-center lg:w-auto"
          >
            {slide}
          </div>
        ))}
      </div>

      {/* Dots are padded out to a full touch target; only the bar is visible. */}
      <div className="mt-6 flex items-center justify-center lg:hidden">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show ${slideLabels[i] ?? `slide ${i + 1}`}`}
            aria-current={active === i}
            className="group flex h-11 w-11 items-center justify-center"
          >
            <span
              className={cn(
                "block h-1.5 transition-all duration-300",
                active === i
                  ? "w-7 bg-[#f63d06]"
                  : "w-3 bg-white/25 group-hover:bg-white/40"
              )}
            />
          </button>
        ))}
      </div>
    </>
  )
}
