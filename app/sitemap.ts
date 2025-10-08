import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://coroashomenagens.com.br";

  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/politica-privacidade`, lastModified: new Date() },
    { url: `${base}/termos`, lastModified: new Date() },
  ];
}
