# VOID/FORM — Advanced Motion Website

A self-contained, motion-led portfolio/studio website built with HTML, CSS and native JavaScript.

## Motion design plan

1. **Hero entrance** — oversized typography rises in with staggered easing, paired with orbital micro-motion and a high-contrast accent.
2. **Scroll choreography** — page progress, horizontal title drift, kinetic marquee and a long pinned narrative section.
3. **Case-study motion** — interactive 3D tilt, internal parallax, animated equalizer, SVG path drawing and ambient floating forms.
4. **Interaction states** — magnetic CTAs, animated nav underline, morphing menu icon and custom pointer feedback.
5. **Accessibility** — `prefers-reduced-motion` disables continuous and transform-heavy animation.
6. **Responsive behavior** — the layout, type scale and pinned sequence adapt for tablet and mobile.

## Files

- `index.html` — page structure
- `styles.css` — full visual system and responsive styles
- `script.js` — animation, scroll, cursor and menu logic
- `vercel.json` — Vercel static-hosting configuration and security headers

## Deploy to Vercel

This project is a static site and does not require a build step.

1. Import `Shehab1001/kinetic` into Vercel.
2. Use **Framework Preset: Other**.
3. Keep **Root Directory** as the repository root.
4. Leave **Build Command** empty.
5. Leave **Output Directory** empty.
6. Deploy.

After the GitHub repository is connected, pushes to the production branch can trigger new Vercel deployments automatically.

## Run locally

Open `index.html` directly in a modern browser, or serve the folder with any static server for the closest production behavior.

## Notes

- Google Fonts are loaded from the web, so an internet connection is needed for the intended typography.
- All motion is implemented with browser-native APIs; there is no npm build pipeline.
