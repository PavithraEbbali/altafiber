"use client";

import {
  plansByLine,
  telHref,
  type ServiceSection as ServiceSectionType,
} from "@/lib/content";
import { useInView } from "@/lib/hooks";
import PlanCard from "@/components/ui/PlanCard";
import SectionHead from "@/components/ui/SectionHead";
import BrandWaves from "@/components/fx/BrandWaves";
import AmbientWash from "@/components/fx/AmbientWash";
import Image from "next/image";
import { images } from "@/lib/images";

const GRID: Record<2 | 3 | 4, string> = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
};

/**
 * Renders one service line from lib/content.ts.
 *
 * The section never hard-codes which plans it shows or how many — it asks
 * `plansByLine()` and lays out whatever comes back. A service line with no
 * plans never reaches this component at all, because page.tsx maps over
 * `activeServiceSections`, which filters empty lines out.
 */
export default function ServiceSection({
  section,
  tone = "light",
}: {
  section: ServiceSectionType;
  tone?: "light" | "tint";
}) {
  const items = plansByLine(section.line);
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.08 });

  /* The TV line runs its photograph as the section background. That picture is
     a dark evening room, so a thin overlay leaves the section dark and the
     section's own text has to invert — the plan cards stay white either way. */
  const onPhoto = section.line === "tv";

  if (items.length === 0) return null;

  return (
    <section
      id={section.id}
      className={[
        "relative scroll-mt-28 overflow-hidden py-16 sm:py-20 lg:py-24",
        onPhoto ? "bg-ink" : tone === "tint" ? "bg-surface-alt" : "bg-white",
      ].join(" ")}
      aria-labelledby={`${section.id}-heading`}
    >
      {onPhoto ? (
        <>
          <Image
            src={images.tv.src}
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            placeholder="blur"
            blurDataURL={images.tv.blurDataURL}
            className="object-cover object-[center_45%]"
          />
          {/* Deliberately thin so the room still reads. The picture is already
              dark, so white text clears AA without burying it. */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(6,14,24,0.62) 0%, rgba(6,14,24,0.54) 40%, rgba(6,14,24,0.66) 100%)",
            }}
          />
        </>
      ) : null}

      {/* Ambient wash on the light lines only — the TV line runs on a photo. */}
      {!onPhoto ? (
        <AmbientWash tone={section.line === "phone" ? "green" : "mixed"} />
      ) : null}

      {/* Fiber strands drawing themselves in behind the header block. */}
      {section.line === "fiber" ? (
        <BrandWaves
            className="pointer-events-none absolute inset-x-0 top-0 h-[320px]"
            opacity={0.28}
          />
      ) : null}

      <div className="shell relative">
        <SectionHead
          eyebrow={section.eyebrow}
          heading={section.heading}
          sub={section.sub}
          invert={onPhoto}
        />

        {/* Staggered grid entrance */}
        <div
          ref={ref}
          className={`mt-11 grid gap-5 sm:gap-6 ${GRID[section.columns]}`}
        >
          {items.map((plan, i) => (
            <div
              key={plan.id}
              className={`reveal ${inView ? "is-in" : ""}`}
              style={{ ["--reveal-delay" as string]: `${i * 85}ms` }}
            >
              <PlanCard plan={plan} />
            </div>
          ))}
        </div>

        {/* Line-level footnote */}
        <p
          className={[
            "mt-8 max-w-3xl text-[0.8125rem] leading-relaxed",
            onPhoto ? "text-white" : "text-body",
          ].join(" ")}
        >
          {section.line === "fiber" ? (
            <>
              Advertised rates require eBill and apply to new residential
              service. Equipment, taxes, government fees and surcharges are
              billed separately. Not every tier reaches every address — we
              confirm yours on the call.
            </>
          ) : section.line === "tv" ? (
            <>
              Fioptics+ requires an altafiber internet subscription. Channel
              counts vary by market and package. Where a rate is not published,
              we will quote it on the call before anything is placed.
            </>
          ) : section.line === "bundle" ? (
            <>
              Bundle pricing reflects altafiber&apos;s published combinations and
              requires eBill. Equipment, taxes, government fees and surcharges
              are billed separately.
            </>
          ) : (
            <>
              Home phone service is added to an altafiber internet account.
              Calling features and long distance plans vary — we will walk the
              options with you on the call.
            </>
          )}{" "}
          Questions on a specific tier?{" "}
          <a
            href={telHref}
            data-call-cta
            data-call-context={`footnote:${section.line}`}
            className={[
              "font-semibold underline underline-offset-4 transition-colors",
              onPhoto
                ? "text-white decoration-white/50 hover:decoration-white"
                : "text-accent decoration-accent/30 hover:decoration-accent",
            ].join(" ")}
          >
            Call to order
          </a>
          .
        </p>
      </div>
    </section>
  );
}
