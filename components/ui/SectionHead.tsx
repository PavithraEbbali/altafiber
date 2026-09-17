import type { ReactNode } from "react";
import Reveal from "./Reveal";
import RevealText from "./RevealText";

type SectionHeadProps = {
  eyebrow: string;
  heading: string;
  sub?: string;
  invert?: boolean;
  align?: "left" | "center";
  children?: ReactNode;
};

/** Shared eyebrow + masked heading + sub used by every major section. */
export default function SectionHead({
  eyebrow,
  heading,
  sub,
  invert = false,
  align = "left",
  children,
}: SectionHeadProps) {
  const centered = align === "center";

  return (
    <div
      className={[
        "flex flex-col",
        centered ? "items-center text-center" : "items-start",
      ].join(" ")}
    >
      <Reveal>
        <span
          className={[
            "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.16em]",
            invert
              ? "bg-navy/55 text-white ring-1 ring-white/25"
              : "bg-tint text-accent ring-1 ring-accent/15",
          ].join(" ")}
        >
          <span className="size-1.5 rounded-full bg-accent-bright" />
          {eyebrow}
        </span>
      </Reveal>

      <RevealText
        as="h2"
        lines={[heading]}
        delay={60}
        className={[
          "mt-5 max-w-3xl text-[1.75rem] font-bold leading-[1.1] sm:text-[2.25rem] lg:text-[2.75rem]",
          invert ? "text-white" : "text-ink",
        ].join(" ")}
      />

      {sub ? (
        <Reveal delay={180}>
          <p
            className={[
              "mt-4 max-w-2xl text-[0.9375rem] leading-relaxed sm:text-base",
              invert ? "text-white/90" : "text-body",
            ].join(" ")}
          >
            {sub}
          </p>
        </Reveal>
      ) : null}

      {children}
    </div>
  );
}
