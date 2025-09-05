# Coroas & Homenagens — Landing Page (Next.js + Tailwind + shadcn/ui)

Landing focada em conversão via **WhatsApp** (sem banco de dados / sem checkout).
Stack: **Next.js (App Router) + TypeScript + Tailwind + shadcn/ui + lucide-react**.

## 🔧 Requisitos
- Node 18+ (recomendado 20.x).  
- npm 10+ (ok usar o que vem com o Node).  
- Windows PowerShell: rodar comandos em **uma linha só** (evite `^` e `` ` ``).

---

## 🚀 Como rodar

```bash
# instalar dependências
npm install

# rodar em dev
npm run dev

# build
npm run build

# preview do build
npm run start


npm i -D shadcn-ui@latest
npx shadcn-ui init
npx shadcn-ui add button card accordion dialog input textarea radio-group toast
npm i lucide-react



coroas-landing/
├─ app/
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
│  ├─ sections/
│  │  ├─ Hero.tsx
│  │  ├─ BenefitsStrip.tsx
│  │  ├─ Catalogo.tsx
│  │  ├─ ComoFunciona.tsx
│  │  ├─ Depoimentos.tsx
│  │  ├─ Faq.tsx
│  │  ├─ CtaFinal.tsx
│  │  └─ Footer.tsx
│  ├─ common/
│  │  ├─ Feature.tsx
│  │  └─ WhatsFloatingButton.tsx
│  └─ ui/           # gerada pelo shadcn-ui
├─ lib/
│  ├─ constants.ts  # WHATS_NUMBER
│  ├─ models.ts     # MODELOS (mock)
│  └─ utils.ts      # helpers (formatCurrency, makeWaLink)
├─ public/
│  ├─ placeholder-coroa-hero.jpg
│  ├─ placeholder-coroa-01.jpg
│  ├─ placeholder-coroa-02.jpg
│  └─ placeholder-coroa-03.jpg
└─ tsconfig.json     # alias "@/*"
