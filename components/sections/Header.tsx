"use client";

import { useState } from "react";
import { site } from "@/lib/content";
import { useScrolled, useActiveSection } from "@/lib/hooks";
import CallButton from "@/components/ui/CallButton";

/* -------------------------------------------------------------------------- */
/* Wordmark                                                                   */
/* -------------------------------------------------------------------------- */

export function Wordmark({ invert = false }: { invert?: boolean }) {
  return (
    <a
      href="#top"
      className="group -my-2 flex items-center gap-2.5 py-2"
      aria-label={`${site.retailer} — home`}
    >
      {/* Fiber-strand mark */}
      <span className="relative flex size-9 shrink-0 items-center justify-center rounded-[11px] bg-accent">
        <svg
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M4 19c0-6 4-9 8-9s8-3 8-9" className="text-white" />
          <path d="M4 13c0-3.4 2.4-5.4 5-5.4" className="text-white/60" />
          <circle cx="19.4" cy="4.6" r="1.8" className="text-white" fill="currentColor" stroke="none" />
        </svg>
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-[11px] ring-1 ring-inset ring-white/10"
        />
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={[
            "whitespace-nowrap text-[1.0625rem] font-bold tracking-[-0.035em]",
            invert ? "text-white" : "text-ink",
          ].join(" ")}
        >
          {/* accent, not accent-bright: #4294f7 is only 3.08:1 on white and this
              is 17px live text, not an exempt logo image. */}
          alta<span className={invert ? "text-fiber-blue" : "text-accent"}>fiber</span>
        </span>
        <span
          className={[
            "mt-1 whitespace-nowrap text-[0.625rem] font-bold uppercase tracking-[0.12em] sm:tracking-[0.17em]",
            invert ? "text-white/70" : "text-body",
          ].join(" ")}
        >
          Authorized Retailer
        </span>
      </span>
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/* Top disclosure bar — persistent, non-dismissable                           */
/* -------------------------------------------------------------------------- */

export function DisclosureBar() {
  return (
    /* Sticky, not just fixed-at-top: the retailer disclosure stays on screen
       for the whole scroll and has no dismiss control. */
    <div className="sticky top-0 z-50 bg-accent">
      <div className="shell flex h-9 items-center justify-center">
        <p className="text-center text-[0.625rem] font-semibold uppercase tracking-[0.04em] text-white sm:text-xs sm:tracking-[0.16em]">
          <span className="mr-2 hidden size-1.5 translate-y-[-1px] rounded-full bg-white/70 align-middle sm:inline-block" />
          {site.disclosure}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Sticky header                                                              */
/* -------------------------------------------------------------------------- */

export default function Header() {
  const scrolled = useScrolled(10);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(site.nav.map((n) => n.href));

  return (
    <header
      className={[
        /* Sits directly beneath the 2.25rem disclosure bar. */
        "sticky top-9 z-40 transition-all duration-500",
        scrolled
          ? "border-b border-line bg-white/90 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80"
          : "border-b border-transparent bg-white",
      ].join(" ")}
    >
      <div className="shell flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        <Wordmark />

        {/* Desktop nav */}
        <nav aria-label="Section navigation" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {site.nav.map((item) => {
              const isActive = active === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={[
                      "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300",
                      isActive
                        ? "text-accent"
                        : "text-body hover:text-ink",
                    ].join(" ")}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={[
                        "absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-accent transition-transform duration-400 ease-[var(--ease-out-expo)]",
                        isActive ? "scale-x-100" : "scale-x-0",
                      ].join(" ")}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Header is one of the two places the raw number is allowed to be
              the visible text. `showNumber` reveals the digits from `sm` up
              and shows just "Call" on narrow screens. */}
          <CallButton
            label="Call"
            showNumber
            variant="solid"
            size="sm"
            magnetic={false}
            context="header"
          />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-10 items-center justify-center rounded-full text-ink transition-colors duration-300 hover:bg-surface-alt lg:hidden"
          >
            <span className="relative flex h-3 w-5 flex-col justify-between">
              <span
                className={[
                  "h-0.5 w-full rounded-full bg-current transition-transform duration-400 ease-[var(--ease-out-expo)]",
                  open ? "translate-y-[5px] rotate-45" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "h-0.5 w-full rounded-full bg-current transition-opacity duration-200",
                  open ? "opacity-0" : "opacity-100",
                ].join(" ")}
              />
              <span
                className={[
                  "h-0.5 w-full rounded-full bg-current transition-transform duration-400 ease-[var(--ease-out-expo)]",
                  open ? "-translate-y-[5px] -rotate-45" : "",
                ].join(" ")}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        id="mobile-nav"
        className="grid overflow-hidden border-t border-line transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)] lg:hidden"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        aria-hidden={!open}
      >
        <div className="overflow-hidden bg-white">
          <ul className="shell flex flex-col py-2">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="block border-b border-line py-3.5 text-[0.9375rem] font-semibold text-ink last:border-b-0"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
