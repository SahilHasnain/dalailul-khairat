import type { MetadataRoute } from "next";
import { getReadings, siteUrl } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/dalail-al-khairat", "/search", "/about"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...getReadings().map((reading) => ({
      url: `${siteUrl}/dalail-al-khairat/${reading.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: reading.kind === "part" ? 0.9 : 0.85,
    })),
  ];
}
