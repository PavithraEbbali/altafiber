"use client";

import { useEffect, useRef } from "react";

/**
 * CURRENTLY UNMOUNTED. This was the hero background; the hero was rebuilt
 * without a background animation at the client's request. The component is
 * kept intact and working so it can be dropped into the "Why fiber" section
 * (`#why`, also navy) if an animated backdrop is wanted there instead:
 *   <FiberField className="opacity-[0.85]" />
 *
 * "Black hole" fiber-optic data field.
 *
 * Light pulses spiral inward along logarithmic paths and accelerate as they
 * approach the core, reading as data being drawn down a fiber. An accretion
 * ring and a dark core sit at the centre of the spiral.
 *
 * Performance guards, in order of importance:
 *  - device pixel ratio capped at 1.5
 *  - rAF loop only runs while the canvas is intersecting the viewport
 *  - loop also stops when the tab is hidden
 *  - particle count scales with canvas area and is hard-capped
 *  - zero allocations inside the frame loop
 *  - reduced-motion visitors get one static frame and no loop at all
 */

type Particle = {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  hue: 0 | 1 | 2;
  trail: number;
};

const HUES: Array<[number, number, number]> = [
  [66, 148, 247], // fiber blue   #4294f7
  [61, 195, 127], // alta green   #3dc37f
  [34, 211, 197], // alta teal    #22d3c5
];

export default function FiberField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;
    let maxRadius = 0;
    let coreRadius = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let running = false;
    let visible = false;
    let t = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const seed = (p: Particle, atEdge: boolean) => {
      p.angle = Math.random() * Math.PI * 2;
      p.radius = atEdge
        ? maxRadius * (0.72 + Math.random() * 0.42)
        : coreRadius + Math.random() * (maxRadius - coreRadius);
      p.speed = 0.24 + Math.random() * 0.5;
      p.size = 0.7 + Math.random() * 1.5;
      p.hue = (Math.random() < 0.52 ? 0 : Math.random() < 0.6 ? 1 : 2) as 0 | 1 | 2;
      p.trail = 0.05 + Math.random() * 0.13;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Core sits low-right on wide screens so it reads in the open space
      // beneath the availability card rather than behind it.
      cx = width < 760 ? width * 0.5 : width * 0.72;
      cy = width < 760 ? height * 0.5 : height * 0.78;
      maxRadius = Math.hypot(Math.max(cx, width - cx), Math.max(cy, height - cy));
      coreRadius = Math.max(26, Math.min(width, height) * 0.055);

      // ~1 particle per 4200 css px², clamped for low-end devices.
      const target = Math.round(
        Math.min(280, Math.max(90, (width * height) / 4200))
      );

      if (particles.length !== target) {
        particles = new Array(target).fill(null).map(() => {
          const p: Particle = {
            angle: 0,
            radius: 0,
            speed: 0,
            size: 0,
            hue: 0,
            trail: 0,
          };
          seed(p, false);
          return p;
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      /* ---- Accretion rings ---- */
      ctx.save();
      for (let i = 0; i < 3; i++) {
        const r = coreRadius * (1.9 + i * 1.5) + Math.sin(t * 0.0006 + i) * 5;
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * 0.34, -0.42, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(66,148,247,${0.16 - i * 0.045})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();

      /* ---- Particles ---- */
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Angular velocity rises sharply near the core (Keplerian feel).
        const falloff = Math.max(0.16, p.radius / maxRadius);
        const omega = (p.speed * 0.0075) / falloff;

        p.angle += omega;
        p.radius -= p.speed * 0.42 * (1.25 - falloff);

        if (p.radius <= coreRadius * 0.92) seed(p, true);

        const prevAngle = p.angle - omega * (1 + p.trail * 26);
        const prevRadius = p.radius + p.speed * 0.42 * (1.25 - falloff) * 13;

        const x = cx + Math.cos(p.angle) * p.radius;
        const y = cy + Math.sin(p.angle) * p.radius * 0.62;
        const px = cx + Math.cos(prevAngle) * prevRadius;
        const py = cy + Math.sin(prevAngle) * prevRadius * 0.62;

        // Brighter as it falls in, faded far out.
        const nearness = 1 - Math.min(1, (p.radius - coreRadius) / maxRadius);
        const alpha = 0.14 + nearness * 0.62;
        const [r, g, b] = HUES[p.hue];

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.lineWidth = p.size;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      /* ---- Core glow ---- */
      const glow = ctx.createRadialGradient(
        cx,
        cy,
        coreRadius * 0.15,
        cx,
        cy,
        coreRadius * 3.4
      );
      glow.addColorStop(0, "rgba(1,38,57,0.96)");
      glow.addColorStop(0.42, "rgba(1,38,57,0.55)");
      glow.addColorStop(1, "rgba(1,38,57,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius * 3.4, 0, Math.PI * 2);
      ctx.fill();

      /* ---- Event horizon rim ---- */
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(61,195,127,0.5)";
      ctx.lineWidth = 1.4;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius * 0.97, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(1,38,57,0.92)";
      ctx.fill();
    };

    const loop = (now: number) => {
      if (!running) return;
      t = now;
      draw();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const sync = () => {
      if (visible && !document.hidden) start();
      else stop();
    };

    resize();
    draw(); // first paint, including the reduced-motion static frame

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const ro = new ResizeObserver(() => {
      resize();
      if (!running) draw();
    });
    ro.observe(canvas);

    document.addEventListener("visibilitychange", sync);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 size-full ${className}`}
    />
  );
}
