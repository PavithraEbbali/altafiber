# altafiber — Authorized Retailer landing site

A one-page landing site for an independent authorized retailer of altafiber,
built for Google Ads traffic. Next.js 16 (App Router), React 19, TypeScript,
Tailwind CSS v4.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
```

Node 20 or newer.

---

## Where the content lives

**`lib/content.ts` is the single source of truth.** Every price, speed, promo
qualifier, fee and legal disclosure on the site is read from it. Change a number
there and it cascades to the hero price anchor, every plan card, the fine-print
grid, the FAQ answers, the footer legal block, the page metadata and the JSON-LD
— no TSX file contains a hard-coded price, speed or fee.

A few things worth knowing before editing it:

- **`RATE` and `FEE`** at the top hold every published number once. Plan prices,
  the line items quoted inside bundle features, the hardware grid and the FAQ
  answers all read from them.
- **Section visibility is data-driven.** `activeServiceSections` filters out any
  service line with no plans, which is how Cable and Mobile are omitted —
  altafiber sells neither. Adding a Cable plan would make a Cable section appear
  in the correct slot with no layout change.
- **CTA copy is a rule, not a string.** `ctaLabel(plan)` returns
  `"Call to order"` when a plan has a published price and `"Call for pricing"`
  when it does not.
- **Every `tel:` link renders through `<CallButton />`**, which is what stamps
  the `data-call-cta` attribute used for call tracking.

`lib/legal.ts` holds the four policy pages. `lib/images.ts` is the photography
registry — alt text lives there alongside the rest of the copy.

---

## Before this goes live

Replace these placeholders in `lib/content.ts`:

| Field | What it needs |
|---|---|
| `site.phone` | The real sales line. `raw` and `display` both. |
| `site.url` | The production domain (or set `NEXT_PUBLIC_SITE_URL`). |
| `site.legalEntity` | **The real operating company.** See the note below. |
| `site.contactEmail` | Where privacy requests should go. |
| `site.mailingAddress` | The postal address for those requests. |
| `site.policyEffectiveDate` | The date the policies take effect. |
| `site.governingLaw` | The governing jurisdiction. |

**`site.legalEntity` is deliberately not "altafiber".** The visible branding says
altafiber because this is an authorized retailer site, but an authorized
retailer cannot present *itself* as the carrier in its own privacy policy or
terms — that is a misrepresentation risk under Google Ads policy and a legal
exposure. That field must name the real operating company.

The policy pages are a solid starting draft, but have counsel review them
against your actual data practices before publishing.

---

## Deploying to Vercel

Import the repo and deploy — no configuration needed. Next.js is detected
automatically and image optimization works out of the box.

**Set one environment variable** once the real domain is attached:

```
NEXT_PUBLIC_SITE_URL = https://your-domain.com
```

Without it the site falls back to `VERCEL_PROJECT_PRODUCTION_URL`, then
`VERCEL_URL`, then the placeholder in `lib/content.ts`. That value drives the
canonical tag, the OG image URL, `robots.txt`, `sitemap.xml` and the JSON-LD, so
preview deployments resolve correctly either way — but production should have
the real domain set explicitly.

---

## Photography

`public/images/` holds the optimized WebP files that ship (about 820 KB total)
plus `og-cover.jpg` for social sharing. `design-source/` holds the full-size
PNG originals; it is outside `public/` so it never deploys.

`public/images/IMAGE-BRIEF.md` documents what each image is, where it goes and
the prompt that produced it.

These are generated images used decoratively. Two rules apply on a Google Ads
landing page: none of the people may be presented as a real customer (no names,
no testimonials attached to them), and nothing may imply they are altafiber
staff or that these are altafiber's own photographs.

---

## Accessibility

The site is audited with a contrast probe that composites what is actually
painted — walking the ancestor chain in paint order, evaluating linear and
radial gradients at each element's own coordinates, and sampling real image
pixels through `object-fit`/`object-position`. Text over photographs is where
naive audits go wrong in both directions, so this one samples rather than
guesses.

Current state: 386 text nodes, zero failures against WCAG AA. The lowest ratio
is the hero headline accent at 3.74:1, which is large text and needs 3.0.

Also covered: one `h1` per page, no heading-level jumps, labelled landmarks, a
skip link, full keyboard operation, decorative graphics hidden from assistive
technology, and complete `prefers-reduced-motion` support — every animation,
parallax and drift switches off.

---

## Responsive

Verified at 320, 375, 414, 768 and desktop widths: no horizontal overflow, no
tap target under 40px, no text under 10px.

---

## Changelog

`ai.wing` is the running log of structural changes and architectural decisions,
including the reasoning behind things that look odd and the bugs found along the
way. Read it before making significant changes.
