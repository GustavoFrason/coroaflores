import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://www.coroaflores24hrs.com.br";

  const now = new Date();

  type ProdutoLike = { slug?: string };

  // Import dinâmico com verificação segura
  let PRODUTOS: ProdutoLike[] = [];
  try {
    const mod = await import("@/lib/models");
    const maybeProdutos = (mod as Record<string, unknown>).PRODUTOS;

    if (Array.isArray(maybeProdutos)) {
      PRODUTOS = maybeProdutos.filter(
        (p): p is ProdutoLike =>
          typeof p === "object" &&
          p !== null &&
          "slug" in p &&
          typeof (p as ProdutoLike).slug === "string"
      );
    }
  } catch {
    // catálogo ausente ou erro no import — segue sem produtos
  }

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${base}/politica-privacidade`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/termos`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${base}/coroas-de-flores-curitiba`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/coroas-de-flores-sao-jose-dos-pinhais`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${base}/coroas-de-flores-colombo`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  const productUrls: MetadataRoute.Sitemap = PRODUTOS.map((p) => ({
    url: `${base}/produtos/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticUrls, ...productUrls];
}