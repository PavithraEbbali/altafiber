import type { Metadata } from "next";
import { site } from "@/lib/content";
import { accessibility } from "@/lib/legal";
import LegalPage from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: `${accessibility.title} | ${site.retailer}`,
  description: accessibility.summary,
  robots: { index: true, follow: true },
};

export default function Page() {
  return <LegalPage doc={accessibility} />;
}
