"use client";

import type { ReactNode } from "react";
import { useMagnetic } from "@/lib/hooks";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
};

/**
 * Wraps a CTA so it leans toward the cursor as the pointer approaches, then
 * eases back. Disabled automatically on touch and under reduced motion.
 */
export default function Magnetic({
  children,
  className = "",
  strength = 0.3,
  radius = 80,
}: MagneticProps) {
  const ref = useMagnetic<HTMLSpanElement>(strength, radius);

  return (
    <span ref={ref} className={`magnetic inline-flex ${className}`}>
      {children}
    </span>
  );
}
