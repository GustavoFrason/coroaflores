"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-[#FAF8F5] text-[#5E5A57]">
            <header className="w-full border-b bg-[#FAF8F5]/90 backdrop-blur">
                <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <div className="font-serif text-lg">Coroas & Homenagens</div>
                    {/* Menu simples */}
                    <nav className="hidden md:flex gap-6 text-sm">
                        <a href="#about" className="hover:text-black">Sobre</a>
                        <a href="#servicos" className="hover:text-black">Serviços</a>
                        <a href="#catalogo" className="hover:text-black">Coroas</a>
                        <a href="#depoimentos" className="hover:text-black">Depoimentos</a>
                        <a href="#contato" className="hover:text-black">Contato</a>
                    </nav>
                    {/* Telefone */}
                    <div className="text-sm">Ligue: <span className="font-semibold">+55 (41) 99999-9999</span></div>
                </div>
            </header>

            {/* Hero principal */}
            <div className="mx-auto max-w-7xl px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <p className="italic text-sm mb-2">Coroas de Flores</p>
                    <h1 className="font-serif text-4xl md:text-5xl font-light leading-tight">
                        Homenagens florais para qualquer ocasião
                    </h1>
                    <p className="mt-4 text-lg text-[#7D7875]">
                        Elegância e respeito em cada detalhe. Entrega no mesmo dia.
                    </p>
                    <div className="mt-6">
                        <Button variant="outline" className="rounded-none border-2 px-8 py-6 text-base">
                            Fazer Pedido
                        </Button>
                    </div>
                </div>

                <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow">
                    <Image
                        src="/coroa_1.png"
                        alt="Coroa de flores em vaso, elegante"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

            </div>
        </section>
    );
}
