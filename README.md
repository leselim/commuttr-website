# Commuttr — marketing site

The marketing website for **Commuttr**, South Africa's unified digital mobility
ecosystem — one app to store funds, pay fares with a tap, and plan every journey.

A dark, fintech-styled single-page site built from the corporate profile's brand
system: near-black canvas, the vermilion `#FF4500` "signal" accent (the dot in the
wordmark), rounded-geometric display type, and wide-tracked section numbering.

The centrepiece is a **phone mockup with a live app UI** — the mobility wallet,
tap-to-pay (QR) and journey-planner screens are rendered as real components, not
flat images.

## Stack

- **Vite 8** + **React 19** (React Compiler) + **TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/vite`), design tokens in `src/index.css`
- **shadcn/ui**-style primitives (Radix + cva) in `src/components/ui`
- **lucide-react** icons

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:5173
```

## Build

```bash
pnpm build      # tsc -b && vite build  →  dist/
pnpm preview    # preview the production build
```

## Structure

```
src/
  App.tsx                     # page composition (section order)
  index.css                   # design tokens + base styles (the "design system")
  data/content.ts             # all copy, pulled from the corporate profile
  components/
    ui/                       # shadcn primitives (button, card, badge, accordion…)
    app/                      # PhoneMockup + the three live app screens
    brand/Wordmark.tsx        # the commuttr. wordmark
    sections/                 # Nav, Hero, Problem, Products, AppShowcase, …, Footer
```

## Content

All copy comes from *Commuttr — Corporate Profile 2026*. The contact form has no
backend: submitting composes an email to `hellocommuttr@gmail.com` via `mailto:`,
so nothing is sent automatically.
