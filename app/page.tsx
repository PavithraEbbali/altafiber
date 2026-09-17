import { activeServiceSections } from "@/lib/content";
import StructuredData from "@/components/StructuredData";
import Header, { DisclosureBar } from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import ServiceSection from "@/components/sections/ServiceSection";
import FinePrint from "@/components/sections/FinePrint";
import HowItWorks from "@/components/sections/HowItWorks";
import Faq from "@/components/sections/Faq";
import ClosingCta from "@/components/sections/ClosingCta";
import Footer from "@/components/sections/Footer";

/**
 * Canonical page order.
 *
 * The service-line block is not written out by hand — it maps over
 * `activeServiceSections`, which yields Fiber -> Bundles -> TV -> Phone in
 * that order. Cable and Mobile are declared in lib/content.ts but hold no
 * plans, so they never render. Adding a Cable plan to lib/content.ts would
 * make a Cable section appear in the right slot with no change to this file.
 */
export default function Page() {
  return (
    <>
      <StructuredData />

      {/* -------- Global top chrome -------- */}
      <DisclosureBar />
      <Header />

      <main>
        {/* -------- Hero -------- */}
        <Hero />

        {/* -------- Service lines, in canonical order -------- */}
        {activeServiceSections.map((section, i) => (
          <ServiceSection
            key={section.id}
            section={section}
            tone={i % 2 === 1 ? "tint" : "light"}
          />
        ))}

        {/* -------- Closing sections -------- */}
        <FinePrint />
        <HowItWorks />
        <Faq />
        <ClosingCta />
      </main>

      <Footer />
    </>
  );
}
