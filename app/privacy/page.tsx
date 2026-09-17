import type { Metadata } from "next";
import { site } from "@/lib/content";
import { privacy } from "@/lib/legal";
import LegalPage from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: `${privacy.title} | ${site.retailer}`,
  description: privacy.summary,
  robots: { index: true, follow: true },
};

export default function Page() {
  return <LegalPage doc={privacy} />;
}
