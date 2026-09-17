import type { Metadata } from "next";
import { site } from "@/lib/content";
import Header, { DisclosureBar } from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import CallButton from "@/components/ui/CallButton";

export const metadata: Metadata = {
  title: `Page not found | ${site.retailer}`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <DisclosureBar />
      <Header />

      <main>
        <section className="relative overflow-hidden bg-surface-alt">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(900px 480px at 82% 0%, rgba(66,148,247,0.12), transparent 62%)",
            }}
          />

          <div className="shell relative flex min-h-[60vh] flex-col justify-center py-20">
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.17em] text-accent">
              404
            </p>

            <h1 className="mt-5 max-w-2xl text-[1.875rem] font-bold leading-[1.08] tracking-[-0.035em] text-ink sm:text-[2.75rem]">
              That page is not here.
            </h1>

            <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-body">
              The link may be out of date. The plans, hardware costs and FAQ all
              live on the main page — or call and we will talk it through.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="/"
                className="inline-flex h-14 items-center justify-center rounded-full bg-accent px-7 text-base font-semibold text-white transition-colors duration-300 hover:bg-ink"
              >
                Back to plans
              </a>
              <CallButton
                label="Call to order"
                variant="outline"
                size="lg"
                context="404"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
