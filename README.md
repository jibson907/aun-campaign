# AUN — Israel Curtis Dike Campaign Landing Page

A high-converting, fully responsive billboard campaign landing page for the **American University of Nigeria (AUN)** spotlighting **Israel Curtis Dike**, Honors Program President and Class Speaker 2026.

Built with **Vite + React**, **Tailwind CSS**, **Framer Motion**, **React Hook Form**, **react-icons**, **qrcode.react**, and **react-helmet-async** with **GA4 + Meta Pixel** integration and UTM tracking.

## Quick start

```bash
npm install
cp .env.example .env   # fill in your real GA4 / Pixel / API IDs
npm run dev            # http://localhost:5173
npm run build          # production build into ./dist
npm run preview        # preview the production build
```

## Variants

Two co-existing variants are routed inside the same SPA:

| URL | Variant | Branding |
| --- | --- | --- |
| `/` or `/variant-a` | **A** | AUN logo only |
| `/variant-b` | **B** | AUN + Chohkman (co-sponsored) |
| `/israel-dike-campaign` | A | Alias matching billboard QR URL |

## Page sections

1. **Hero** — Animated full-screen, AUN/Chohkman logo, headline, achievement badges, dual CTA.
2. **Why AUN** — Six animated feature cards (American-style education, Global, Leadership, Entrepreneurship, Scholarships, Career).
3. **Israel Curtis Dike Spotlight** — Portrait, achievements, testimonial quote card.
4. **Global Impact** — Animated SVG world map with partner pins, animated counters, alumni stories.
5. **Application Form** — React Hook Form with validation + POST to `VITE_LEAD_API_URL`.
6. **QR Code Campaign** — Dynamic QR code with UTM params, scan instructions, tracking explainer.
7. **Article** — Featured story card linking out to the published AUN article.
8. **Call to Action** — Closing "Your future starts here" with Apply / Visit CTAs.
9. **Footer** — Contact info, socials, quick links, privacy/terms.

## Analytics & tracking

Configured in [src/lib/analytics.js](src/lib/analytics.js):

- **Google Analytics 4** — set `VITE_GA4_ID` (e.g. `G-XXXXXXXXXX`).
- **Meta Pixel** — set `VITE_META_PIXEL_ID`.
- **Page views** — auto-fired on route change ([src/lib/hooks.js](src/lib/hooks.js)).
- **Scroll depth** — 25 / 50 / 75 / 100% milestones.
- **CTA clicks** — every Apply / Request Info / Schedule Visit / nav click.
- **Lead submission** — GA4 `generate_lead` + Meta `Lead` events.
- **UTM capture** — attached to every lead payload via [src/lib/utils.js](src/lib/utils.js).
- **QR tracking URL** — `?utm_source=portharcourt_billboard&utm_medium=qr&utm_campaign=israel_dike_campaign`.

When `VITE_GA4_ID` / `VITE_META_PIXEL_ID` aren’t configured, the analytics layer is a safe no-op (logs to the console in dev).

## Form API integration

Set `VITE_LEAD_API_URL` to your backend endpoint. The form POSTs JSON:

```json
{
  "firstName": "Israel",
  "lastName": "Dike",
  "email": "israel@example.com",
  "phone": "+234...",
  "intendedProgram": "Computer Science",
  "highSchool": "Chohkman Academy",
  "graduationYear": "2026",
  "submittedAt": "2026-06-10T12:00:00.000Z",
  "utm": { "utm_source": "portharcourt_billboard", "utm_medium": "qr", "utm_campaign": "israel_dike_campaign" },
  "page": "https://www.aun.edu.ng/israel-dike-campaign?..."
}
```

If no API URL is set, the form simulates a successful submission — useful for staging previews.

## SEO

- Dynamic `<title>` / `<meta description>` per variant via [src/components/SEO.jsx](src/components/SEO.jsx).
- Open Graph + Twitter Card tags.
- JSON-LD structured data: `CollegeOrUniversity`, `WebPage`, `Person`.
- Canonical URL set to `VITE_CAMPAIGN_BASE_URL`.
- Preconnected Google Fonts, code-split vendor / motion / forms chunks.

## Replacing placeholder assets

Stylised SVG portraits ship as placeholders to keep the repo asset-free. Swap them with real photography:

- **Hero portrait** — replace `<PortraitSVG />` in [src/components/Hero.jsx](src/components/Hero.jsx) with an `<img src="/israel-portrait.jpg" alt="..." />` (drop the file in `/public`).
- **Spotlight portrait** — replace `<ProfileFrame />` in [src/components/Spotlight.jsx](src/components/Spotlight.jsx).
- **Article cover** — replace `<ArticleCover />` in [src/components/Article.jsx](src/components/Article.jsx).
- **Logos** — [src/components/Logos.jsx](src/components/Logos.jsx) ships inline-SVG AUN + Chohkman logos; swap with the official brand SVGs when available.

## Accessibility

- Full keyboard navigation with visible `:focus-visible` rings.
- Semantic landmarks (`<header>`, `<main>`, `<footer>`, labelled `<section>`s).
- `aria-label` on all icon-only buttons and decorative SVGs marked `aria-hidden`.
- Color contrast tuned for WCAG AA on the dark theme.

## Deployment

The output of `npm run build` (in `dist/`) is a static SPA. Drop it on any static host (Vercel, Netlify, Cloudflare Pages, S3+CloudFront, or the AUN web team’s existing stack). Make sure to configure SPA fallback so unknown routes serve `index.html`.
