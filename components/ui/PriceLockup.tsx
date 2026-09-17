import type { PlanItem } from "@/lib/content";

type Size = "sm" | "md" | "lg";

const SIZES: Record<Size, { integer: string; symbol: string; cents: string }> = {
  // Dominant integer stays inside the 2.5rem - 3.5rem band at every size.
  sm: { integer: "text-[2.5rem]", symbol: "text-lg", cents: "text-sm" },
  md: { integer: "text-[3rem]", symbol: "text-xl", cents: "text-base" },
  lg: { integer: "text-[3.5rem]", symbol: "text-2xl", cents: "text-lg" },
};

type PriceLockupProps = {
  plan: PlanItem;
  size?: Size;
  /** Render light-on-dark (hero, footer). */
  invert?: boolean;
  className?: string;
};

/**
 * The single price renderer for the entire site.
 *
 * Every card, the hero anchor and the comparison grid call this component, so
 * a price change in lib/content.ts propagates everywhere with no layout edits.
 * A plan with no `price` renders its qualifier instead of an empty lockup.
 */
export default function PriceLockup({
  plan,
  size = "md",
  invert = false,
  className = "",
}: PriceLockupProps) {
  const s = SIZES[size];

  const muted = invert ? "text-white/80" : "text-body";
  const strong = invert ? "text-white" : "text-ink";
  const accent = invert ? "text-white/80" : "text-accent";

  /* ---- Unpriced plan: no lockup, just the qualifier ---- */
  if (typeof plan.price !== "number") {
    return (
      <div className={className}>
        <div className={`flex items-baseline gap-2 ${strong}`}>
          <span
            className={`${s.integer} font-bold leading-[0.9] tracking-tight`}
          >
            Custom
          </span>
        </div>
        {plan.promoQualifier ? (
          <p className={`mt-2 text-[0.8125rem] leading-snug ${muted}`}>
            {plan.promoQualifier}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Visual flex row: dollar sign, dominant integer, muted cents. */}
      <div className="flex items-start gap-1">
        <span
          className={`${s.symbol} ${accent} mt-[0.42em] font-semibold leading-none`}
          aria-hidden="true"
        >
          $
        </span>

        <span
          className={`${s.integer} ${strong} tnum font-bold leading-[0.86] tracking-[-0.045em]`}
        >
          {plan.price}
        </span>

        <span className="mt-[0.5em] flex flex-col leading-none">
          {plan.cents ? (
            <span
              className={`${s.cents} ${muted} tnum font-semibold leading-none`}
              aria-hidden="true"
            >
              {plan.cents}
            </span>
          ) : null}
          <span
            className={`mt-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] ${muted}`}
            aria-hidden="true"
          >
            /mo
          </span>
        </span>
      </div>

      {/* Accessible equivalent of the split lockup above. */}
      <span className="sr-only">
        {`$${plan.price}${plan.cents ? `.${plan.cents}` : ""} per month`}
        {plan.promoQualifier ? `. ${plan.promoQualifier}` : ""}
      </span>

      {plan.promoQualifier ? (
        <p
          className={`mt-2 text-[0.8125rem] leading-snug ${muted}`}
          aria-hidden="true"
        >
          {plan.promoQualifier}
        </p>
      ) : null}
    </div>
  );
}
