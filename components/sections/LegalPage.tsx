import { site } from "@/lib/content";
import type { LegalDoc } from "@/lib/legal";
import { legalDocs } from "@/lib/legal";
import Header, { DisclosureBar } from "./Header";
import Footer from "./Footer";
import CallButton from "@/components/ui/CallButton";

/**
 * Shared chrome and typography for the four policy pages.
 *
 * Every company-specific value in the prose resolves from `site` in
 * lib/content.ts, so the entity name, contact address and effective date are
 * still edited in exactly one place.
 */
export default function LegalPage({ doc }: { doc: LegalDoc }) {
  const others = legalDocs.filter((d) => d.slug !== doc.slug);

  return (
    <>
      <DisclosureBar />
      <Header />

      <main>
        {/* ---------------- Masthead ---------------- */}
        <section className="relative overflow-hidden border-b border-line bg-surface-alt">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(900px 480px at 88% 0%, rgba(66,148,247,0.10), transparent 62%)",
            }}
          />

          <div className="shell relative py-14 sm:py-20">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-accent transition-colors duration-300 hover:text-ink"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 12H5m0 0 6-6m-6 6 6 6" />
              </svg>
              Back to plans
            </a>

            <h1 className="mt-6 max-w-3xl text-[1.875rem] font-bold leading-[1.08] tracking-[-0.035em] text-ink sm:text-[2.5rem]">
              {doc.title}
            </h1>
            <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-body">
              {doc.summary}
            </p>

            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              <div>
                <dt className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-body">
                  Effective
                </dt>
                <dd className="mt-1 text-[0.875rem] font-semibold text-ink">
                  {site.policyEffectiveDate}
                </dd>
              </div>
              <div>
                <dt className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-body">
                  Applies to
                </dt>
                <dd className="mt-1 text-[0.875rem] font-semibold text-ink">
                  {site.legalEntity}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ---------------- Body ---------------- */}
        <section className="bg-white py-14 sm:py-20">
          <div className="shell">
            <div className="grid gap-12 lg:grid-cols-[1fr_16rem] lg:gap-16">
              {/* Prose */}
              <div className="max-w-2xl">
                {doc.sections.map((sec, i) => (
                  <section
                    key={sec.heading}
                    className={i === 0 ? "" : "mt-10 border-t border-line pt-10"}
                  >
                    <h2 className="text-[1.125rem] font-bold leading-snug text-ink sm:text-[1.25rem]">
                      {sec.heading}
                    </h2>

                    {sec.body?.map((para) => (
                      <p
                        key={para.slice(0, 40)}
                        className="mt-3.5 text-[0.9375rem] leading-relaxed text-body"
                      >
                        {para}
                      </p>
                    ))}

                    {sec.list ? (
                      <ul className="mt-4 flex flex-col gap-2.5">
                        {sec.list.map((item) => (
                          <li key={item.slice(0, 40)} className="flex gap-3">
                            <span
                              aria-hidden="true"
                              className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent-bright"
                            />
                            <span className="text-[0.9375rem] leading-relaxed text-body">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </div>

              {/* Aside */}
              <aside className="lg:sticky lg:top-32 lg:self-start">
                <div className="rounded-[var(--radius-card)] bg-tint p-6 ring-1 ring-accent/12">
                  <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-accent">
                    Other policies
                  </h2>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {others.map((d) => (
                      <li key={d.slug}>
                        <a
                          href={`/${d.slug}`}
                          className="text-[0.875rem] font-medium text-ink transition-colors duration-300 hover:text-accent"
                        >
                          {d.title}
                        </a>
                      </li>
                    ))}
                  </ul>

                  <div className="my-6 h-px w-full bg-accent/15" />

                  <p className="text-[0.8125rem] leading-relaxed text-body">
                    Questions about a plan, a rate or what is on the bill? We
                    will read the full monthly total back to you on the call.
                  </p>
                  <CallButton
                    label="Call to order"
                    variant="solid"
                    size="md"
                    full
                    magnetic={false}
                    context={`legal:${doc.slug}`}
                    className="mt-4"
                  />
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
