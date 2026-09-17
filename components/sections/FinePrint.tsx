"use client";

import { finePrint } from "@/lib/content";
import { useInView } from "@/lib/hooks";
import SectionHead from "@/components/ui/SectionHead";
import { Check } from "@/components/ui/Icons";
import Image from "next/image";
import AmbientWash from "@/components/fx/AmbientWash";
import { images } from "@/lib/images";

/**
 * Hardware, fees and inclusions.
 *
 * Renders as a real table from `md` up and as stacked cards below it, so the
 * same rows stay readable at 320px without any horizontal scrolling.
 */
export default function FinePrint() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.06 });

  return (
    <section
      id="hardware"
      className="relative scroll-mt-28 overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="hardware-heading"
    >
      <AmbientWash tone="blue" />

      <div className="shell relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <SectionHead
            eyebrow={finePrint.eyebrow}
            heading={finePrint.heading}
            sub={finePrint.sub}
          />
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
            <Image
              src={images.gateway.src}
              alt={images.gateway.alt}
              fill
              sizes="(min-width: 1024px) 380px, 100vw"
              placeholder="blur"
              blurDataURL={images.gateway.blurDataURL}
              className="object-cover"
            />
          </div>
        </div>

        <div ref={ref} className="mt-11">
          {/* ---------------- Desktop table ---------------- */}
          <div
            className={`wipe ${
              inView ? "is-in" : ""
            } hidden overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-card)] ring-1 ring-line md:block`}
          >
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                altafiber hardware costs, monthly service fees and inclusions
              </caption>
              <thead>
                <tr className="bg-accent text-white">
                  <th
                    scope="col"
                    className="px-6 py-4 text-[0.6875rem] font-bold uppercase tracking-[0.13em]"
                  >
                    Item
                  </th>
                  <th
                    scope="col"
                    className="w-40 px-6 py-4 text-[0.6875rem] font-bold uppercase tracking-[0.13em]"
                  >
                    Cost
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-[0.6875rem] font-bold uppercase tracking-[0.13em]"
                  >
                    What that actually means
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {finePrint.rows.map((row) => (
                  <tr
                    key={row.item}
                    className="bg-white transition-colors duration-300 hover:bg-surface-alt"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 text-[0.875rem] font-semibold text-ink"
                    >
                      {row.item}
                    </th>
                    <td className="px-6 py-4">
                      <span
                        className={[
                          "tnum inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[0.8125rem] font-bold",
                          row.included
                            ? "bg-alta-green/15 text-[#1f7a4d]"
                            : "bg-tint text-accent",
                        ].join(" ")}
                      >
                        {row.included ? <Check className="size-3" /> : null}
                        {row.cost}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[0.8125rem] leading-relaxed text-body">
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ---------------- Mobile cards ---------------- */}
          <ul className="flex flex-col gap-3 md:hidden">
            {finePrint.rows.map((row, i) => (
              <li
                key={row.item}
                className={`reveal ${
                  inView ? "is-in" : ""
                } rounded-2xl bg-white p-4 shadow-[var(--shadow-card)] ring-1 ring-line`}
                style={{ ["--reveal-delay" as string]: `${i * 55}ms` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[0.875rem] font-semibold leading-snug text-ink">
                    {row.item}
                  </h3>
                  <span
                    className={[
                      "tnum inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-[0.75rem] font-bold",
                      row.included
                        ? "bg-alta-green/15 text-[#1f7a4d]"
                        : "bg-tint text-accent",
                    ].join(" ")}
                  >
                    {row.included ? <Check className="size-2.5" /> : null}
                    {row.cost}
                  </span>
                </div>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-body">
                  {row.note}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
