# TwoWheelTrail

An automotive & motorcycle publication website: reviews, launches, comparisons,
prices & variants, electric vehicles, buying guides, and motorcycle travel content.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

The production build is output to `dist/` — upload that folder's contents to
any static host (Netlify, Vercel, GitHub Pages, cPanel, etc.).

## Project structure

```
src/
  App.jsx        -> the entire site (data, pages, navigation)
  main.jsx       -> React entry point
  index.css      -> Tailwind imports
index.html       -> HTML shell / page title / meta description
tailwind.config.js
postcss.config.js
vite.config.js
```

## Before you publish

- **Vehicle data**: All vehicle names, specifications and prices in `src/App.jsx`
  (the `VEHICLES`, `COMPARISONS`, `TRAVEL_ARTICLES`, `NEWS_ITEMS`, and `GUIDES`
  arrays near the top of the file) are placeholder/illustrative content.
  Replace them with your own verified, up-to-date editorial content before
  going live — do not publish invented specs or prices as real.
- **Affiliate links**: CTA buttons ("Check Price", "Book Test Ride", "View Offer",
  etc.) currently have empty `onClick` handlers. Replace them with your actual
  affiliate/dealer URLs once your affiliate programs are approved.
- **Contact email**: Set to mahesh.bandaru679@gmail.com in `src/App.jsx`
  (ContactPage) and the Privacy Policy / Affiliate Disclosure pages — update
  if needed.
- **Images**: The site currently uses simple icon-based placeholder art
  (no external images) to avoid copyright issues. Swap in your own
  photography or licensed images in the `VehicleArt` component and travel
  page headers.
- **Legal pages**: About Us, Contact Us, Privacy Policy, Terms & Conditions,
  and Affiliate Disclosure are included as starting drafts — have them
  reviewed before publishing.

## Tech stack

- React 18 + Vite
- Tailwind CSS
- lucide-react (icons)
