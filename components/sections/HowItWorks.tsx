"use client";

import { howItWorks } from "@/lib/content";
import { useInView } from "@/lib/hooks";
import SectionHead from "@/components/ui/SectionHead";
import { Icon } from "@/components/ui/Icons";
import Image from "next/image";
import { images } from "@/lib/images";

export default function HowItWorks() {
  const steps = useInView<HTMLOListElement>({ threshold: 0.1 });
  const grid = useInView<HTMLUListElement>({ threshold: 0.08 });

  return (
    <>
      {/* ==================== How it works ==================== */}
      <section
        id="how-it-works"
        className="relative scroll-mt-28 overflow-hidden py-16 sm:py-20 lg:py-24"
        aria-labelledby="how-it-works-heading"
      >
        <Image
          src={images.install.src}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL={images.install.blurDataURL}
          className="object-cover object-[center_40%]"
        />
        {/* The photograph has near-black regions (measured: minimum luminance
            0.000, the technician's jacket), so a flat scrim would need 0.80
            white just to keep body copy at 4.5:1 — which is what was washing
            the picture out. Instead the scrim stays light and the step copy
            sits on its own white cards. The heading can live directly on this
            because it is large text, which only needs 3.0: even over the
            darkest pixel it measures about 4.2:1. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.66) 0%, rgba(255,255,255,0.40) 42%, rgba(255,255,255,0.34) 70%, rgba(255,255,255,0.52) 100%)",
          }}
        />
        <div className="shell relative">
          <SectionHead
            eyebrow={howItWorks.eyebrow}
            heading={howItWorks.heading}
            align="center"
          />

          {/* Three steps across, with a connecting rule on wide screens. */}
          <ol
            ref={steps.ref}
            className="relative mt-12 grid gap-8 sm:gap-6 lg:grid-cols-3 lg:gap-8"
          >
            {howItWorks.steps.map((step, i) => (
              <li
                key={step.n}
                className={`reveal ${steps.inView ? "is-in" : ""} h-full rounded-2xl bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-line sm:p-7`}
                style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-accent text-[0.875rem] font-bold text-white">
                  {step.n}
                </span>

                <h3 className="mt-5 text-[1.125rem] font-bold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-body">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>

        </div>
      </section>

      {/* ==================== Why 100% fiber ====================
          altafiber runs this section as a single black-to-blue gradient band.
          It is the one dark band on an otherwise white page, mirroring the
          "Why 100% Fiber Internet" strip on altafiber.com. */}
      <section
        id="why"
        className="relative scroll-mt-28 overflow-hidden py-16 sm:py-20 lg:py-24"
        aria-labelledby="why-heading"
      >
        <Image
          src={images.whyFiber.src}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL={images.whyFiber.blurDataURL}
          className="object-cover"
        />
        {/* Scrim. The previous flat gradient ended at #2f86f0, which gives
            white text only 3.63:1 — under the 4.5 AA floor. Every stop here
            clears 6:1 against white, and the alpha lets the photograph read
            as texture without lifting the background luminance. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(16,16,20,0.94) 0%, rgba(1,38,57,0.92) 30%, rgba(0,74,148,0.90) 72%, rgba(15,98,176,0.90) 100%)",
          }}
        />
        <div className="shell relative">
          <SectionHead
            eyebrow={howItWorks.whyEyebrow}
            heading={howItWorks.whyHeading}
            invert
            align="center"
          />

          <ul
            ref={grid.ref}
            className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
          >
            {howItWorks.features.map((f, i) => (
              <li
                key={f.title}
                className={`reveal ${grid.inView ? "is-in" : ""}`}
                style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
              >
                <div className="group h-full rounded-[var(--radius-card)] border border-white/20 bg-navy/45 p-6 backdrop-blur-sm transition-colors duration-500 hover:bg-navy/60">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-white/15 text-white transition-transform duration-500 group-hover:scale-110">
                    <Icon name={f.icon} className="size-5" />
                  </span>

                  <h3 className="mt-5 text-[1.0625rem] font-bold text-white">
                    {f.title}
                  </h3>
                  <p className="mt-2.5 text-[0.875rem] leading-relaxed text-white/90">
                    {f.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
