"use client";

import { faqs } from "@/lib/content";
import Accordion from "@/components/ui/Accordion";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import CallButton from "@/components/ui/CallButton";
import AmbientWash from "@/components/fx/AmbientWash";

export default function Faq() {
  return (
    <section
      id="faq"
      className="relative scroll-mt-28 overflow-hidden bg-surface-alt py-16 sm:py-20 lg:py-24"
      aria-labelledby="faq-heading"
    >
      <AmbientWash tone="mixed" />

      <div className="shell relative">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              eyebrow="FAQ"
              heading="The questions that come up on every call"
              sub="Hardware, installation, speeds and terms — answered before you dial."
            />

            <Reveal delay={260} className="mt-8">
              <div className="rounded-[var(--radius-card)] bg-accent p-6">
                <p className="text-[0.9375rem] font-semibold leading-snug text-white">
                  Still deciding between two tiers?
                </p>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-white/80">
                  Tell us how many devices are on the network and what the
                  household actually does online. We will point you at the right
                  one.
                </p>
                <CallButton
                  label="Call to order"
                  variant="light"
                  size="md"
                  full
                  magnetic={false}
                  context="faq"
                  className="mt-5"
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} variant="wipe">
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
