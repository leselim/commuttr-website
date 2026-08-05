declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export const GA_MEASUREMENT_ID = "G-N90WD35ND1"

/**
 * Tracks a custom GA4 event.
 */
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params)
  }
}

/**
 * Tracks a pageview manually for SPA route changes.
 */
export function trackPageView(path: string, title?: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title || document.title,
    })
  }
}
