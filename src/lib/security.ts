import { SECURITY_CONFIG } from "@/data/content"

/**
 * Sanitizes user input string:
 * - Trims whitespace and removes dangerous control characters.
 * - Neutralizes Spreadsheet/Formula injection (=, +, -, @, tab, return).
 * - Enforces maximum character length limit.
 */
export function sanitizeInput(input: string, maxLength?: number): string {
  if (!input) return ""

  // 1. Convert to string and trim
  let val = String(input).trim()

  // 2. Remove invisible control characters (except standard newlines/tabs)
  // eslint-disable-next-line no-control-regex
  val = val.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")

  // 3. Neutralize CSV / Spreadsheet Formula Injection (CWE-1236)
  // If input starts with '=', '+', '-', '@', '\t', or '\r', strip or prefix with single quote
  if (/^[=+\-@\t\r]/.test(val)) {
    val = "'" + val
  }

  // 4. Truncate to maximum allowed length if specified
  if (maxLength && maxLength > 0 && val.length > maxLength) {
    val = val.slice(0, maxLength)
  }

  return val
}

/**
 * Validates email against RFC standards and length boundaries.
 */
export function validateEmail(email: string): boolean {
  if (!email || email.length > 254) return false
  // Strict standard email regex pattern
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

/**
 * In-memory fallback for rate-limiting when localStorage is inaccessible (e.g. private mode).
 */
const rateLimitMemoryStore = new Map<string, number>()

/**
 * Checks client-side rate limit cooldown (defaults to 60 seconds).
 */
export function checkClientRateLimit(
  key: string,
  cooldownSeconds = 60
): { allowed: boolean; remainingSeconds: number } {
  const storeKey = `cmtr_rl_${key.toLowerCase().replace(/[^a-z0-9_]/g, "_")}`
  const now = Date.now()
  let lastSubmitted = 0

  try {
    const val = localStorage.getItem(storeKey)
    if (val) lastSubmitted = parseInt(val, 10) || 0
  } catch {
    lastSubmitted = rateLimitMemoryStore.get(storeKey) || 0
  }

  if (lastSubmitted > 0) {
    const elapsedSeconds = Math.floor((now - lastSubmitted) / 1000)
    if (elapsedSeconds < cooldownSeconds) {
      return {
        allowed: false,
        remainingSeconds: cooldownSeconds - elapsedSeconds,
      }
    }
  }

  return { allowed: true, remainingSeconds: 0 }
}

/**
 * Records a successful submission timestamp for client-side rate limiting.
 */
export function recordClientSubmission(key: string): void {
  const storeKey = `cmtr_rl_${key.toLowerCase().replace(/[^a-z0-9_]/g, "_")}`
  const now = Date.now()

  try {
    localStorage.setItem(storeKey, String(now))
  } catch {
    rateLimitMemoryStore.set(storeKey, now)
  }
}

/**
 * Enforces single-line string formatting to prevent email header injection attacks.
 */
export function sanitizeSingleLine(input: string, maxLength?: number): string {
  const sanitized = sanitizeInput(input, maxLength)
  return sanitized.replace(/[\r\n]/g, " ")
}

/**
 * Constructs request payload augmented with origin metadata and authorization verification tokens.
 */
export function buildSecurePayload<T extends Record<string, unknown>>(data: T) {
  const origin =
    typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : "https://commuttr.co.za"

  return {
    ...data,
    _token: SECURITY_CONFIG.apiSecretToken,
    _origin: origin,
    _ts: Date.now(),
  }
}
