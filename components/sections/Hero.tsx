"use client";

import {
  hero,
  leadPlan,
  speedLabel,
  slowestMbps,
  fastestMbps,
  marqueeItems,
} from "@/lib/content";
import Image from "next/image";
import { images } from "@/lib/images";
import PriceLockup from "@/components/ui/PriceLockup";
import Marquee from "@/components/ui/Marquee";
import AmbientWash from "@/components/fx/AmbientWash";
import ZipChecker from "./ZipChecker";

/**
 * The photograph is the hero's background, running edge to edge and flush to
 * the header, with a white gradient laid across its left half so the copy sits
 * on clean white. No panel seam and no decorative overlay — the picture and
 * the type carry the section.
 */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative bg-white"
      aria-labelledby="hero-heading"
    >
      {/* ================= Statement ================= */}
      <div className="relative overflow-hidden">
        {/* Full-bleed photograph, top edge flush against the header. */}
        <div className="absolute inset-0 hidden lg:block">
          <Image
            src={images.hero.src}
            alt={images.hero.alt}
            fill
            /* LCP element — eager, with an explicit sizes hint. */
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={images.hero.blurDataURL}
            className="hero-drift object-cover object-[68%_center]"
          />
          {/* White wash across the left so the copy needs no scrim of its own.
              The ramp starts earlier and clears sooner than before so more of
              the photograph shows: fully clear from 79% rather than 88%. It
              still holds ~0.85 where the type ends (around 50%), which is what
              keeps the body copy above 4.5:1 over the dark part of the frame
              behind it. */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, #ffffff 0%, #ffffff 32%, rgba(255,255,255,0.90) 47%, rgba(255,255,255,0.55) 59%, rgba(255,255,255,0.18) 69%, rgba(255,255,255,0) 79%)",
            }}
          />
        </div>

        {/* Ambient colour drifting through the white side of the hero. */}
        <AmbientWash tone="subtle" className="lg:right-[42%]" />

        <div className="shell relative py-14 sm:py-16 lg:py-24">
          <div className="lg:max-w-[56%]">
            {/* Eyebrow */}
            <div
              className="rise-auto flex items-center gap-3"
              style={{ ["--reveal-delay" as string]: "40ms" }}
            >
              <span
                aria-hidden="true"
                className="rule-draw h-px w-8 shrink-0 bg-accent-bright"
                style={{ ["--reveal-delay" as string]: "220ms" }}
              />
              <span className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-accent">
                {hero.eyebrow}
              </span>
            </div>

            <h1
              id="hero-heading"
              className="mt-6 max-w-[14ch] text-[2.5rem] font-bold leading-[1.0] tracking-[-0.042em] text-ink sm:text-[3.5rem] lg:text-[4.25rem]"
            >
              <span className="line-mask auto">
                <span style={{ ["--reveal-delay" as string]: "120ms" }}>
                  {hero.h1a}
                </span>
              </span>
              <span className="line-mask auto">
                <span
                  style={{ ["--reveal-delay" as string]: "220ms" }}
                  className="text-headline-accent"
                >
                  {hero.h1b}
                </span>
              </span>
            </h1>

            <p
              className="rise-auto mt-7 max-w-lg text-[0.9375rem] leading-relaxed text-body sm:text-base"
              style={{ ["--reveal-delay" as string]: "380ms" }}
            >
              {hero.sub}
            </p>

            {/* Availability check — the hero's only action. */}
            <div
              className="rise-auto mt-9 max-w-xl"
              style={{ ["--reveal-delay" as string]: "480ms" }}
            >
              <ZipChecker />
            </div>
          </div>

          {/* Below lg the photograph cannot sit behind the copy, so it runs as
              a band underneath instead of being dropped. */}
          <div className="relative mt-11 aspect-[16/10] w-full overflow-hidden rounded-2xl lg:hidden">
            <Image
              src={images.hero.src}
              alt={images.hero.alt}
              fill
              sizes="100vw"
              placeholder="blur"
              blurDataURL={images.hero.blurDataURL}
              className="object-cover object-[62%_center]"
            />
          </div>
        </div>
      </div>

      {/* ================= Spec band ================= */}
      <div className="relative border-t border-line bg-white">
        <div className="shell">
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            <div className="border-b border-line py-7 pr-6 sm:py-8 lg:border-b-0 lg:border-r">
              <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-body sm:text-[0.625rem] sm:tracking-[0.16em]">
                {leadPlan.name}
              </dt>
              <dd className="mt-2">
                <PriceLockup plan={leadPlan} size="md" />
              </dd>
            </div>

            {[
              {
                k: "Speeds",
                v: `${speedLabel(slowestMbps)} – ${speedLabel(fastestMbps)}`,
              },
              { k: "Upload", v: "Matches download" },
              { k: "Reliability", v: "99.99%" },
            ].map((s, i) => (
              <div
                key={s.k}
                className={[
                  "border-b border-line py-7 sm:py-8 lg:border-b-0",
                  "pl-6 pr-6 lg:pl-8",
                  i < 2 ? "lg:border-r" : "",
                ].join(" ")}
              >
                <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-body sm:text-[0.625rem] sm:tracking-[0.16em]">
                  {s.k}
                </dt>
                <dd className="mt-2 text-[1.25rem] font-bold tracking-[-0.02em] text-ink sm:text-[1.5rem]">
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* ================= Trust ticker ================= */}
      <div className="relative border-t border-line bg-surface-alt py-4">
        <Marquee items={marqueeItems} />
      </div>
    </section>
  );
}
