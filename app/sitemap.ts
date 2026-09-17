import type { MetadataRoute } from "next";
import { site,
  siteUrl,
} from "@/lib/content";
import { legalDocs } from "@/lib/legal";

/**
 * Built from `legalDocs`, so adding a policy page adds its sitemap entry.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...legalDocs.map((doc) => ({
      url: `${siteUrl}/${doc.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
