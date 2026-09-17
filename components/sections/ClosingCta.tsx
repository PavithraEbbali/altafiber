"use client";

import { startingPrice, speedLabel, fastestMbps } from "@/lib/content";
import { useInView } from "@/lib/hooks";
import CallButton from "@/components/ui/CallButton";
import RevealText from "@/components/ui/RevealText";
import Image from "next/image";
import { images } from "@/lib/images";
import Reveal from "@/components/ui/Reveal";

export default function ClosingCta() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="shell">
        {/* The observer sits on this unclipped wrapper: clip-path zeroes an
            element's intersection area, so a .wipe cannot observe itself. */}
        <div ref={ref}>
          <div
            className={`wipe ${
              inView ? "is-in" : ""
            } relative overflow-hidden rounded-[28px] px-6 py-14 text-center sm:px-12 sm:py-20`}
          >
            <Image
              src={images.closing.src}
              alt=""
              aria-hidden="true"
              fill
              sizes="(min-width: 1024px) 1120px, 100vw"
              placeholder="blur"
              blurDataURL={images.closing.blurDataURL}
              className="object-cover"
            />
            {/* Same reasoning as the "Why fiber" band: the old bright stop
                (#2f86f0) was 3.63:1 against white. These all clear 6:1. */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(100deg, rgba(1,38,57,0.82) 0%, rgba(0,74,148,0.78) 62%, rgba(15,98,176,0.76) 100%)",
              }}
            />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(720px 400px at 50% 0%, rgba(255,255,255,0.14), transparent 64%)",
            }}
          />

          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-navy/55 px-3.5 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-white ring-1 ring-white/25">
              <span className="size-1.5 rounded-full bg-white" />
              Ready when you are
            </span>

            <RevealText
              as="h2"
              lines={["Fiber from $" + startingPrice + "/mo,", "up to " + speedLabel(fastestMbps) + " symmetrical."]}
              delay={80}
              className="mt-6 text-[1.875rem] font-bold leading-[1.08] tracking-[-0.038em] text-white sm:text-[2.75rem]"
            />

            <Reveal delay={300}>
              <p className="mx-auto mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-white">
                One call confirms your address, locks the tier and books the
                installation window. No forms, no waiting on a callback.
              </p>
            </Reveal>

            <Reveal delay={400}>
              <div className="mt-9 flex justify-center">
                <CallButton
                  label="Call to order"
                  variant="light"
                  size="lg"
                  context="closing"
                />
              </div>
            </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
