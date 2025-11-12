import type { Metadata } from "next";

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      images:
        "/images/resources/application-deploy-guide/new-resource-page.webp",
      siteName: "Stackio",
      ...override.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images:
        "/images/resources/application-deploy-guide/new-resource-page.webp",
      ...override.twitter,
    },
  };
}

export const baseUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
);
