import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import { site, startingPrice, speedLabel, fastestMbps,
  siteUrl,
} from "@/lib/content";
import { ogImage } from "@/lib/images";
import SmoothScroll from "@/components/providers/SmoothScroll";
import "./globals.css";

/**
 * Figtree stands in for Gilroy, the proprietary geometric sans altafiber uses.
 * One variable file, `display: swap`, preloaded — no layout shift, no second
 * network round trip for weights.
 */
const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  title: `${site.brandName} Authorized Retailer | Fiber Internet, TV & Home Phone`,
  description: `Order ${site.brandName} Fioptics fiber internet from $${startingPrice}/mo with symmetrical speeds up to ${speedLabel(
    fastestMbps
  )}, unlimited data and no caps. Independent authorized retailer. Check availability and order by phone.`,
  applicationName: site.retailer,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "/",
    locale: "en_US",
    siteName: site.retailer,
    title: `${site.brandName} Authorized Retailer | Fiber Internet, TV & Home Phone`,
    description: `Symmetrical ${site.brandName} fiber from $${startingPrice}/mo. Unlimited data, no caps, 99.99% reliable.`,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brandName} Authorized Retailer`,
    description: `Symmetrical ${site.brandName} fiber from $${startingPrice}/mo. Unlimited data, no caps, 99.99% reliable.`,
    images: [ogImage.url],
  },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#012639",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={figtree.variable}>
      <body className="antialiased">
        <a
          href="#plans"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to plans
        </a>

        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
