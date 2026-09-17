"use client";

import { useEffect, useRef, useState } from "react";

/* -------------------------------------------------------------------------- */
/* Motion preference                                                          */
/* -------------------------------------------------------------------------- */

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return reduced;
}

/* -------------------------------------------------------------------------- */
/* Scroll-triggered reveal                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Adds `is-in` once the element scrolls into view. One observer per element,
 * disconnected immediately after firing, so nothing keeps running post-reveal.
 */
export function useInView<T extends HTMLElement>(options?: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  const { threshold = 0.05, rootMargin = "0px 0px -10% 0px", once = true } =
    options ?? {};

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        // Treat "already scrolled past, above the viewport" as in view. Without
        // this, a restored scroll position or a fast fling can leave content
        // stuck in its hidden pre-reveal state.
        const scrolledPast = entry.boundingClientRect.bottom <= 0;

        if (entry.isIntersecting || scrolledPast) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}

/* -------------------------------------------------------------------------- */
/* Scroll progress across an element (0 -> 1)                                 */
/* -------------------------------------------------------------------------- */

/**
 * Normalised progress of an element through the viewport, sampled on rAF and
 * only while the element is actually on screen. Used for scrubbed assembly
 * animations and parallax without pulling in a scroll library.
 */
export function useScrollProgress<T extends HTMLElement>(opts?: {
  /** Extra distance past the element, as a fraction of viewport height. */
  offset?: number;
}) {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);
  const active = useRef(false);
  const frame = useRef(0);
  const offset = opts?.offset ?? 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const pad = vh * offset;
      const total = rect.height + vh + pad * 2;
      const travelled = vh + pad - rect.top;
      const p = Math.min(1, Math.max(0, travelled / total));
      setProgress(p);
    };

    const loop = () => {
      if (!active.current) return;
      measure();
      frame.current = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        active.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          frame.current = requestAnimationFrame(loop);
        } else {
          cancelAnimationFrame(frame.current);
          // Settle at the end the observer left us on.
          measure();
        }
      },
      { threshold: 0 }
    );

    io.observe(el);
    measure();

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame.current);
      active.current = false;
    };
  }, [offset]);

  return { ref, progress };
}

/* -------------------------------------------------------------------------- */
/* Magnetic pull (CTA buttons)                                                */
/* -------------------------------------------------------------------------- */

export function useMagnetic<T extends HTMLElement>(strength = 0.32, radius = 90) {
  const ref = useRef<T>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let raf = 0;

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        const reach = Math.max(rect.width, rect.height) / 2 + radius;

        if (dist > reach) {
          el.classList.remove("is-pulling");
          el.style.setProperty("--mx", "0px");
          el.style.setProperty("--my", "0px");
          return;
        }

        const falloff = 1 - dist / reach;
        el.classList.add("is-pulling");
        el.style.setProperty("--mx", `${dx * strength * falloff}px`);
        el.style.setProperty("--my", `${dy * strength * falloff}px`);
      });
    };

    const reset = () => {
      cancelAnimationFrame(raf);
      el.classList.remove("is-pulling");
      el.style.setProperty("--mx", "0px");
      el.style.setProperty("--my", "0px");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", reset);

    return () => {
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
      cancelAnimationFrame(raf);
    };
  }, [strength, radius, reduced]);

  return ref;
}

/* -------------------------------------------------------------------------- */
/* 3D tilt (plan cards)                                                       */
/* -------------------------------------------------------------------------- */

export function useTilt<T extends HTMLElement>(max = 7) {
  const ref = useRef<T>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let raf = 0;

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        el.classList.add("is-tilting");
        el.style.setProperty("--ry", `${px * max * 2}deg`);
        el.style.setProperty("--rx", `${-py * max * 2}deg`);
        el.style.setProperty("--ty", "-6px");
        el.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
        el.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
      });
    };

    const reset = () => {
      cancelAnimationFrame(raf);
      el.classList.remove("is-tilting");
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--ty", "0px");
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", reset);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
      cancelAnimationFrame(raf);
    };
  }, [max, reduced]);

  return ref;
}

/* -------------------------------------------------------------------------- */
/* Sticky-header shadow state                                                 */
/* -------------------------------------------------------------------------- */

export function useScrolled(threshold = 12): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() =>
        setScrolled(window.scrollY > threshold)
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [threshold]);

  return scrolled;
}

/* -------------------------------------------------------------------------- */
/* Active section tracking for the header nav                                 */
/* -------------------------------------------------------------------------- */

export function useActiveSection(ids: string[]): string {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id.replace("#", "")))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.6] }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  return activeId;
}
