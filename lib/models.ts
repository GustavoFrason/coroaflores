export type ModeloCoroa = {
  id: string;
  nome: string;
  precoBase: number;
  img: string;
  tamanhos: ("P" | "M" | "G")[];
  cores: string[];
};

export const MODELOS: readonly ModeloCoroa[] = [
  {
    id: "classica",
    nome: "Coroa Clássica",
    precoBase: 249.9,
    img: "/coroa_1.png",
    tamanhos: ["P", "M", "G"],
    cores: ["Branco", "Verde"],
  },
  {
    id: "premium",
    nome: "Coroa Premium",
    precoBase: 369.9,
    img: "/coroa_2.png",
    tamanhos: ["P", "M", "G"],
    cores: ["Branco", "Amarelo"],
  },
  {
    id: "elegante",
    nome: "Coroa Elegante",
    precoBase: 299.9,
    img: "/coroa_3.png",
    tamanhos: ["P", "M", "G"],
    cores: ["Branco", "Rosa"],
  },
];
