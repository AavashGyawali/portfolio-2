# Aavash Gyawali — Portfolio

A modern, fast, **no-backend** single-page portfolio built with vanilla HTML, CSS, and JavaScript. It deploys anywhere static files are served (GitHub Pages, Netlify, Vercel, Firebase Hosting, etc.) — zero server, zero build step.

## Tech Stack

- **HTML5** — semantic markup (no frameworks)
- **CSS3** — one stylesheet using custom properties, CSS Grid, Flexbox, and a mobile-first responsive layout
- **JavaScript (vanilla)** — theme toggle, mobile navigation, scroll-reveal animations, dynamic year

## Key Features

- **Dark / light mode** — dark by default, persists to `localStorage`, and respects `prefers-color-scheme`. Toggle with the button in the header.
- **Mobile-first responsive design** — single navigation that becomes a slide-in panel on small screens.
- **Scroll-reveal animations** — content fades and slides in as you scroll (powered by `IntersectionObserver`).
- **Performance-focused** — `loading="lazy"` on images, system-font stack, no external runtime dependencies.
- **SEO & social-ready** — Open Graph and Twitter Card meta tags, canonical URL, sitemap, robots.txt.
- **Accessibility** — semantic HTML, `aria-label`/`aria-expanded` on interactive controls, focus-friendly links.

## Sections

1. **Hero** — name, title, CTA buttons, and social links.
2. **About** — experience and education cards with a bio.
3. **Tools** — a grid of technologies you use.
4. **Projects** — showcase of your work with screenshots and links.
5. **Contact** — email and LinkedIn.
6. **Footer** — quick links + dynamic copyright year.

## Running locally

No build required. Just open the file:

```bash
# In your terminal, serve the directory (optional, but recommended
# so local assets and the devicon images load over http://)
npx serve .         # then open http://localhost:3000
# or simply:
open index.html
```

## Deploying

Drop the contents of this repo into any static host:

- **GitHub Pages** — push to `gh-pages` branch / enable Pages in settings.
- **Netlify / Vercel** — point a new site at this repository; it auto-deploys on push.
- Any host that serves `index.html` and the `/assets` folder.

## Analytics

Google Analytics (`gtag.js`) is included via the global site tag. Remove the `<script>` blocks in `index.html` if you prefer not to track visitors.

## License

Feel free to fork and adapt for your own portfolio.
