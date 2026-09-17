/**
 * A very light, slowly drifting colour wash for the light sections.
 *
 * Three oversized radial-gradient blobs in the brand palette, each at low
 * single-digit-to-teens opacity, drifting on long independent cycles so the
 * pattern never visibly repeats. Softness comes from the gradient stops rather
 * than a blur filter — animating `filter` is expensive, animating `transform`
 * is not, so this stays on the compositor.
 *
 * Kept deliberately faint: the strongest stop is 0.16 alpha of fiber-blue over
 * white, which moves body copy from 7.89:1 to about 6.5:1 — still well clear
 * of the 4.5 floor even if text lands directly on a blob centre.
 *
 * Disabled wholesale under `prefers-reduced-motion` (see globals.css).
 */

type Tone = "blue" | "mixed" | "green" | "subtle";

const TONES: Record<Tone, [string, string, string]> = {
  // fiber-blue / alta-teal / dark-blue
  blue: [
    "rgba(66,148,247,0.16)",
    "rgba(34,211,197,0.10)",
    "rgba(0,91,181,0.09)",
  ],
  // fiber-blue / alta-green / alta-teal
  mixed: [
    "rgba(66,148,247,0.14)",
    "rgba(61,195,127,0.12)",
    "rgba(34,211,197,0.09)",
  ],
  // Half-strength, for the hero — a large blue headline sits over this wash,
  // and blue-on-blue is where contrast headroom disappears fastest.
  subtle: [
    "rgba(66,148,247,0.08)",
    "rgba(34,211,197,0.05)",
    "rgba(0,91,181,0.05)",
  ],
  // alta-green led
  green: [
    "rgba(61,195,127,0.14)",
    "rgba(34,211,197,0.11)",
    "rgba(66,148,247,0.10)",
  ],
};

export default function AmbientWash({
  tone = "blue",
  className = "",
}: {
  tone?: Tone;
  className?: string;
}) {
  const [a, b, c] = TONES[tone];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <span
        className="ambient-blob ambient-blob-a"
        style={{ background: `radial-gradient(closest-side, ${a}, transparent)` }}
      />
      <span
        className="ambient-blob ambient-blob-b"
        style={{ background: `radial-gradient(closest-side, ${b}, transparent)` }}
      />
      <span
        className="ambient-blob ambient-blob-c"
        style={{ background: `radial-gradient(closest-side, ${c}, transparent)` }}
      />
    </div>
  );
}
