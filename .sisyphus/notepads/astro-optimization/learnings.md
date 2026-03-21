
## Astro Blog Optimization Review
- **Accessibility**: The default Astro blog template lacks `prefers-reduced-motion` handling for its CSS animations (`fadeInUp`) and hover effects (`scale(1.02)`). Adding a global reset for reduced motion is a critical accessibility improvement.
- **Motion Design**: The default `0.2s ease-in-out` transitions feel rigid. Upgrading to a spring-like `cubic-bezier` (e.g., `0.32, 0.72, 0, 1`) with a slightly longer duration (`0.4s`) provides a much more premium, fluid feel.
- **Layout Stability**: Using `font-weight: bolder` for active link states causes layout shifts (reflow). A better approach is using `text-shadow` to simulate boldness without changing the element's width, or using a pseudo-element.
- **Semantic HTML**: Active links should use `aria-current="page"` rather than relying solely on a CSS class (`.active`) for screen reader support.
- **View Transitions**: Explicitly setting `fallback="swap"` on Astro's `<ClientRouter />` ensures a cleaner fallback experience for browsers that do not support the View Transitions API.
