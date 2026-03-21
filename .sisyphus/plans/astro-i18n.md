# Astro Blog i18n Implementation Plan

## TODOs
- [x] Task 1: Configure `astro.config.mjs` for i18n (locales: `zh-cn`, `en`, default: `zh-cn`).
- [x] Task 2: Create `src/i18n/ui.ts` and `src/i18n/utils.ts` for UI translations and helper functions.
- [x] Task 3: Restructure `src/content/blog/` into `en/` and `zh-cn/` subdirectories, and update the content collection schema if necessary.
- [x] Task 4: Refactor pages (`index.astro`, `about.astro`, `blog/index.astro`, `blog/[...slug].astro`) to support localized routing.
- [x] Task 5: Add a Language Switcher component to the Header and update UI components to use translations.

## Final Verification Wave
- [x] F1: Verify `npm run build` passes.
- [x] F2: Verify the site is accessible at `/` (zh-cn) and `/en/` (en).
- [x] F3: Verify the language switcher works and UI text is translated.