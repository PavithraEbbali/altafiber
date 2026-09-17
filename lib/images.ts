/**
 * lib/images.ts — the photography registry
 * ---------------------------------------------------------------------------
 * Intrinsic dimensions and blur placeholders come from
 * `public/images/manifest.json`, generated when the source files were cropped
 * and compressed, so `next/image` always gets exact numbers and never causes
 * layout shift.
 *
 * Alt text is written here rather than at each call site, so it sits with the
 * rest of the site's copy and gets reviewed alongside it.
 *
 * On the photography itself: these are generated images used decoratively.
 * None of them is presented as a real customer, none carries a testimonial,
 * and none implies the people shown are altafiber employees — see the note at
 * the end of public/images/IMAGE-BRIEF.md.
 */

import manifest from "@/public/images/manifest.json";

export interface SiteImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL: string;
}

type ManifestKey = keyof typeof manifest;

const build = (key: ManifestKey, alt: string): SiteImage => {
  const m = manifest[key];
  return {
    src: `/images/${key}.webp`,
    alt,
    width: m.w,
    height: m.h,
    blurDataURL: m.blur,
  };
};

export const images = {
  hero: build(
    "hero-home",
    "A parent and child looking at a laptop together in the living room of a family home."
  ),
  install: build(
    "install-technician",
    "A technician kneeling beside a home's exterior utility box, running a fiber drop cable."
  ),
  whyFiber: build(
    "why-fiber-bg",
    "A residential street at dusk with lit windows and overhead cable lines."
  ),
  tv: build(
    "tv-living-room",
    "Two people watching television together on a sofa in a softly lit living room."
  ),
  gateway: build(
    "wifi-gateway",
    "A white mesh Wi-Fi router on a bookshelf beside books and a small plant."
  ),
  closing: build(
    "cta-home-evening",
    "The front of a two-storey family home at dusk with warm light in the windows."
  ),
} as const;

/** Social share card. Fixed 1200x630 JPG — the crawlers want that exactly. */
export const ogImage = {
  url: "/images/og-cover.jpg",
  width: 1200,
  height: 630,
  alt: "Fiber optic strands laid across a concrete surface.",
} as const;
