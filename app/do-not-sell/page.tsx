import type { Metadata } from "next";
import { site } from "@/lib/content";
import { doNotSell } from "@/lib/legal";
import LegalPage from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: `${doNotSell.title} | ${site.retailer}`,
  description: doNotSell.summary,
  robots: { index: true, follow: true },
};

export default function Page() {
  return <LegalPage doc={doNotSell} />;
}
