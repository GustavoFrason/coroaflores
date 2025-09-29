// lib/models.ts

// --- Tipos de domínio ---
export interface Produto {
  id: string;
  nome: string;
  img: string;            // caminho em /public (ex.: "/coroa_1.png")
  precoBase: number;      // preço “DE”
  precoPromo?: number;    // preço “POR” (opcional)
  promoInicio?: string;   // ISO (ex.: "2025-09-24T00:00:00Z")
  promoFim?: string;      // ISO (ex.: "2025-10-05T23:59:59Z")
  coresSugeridas?: string[];
  badge?: string;
}

export interface Orcamento {
  produtoId: ProdutoId;   // produto escolhido
  faixaPersonalizada: boolean;
  textoFaixa?: string;
  localEntrega?: string;
  cores?: string[];       // livre: "branco, verde"
  homenageado?: string;
}

// --- Catálogo (exemplos) ---
// lib/models.ts
export const PRODUTOS: Produto[] = [
  {
    id: "1",
    nome: "Coroa Clássica",
    img: "/catalogo/1.png",
    precoBase: 249.9,
    precoPromo: 219.9,
    promoInicio: "2025-09-24T00:00:00Z",
    promoFim: "2025-10-05T23:59:59Z",
    coresSugeridas: ["Branco", "Verde"],
    badge: "Mais vendido",
  },
  {
    id: "2",
    nome: "Coroa Premium",
    img: "/catalogo/2.png",
    precoBase: 369.9,
    coresSugeridas: ["Branco", "Amarelo"],
  },

  // 👉 novo produto (sem promoção)
  {
    id: "3",
    nome: "Coroa Elegante",
    img: "/catalogo/3.png",
    precoBase: 299.9,
    coresSugeridas: ["Branco", "Rosa"],
    badge: "Entrega hoje",
  },

  // 👉 novo produto (com promoção)
  {
    id: "4",
    nome: "Coroa Jardim",
    img: "/catalogo/4.png",
    precoBase: 329.9,
    precoPromo: 289.9,
    promoInicio: "2025-10-01T00:00:00Z",
    promoFim: "2025-10-07T23:59:59Z",
    coresSugeridas: ["Branco", "Amarelo", "Verde"],
  },
    {
    id: "5",
    nome: "Coroa Jardim",
    img: "/catalogo/5.png",
    precoBase: 329.9,
    precoPromo: 289.9,
    promoInicio: "2025-10-01T00:00:00Z",
    promoFim: "2025-10-07T23:59:59Z",
    coresSugeridas: ["Branco", "Amarelo", "Verde"],
  },
      {
    id: "6",
    nome: "Coroa Jardim",
    img: "/catalogo/6.png",
    precoBase: 329.9,
    precoPromo: 289.9,
    promoInicio: "2025-10-01T00:00:00Z",
    promoFim: "2025-10-07T23:59:59Z",
    coresSugeridas: ["Branco", "Amarelo", "Verde"],
  },
      {
    id: "7",
    nome: "Coroa Jardim",
    img: "/catalogo/7.png",
    precoBase: 329.9,
    precoPromo: 289.9,
    promoInicio: "2025-10-01T00:00:00Z",
    promoFim: "2025-10-07T23:59:59Z",
    coresSugeridas: ["Branco", "Amarelo", "Verde"],
  },
      {
    id: "8",
    nome: "Coroa Jardim",
    img: "/catalogo/8.png",
    precoBase: 329.9,
    precoPromo: 289.9,
    promoInicio: "2025-10-01T00:00:00Z",
    promoFim: "2025-10-07T23:59:59Z",
    coresSugeridas: ["Branco", "Amarelo", "Verde"],
  },
];


// Deriva o tipo de ID a partir do catálogo
export type ProdutoId = (typeof PRODUTOS)[number]["id"];

// --- Helpers de lookup ---
export const PRODUTOS_MAP: Record<ProdutoId, Produto> = PRODUTOS.reduce(
  (acc, p) => {
    acc[p.id as ProdutoId] = p;
    return acc;
  },
  {} as Record<ProdutoId, Produto>
);

export const DEFAULT_PRODUTO_ID: ProdutoId = "1";

export function getProduto(id: ProdutoId): Produto {
  return PRODUTOS_MAP[id] ?? PRODUTOS_MAP[DEFAULT_PRODUTO_ID];
}
