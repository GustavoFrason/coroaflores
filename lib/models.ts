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
    nome: "Coroa da Paz",
    img: "/catalogo/01.png",
    precoBase: 179.9,
    //precoPromo: 219.9,
    //promoInicio: "2025-09-24T00:00:00Z",
    //promoFim: "2025-10-05T23:59:59Z",
    coresSugeridas: ["Branco e Verde"],
    //badge: "Mais vendido",
  },
  {
    id: "2",
    nome: "Coroa da Saudade",
    img: "/catalogo/02.png",
    precoBase: 239.9,
    //precoPromo: 219.9,
    //promoInicio: "2025-09-24T00:00:00Z",
    //promoFim: "2025-10-05T23:59:59Z",
    coresSugeridas: ["Branco e Verde"],
    //badge: "Mais vendido",
  },

  {
    id: "3",
    nome: "Coroa da Esperança",
    img: "/catalogo/03.png",
    precoBase: 289.9,
    //precoPromo: 219.9,
    //promoInicio: "2025-09-24T00:00:00Z",
    //promoFim: "2025-10-05T23:59:59Z",
    coresSugeridas: ["Branco e Verde"],
    //badge: "Mais vendido",
  },

  {
    id: "4",
    nome: "Coroa da Eternidade",
    img: "/catalogo/04.png",
    precoBase: 299.9,
    //precoPromo: 219.9,
    //promoInicio: "2025-09-24T00:00:00Z",
    //promoFim: "2025-10-05T23:59:59Z",
    coresSugeridas: ["Colorido"],
    //badge: "Mais vendido",
  },
  {
    id: "5",
    nome: "Coroa Clássica",
    img: "/catalogo/05.png",
    precoBase: 179.9,
    //precoPromo: 219.9,
    //promoInicio: "2025-09-24T00:00:00Z",
    //promoFim: "2025-10-05T23:59:59Z",
    coresSugeridas: ["Branco e Verde"],
    //badge: "Mais vendido",
  },
  {
    id: "6",
    nome: "Coroa da Esperança 2" ,
    img: "/catalogo/06.png",
    precoBase: 299.9,
    //precoPromo: 219.9,
    //promoInicio: "2025-09-24T00:00:00Z",
    //promoFim: "2025-10-05T23:59:59Z",
    coresSugeridas: ["Branco e Verde"],
    //badge: "Mais vendido",
  },
  {
    id: "7",
    nome: "Coroa Pureza",
    img: "/catalogo/07.png",
    precoBase: 389.9,
    //precoPromo: 219.9,
    //promoInicio: "2025-09-24T00:00:00Z",
    //promoFim: "2025-10-05T23:59:59Z",
    coresSugeridas: ["Branco e Verde"],
    //badge: "Mais vendido",
  },
  {
    id: "8",
    nome: "Coroa Homenagem Branca",
    img: "/catalogo/08.png",
    precoBase: 399.9,
    //precoPromo: 219.9,
    //promoInicio: "2025-09-24T00:00:00Z",
    //promoFim: "2025-10-05T23:59:59Z",
    coresSugeridas: ["Branco e Verde"],
    //badge: "Mais vendido",
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
