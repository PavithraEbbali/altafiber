import type { Metadata } from "next";
import { site } from "@/lib/content";
import { terms } from "@/lib/legal";
import LegalPage from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: `${terms.title} | ${site.retailer}`,
  description: terms.summary,
  robots: { index: true, follow: true },
};

export default function Page() {
  return <LegalPage doc={terms} />;
}
