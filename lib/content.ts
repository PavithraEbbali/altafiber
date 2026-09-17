/**
 * lib/content.ts — SINGLE SOURCE OF TRUTH
 * ---------------------------------------------------------------------------
 * Every price, speed, promo qualifier, fee and legal disclosure rendered
 * anywhere on this site is read from this file. Change a number here and it
 * cascades automatically to: the hero price anchor, all plan cards, the
 * fine-print comparison grid, the FAQ answers and the footer legal block.
 * No TSX layout file contains a hard-coded price, speed or fee.
 *
 * Section visibility is data-driven too: a service line with zero plans in
 * `plans` renders no section at all (see `activeServiceSections`). That is how
 * Cable and Mobile are omitted — altafiber sells neither.
 *
 * Pricing sourced from altafiber.com: /plans-and-pricing, /tv, /home-phone,
 * /internet, /internet/fioptics-home-bundle and the help-center data policy.
 */

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type ServiceLine =
  | "fiber"
  | "cable"
  | "bundle"
  | "tv"
  | "mobile"
  | "phone";

export interface PlanItem {
  id: string;
  /** e.g. "altafiber 1 Gig", "altafiber 500 Mbps" */
  name: string;
  serviceLine: ServiceLine;
  speedDown?: number;
  speedUp?: number;
  price?: number;
  cents?: string;
  promoQualifier?: string;
  equipmentFee?: string;
  dataPolicy?: string;
  contractTerm?: string;
  features: string[];
  isPopular?: boolean;
  /** Optional presentation extras — never required to render a plan. */
  badge?: string;
  tagline?: string;
  /** Short phrase shown under the price when speed is not the headline. */
  unit?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export type IconName =
  | "arrows"
  | "shield"
  | "wifi"
  | "infinity"
  | "bolt"
  | "tv";

export interface FeatureItem {
  title: string;
  body: string;
  icon: IconName;
}

/* -------------------------------------------------------------------------- */
/* Site + retailer identity                                                   */
/* -------------------------------------------------------------------------- */

export const site = {
  /** Retailer entity name. */
  retailer: "altafiber",
  brandName: "altafiber",
  /**
   * PLACEHOLDER — replace `raw` and `display` with the retailer's live sales
   * line. Everything downstream (header button, hero button, every plan card
   * CTA, the footer) derives from this one object.
   */
  phone: {
    raw: "8880000000",
    display: "(888) 000-0000",
  },
  disclosure: "Independent Authorized Retailer of altafiber.",
  /**
   * PLACEHOLDERS — the legal pages read these. Replace all four before the
   * site goes live; they are the only company-specific values those pages use.
   */
  /** PLACEHOLDER — production origin, no trailing slash. Drives canonical
   *  URLs, robots.txt and the sitemap. */
  url: "https://www.fiberdirect.example",
  /** The real operating company. This is NOT altafiber — an authorized
   *  retailer may not present itself as the carrier. Replace before launch. */
  legalEntity: "[Legal entity name]",
  contactEmail: "privacy@fiberdirect.example",
  mailingAddress: "123 Example Street, Suite 100, Cincinnati, OH 45202",
  /** Shown only on the policy pages, never on the marketing page. */
  policyEffectiveDate: "[Effective date]",
  governingLaw: "the State of Ohio",
  nav: [
    { label: "Plans", href: "#plans" },
    { label: "Hardware", href: "#hardware" },
    { label: "How it works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
  ],
} as const;

export const telHref = `tel:+1${site.phone.raw}`;

/**
 * Canonical origin, resolved at build time.
 *
 * `site.url` is the placeholder to replace with the real domain. Until that
 * happens, a Vercel deployment still needs absolute URLs that actually resolve
 * — otherwise the OG image, canonical tag, sitemap and JSON-LD all point at a
 * domain that does not exist. Order of preference:
 *
 *   1. NEXT_PUBLIC_SITE_URL          — set this once the domain is live
 *   2. VERCEL_PROJECT_PRODUCTION_URL — the project's stable production domain
 *   3. VERCEL_URL                    — the per-deployment preview domain
 *   4. site.url                      — local development / placeholder
 *
 * Only read from server files (metadata, robots, sitemap, JSON-LD).
 */
const stripSlash = (u: string) => u.replace(/\/+$/, "");

export const siteUrl: string = stripSlash(
  process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : site.url)
);

/* -------------------------------------------------------------------------- */
/* Plans — every service line altafiber actually sells                        */
/* -------------------------------------------------------------------------- */

/**
 * Every published rate and fee, declared once.
 *
 * Plan prices, the line items quoted inside bundle feature lists, the hardware
 * grid and the FAQ answers all read from these constants, so a rate cannot be
 * updated in one place and left stale in another.
 */
export const RATE = {
  fiber100: 30,
  fiber1g: 50,
  fiber2g: 70,
  fiber3g: 100,
  tvStream: 10,
  tvBasic: 30,
  phoneHome: 10,
} as const;

export const FEE = {
  /** Standard Wi-Fi gateway rate on the 100 Mbps - 2 Gig tiers. */
  gateway: 15,
  /** Fioptics Home add-on; included on the 3 Gig tier. */
  fiopticsHome: 20,
  /** Technician visit, waived while Fioptics Care is on the account. */
  techVisit: "99.99",
  moneyBackDays: 30,
} as const;

const EQUIP_STANDARD = `Wi-Fi gateway $${FEE.gateway}/mo`;
const EQUIP_INCLUDED = "Fioptics Home included";
const DATA_UNLIMITED = "Unlimited data — no caps, no throttling";

export const plans: PlanItem[] = [
  /* ---------------------------- FIBER INTERNET --------------------------- */
  {
    id: "fiber-100",
    name: "altafiber 100 Mbps",
    serviceLine: "fiber",
    speedDown: 100,
    speedUp: 100,
    price: RATE.fiber100,
    cents: "00",
    promoQualifier: "Per month for 1 year with eBill",
    equipmentFee: EQUIP_STANDARD,
    dataPolicy: DATA_UNLIMITED,
    contractTerm: "1-year price lock",
    tagline: "Everyday essentials",
    features: [
      "100 Mbps symmetrical fiber",
      "Comfortable for 1–5 devices",
      "HD streaming and clear video calls",
      "Free activation when you order",
    ],
  },
  {
    id: "fiber-1g",
    name: "altafiber 1 Gig",
    serviceLine: "fiber",
    speedDown: 1000,
    speedUp: 1000,
    price: RATE.fiber1g,
    cents: "00",
    promoQualifier: "Per month for 2 years with eBill",
    equipmentFee: EQUIP_STANDARD,
    dataPolicy: DATA_UNLIMITED,
    contractTerm: "2-year price lock",
    isPopular: true,
    badge: "Most chosen",
    tagline: "Everyday performance",
    features: [
      "1 Gig symmetrical fiber",
      "Built for 5–10+ connected devices",
      "Stream on several screens at once",
      "Smooth gaming and clear video calls",
      "Free activation when you order",
    ],
  },
  {
    id: "fiber-2g",
    name: "altafiber 2 Gig",
    serviceLine: "fiber",
    speedDown: 2000,
    speedUp: 2000,
    price: RATE.fiber2g,
    cents: "00",
    promoQualifier: "Per month for 2 years with eBill",
    equipmentFee: EQUIP_STANDARD,
    dataPolicy: DATA_UNLIMITED,
    contractTerm: "2-year price lock",
    tagline: "Connected home",
    features: [
      "2 Gig symmetrical fiber",
      "Built for 10–25+ connected devices",
      "4K and 8K streaming without the wait",
      "First month free",
      "12 months of Netflix, HBO Max or Disney+/Hulu on us",
    ],
  },
  {
    id: "fiber-3g",
    name: "altafiber 3 Gig",
    serviceLine: "fiber",
    speedDown: 3000,
    speedUp: 3000,
    price: RATE.fiber3g,
    cents: "00",
    promoQualifier: "Per month for 3 years with eBill",
    equipmentFee: EQUIP_INCLUDED,
    dataPolicy: DATA_UNLIMITED,
    contractTerm: "3-year price lock",
    tagline: "Next-level performance",
    features: [
      "3 Gig symmetrical fiber",
      "Built for 25–50+ connected devices",
      "Fioptics Home whole-home Wi-Fi included",
      "First month free",
      "12 months of Netflix, HBO Max or Disney+/Hulu on us",
    ],
  },
  {
    id: "fiber-6g",
    name: "altafiber 6 Gig",
    serviceLine: "fiber",
    speedDown: 6000,
    speedUp: 6000,
    // No published rate — the CTA resolves to "Call for pricing" automatically.
    promoQualifier: "Availability varies by address",
    equipmentFee: "Ask about included equipment",
    dataPolicy: DATA_UNLIMITED,
    contractTerm: "Term confirmed on your order call",
    tagline: "Ultimate experience",
    badge: "Fastest tier",
    features: [
      "6 Gig symmetrical fiber — the fastest tier altafiber offers",
      "Built for 50–150+ connected devices",
      "Stream, game, video chat and run smart devices at once",
      "Headroom for whatever you plug in next",
    ],
  },

  /* ------------------------------- BUNDLES ------------------------------- */
  {
    id: "bundle-100-stream",
    name: "100 Mbps + Stream TV",
    serviceLine: "bundle",
    speedDown: 100,
    speedUp: 100,
    price: 40,
    cents: "00",
    promoQualifier: "Per month for 1 year with eBill",
    equipmentFee: EQUIP_STANDARD,
    dataPolicy: DATA_UNLIMITED,
    contractTerm: "1-year price lock",
    tagline: "Internet + TV",
    features: [
      `100 Mbps symmetrical fiber — $${RATE.fiber100}`,
      `Stream TV — $${RATE.tvStream}`,
      "50 live channels plus hundreds more with TiVo+",
      "Catch Up, Restart and Cloud DVR",
      "Free activation when you order",
    ],
  },
  {
    id: "bundle-1g-basic",
    name: "1 Gig + Basic TV",
    serviceLine: "bundle",
    speedDown: 1000,
    speedUp: 1000,
    price: 80,
    cents: "00",
    promoQualifier: "Per month for 2 years with eBill",
    equipmentFee: EQUIP_STANDARD,
    dataPolicy: DATA_UNLIMITED,
    contractTerm: "2-year price lock",
    isPopular: true,
    badge: "Best value",
    tagline: "Internet + TV",
    features: [
      `1 Gig symmetrical fiber — $${RATE.fiber1g}`,
      `Basic TV — $${RATE.tvBasic}`,
      "55+ live channels including local broadcast",
      "On Demand, Catch Up, Restart and Cloud DVR",
      "Free activation when you order",
    ],
  },
  {
    id: "bundle-2g-basic",
    name: "2 Gig + Basic TV",
    serviceLine: "bundle",
    speedDown: 2000,
    speedUp: 2000,
    price: 100,
    cents: "00",
    promoQualifier: "Per month for 2 years with eBill",
    equipmentFee: EQUIP_STANDARD,
    dataPolicy: DATA_UNLIMITED,
    contractTerm: "2-year price lock",
    tagline: "Internet + TV",
    features: [
      `2 Gig symmetrical fiber — $${RATE.fiber2g}`,
      `Basic TV — $${RATE.tvBasic}`,
      "55+ live channels including local broadcast",
      "First month free on the internet line",
      "12 months of a streaming service on us",
    ],
  },
  {
    id: "bundle-1g-phone",
    name: "1 Gig + Home Phone",
    serviceLine: "bundle",
    speedDown: 1000,
    speedUp: 1000,
    price: 60,
    cents: "00",
    promoQualifier: "Per month for 2 years with eBill",
    equipmentFee: EQUIP_STANDARD,
    dataPolicy: DATA_UNLIMITED,
    contractTerm: "2-year price lock",
    tagline: "Internet + Phone",
    features: [
      `1 Gig symmetrical fiber — $${RATE.fiber1g}`,
      `Home Phone — $${RATE.phoneHome}`,
      "Unlimited nationwide calling",
      "Instant tracing to 911 services",
      "Free activation when you order",
    ],
  },

  /* --------------------------------- TV ---------------------------------- */
  {
    id: "tv-stream",
    name: "Stream TV",
    serviceLine: "tv",
    price: RATE.tvStream,
    cents: "00",
    promoQualifier: "Per month, internet subscription required",
    equipmentFee: "No TV box required — stream on your own devices",
    contractTerm: "Added to your internet account",
    unit: "50 live channels",
    tagline: "Fioptics+ powered by TiVo",
    features: [
      "50 live channels plus hundreds more with TiVo+",
      "Watch at home or on the go",
      "Apple TV, Fire TV, Google/Android TV and mobile",
      "Catch Up, Restart and Cloud DVR",
    ],
  },
  {
    id: "tv-basic",
    name: "Basic TV",
    serviceLine: "tv",
    price: RATE.tvBasic,
    cents: "00",
    promoQualifier: "Per month, internet subscription required",
    equipmentFee: "Fioptics+ box or your own streaming device",
    contractTerm: "Added to your internet account",
    unit: "55+ live channels",
    isPopular: true,
    badge: "Most chosen",
    tagline: "Fioptics+ powered by TiVo",
    features: [
      "55+ live channels including local broadcast",
      "Stream on any TV or mobile device",
      "On Demand, Catch Up and Restart",
      "Cloud DVR to record and watch later",
    ],
  },
  {
    id: "tv-preferred",
    name: "Preferred TV",
    serviceLine: "tv",
    promoQualifier: "Channel count and rate confirmed on your order call",
    equipmentFee: "Fioptics+ box or your own streaming device",
    contractTerm: "Added to your internet account",
    tagline: "Fioptics+ powered by TiVo",
    features: [
      "A wider live lineup than Basic TV",
      "Smart recommendations and voice search",
      "On Demand, Catch Up, Restart and Cloud DVR",
      "Stream on any TV or mobile device",
    ],
  },
  {
    id: "tv-elite",
    name: "Elite TV",
    serviceLine: "tv",
    promoQualifier: "Channel count and rate confirmed on your order call",
    equipmentFee: "Fioptics+ box or your own streaming device",
    contractTerm: "Added to your internet account",
    badge: "Largest lineup",
    tagline: "Fioptics+ powered by TiVo",
    features: [
      "The largest Fioptics+ live lineup altafiber offers",
      "Smart recommendations and voice search",
      "On Demand, Catch Up, Restart and Cloud DVR",
      "Stream on any TV or mobile device",
    ],
  },

  /* ------------------------------- PHONE --------------------------------- */
  {
    id: "phone-home",
    name: "Home Phone",
    serviceLine: "phone",
    price: RATE.phoneHome,
    cents: "00",
    promoQualifier: "Per month, added to Fioptics internet",
    equipmentFee: "Use your own handset",
    contractTerm: "Added to your internet account",
    unit: "Unlimited nationwide",
    isPopular: true,
    tagline: "Landline reliability",
    features: [
      "Unlimited nationwide calling",
      "Instant tracing to 911 services",
      "Caller ID, call waiting and voicemail",
      "Call block and robocall block",
    ],
  },
  {
    id: "phone-homepak-reach",
    name: "HomePak Reach",
    serviceLine: "phone",
    promoQualifier: "Rate confirmed on your order call",
    equipmentFee: "Use your own handset",
    contractTerm: "Added to your internet account",
    tagline: "Unlimited long distance",
    features: [
      "Unlimited local and long distance calling",
      "Includes calls to Canada and Mexico",
      "The full calling feature pack",
      "International plans to 200+ countries available",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Selectors — layout files read these, never the raw array                   */
/* -------------------------------------------------------------------------- */

export const plansByLine = (line: ServiceLine): PlanItem[] =>
  plans.filter((p) => p.serviceLine === line);

export const getPlan = (id: string): PlanItem | undefined =>
  plans.find((p) => p.id === id);

/** The plan whose price anchors the hero. */
export const leadPlan: PlanItem =
  plans.find((p) => p.serviceLine === "fiber" && p.isPopular) ?? plans[0];

/**
 * Cheapest published monthly rate on the FIBER line — this is the number that
 * headlines "fiber from $X/mo", so it must not pick up a $10 TV or phone
 * add-on, which is only ever sold on top of an internet plan.
 */
export const startingPrice: number = Math.min(
  ...plans
    .filter((p) => p.serviceLine === "fiber" && typeof p.price === "number")
    .map((p) => p.price as number)
);

const speedsDown = plans
  .filter((p) => p.serviceLine === "fiber" && typeof p.speedDown === "number")
  .map((p) => p.speedDown as number);

export const slowestMbps: number = Math.min(...speedsDown);
export const fastestMbps: number = Math.max(...speedsDown);

/**
 * CTA copy rule, applied everywhere outside the header and footer:
 * a plan with a published price says "Call to order", a plan without one says
 * "Call for pricing". Defined once so the two can never drift apart.
 */
export const ctaLabel = (plan: PlanItem): string =>
  typeof plan.price === "number" ? "Call to order" : "Call for pricing";

/** Formats a speed in Mbps as a short human label: 100 Mbps / 1 Gig / 2 Gig. */
export const speedLabel = (mbps?: number): string => {
  if (!mbps) return "";
  return mbps >= 1000 ? `${mbps / 1000} Gig` : `${mbps} Mbps`;
};

/* -------------------------------------------------------------------------- */
/* Service-line sections — order is canonical, empty lines are omitted        */
/* -------------------------------------------------------------------------- */

export interface ServiceSection {
  line: ServiceLine;
  id: string;
  eyebrow: string;
  heading: string;
  sub: string;
  columns: 2 | 3 | 4;
}

/**
 * Canonical order: Fiber -> Cable -> Bundles -> TV -> Mobile -> Phone.
 * Cable and Mobile are declared here but carry no plans, so
 * `activeServiceSections` drops them and the page never renders an empty shell.
 */
const serviceSections: ServiceSection[] = [
  {
    line: "fiber",
    id: "plans",
    eyebrow: "Fiber internet",
    heading: "Symmetrical speeds on every fiber plan",
    sub: "Every Fioptics plan delivers the same upload speed as download speed across altafiber's 100% fiber network. Select the tier that matches your household's connected devices and usage.",
    columns: 3,
  },
  {
    line: "cable",
    id: "cable",
    eyebrow: "Cable",
    heading: "Cable internet",
    sub: "",
    columns: 3,
  },
  {
    line: "bundle",
    id: "bundles",
    eyebrow: "Bundles",
    heading: "Bundle internet with TV or Home Phone",
    sub: "Combining Fioptics Internet with Fioptics+ TV or Home Phone service reduces the combined monthly rate. The packages below reflect altafiber's current published bundle pricing.",
    columns: 2,
  },
  {
    line: "tv",
    id: "tv",
    eyebrow: "Fioptics+ TV",
    heading: "Live television and streaming, unified",
    sub: "Fioptics+ is powered by TiVo, bringing live channels and streaming applications together in a single guide, a single search and a single remote.",
    columns: 4,
  },
  {
    line: "mobile",
    id: "mobile",
    eyebrow: "Mobile",
    heading: "Mobile service",
    sub: "",
    columns: 3,
  },
  {
    line: "phone",
    id: "phone",
    eyebrow: "Home phone",
    heading: "Reliable home phone service",
    sub: "altafiber Home Phone is provisioned over the same fiber connection as your internet service, with a full set of calling features included.",
    columns: 2,
  },
];

/** Only sections that have at least one plan. Cable and Mobile fall out here. */
export const activeServiceSections: ServiceSection[] = serviceSections.filter(
  (s) => plansByLine(s.line).length > 0
);

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "Authorized Retailer",
  h1a: "100% fiber internet,",
  h1b: "built for your home.",
  sub: `A 100% fiber network delivering matching upload and download speeds with 99.99% reliability. Plans range from ${speedLabel(
    slowestMbps
  )} to ${speedLabel(fastestMbps)} symmetrical. Enter your ZIP code to view the speeds available at your address.`,
  /** Verified against altafiber.com. Nothing here is an unsupported claim. */
  trustChips: [
    "No Data Caps",
    "Symmetrical Speeds",
    "99.99% Reliable",
    "Free Activation",
    "30-Day Money-Back Guarantee",
  ],
  zip: {
    label: "Check availability at your address",
    placeholder: "Enter ZIP code",
    button: "Check availability",
    helper: "Fiber is built street by street, so we confirm the exact address on your call.",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Hardware + fine print grid                                                 */
/* -------------------------------------------------------------------------- */

export interface FinePrintRow {
  item: string;
  cost: string;
  note: string;
  included?: boolean;
}

export const finePrint = {
  eyebrow: "No surprises",
  heading: "Equipment, fees and inclusions",
  sub: "The rates below reflect altafiber's published residential pricing for equipment, service fees and included features.",
  rows: [
    {
      item: "Wi-Fi gateway (100 Mbps – 2 Gig)",
      cost: `$${FEE.gateway}/mo`,
      note: "Standard gateway rate on the lower tiers. It is not folded into the advertised monthly price.",
    },
    {
      item: "Fioptics Home",
      cost: `$${FEE.fiopticsHome}/mo`,
      note: "Whole-home Wi-Fi, Fioptics Care, premium tech support, a wireless gateway and one Wi-Fi extender.",
    },
    {
      item: "Fioptics Home on 3 Gig",
      cost: "Included",
      note: "The 3 Gig tier carries Fioptics Home at no additional monthly charge.",
      included: true,
    },
    {
      item: "Activation",
      cost: "Free",
      note: "Free activation on altafiber's current online offers.",
      included: true,
    },
    {
      item: "Data allowance",
      cost: "Unlimited",
      note: "altafiber does not cap, meter or throttle residential data, and there is no overage line on the bill.",
      included: true,
    },
    {
      item: "Technician visit",
      cost: `$${FEE.techVisit}/visit`,
      note: "Waived for as long as Fioptics Care is on the account.",
    },
    {
      item: "eero Wi-Fi 7 mesh",
      cost: "Ask on call",
      note: "eero Pro 7, Max 7 and Pro 6E gateways are offered on eligible tiers.",
    },
    {
      item: "Money-back window",
      cost: `${FEE.moneyBackDays} days`,
      note: "altafiber backs new Fioptics service with a 30-day money-back guarantee.",
      included: true,
    },
  ] satisfies FinePrintRow[],
} as const;

/* -------------------------------------------------------------------------- */
/* How it works / why fiber                                                   */
/* -------------------------------------------------------------------------- */

export const howItWorks = {
  eyebrow: "How it works",
  heading: "Three steps to getting connected",
  steps: [
    {
      n: "01",
      title: "Check your address",
      body: "Fiber is built street by street. Start with your ZIP and we will confirm the exact service address together on the call.",
    },
    {
      n: "02",
      title: "Pick your tier",
      body: "Tell us how many devices live in the house. We will match the speed to the household and read back the full monthly total before anything is placed.",
    },
    {
      n: "03",
      title: "Book the install",
      body: "We schedule the altafiber technician with you. A professional install gets the fiber terminated and your gateway online in the same visit.",
    },
  ],
  whyEyebrow: "Why fiber",
  whyHeading: "Why 100% fiber internet",
  features: [
    {
      title: "Symmetrical by design",
      body: "Uploads run as fast as downloads on every Fioptics tier. Backups, video calls and big file sends stop being the slow half of your connection.",
      icon: "arrows",
    },
    {
      title: "99.99% reliable",
      body: "Fiber shrugs off the electrical interference and weather noise that degrades copper and coax. altafiber publishes 99.99% network reliability.",
      icon: "shield",
    },
    {
      title: "Whole-home Wi-Fi",
      body: "Fioptics Home adds a wireless gateway and a Wi-Fi extender, so coverage reaches the basement and the back bedroom, not just the room with the box.",
      icon: "wifi",
    },
    {
      title: "Unlimited data",
      body: "No caps, no metering, no throttling and no overage line on the bill. Stream and work as much as the household needs.",
      icon: "infinity",
    },
    {
      title: "Multi-gig headroom",
      body: "Tiers scale to 6 Gig symmetrical. The fiber already in the ground carries far more than today's fastest plan asks of it.",
      icon: "bolt",
    },
    {
      title: "One guide for everything",
      body: "Fioptics+ runs on TiVo, so live channels and streaming apps share a single guide, a single search and a single remote.",
      icon: "tv",
    },
  ] satisfies FeatureItem[],
} as const;

/* -------------------------------------------------------------------------- */
/* Marquee trust ticker                                                       */
/* -------------------------------------------------------------------------- */

export const marqueeItems: string[] = [
  "100% Fiber Network",
  "Symmetrical Upload & Download",
  "99.99% Reliable",
  "Unlimited Data",
  "6 Gig Top Tier",
  "Fioptics+ Powered by TiVo",
  "Whole-Home Wi-Fi",
  "Free Activation",
  "30-Day Money-Back Guarantee",
  "Professional Installation",
];

/* -------------------------------------------------------------------------- */
/* FAQ                                                                        */
/* -------------------------------------------------------------------------- */

export const faqs: FaqItem[] = [
  {
    q: "What equipment do I need, and what does it cost?",
    a: `Fioptics runs through a Wi-Fi gateway that altafiber provides. On the 100 Mbps through 2 Gig tiers the standard gateway rate is $${FEE.gateway}/mo and it is not folded into the advertised price. Fioptics Home is $${FEE.fiopticsHome}/mo and adds whole-home Wi-Fi, a wireless gateway, one Wi-Fi extender, Fioptics Care and premium tech support — and it comes at no additional monthly charge on the 3 Gig tier. eero Pro 7, Max 7 and Pro 6E mesh systems are offered on eligible tiers.`,
  },
  {
    q: "Are there data caps or overage charges?",
    a: "No. altafiber does not cap or limit the amount of data you send or receive on residential internet, and does not throttle it. There is no overage line on the bill.",
  },
  {
    q: "Why do the upload speeds match the download speeds?",
    a: "Because it is fiber end to end. Every Fioptics tier is symmetrical, so a 1 Gig plan uploads at 1 Gig. That is what keeps video calls stable, cloud backups quick, and large uploads from stalling the rest of the house.",
  },
  {
    q: "How does installation work?",
    a: "An altafiber technician runs the fiber to the house, terminates it, installs the gateway and confirms speeds before leaving. We book that appointment with you on the ordering call, so you pick the window rather than waiting on a callback.",
  },
  {
    q: "Can I get service at my address?",
    a: "Fiber is built out street by street, so availability is confirmed address by address rather than by ZIP alone. Start with the ZIP checker above and we will verify the exact service address on the call before anything is placed.",
  },
  {
    q: "How long is the price locked in?",
    a: "It depends on the tier. The 100 Mbps rate holds for one year with eBill, 1 Gig and 2 Gig hold for two years, and 3 Gig holds for three. We read the term and the full monthly total back to you before the order goes in.",
  },
  {
    q: "What if I change my mind after it is installed?",
    a: `altafiber backs new Fioptics service with a ${FEE.moneyBackDays}-day money-back guarantee, so there is a real window to live with the service before you are committed to it.`,
  },
  {
    q: "Do I have to bundle TV or phone to get the internet pricing?",
    a: "No. Internet stands on its own at the rates shown. Adding Fioptics+ TV or Home Phone lowers the combined monthly cost, but it is never a requirement for the internet rate.",
  },
];

/* -------------------------------------------------------------------------- */
/* Footer                                                                     */
/* -------------------------------------------------------------------------- */

export const footer = {
  blurb: `${site.retailer} is an independent authorized retailer of altafiber. We take orders for altafiber Fioptics internet, Fioptics+ TV and Home Phone service over the phone and book your installation with you.`,
  columns: [
    {
      title: "Services",
      links: [
        { label: "Fiber internet", href: "#plans" },
        { label: "Internet + TV bundles", href: "#bundles" },
        { label: "Fioptics+ TV", href: "#tv" },
        { label: "Home phone", href: "#phone" },
      ],
    },
    {
      title: "Plans",
      links: [
        { label: "100 Mbps", href: "#plans" },
        { label: "1 Gig", href: "#plans" },
        { label: "2 Gig", href: "#plans" },
        { label: "3 Gig", href: "#plans" },
        { label: "6 Gig", href: "#plans" },
      ],
    },
    {
      title: "Details",
      links: [
        { label: "Hardware and fees", href: "#hardware" },
        { label: "How it works", href: "#how-it-works" },
        { label: "Why fiber", href: "#why" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy policy", href: "/privacy" },
        { label: "Terms of use", href: "/terms" },
        { label: "Accessibility", href: "/accessibility" },
        { label: "Do not sell my info", href: "/do-not-sell" },
      ],
    },
  ],
  legal: [
    `${site.retailer} is an independent authorized retailer of altafiber. altafiber, Fioptics and Fioptics+ are trademarks of Cincinnati Bell Inc. and its affiliates. All trademarks, logos and brand names are the property of their respective owners and are used here for identification purposes only. Use of these names does not imply endorsement.`,
    "Pricing shown reflects altafiber's published residential offers for new customers and requires eBill. Service is not available at every address and is confirmed address by address. Advertised rates exclude equipment charges, taxes, government fees and surcharges, and are subject to change. Promotional rates apply for the term shown, and customers who have had Fioptics service within the prior six months may not qualify.",
    "Speeds referenced are the maximum wired speeds of each tier. Actual speeds vary with equipment, in-home wiring and Wi-Fi conditions.",
  ],
} as const;
