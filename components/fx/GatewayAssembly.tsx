"use client";

import { useScrollProgress, usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Scroll-scrubbed home-network assembly.
 *
 * As the section passes the viewport, the diagram builds itself in order:
 * the fiber drop traces in from the street, the Fioptics gateway drops into
 * place, the link to the Wi-Fi extender draws, the household devices stagger
 * in, and the Wi-Fi field finally blooms. Scrubbing is driven by the element's
 * own scroll progress, so the animation runs backwards when you scroll up.
 */

/** Normalises `p` to 0..1 within the [start, end] window, with easing. */
function seg(p: number, start: number, end: number): number {
  const t = Math.min(1, Math.max(0, (p - start) / (end - start)));
  return t === 1 ? 1 : 1 - Math.pow(2, -9 * t); // easeOutExpo
}

export default function GatewayAssembly({
  className = "",
}: {
  className?: string;
}) {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();

  // Reduced motion: present the finished diagram, no scrub.
  const p = reduced ? 1 : progress;

  const drop = seg(p, 0.06, 0.3); // fiber from the street
  const gateway = seg(p, 0.24, 0.46); // gateway lands
  const link = seg(p, 0.4, 0.58); // gateway -> extender
  const extender = seg(p, 0.52, 0.68); // extender lands
  const devices = seg(p, 0.6, 0.86); // devices stagger in
  const field = seg(p, 0.74, 1); // wi-fi field blooms

  const FIBER_LEN = 430;

  return (
    <div ref={ref} className={className}>
      <svg
        viewBox="0 0 620 400"
        fill="none"
        className="size-full"
        role="img"
        aria-label="Diagram of an altafiber fiber drop feeding a Fioptics gateway, a Wi-Fi extender and the devices in a home"
      >
        <defs>
          <linearGradient id="gaFiber" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4294f7" />
            <stop offset="100%" stopColor="#3dc37f" />
          </linearGradient>
          <linearGradient id="gaBox" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0b3b55" />
            <stop offset="100%" stopColor="#012639" />
          </linearGradient>
        </defs>

        {/* ---------------- Ground line ---------------- */}
        <line
          x1="0"
          y1="356"
          x2="620"
          y2="356"
          stroke="rgba(1,38,57,0.1)"
          strokeWidth="1.5"
          strokeDasharray="4 7"
        />
        <text
          x="6"
          y="376"
          fill="rgba(1,38,57,0.35)"
          fontSize="11"
          fontWeight="600"
          letterSpacing="1.4"
        >
          STREET
        </text>

        {/* ---------------- Fiber drop ---------------- */}
        <path
          d="M4 336 C 90 336, 110 250, 176 226"
          stroke="url(#gaFiber)"
          strokeWidth="3"
          strokeLinecap="round"
          style={{
            strokeDasharray: FIBER_LEN,
            strokeDashoffset: FIBER_LEN * (1 - drop),
          }}
        />
        <circle
          cx="4"
          cy="336"
          r="5"
          fill="#4294f7"
          style={{ opacity: drop }}
        />

        {/* ---------------- Gateway ---------------- */}
        <g
          style={{
            opacity: gateway,
            transform: `translate3d(0, ${(1 - gateway) * -26}px, 0) scale(${
              0.88 + gateway * 0.12
            })`,
            transformOrigin: "212px 214px",
          }}
        >
          <rect
            x="176"
            y="176"
            width="72"
            height="76"
            rx="14"
            fill="url(#gaBox)"
          />
          <rect
            x="190"
            y="192"
            width="44"
            height="5"
            rx="2.5"
            fill="rgba(255,255,255,0.22)"
          />
          <circle cx="196" cy="236" r="3.5" fill="#3dc37f" />
          <circle cx="210" cy="236" r="3.5" fill="rgba(255,255,255,0.28)" />
          <circle cx="224" cy="236" r="3.5" fill="rgba(255,255,255,0.28)" />
          <text
            x="212"
            y="216"
            textAnchor="middle"
            fill="rgba(255,255,255,0.85)"
            fontSize="10"
            fontWeight="700"
            letterSpacing="0.8"
          >
            GATEWAY
          </text>
        </g>

        {/* ---------------- Gateway -> extender link ---------------- */}
        <path
          d="M248 214 L 372 214"
          stroke="#3dc37f"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="124"
          strokeDashoffset={124 * (1 - link)}
        />

        {/* ---------------- Extender ---------------- */}
        <g
          style={{
            opacity: extender,
            transform: `translate3d(${(1 - extender) * 20}px, 0, 0)`,
            transformOrigin: "398px 214px",
          }}
        >
          <rect
            x="372"
            y="188"
            width="52"
            height="52"
            rx="12"
            fill="url(#gaBox)"
          />
          <circle cx="398" cy="214" r="9" fill="none" stroke="#3dc37f" strokeWidth="2" />
          <circle cx="398" cy="214" r="3" fill="#3dc37f" />
        </g>
        <text
          x="398"
          y="258"
          textAnchor="middle"
          fill="rgba(1,38,57,0.45)"
          fontSize="10"
          fontWeight="700"
          letterSpacing="0.8"
          style={{ opacity: extender }}
        >
          EXTENDER
        </text>

        {/* ---------------- Wi-Fi field ---------------- */}
        {[0, 1, 2].map((i) => {
          const local = Math.min(1, Math.max(0, field * 3 - i * 0.55));
          return (
            <circle
              key={i}
              cx="398"
              cy="214"
              r={30 + i * 34}
              fill="none"
              stroke="#3dc37f"
              strokeWidth="1.25"
              style={{ opacity: local * (0.34 - i * 0.09) }}
            />
          );
        })}

        {/* ---------------- Devices ---------------- */}
        {[
          { x: 300, y: 66, w: 78, h: 50, r: 8, label: "TV", i: 0 },
          { x: 470, y: 104, w: 58, h: 42, r: 6, label: "LAPTOP", i: 1 },
          { x: 494, y: 276, w: 30, h: 48, r: 7, label: "PHONE", i: 2 },
        ].map((d) => {
          const local = Math.min(1, Math.max(0, devices * 3.2 - d.i * 0.7));
          return (
            <g
              key={d.label}
              style={{
                opacity: local,
                transform: `translate3d(0, ${(1 - local) * 14}px, 0) scale(${
                  0.9 + local * 0.1
                })`,
                transformOrigin: `${d.x + d.w / 2}px ${d.y + d.h / 2}px`,
              }}
            >
              <rect
                x={d.x}
                y={d.y}
                width={d.w}
                height={d.h}
                rx={d.r}
                fill="#fff"
                stroke="rgba(1,38,57,0.16)"
                strokeWidth="1.5"
              />
              <rect
                x={d.x + 7}
                y={d.y + 8}
                width={d.w - 14}
                height={d.h - 18}
                rx={3}
                fill="rgba(66,148,247,0.14)"
              />
              <text
                x={d.x + d.w / 2}
                y={d.y + d.h + 15}
                textAnchor="middle"
                fill="rgba(1,38,57,0.42)"
                fontSize="9.5"
                fontWeight="700"
                letterSpacing="0.8"
              >
                {d.label}
              </text>
            </g>
          );
        })}

        {/* ---------------- Device links ---------------- */}
        {[
          { d: "M410 196 L 348 120", i: 0 },
          { d: "M418 204 L 476 142", i: 1 },
          { d: "M414 230 L 496 282", i: 2 },
        ].map((l) => {
          const local = Math.min(1, Math.max(0, devices * 3.2 - l.i * 0.7));
          return (
            <path
              key={l.d}
              d={l.d}
              stroke="rgba(61,195,127,0.55)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="110"
              strokeDashoffset={110 * (1 - local)}
            />
          );
        })}
      </svg>
    </div>
  );
}
