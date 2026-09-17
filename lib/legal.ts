/**
 * lib/legal.ts — policy page content
 * ---------------------------------------------------------------------------
 * Kept separate from lib/content.ts so commercial data (plans, rates) and
 * policy prose stay independently editable, but every company-specific value
 * still resolves from `site` there. Changing the entity name, contact address
 * or effective date in one place updates all four policy pages.
 *
 * These documents describe how this site actually behaves — notably that the
 * ZIP checker runs entirely in the browser and transmits nothing. Have counsel
 * review them against your jurisdiction and your actual data practices before
 * publishing.
 */

import { site } from "./content";

export interface LegalSection {
  heading: string;
  body?: string[];
  list?: string[];
}

export interface LegalDoc {
  slug: string;
  title: string;
  /** Short description used for the page metadata and the lede. */
  summary: string;
  sections: LegalSection[];
}

const E = site.legalEntity;
const MAIL = site.mailingAddress;
const EMAIL = site.contactEmail;

/* -------------------------------------------------------------------------- */

export const privacy: LegalDoc = {
  slug: "privacy",
  title: "Privacy policy",
  summary: `How ${E} handles information when you use this site or call to place an order.`,
  sections: [
    {
      heading: "Who we are",
      body: [
        `${E} operates this site as an independent authorized retailer of altafiber. We take orders for altafiber Fioptics internet, Fioptics+ TV and Home Phone service by phone. We are not altafiber, and this policy covers only our own handling of information.`,
        `Once your order is placed with altafiber, altafiber becomes the provider of record for that service and its own privacy policy governs the account it creates.`,
      ],
    },
    {
      heading: "What the site itself collects",
      body: [
        "This site is a static page. It has no account system, no login, no contact form and no order form.",
        "The ZIP code field is processed entirely in your browser. It checks that you typed five digits and then shows you a prompt to call. That value is never transmitted to us, never stored, and never leaves your device.",
      ],
      list: [
        "Standard server request data — IP address, user agent, referring page and the time of the request — logged by our hosting provider for security and reliability.",
        "Analytics and advertising measurement data, where those services are enabled. See “Cookies and measurement” below.",
        "Nothing else. We do not collect names, addresses, email addresses or payment details through this website.",
      ],
    },
    {
      heading: "What we collect when you call",
      body: [
        "Placing an order is a phone conversation, and it requires information that altafiber needs in order to provision service. During that call we may collect:",
      ],
      list: [
        "Your name and the service address, so availability can be confirmed at that address.",
        "A contact phone number and email address for the order and the installation appointment.",
        "The plan, equipment and installation window you select.",
        "Any information altafiber requires to establish the account.",
      ],
    },
    {
      heading: "How we use it",
      body: [
        "We use the information you give us on a call to check availability, quote you an accurate monthly total, place your order with altafiber and schedule your installation. We use aggregate site and call data to understand which pages lead to orders so we can improve them.",
        "We do not use your information to build a profile of you, and we do not make automated decisions about you.",
      ],
    },
    {
      heading: "Who we share it with",
      list: [
        "altafiber, to place and provision the order you asked us to place.",
        "Service providers who operate this site and our phone system on our behalf, under contracts that limit them to that purpose.",
        "Advertising and analytics platforms, limited to measurement data as described below.",
        "Law enforcement or regulators, where we are legally required to respond.",
      ],
      body: [
        "We do not sell your personal information, and we do not share it for cross-context behavioral advertising. See our Do Not Sell or Share notice for the detail.",
      ],
    },
    {
      heading: "Cookies and measurement",
      body: [
        "This page sets no cookies of its own. Where advertising or analytics tags are enabled, those third parties may set their own cookies or identifiers to measure whether an ad led to a call. You can block or clear these through your browser settings, and most platforms offer their own opt-out.",
        "We honor Global Privacy Control signals as an opt-out of sharing where applicable law requires it.",
      ],
    },
    {
      heading: "Calls may be recorded",
      body: [
        "Ordering calls may be monitored or recorded for quality and training, and to keep an accurate record of the plan and total quoted to you. Where the law requires it, you will be told at the start of the call and you may ask that recording stop.",
      ],
    },
    {
      heading: "How long we keep it",
      body: [
        "We keep order records for as long as we need them to support the order and to meet our legal, tax and audit obligations, then delete or de-identify them. Server logs are retained for a short period for security purposes.",
      ],
    },
    {
      heading: "Your rights",
      body: [
        "Depending on where you live, you may have the right to request a copy of the personal information we hold about you, ask us to correct or delete it, opt out of sale or sharing, and not be discriminated against for exercising any of these rights.",
        `To make a request, email ${EMAIL} or write to ${MAIL}. We will verify your identity before acting, and we will respond within the time the applicable law allows. You may use an authorized agent.`,
      ],
    },
    {
      heading: "Children",
      body: [
        "This site is meant for adults arranging residential service. We do not knowingly collect personal information from children under 13. If you believe a child has given us information, contact us and we will delete it.",
      ],
    },
    {
      heading: "Security",
      body: [
        "We use reasonable administrative and technical safeguards appropriate to the limited information we handle. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
      ],
    },
    {
      heading: "Changes to this policy",
      body: [
        "If we change this policy we will post the revised version here and update the effective date above. Material changes will be highlighted on this page.",
      ],
    },
    {
      heading: "Contact",
      body: [`Email ${EMAIL} or write to ${E}, ${MAIL}.`],
    },
  ],
};

/* -------------------------------------------------------------------------- */

export const terms: LegalDoc = {
  slug: "terms",
  title: "Terms of use",
  summary: `The terms that apply when you use this website operated by ${E}.`,
  sections: [
    {
      heading: "Acceptance",
      body: [
        `By using this site you agree to these terms. If you do not agree with them, please do not use the site.`,
      ],
    },
    {
      heading: "What this site is",
      body: [
        `${E} is an independent authorized retailer of altafiber. This site describes altafiber services that we can order on your behalf, and it exists so you can review those services and reach us by phone.`,
        "We are a separate company from altafiber. Nothing here is published by altafiber, and using this site does not create a service agreement with altafiber. That agreement is formed when your order is accepted and altafiber establishes your account, and it is governed by altafiber's own terms.",
      ],
    },
    {
      heading: "Pricing and availability",
      body: [
        "Prices, speeds, promotional terms, equipment charges and channel counts shown here reflect altafiber's published residential offers and are provided for information. They are not an offer capable of acceptance.",
        "Service is not available at every address, and fiber availability is confirmed address by address rather than by ZIP code alone. Advertised rates exclude equipment charges, taxes, government fees and surcharges, may require eBill and enrollment in autopay where stated, and apply for the promotional term shown. Offers change, and altafiber may withdraw or alter them at any time.",
        "We will confirm the plan, the term and the full monthly total with you on the ordering call before anything is placed. The figures confirmed on that call, and the terms altafiber sends you, control over anything on this page.",
      ],
    },
    {
      heading: "Trademarks",
      body: [
        "altafiber, Fioptics and Fioptics+ are trademarks of Cincinnati Bell Inc. and its affiliates. TiVo, eero, Netflix, HBO Max, Disney+ and Hulu are trademarks of their respective owners.",
        "All trademarks, logos and brand names on this site are the property of their respective owners and are used for identification purposes only. Their use does not imply any endorsement, affiliation or sponsorship beyond our authorized retailer relationship with altafiber.",
      ],
    },
    {
      heading: "Acceptable use",
      list: [
        "Do not use this site for any unlawful purpose or in breach of these terms.",
        "Do not attempt to gain unauthorized access to the site or any system connected to it.",
        "Do not scrape, mirror or reproduce the site in a way that misrepresents who published it.",
        "Do not interfere with the site's operation or availability to others.",
      ],
    },
    {
      heading: "Our content",
      body: [
        `The layout, text, graphics and code of this site are owned by ${E} or its licensors and are protected by copyright. You may view and print pages for your own use in evaluating service. Any other reproduction requires our written permission.`,
      ],
    },
    {
      heading: "Third-party links",
      body: [
        "This site may link to sites we do not control, including altafiber's. We are not responsible for the content, accuracy or practices of those sites, and a link is not an endorsement.",
      ],
    },
    {
      heading: "Disclaimer",
      body: [
        'This site is provided "as is" and "as available". To the fullest extent permitted by law we disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose and non-infringement.',
        "We work to keep the information here accurate and current, but we do not warrant that it is free of errors or omissions, and speeds referenced are the maximum wired speeds of each tier. Actual speeds vary with equipment, in-home wiring and Wi-Fi conditions.",
      ],
    },
    {
      heading: "Limitation of liability",
      body: [
        `To the fullest extent permitted by law, ${E} will not be liable for any indirect, incidental, special, consequential or punitive damages, or for lost profits or lost data, arising out of your use of this site. Nothing in these terms limits liability that cannot be limited under applicable law.`,
      ],
    },
    {
      heading: "Governing law",
      body: [
        `These terms are governed by the laws of ${site.governingLaw}, without regard to its conflict of laws rules.`,
      ],
    },
    {
      heading: "Changes",
      body: [
        "We may update these terms. The version posted here is the one that applies, and the effective date above tells you when it was last changed.",
      ],
    },
    {
      heading: "Contact",
      body: [`Email ${EMAIL} or write to ${E}, ${MAIL}.`],
    },
  ],
};

/* -------------------------------------------------------------------------- */

export const accessibility: LegalDoc = {
  slug: "accessibility",
  title: "Accessibility",
  summary: `How this site is built to be usable by everyone, and how to tell us when it is not.`,
  sections: [
    {
      heading: "Our commitment",
      body: [
        `${E} wants everyone to be able to compare plans and reach us, regardless of how they browse. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA, and we treat any barrier on this site as a defect worth fixing.`,
      ],
    },
    {
      heading: "What we have built in",
      list: [
        "Semantic HTML with a single page heading, labelled landmark regions and headings in order, so screen readers can navigate by structure.",
        "A skip link to the plans, and a visible focus ring on every link, button and field.",
        "Full keyboard operation — the navigation, the ZIP checker and the FAQ accordion all work without a mouse, and the accordion exposes its open state with aria-expanded.",
        "Price lockups are split visually for emphasis but announced to screen readers as a single plain sentence, so “$50 per month” is never read as disconnected fragments.",
        "Decorative graphics, including the animated background, are hidden from assistive technology; the network diagram carries a text description.",
        "Full support for prefers-reduced-motion: every animation, parallax, tilt and scroll effect is disabled and the page renders statically.",
        "Text colours are chosen for contrast against their backgrounds, and the layout reflows without horizontal scrolling down to 320px and under zoom.",
        "Live regions announce the result of the ZIP check rather than changing the page silently.",
      ],
    },
    {
      heading: "Ordering by phone",
      body: [
        "Every plan can be ordered by phone, and a call is always an alternative to using this site. If any part of this page is a barrier, call us and we will walk through the options, read out the pricing and place the order with you.",
      ],
    },
    {
      heading: "Known limitations",
      body: [
        "Some third-party content, if embedded in future, may not meet the same standard. Where that happens we will note it here and provide an accessible alternative.",
      ],
    },
    {
      heading: "Tell us about a problem",
      body: [
        `If you run into something on this site that you cannot use, we want to hear about it. Email ${EMAIL} or write to ${MAIL}, and tell us the page, what you were trying to do and the assistive technology or browser you were using. We will respond and tell you what we are doing about it.`,
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */

export const doNotSell: LegalDoc = {
  slug: "do-not-sell",
  title: "Do not sell or share my personal information",
  summary: `Your right to opt out of the sale or sharing of personal information, and what ${E} actually does.`,
  sections: [
    {
      heading: "The short version",
      body: [
        `${E} does not sell your personal information for money, and we do not share it for cross-context behavioral advertising. We have not done so in the preceding twelve months, and we do not knowingly sell or share the personal information of anyone under 16.`,
        "You can still exercise the rights below, and we will honor the request.",
      ],
    },
    {
      heading: "Why this page exists anyway",
      body: [
        "Privacy laws in California and several other states define “sale” and “sharing” broadly enough that some advertising and analytics cookies can fall within them, even where no money changes hands. This page gives you a clear way to opt out of that, and to tell us your preference.",
      ],
    },
    {
      heading: "How to opt out",
      list: [
        "Turn on Global Privacy Control in your browser or extension. We treat that signal as a valid opt-out request for the browser that sends it.",
        "Decline non-essential cookies if a consent banner is presented to you, or clear and block them in your browser settings.",
        `Email ${EMAIL} with the subject “Do not sell or share”, and tell us how to reach you so we can confirm.`,
        `Write to ${E}, ${MAIL}.`,
      ],
      body: [
        "We do not require an account to make a request, and we will not charge you or give you a worse price or service for making one.",
      ],
    },
    {
      heading: "Your other rights",
      body: [
        "Depending on your state, you may also have the right to know what personal information we have collected about you and where it came from, to get a copy of it, to correct it, to have it deleted, and to limit the use of sensitive personal information. Our privacy policy explains each of these and how we verify a request.",
      ],
    },
    {
      heading: "Authorized agents",
      body: [
        "You may use an authorized agent to submit a request on your behalf. We will ask the agent for written proof of their authority, and we may ask you to verify your own identity directly before we act.",
      ],
    },
    {
      heading: "How we respond",
      body: [
        "We confirm receipt of a request within ten business days and respond substantively within forty-five calendar days, extending once by a further forty-five days where the request is complex. If we decline a request we will tell you why, and you may appeal by replying to our response.",
      ],
    },
    {
      heading: "Contact",
      body: [`Email ${EMAIL} or write to ${E}, ${MAIL}.`],
    },
  ],
};

export const legalDocs: LegalDoc[] = [privacy, terms, accessibility, doNotSell];
