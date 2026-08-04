# Trade Boom - Agent Rules & Guidelines

### 1. Crimson Color System
- Always map red accents to custom `crimson` classes (e.g. `text-crimson-400`, `bg-crimson-500/10`, `border-crimson-500/20`) rather than standard Tailwind `red` values.

### 2. Sticky Mobile Navigation Notch Padding
- Position the navigation bar using `top-[calc(36px+env(safe-area-inset-top,0px))]` to prevent collisions with the fixed market ribbon.
- The market ribbon takes the top coordinate with safe-area padding: `pt-[env(safe-area-inset-top,0px)]`.

### 3. More Dropdown Layout
- On smaller desktop displays, position the header's "More" dropdown inside a relative layout container on the trigger button itself. This avoids absolute offset positioning issues.

### 4. Modular Section Architecture
- All landing page sections must reside in `/src/sections/[section-name]/[section-name].tsx`. Do not place raw visual sections inside `/src/components/ui/`.
