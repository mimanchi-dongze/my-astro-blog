- Successfully implemented Table of Contents and Reading Time in Astro blog posts.
- Used `await render(post)` to extract `headings` and `Content`.
- Calculated reading time using `post.body.split(/\s+/).length`.
- Passed `headings` and `readingTime` as props to `BlogPost.astro` layout.

## Dark/Light Theme Implementation
- Used CSS variables in `:root` and `.dark` classes for theme colors.
- Added an inline script in `BaseHead.astro` to prevent FOUC by checking `localStorage` and `prefers-color-scheme` before rendering.
- Handled Astro View Transitions by re-attaching event listeners on `astro:page-load` and updating the theme on `astro:after-swap`.
- Replaced hardcoded colors with CSS variables in `global.css`, `Header.astro`, `HeaderLink.astro`, and `LanguagePicker.astro`.

### Giscus Integration
- Giscus can be integrated into Astro by creating a dedicated component (`Giscus.astro`) that injects the `<script>` tag.
- To support dynamic theme switching without reloading the page, a `MutationObserver` can be used to watch the `class` attribute on `document.documentElement` (where the `.dark` class is toggled).
- When a theme change is detected, a `postMessage` can be sent to the Giscus iframe (`iframe.giscus-frame`) to update its theme dynamically (`light` or `transparent_dark`).
- The current language can be passed to Giscus via the `data-lang` attribute, which is retrieved using `getLangFromUrl(Astro.url)` in the layout.

## JSON-LD Structured Data
- Added `WebSite` schema to `BaseHead.astro` using `Astro.site` and `SITE_TITLE`.
- Added `BlogPosting` schema to `BlogPost.astro` using frontmatter data (`title`, `description`, `pubDate`, `updatedDate`, `heroImage`) and `SITE_TITLE` as the author.
- Used `<script type="application/ld+json" set:html={JSON.stringify(schema)} />` to inject the JSON-LD data without escaping it.
- `Astro.site` is a `URL` object, so `Astro.site?.toString()` is needed when assigning it to a string field in the schema.

## Pagefind Search Integration
- Pagefind is a static search library that indexes the built HTML files.
- It requires the site to be built first, so the build script should be `astro build && pagefind --site dist`.
- The Pagefind UI script and CSS are generated post-build in the `dist/pagefind` directory.
- In Astro, we can load these assets using `<script is:inline src="/pagefind/pagefind-ui.js"></script>` and `<link href="/pagefind/pagefind-ui.css" rel="stylesheet" />`.
- `is:inline` is crucial for the script tag to prevent Astro from trying to bundle it during the build process, as the file doesn't exist until after the build.
- Pagefind automatically detects the language of the page from the `<html>` tag's `lang` attribute and builds separate indexes for each language.
