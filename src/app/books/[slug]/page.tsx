"use client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, ExternalLink, MessageCircle } from "lucide-react";
import Link from "next/link";
import { ShareButton } from "@/components/ui/ShareButton";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const booksData: Record<string, any> = {
    "souffle-des-idees": {
        title: "Le Souffle des Idées",
        category: "LITÉRATURE / ESSAI PHILOSOPHIQUE",
        desc: "Une œuvre majeure explorant les tensions fertiles entre la logique de l'ingénieur et l'intuition du poète.",
        narrative: "Le Souffle des Idées n'est pas qu'un livre ; c'est un manifeste pour une fusion nécessaire entre l'esprit cartésien et l'élan créatif. Mohamed Asikim y explore comment la rigueur du design hardware peut informer et structurer une pensée littéraire d'une pureté nouvelle. À travers des chapitres mêlant souvenirs d'ingénierie et méditations poétiques, l'auteur démontre que le signal électrique et le vers écrit sont deux formes d'une même énergie qui ne demande qu'à circuler.",
        quote: "Innover, c'est savoir écouter le murmure de l'intuition au milieu du vacarme des Datas.",
        year: "2026",
        pages: "280",
        lang: "Français",
        format: "Broché / Digital",
        image: "/assets/images/souffle_idees_book_1769376079792.png",
        accent: "bg-[#bc5404]"
    },
    "echos-futur": {
        title: "Échos du Futur",
        category: "LITÉRATURE / RECUEIL D'ESSAIS",
        desc: "Recueil d'essais sur la place de l'homme dans un monde orchestré par l'électronique.",
        narrative: "À travers une série de récits visionnaires et de réflexions critiques, l'auteur interroge notre humanité à l'aube d'une ére post-silicium. Une plongée fascinante dans les futurs possibles, dictés par le code mais sauvés par l'esprit. Mohamed Asikim TCHAHAYE nous livre ici une vision à la fois technique et profondément humaniste de notre trajectoire digitale.",
        quote: "L'avenir ne s'écrit pas seulement en binaire, il se rêve en nuances.",
        year: "2025",
        pages: "215",
        lang: "Français",
        format: "Digital / Limited Edit.",
        image: "/assets/images/poesie_digitale_art_1769376168451.png",
        accent: "bg-primary"
    },
    "ingenierie-demain": {
        title: "L'Ingénierie du Demain",
        category: "TECHNIQUE / MANUEL D'EXPERTISE",
        desc: "Guide de référence sur les systèmes embarqués pour la nouvelle génération.",
        narrative: "Véritable bible technique pour les ingénieurs d'aujourd'hui, cet ouvrage détaille les architectures ARM modernes, l'optimisation RISC-V et les protocoles IoT de nouvelle génération. Un guide précis, rigoureux et indispensable pour comprendre les fondations matérielles du monde moderne, écrit par un expert de terrain.",
        quote: "La rigueur technique est la grammaire de l'innovation durable.",
        year: "2024",
        pages: "450",
        lang: "Français",
        format: "Hardcover / PDF",
        image: "/assets/images/smartgrid_technology_1769376095858.png",
        accent: "bg-slate-800"
    }
};

import React from "react";

export default function BookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = React.use(params);
    const book = booksData[slug] || booksData["souffle-des-idees"];

    return (
        <main className="flex flex-col min-h-screen bg-background selection:bg-primary selection:text-white">
            <Navbar />

            <section className="pt-48 pb-12 px-6 md:px-12 bg-background">
                <div className="max-w-7xl mx-auto">
                    <Link href="/books" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-primary hover:-translate-x-2 transition-transform mb-20">
                        <ArrowLeft size={16} /> Retour à la collection
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                        <div className="lg:col-span-5 flex justify-center lg:justify-start">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative aspect-[3/4] w-full max-w-[450px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] group"
                            >
                                <div className="absolute inset-0 overflow-hidden border border-border">
                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/5" />
                                </div>
                                <div className="absolute top-0 bottom-0 left-0 w-2 bg-gradient-to-r from-black/20 to-transparent z-10" />
                            </motion.div>
                        </div>

                        <div className="lg:col-span-7 flex flex-col pt-4">
                            <div className="flex justify-between items-start mb-10">
                                <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-primary underline underline-offset-[12px] decoration-primary/30">
                                    {book.category}
                                </span>
                                <ShareButton title={book.title} url={`/books/${slug}`} variant="outline" className="opacity-80 hover:opacity-100" />
                            </div>

                            <h1 className="text-4xl md:text-6xl font-display font-bold leading-[0.95] text-foreground mb-12 tracking-tighter">
                                {book.title}.
                            </h1>

                            <div className="relative mb-20">
                                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary/20" />
                                <p className="text-xl md:text-2xl text-muted-foreground italic leading-relaxed pl-12 max-w-2xl">
                                    "{book.desc}"
                                </p>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-16 border-y border-border mb-16">
                                <div className="space-y-3">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Publication</span>
                                    <p className="font-display font-bold text-xl">{book.year}</p>
                                </div>
                                <div className="space-y-3">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Pages</span>
                                    <p className="font-display font-bold text-xl">{book.pages}</p>
                                </div>
                                <div className="space-y-3">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Langue</span>
                                    <p className="font-display font-bold text-xl">{book.lang}</p>
                                </div>
                                <div className="space-y-3">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Format</span>
                                    <p className="font-display font-bold text-xl">{book.format}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-12">
                                <a href="#" className={cn("text-white px-16 py-6 rounded-sm text-xs font-bold uppercase tracking-[0.3em] transition-all shadow-2xl flex items-center gap-3", book.accent || "bg-primary")}>
                                    Acheter cet ouvrage <ExternalLink size={16} />
                                </a>
                                <a href="#" className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] border-b border-border hover:border-primary pb-2 transition-all">
                                    Commande WhatsApp <MessageCircle size={18} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-32 px-6 md:px-12 bg-background border-t border-border mt-12 mb-20">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl font-display font-bold italic mb-12">Présentation.</h2>
                    <div className="prose prose-stone lg:prose-xl font-sans text-muted-foreground leading-[2] space-y-10">
                        <p>{book.narrative}</p>
                        <div className="bg-secondary/20 p-12 border border-border italic text-xl text-foreground relative">
                            <span className="absolute top-4 left-4 text-6xl text-primary/10 font-serif">"</span>
                            {book.quote}
                            <span className="absolute bottom-4 right-4 text-6xl text-primary/10 font-serif rotate-180">"</span>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
