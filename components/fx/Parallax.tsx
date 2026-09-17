"use client";

import type { ReactNode } from "react";
import { useScrollProgress, usePrefersReducedMotion } from "@/lib/hooks";

type ParallaxProps = {
  children: ReactNode;
  /** Total travel in pixels across the element's full pass through the viewport. */
  distance?: number;
  className?: string;
  /** Negative values move against the scroll direction. */
  direction?: 1 | -1;
};

/**
 * Depth parallax. Transform only, so it never triggers layout, and the rAF
 * sampler inside useScrollProgress only runs while the element is on screen.
 */
export default function Parallax({
  children,
  distance = 80,
  className = "",
  direction = -1,
}: ParallaxProps) {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();

  const offset = reduced ? 0 : (progress - 0.5) * distance * direction;

  return (
    <div ref={ref} className={className}>
      <div
        style={{
          transform: `translate3d(0, ${offset.toFixed(2)}px, 0)`,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}
