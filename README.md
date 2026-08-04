# Trade Boom

> Master the Markets with Confidence. Premium trading education by Dinesh Kirola.

A production-grade digital experience for **Trade Boom** — a stock market education brand offering trading courses, personal mentorship, and a thriving trader community.

## Highlights

- **Stack**: Next.js 15 · React 19 · TypeScript · Tailwind CSS · Framer Motion · GSAP · Lenis · Three.js
- **Design**: Dark luxury theme · glassmorphism · aurora gradients · electric blue + emerald accents
- **Motion**: Smooth scroll (Lenis) · scroll progress · magnetic buttons · live market canvas · candlestick charts · animated counters · staggered reveals · custom cursor
- **A11y**: WCAG AA contrast · keyboard nav · reduced-motion support · focus rings · skip links
- **Performance**: 95+ Lighthouse target · server components · responsive images · route-level splitting

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Build

```bash
npm run build
npm start
```

## Structure

```
src/
├── app/                  # App router pages
├── components/
│   ├── layout/           # Navigation, footer, ribbon
│   ├── providers/        # Cursor & smooth scroll providers
│   ├── sections/         # Page sections (hero, courses, etc.)
│   └── ui/               # Reusable primitives
├── lib/                  # Data + utilities
└── public/               # Static assets
```

## Notes

- All market prices shown are **read-only / display only**. No live data feed is wired — figures are realistic placeholders that animate on the ticker.
- The portrait of Dinesh is currently a premium SVG placeholder. Replace with photography in production.
- Built for educational use. The disclaimer is prominent and the site makes no performance claims.
