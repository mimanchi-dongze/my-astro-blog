- Enabled Astro View Transitions by importing `ClientRouter` from `astro:transitions` and adding `<ClientRouter />` to `src/components/BaseHead.astro`.

## Global CSS Animations
- Added `@keyframes fadeInUp` to `src/styles/global.css` to provide a smooth fade-in and slide-up effect.
- Applied `animation: fadeInUp 0.6s ease-out forwards;` to the `main` tag.
- This approach works well with Astro's View Transitions, providing a consistent entry animation for the main content area across page loads and navigations.

## Hover Effects
- Added `transition: color 0.2s ease-in-out;` to `HeaderLink.astro` for smooth color transitions on hover.
- Added `transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;` to blog post cards in `blog/index.astro` with a `transform: scale(1.02);` hover state for a subtle scaling effect.
