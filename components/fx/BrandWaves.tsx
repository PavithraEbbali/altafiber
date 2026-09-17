"use client";

import { useInView } from "@/lib/hooks";

/**
 * altafiber's signature motif: a dense bundle of thin parallel curves sweeping
 * across the page, standing in for strands of fiber. It appears behind the
 * hero imagery and across the mid-page bands on altafiber.com.
 *
 * Rendered as one path repeated at vertical offsets, so the whole bundle is a
 * single shape family and stays crisp at any width. Each strand draws itself in
 * with `stroke-dashoffset` when the block enters view, which is what carries
 * the SVG path-draw animation now that the hero canvas is gone.
 */
export default function BrandWaves({
  className = "",
  /** Number of strands in the bundle. */
  count = 22,
  /** Vertical gap between strands, in viewBox units. */
  gap = 7,
  color = "#4294f7",
  /** Opacity of the densest part of the bundle. */
  opacity = 0.5,
  animate = true,
}: {
  className?: string;
  count?: number;
  gap?: number;
  color?: string;
  opacity?: number;
  animate?: boolean;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.05 });
  const shown = animate ? inView : true;

  /*
   * The viewBox is derived from the geometry rather than hardcoded. Strand `i`
   * sits at y = 40 + i*gap and its curve swings 120 units below that point and
   * 88 * spread above it, so a fixed box clipped most of the bundle whenever
   * `count` or `gap` changed. Computing the extents keeps every strand inside
   * the box at any density.
   */
  const lastSpread = 1 + (count - 1) * 0.012;
  const topY = 40 - 88 * lastSpread;
  const bottomY = 40 + (count - 1) * gap + 120 * lastSpread;
  const boxH = Number((bottomY - topY).toFixed(2));

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <svg
        viewBox={`0 ${topY.toFixed(2)} 1200 ${boxH}`}
        fill="none"
        /* `none`, not `slice`: the viewBox is 2.86:1 and the container is
           often much taller than wide, where `slice` crops away all but one
           or two strands. These are abstract flowing lines, so stretching
           them to fill is correct and keeps the whole bundle on screen. */
        preserveAspectRatio="none"
        className="size-full"
        style={{ opacity }}
      >
        <g stroke={color} strokeWidth="1.4" fill="none" vectorEffect="non-scaling-stroke">
          {Array.from({ length: count }).map((_, i) => {
            // Strands fan out slightly as they travel, like a real bundle.
            const y = 40 + i * gap;
            const spread = 1 + i * 0.012;
            // Every coordinate is fixed to 2dp for the same reason as the
            // opacity below: identical strings on the server and the client.
            const n = (v: number) => v.toFixed(2);
            const d = `M-40 ${n(y + 120 * spread)} C 220 ${n(
              y + 120 * spread
            )}, 300 ${n(y + 18)}, 600 ${n(y)} S 980 ${n(
              y - 26 * spread
            )}, 1240 ${n(y - 88 * spread)}`;

            // Fade toward both ends of the bundle so it reads as a soft band.
            // Rounded to 3dp: at full precision the server and client can
            // serialise the same float differently (…477166 vs …477167), which
            // React reports as a hydration mismatch.
            const t = i / (count - 1);
            // Floor at 0.45: below that a 1.4px hairline of #4294f7 over a
            // near-white ground is effectively invisible.
            const alpha = Number((0.45 + Math.sin(t * Math.PI) * 0.55).toFixed(3));

            return (
              <path
                key={i}
                d={d}
                strokeOpacity={alpha}
                style={{
                  strokeDasharray: 2000,
                  strokeDashoffset: shown ? 0 : 2000,
                  transition: `stroke-dashoffset 1.8s var(--ease-out-expo) ${
                    i * 28
                  }ms`,
                }}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}
