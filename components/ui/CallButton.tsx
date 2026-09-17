"use client";

import { site, telHref } from "@/lib/content";
import Magnetic from "./MagneticButton";

type Variant = "solid" | "green" | "outline" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  solid:
    "bg-accent text-white hover:bg-ink shadow-[0_10px_30px_-14px_rgba(0,91,181,0.55)]",
  green:
    "bg-alta-green text-white hover:bg-[#2f9f68] shadow-[0_10px_30px_-14px_rgba(61,195,127,0.6)]",
  outline:
    "border border-line bg-white text-ink hover:border-accent/50 hover:bg-tint",
  ghost: "border border-white/30 text-white hover:bg-white/10",
  light: "bg-white text-accent hover:bg-tint",
};

const SIZES: Record<Size, string> = {
  sm: "h-10 px-4 text-[0.8125rem]",
  md: "h-12 px-6 text-[0.9375rem]",
  lg: "h-14 px-7 text-base",
};

type CallButtonProps = {
  /**
   * Button copy. Outside the header and footer this is always "Call to order"
   * or "Call for pricing" — both supplied by `ctaLabel()` in lib/content.ts.
   */
  label: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  full?: boolean;
  /** Show the phone number after the label (header and footer only). */
  showNumber?: boolean;
  magnetic?: boolean;
  /** Analytics hook, e.g. "hero" or "plan:fiber-1g". */
  context?: string;
};

/**
 * Every tel: link on the site is rendered through this component, which is
 * what guarantees the `data-call-cta` attribute is present on all of them.
 */
export default function CallButton({
  label,
  variant = "solid",
  size = "md",
  className = "",
  full = false,
  showNumber = false,
  magnetic = true,
  context,
}: CallButtonProps) {
  const anchor = (
    <a
      href={telHref}
      data-call-cta
      data-call-context={context}
      aria-label={`${label} — call ${site.phone.display}`}
      className={[
        "group inline-flex items-center justify-center gap-2 rounded-full font-semibold",
        "transition-[background-color,border-color,color,box-shadow,transform] duration-300",
        "active:scale-[0.98] whitespace-nowrap",
        VARIANTS[variant],
        SIZES[size],
        full ? "w-full" : "",
        className,
      ].join(" ")}
    >
      <PhoneGlyph />
      <span>{label}</span>
      {showNumber ? (
        <span className="tnum hidden font-bold sm:inline">
          {site.phone.display}
        </span>
      ) : null}
    </a>
  );

  if (!magnetic) return anchor;

  return (
    <Magnetic className={full ? "w-full" : ""}>
      {full ? <span className="w-full">{anchor}</span> : anchor}
    </Magnetic>
  );
}

function PhoneGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-[1.05em] shrink-0 transition-transform duration-500 group-hover:-rotate-12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}
