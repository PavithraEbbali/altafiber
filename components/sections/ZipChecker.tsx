"use client";

import { useState, type FormEvent } from "react";
import { hero } from "@/lib/content";
import CallButton from "@/components/ui/CallButton";

type Status = "idle" | "error" | "ready";

/**
 * Availability checker.
 *
 * Frontend only by design — there is no lookup API behind this. A valid ZIP
 * captures the starting point and hands the visitor to the ordering call,
 * where the exact service address gets confirmed.
 *
 * Sits inside the hero beneath the supporting paragraph, and is the hero's
 * only action. The label stacks above the field so the input keeps its full
 * width at the hero's measure.
 */
export default function ZipChecker() {
  const [zip, setZip] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setStatus(/^\d{5}$/.test(zip.trim()) ? "ready" : "error");
  };

  return (
    <div className="w-full">
      <form onSubmit={submit} noValidate>
        <label
          htmlFor="zip"
          className="block text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-body"
        >
          {hero.zip.label}
        </label>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            id="zip"
            name="zip"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            value={zip}
            placeholder={hero.zip.placeholder}
            aria-invalid={status === "error"}
            aria-describedby="zip-msg"
            onChange={(e) => {
              setZip(e.target.value.replace(/\D/g, "").slice(0, 5));
              if (status !== "idle") setStatus("idle");
            }}
            className={[
              /* `sm:flex-1`, never plain `flex-1`: below `sm` the wrapper is
                 flex-col, where flex-1 governs height and collapses h-14 to
                 the 26px content height. */
              "tnum h-14 w-full shrink-0 border-0 border-b-2 bg-transparent px-1 text-[1.125rem] font-bold tracking-[0.06em] text-ink sm:flex-1 sm:text-[1.25rem]",
              "placeholder:text-[1.0625rem] placeholder:font-medium placeholder:tracking-normal placeholder:text-body",
              "transition-colors duration-300 focus:outline-none",
              status === "error"
                ? "border-[#c9253c]"
                : "border-line focus:border-accent",
            ].join(" ")}
          />

          <button
            type="submit"
            className="group flex h-14 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-8 text-[0.9375rem] font-bold text-white transition-colors duration-300 hover:bg-ink sm:w-auto sm:px-9"
          >
            {hero.zip.button}
            <svg
              viewBox="0 0 24 24"
              className="size-4 transition-transform duration-400 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14m0 0-6-6m6 6-6 6" />
            </svg>
          </button>
        </div>
      </form>

      {/* Live region: one slot, three states. */}
      <div id="zip-msg" aria-live="polite">
        {status === "idle" ? (
          <p className="mt-3.5 text-[0.8125rem] leading-snug text-body">
            {hero.zip.helper}
          </p>
        ) : null}

        {status === "error" ? (
          <p className="mt-3 text-[0.8125rem] font-semibold leading-snug text-[#c9253c]">
            Enter a 5-digit ZIP code to continue.
          </p>
        ) : null}

        {status === "ready" ? (
          <div className="mt-4 rounded-xl border border-alta-green/35 bg-alta-green/[0.07] p-4 sm:flex sm:items-center sm:justify-between sm:gap-6">
            <div>
              <p className="text-[0.875rem] font-bold leading-snug text-ink">
                Got it — ZIP {zip}.
              </p>
              <p className="mt-1.5 max-w-xl text-[0.8125rem] leading-relaxed text-body">
                Fiber is built street by street, so the last step is confirming
                your exact address. Give us a call and we will check it and
                place the order with you.
              </p>
            </div>
            <CallButton
              label="Call to order"
              variant="solid"
              size="md"
              magnetic={false}
              context="zip-result"
              className="mt-4 shrink-0 sm:mt-0"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
