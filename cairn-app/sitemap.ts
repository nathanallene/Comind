import type { MetadataRoute } from "next";
import { articles, services, studies } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/services",
    "/work",
    "/journal",
    "/tools",
    "/tools/memory",
    "/tools/hardware",
    "/tools/optimize",
    "/consult",
    "/about",
    ...services.map((item) => `/services/${item.slug}`),
    ...studies.map((item) => `/work/${item.slug}`),
    ...articles.map((item) => `/journal/${item.slug}`),
  ];

  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date("2026-11-04"),
  }));
}
