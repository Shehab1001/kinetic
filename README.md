# Kinetic — Motion-led website

A polished, responsive one-page website built around purposeful motion rather than decorative animation.

## Motion design plan

1. **Opening typography** — headline lines rise in with 115ms stagger, 1050ms duration, `cubic-bezier(.22,.8,.2,1)` easing. Purpose: establish tempo and make motion the first impression.
2. **Scroll orientation** — fixed progress line plus compacting nav. Purpose: give the user continuous spatial feedback.
3. **Reveal system** — sections enter on IntersectionObserver at ~16% visibility with 900ms easing. Purpose: preserve reading order and add rhythm.
4. **Project motion** — gentle pointer tilt and scroll parallax on the large canvases. Purpose: make showcased work feel tactile without reducing legibility.
5. **Kinetic project art** — independently animated orbital/grid/signal/type systems inside each project panel. Purpose: demonstrate multiple motion vocabularies.
6. **Motion manifesto** — sticky statement subtly scrubs into place while the supporting principles pass beside it. Purpose: make the key positioning statement feel anchored.
7. **Contact transition** — oversized type rises in when the CTA enters view; magnetic circular CTA adds a final tactile interaction.
8. **Accessibility** — `prefers-reduced-motion` collapses animation and preserves all content/structure.

## Run locally

No build step is required.

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy

This folder is ready for any static host such as Vercel, Netlify, GitHub Pages, Cloudflare Pages or a traditional web server.
