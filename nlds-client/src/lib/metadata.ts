import type { Metadata } from "next";
import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  SITE_FULL_NAME,
} from "./constants";

interface MetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  noIndex?: boolean;
}

/**
 * Factory function for generating consistent page metadata.
 * Use in every page.tsx via: export const metadata = createMetadata({ ... })
 */
export function createMetadata({
  title,
  description = SITE_DESCRIPTION,
  image = "/og-image.jpg",
  path = "",
  noIndex = false,
}: MetadataOptions = {}): Metadata {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_FULL_NAME;
  const url = `${SITE_URL}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return {
    title: pageTitle,
    description,
    metadataBase: new URL(SITE_URL),
    ...(noIndex && { robots: { index: false, follow: false } }),
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: pageTitle }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}
