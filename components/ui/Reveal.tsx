"use client";

import type { ElementType, ReactNode } from "react";
import { useInView } from "@/lib/hooks";

type RevealProps = {
  children: ReactNode;
  /** Stagger offset in milliseconds. */
  delay?: number;
  className?: string;
  as?: ElementType;
  /** "rise" fades up; "wipe" runs a clip-path wipe. */
  variant?: "rise" | "wipe";
  threshold?: number;
};

/**
 * Scroll-triggered entrance. The transition itself lives in globals.css so the
 * work stays on the compositor and nothing animates layout.
 *
 * Note on the "wipe" variant: `clip-path` participates in IntersectionObserver's
 * intersection calculation, so an element clipped to zero height reports a
 * ratio of 0 and could never trigger its own reveal. The observer therefore
 * watches an unclipped wrapper, and the clip is applied to a child.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  variant = "rise",
  threshold,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold });
  const style = { ["--reveal-delay" as string]: `${delay}ms` };

  if (variant === "wipe") {
    return (
      <Tag ref={ref}>
        <div className={`wipe ${inView ? "is-in" : ""} ${className}`} style={style}>
          {children}
        </div>
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}
