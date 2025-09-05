import { Flower } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-[#4B5563] flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-[#2E4A3B] grid place-items-center">
            <Flower className="h-4 w-4 text-white" />
          </div>
          <span>© {new Date().getFullYear()} Coroas & Homenagens</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/politica-privacidade" className="hover:text-[#1F2937]">Política de Privacidade</a>
          <a href="/termos" className="hover:text-[#1F2937]">Termos de Uso</a>
        </div>
      </div>
    </footer>
  );
}
