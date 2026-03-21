# Astro Blog Optimization Report

Based on a review of the core styling, layout, and routing components (`global.css`, `BaseHead.astro`, `index.astro`, `HeaderLink.astro`), here are 4 actionable improvements focusing on code quality, accessibility, and motion design.

## 1. Accessibility: Respect `prefers-reduced-motion` Globally
**Files:** `src/styles/global.css`, `src/pages/blog/index.astro`
**Issue:** The `<main>` element has a hardcoded `fadeInUp` animation, and the blog cards have a `scale(1.02)` hover effect. These animations execute regardless of the user's system motion preferences, which can cause discomfort for users with vestibular disorders.
**Actionable Fix:** Add a global media query at the end of `global.css` to disable animations and transitions for users who prefer reduced motion:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## 2. Motion Design: Upgrade Hover Physics for a Premium Feel
**File:** `src/pages/blog/index.astro`
**Issue:** The blog card hover effect uses a generic `0.2s ease-in-out` transition. This feels rigid and lacks the fluidity expected in modern, high-end web design.
**Actionable Fix:** Replace the linear easing with a custom spring-like `cubic-bezier` and slightly extend the duration for a smoother, "Apple-style" interaction. Add `will-change: transform` to ensure hardware acceleration and prevent jank.
```css
ul li a {
  display: block;
  /* Upgrade to a smooth, spring-like easing */
  transition: transform 0.4s cubic-bezier(0.32, 0.72, 0, 1), 
              box-shadow 0.4s cubic-bezier(0.32, 0.72, 0, 1);
  will-change: transform;
}
```

## 3. Accessibility & Layout: Semantic Active States and Reflow Prevention
**File:** `src/components/HeaderLink.astro`
**Issue:** The active link state uses `font-weight: bolder`, which causes layout shifts (reflow) when navigating between pages. Additionally, it relies purely on a CSS class (`.active`) without providing semantic context to screen readers.
**Actionable Fix:** 
1. Add `aria-current={isActive ? 'page' : undefined}` to the `<a>` tag for screen reader support.
2. Replace `font-weight: bolder` with a non-layout-shifting visual cue, such as a pseudo-element underline that scales in, or use a `text-shadow` trick to simulate boldness without changing the element's width.
```astro
<!-- Add aria-current -->
<a href={href} class:list={[className, { active: isActive }]} aria-current={isActive ? 'page' : undefined} {...props}>

/* CSS Update */
a.active {
  /* Replace font-weight with text-shadow to prevent layout shift */
  text-shadow: 0 0 .65px currentcolor, 0 0 .65px currentcolor;
  text-decoration: underline;
}
```

## 4. Code Quality: Explicit View Transition Fallbacks
**File:** `src/components/BaseHead.astro`
**Issue:** The `<ClientRouter />` component is implemented with default settings. While Astro handles basic fallbacks, explicitly defining the fallback behavior ensures consistent experiences across older browsers.
**Actionable Fix:** Add the `fallback="swap"` attribute to the `ClientRouter` component. This explicitly tells Astro to fall back to standard full-page loads without attempting to polyfill complex animations on unsupported browsers, reducing potential visual bugs.
```astro
<!-- Update View Transitions -->
<ClientRouter fallback="swap" />
```