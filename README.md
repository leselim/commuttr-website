# Commuttr Website

Marketing website for Commuttr, South Africa's unified digital mobility ecosystem. The application lets users store funds, pay fares with a tap, and plan journeys.

Built as a dark, fintech styled single page site using the corporate brand system: dark canvas, vermilion accent (`#FF4500`), rounded geometric display typography, and wide section numbering.

The layout features an interactive phone mockup with live app UI components for the mobility wallet, QR tap to pay, and journey planner.

## Tech Stack

1. Vite 8 + React 19 + TypeScript
2. Tailwind CSS v4 with design tokens in `src/index.css`
3. Radix UI primitives with cva in `src/components/ui`
4. Lucide React icons

## Quick Start

```bash
pnpm install
pnpm dev
```

## Production Build

```bash
pnpm build
pnpm preview
```

## Project Structure

```
src/
  App.tsx             Page layout and section composition
  index.css           Design tokens and global styles
  data/content.ts     Site copy from corporate profile
  components/
    ui/               Base UI primitives
    app/              Phone mockup and app screens
    brand/            Brand assets and wordmark
    sections/         Page sections
```

## Copy and Form

Site copy is based on the Commuttr Corporate Profile 2026. The contact form links directly to `hellocommuttr@gmail.com` using mailto.
