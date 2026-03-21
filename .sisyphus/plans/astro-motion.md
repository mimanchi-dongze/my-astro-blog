# Astro Blog Motion Design Plan

## TODOs
- [x] Enable Astro View Transitions in `src/components/BaseHead.astro` for smooth page navigation.
- [x] Add global CSS keyframes for fade-in and slide-up animations in `src/styles/global.css` and apply them to the main layout (`main` tag).
- [x] Enhance hover effects on the Header links (`src/components/HeaderLink.astro`) and Blog post cards (`src/pages/blog/index.astro`) with smooth scaling and color transitions.

## Final Verification Wave
- [x] F1: Verify `npm run build` passes.
- [x] F2: Verify `ClientRouter` (or `ViewTransitions`) is imported and used in `BaseHead.astro`.
- [x] F3: Verify `global.css` contains animation keyframes.