"use client";

import { ctaLabel, speedLabel, type PlanItem } from "@/lib/content";
import { useTilt } from "@/lib/hooks";
import CallButton from "./CallButton";
import PriceLockup from "./PriceLockup";
import { Check } from "./Icons";

/**
 * One plan card for any service line.
 *
 * Every visible value comes from the PlanItem it is handed — including the CTA
 * label, which `ctaLabel()` resolves to "Call to order" when the plan has a
 * published price and "Call for pricing" when it does not.
 */
export default function PlanCard({ plan }: { plan: PlanItem }) {
  const ref = useTilt<HTMLDivElement>(6);
  const featured = Boolean(plan.isPopular);
  const speed = speedLabel(plan.speedDown);

  return (
    <div
      ref={ref}
      className={[
        "tilt-card group relative flex h-full flex-col rounded-[var(--radius-card)] p-6 sm:p-7",
        "transition-shadow duration-500",
        featured
          ? "bg-white text-ink shadow-[0_2px_6px_rgba(16,16,20,0.04),0_28px_56px_-22px_rgba(0,91,181,0.3)] ring-2 ring-accent"
          : "bg-white text-ink shadow-[var(--shadow-card)] ring-1 ring-line hover:shadow-[var(--shadow-lift)]",
      ].join(" ")}
    >
      {/* Cursor-tracking sheen, featured card only. */}
      {featured ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--gx,50%) var(--gy,50%), rgba(66,148,247,0.12), transparent 62%)",
          }}
        />
      ) : null}

      <div className="tilt-layer relative flex h-full flex-col" style={{ ["--z" as string]: "26px" }}>
        {/* ---- Header ---- */}
        <div className="flex min-h-7 items-start justify-between gap-3">
          <p
            className={[
              "text-[0.6875rem] font-bold uppercase tracking-[0.14em]",
              featured ? "text-accent" : "text-body",
            ].join(" ")}
          >
            {plan.tagline}
          </p>

          {plan.badge ? (
            <span
              className={[
                "shrink-0 rounded-full px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-[0.1em]",
                featured
                  ? "bg-accent text-white"
                  : "bg-tint text-accent ring-1 ring-accent/15",
              ].join(" ")}
            >
              {plan.badge}
            </span>
          ) : null}
        </div>

        <h3 className="mt-3 text-[1.375rem] font-bold leading-tight sm:text-2xl">
          {plan.name}
        </h3>

        {speed ? (
          <p
            className={[
              "mt-1.5 text-sm font-medium",
              featured ? "text-body" : "text-body",
            ].join(" ")}
          >
            {speed} download · {speedLabel(plan.speedUp)} upload
          </p>
        ) : plan.unit ? (
          <p
            className={[
              "mt-1.5 text-sm font-medium",
              featured ? "text-body" : "text-body",
            ].join(" ")}
          >
            {plan.unit}
          </p>
        ) : null}

        {/* ---- Price ---- */}
        {/* Featured cards are white now, so the lockup never inverts. */}
        <PriceLockup plan={plan} size="md" className="mt-6" />

        <div
          className={[
            "mt-6 h-px w-full",
            featured ? "bg-line" : "bg-line",
          ].join(" ")}
        />

        {/* ---- Features ---- */}
        <ul className="mt-6 flex flex-1 flex-col gap-3">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <span
                className={[
                  "mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-full",
                  featured ? "bg-alta-green/15 text-[#1f7a4d]" : "bg-alta-green/15 text-[#1f7a4d]",
                ].join(" ")}
              >
                <Check className="size-2.5" />
              </span>
              <span
                className={[
                  "text-[0.875rem] leading-snug",
                  featured ? "text-body" : "text-body",
                ].join(" ")}
              >
                {f}
              </span>
            </li>
          ))}
        </ul>

        {/* ---- Terms strip ---- */}
        <dl
          className={[
            "mt-6 space-y-1.5 rounded-xl px-3.5 py-3 text-[0.75rem] leading-snug",
            /* Full-strength charcoal here: at 80% on this tint the 12px labels
               land at 4.44:1, just under the 4.5:1 AA threshold. */
            featured ? "bg-tint text-body" : "bg-surface-alt text-body",
          ].join(" ")}
        >
          {plan.equipmentFee ? (
            <div className="flex justify-between gap-3">
              <dt className="shrink-0 font-semibold">Equipment</dt>
              <dd className="text-right">{plan.equipmentFee}</dd>
            </div>
          ) : null}
          {plan.dataPolicy ? (
            <div className="flex justify-between gap-3">
              <dt className="shrink-0 font-semibold">Data</dt>
              <dd className="text-right">{plan.dataPolicy}</dd>
            </div>
          ) : null}
          {plan.contractTerm ? (
            <div className="flex justify-between gap-3">
              <dt className="shrink-0 font-semibold">Term</dt>
              <dd className="text-right">{plan.contractTerm}</dd>
            </div>
          ) : null}
        </dl>

        {/* ---- CTA ---- */}
        <CallButton
          label={ctaLabel(plan)}
          variant="solid"
          size="md"
          full
          magnetic={false}
          context={`plan:${plan.id}`}
          className="mt-5"
        />
      </div>
    </div>
  );
}
