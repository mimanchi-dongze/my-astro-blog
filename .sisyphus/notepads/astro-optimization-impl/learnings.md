- Upgraded hover physics in `src/pages/blog/index.astro` to use a spring-like `cubic-bezier(0.32, 0.72, 0, 1)` and added `will-change: transform` for better performance.
- Added `prefers-reduced-motion` media query to `src/styles/global.css` to disable animations and transitions for users who prefer reduced motion.
- Removed duplicate `clip` property in `src/styles/global.css` around line 151 to fix LSP errors.

- Added `fallback="swap"` to `<ClientRouter />` in `src/components/BaseHead.astro` to optimize view transitions.

## HeaderLink Optimization
- Added `aria-current="page"` to active links for better accessibility.
- Replaced `font-weight: bolder` with `text-shadow: 0 0 .65px currentcolor, 0 0 .65px currentcolor` for the `.active` class to prevent layout shift when the link becomes active.
