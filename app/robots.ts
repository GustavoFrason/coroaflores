// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://www.coroaflores24hrs.com.br";

  // Produção se QUALQUER um bater:
  const isProd =
    process.env.NODE_ENV === "production" ||
    (process.env.VERCEL_ENV ?? "").toLowerCase() === "production" ||
    ["prod", "production"].includes(
      (process.env.NEXT_PUBLIC_SITE_ENV ?? "").toLowerCase()
    );

  const common = {
    sitemap: `${base}/sitemap.xml`,
    host: base,
  } as const;

  // 🔒 Bloqueia indexação fora de produção
  if (!isProd) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
      ...common,
    };
  }

  // ✅ Produção: permite tudo, exceto rotas sensíveis
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",     // endpoints não devem aparecer no Google
          "/admin",    // ajuste se existir
          // evita duplicados com querystring nessas páginas (opcional)
          "/termos?*",
          "/politica-privacidade?*",
        ],
      },
      // Exemplos de bots específicos (opcional)
      { userAgent: "AdsBot-Google", allow: "/" },
      { userAgent: "Googlebot-Image", allow: "/" },
    ],
    ...common,
  };
}