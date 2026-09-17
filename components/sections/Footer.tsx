"use client";

import { footer, site, telHref } from "@/lib/content";
import { Wordmark } from "./Header";

/**
 * Dark enterprise footer.
 *
 * Layout follows the reference pattern: a brand block plus link columns on the
 * top row, a dedicated disclosures band beneath it, and a bottom bar carrying
 * the policy links and the copyright + reseller line.
 */
export default function Footer() {
  const [services, plansCol, details, legal] = footer.columns;

  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fiber-blue/50 to-transparent"
      />

      {/* ==================== Top row ==================== */}
      <div className="shell">
        <div className="grid gap-10 py-14 sm:grid-cols-2 sm:py-16 lg:grid-cols-[1.6fr_0.85fr_0.7fr_0.9fr_1.25fr] lg:gap-10">
          {/* Brand block */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Wordmark invert />
            <p className="mt-5 max-w-sm text-[0.8125rem] leading-relaxed text-white/70">
              {footer.blurb}
            </p>
          </div>

          {/* Link columns */}
          {[services, plansCol, details].map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.15em] text-white/70">
                {col.title}
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[0.8125rem] font-medium text-white/65 transition-colors duration-300 hover:text-fiber-blue"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact block — the footer is one of the two places the raw
              number is allowed to be the visible text. */}
          <div>
            <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.15em] text-white/70">
              Order by phone
            </h2>
            <a
              href={telHref}
              data-call-cta
              data-call-context="footer"
              className="tnum mt-3 inline-flex min-h-11 items-center text-[1.375rem] font-bold tracking-[-0.02em] text-white transition-colors duration-300 hover:text-fiber-blue"
            >
              {site.phone.display}
            </a>
            <p className="mt-3 max-w-[16rem] text-[0.8125rem] leading-relaxed text-white/70">
              We confirm your exact address, read back the full monthly total
              and book the installation window with you on the call.
            </p>
          </div>
        </div>
      </div>

      {/* ==================== Disclosures band ==================== */}
      <div className="border-t border-white/8 bg-white/[0.02]">
        <div className="shell py-10 sm:py-12">
          <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.15em] text-white/70">
            Offer details &amp; required disclosures
          </h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-3 lg:gap-8">
            {footer.legal.map((para, i) => (
              <p
                key={i}
                className="text-[0.75rem] leading-relaxed text-white/70"
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* ==================== Bottom bar ==================== */}
      <div className="border-t border-white/8">
        <div className="shell flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label={legal.title}>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {legal.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[0.75rem] font-medium text-white/60 transition-colors duration-300 hover:text-white/80"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-[0.75rem] text-white/70">
            © {new Date().getFullYear()} {site.retailer} —{" "}
            <span className="text-white/85">{site.disclosure}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
