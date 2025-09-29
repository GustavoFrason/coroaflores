// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://coroaflores.vercel.app";

  // Bloqueia robôs fora de produção (ajuste se preferir)
  const isProd =
    (process.env.NEXT_PUBLIC_SITE_ENV ?? "").toLowerCase() === "prod" ||
    (process.env.VERCEL_ENV ?? "").toLowerCase() === "production";

  return {
    rules: isProd
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
