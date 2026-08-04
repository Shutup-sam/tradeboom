# Trade Boom - Architecture & Folder Directory Schema

### Folder Map
- `/src/app/`: Next.js Routing pages (`page.tsx`, `layout.tsx`, `globals.css` import).
- `/src/actions/`: Next.js `'use server';` lead capture actions.
- `/src/sections/`: Highly decoupled, isolated modules representing landing page blocks (e.g. `hero`, `faq`, `contact`, `navigation`).
- `/src/components/ui/`: Atomic, reusable base interface components (e.g. `button.tsx`, `custom-cursor.tsx`, `glass-card.tsx`).
- `/src/styles/`: Global stylesheets and styles rules.
- `/src/lib/`: Unified business config databases (e.g. `market-data.ts` static FAQ data).
