type MarqueeProps = {
  items: string[];
  /** Slower track for secondary rows. */
  slow?: boolean;
  invert?: boolean;
  className?: string;
};

/**
 * Infinite ticker. The track holds two identical halves and translates -50%,
 * so the loop is seamless. Pure CSS animation — no JS on the scroll path.
 */
export default function Marquee({
  items,
  slow = false,
  invert = false,
  className = "",
}: MarqueeProps) {
  const half = (
    <ul
      className="flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14"
      aria-hidden="true"
    >
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center gap-10 sm:gap-14">
          <span
            className={[
              "whitespace-nowrap text-[0.8125rem] font-semibold uppercase tracking-[0.16em] sm:text-sm",
              invert ? "text-white/80" : "text-body",
            ].join(" ")}
          >
            {item}
          </span>
          <span
            className={[
              "size-1.5 shrink-0 rounded-full",
              invert ? "bg-white/50" : "bg-accent-bright",
            ].join(" ")}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={`marquee-wrap edge-fade relative flex overflow-hidden ${className}`}
    >
      {/* Screen readers get the list once, plainly. */}
      <span className="sr-only">{items.join(", ")}</span>
      <div
        className={`flex w-max ${slow ? "marquee-track-slow" : "marquee-track"}`}
      >
        {half}
        {half}
      </div>
    </div>
  );
}
