"use client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { ShareButton } from "@/components/ui/ShareButton";

const articlesData: Record<string, any> = {
    "electronique-ecriture": {
        title: "Comment l'électronique influence l'écriture moderne",
        category: "LITTÉRATURE",
        time: "8 min de lecture",
        quote: "Nous ne sommes plus seulement des écrivains de papier, mais des architectes de structures logiques portées par l'atome.",
        image: "/assets/images/poesie_digitale_art_1769376168451.png",
        content: [
            { type: "p", text: "L'écriture a toujours été influencée par les outils qui la portent. De la plume d'oie à la machine à écrire, chaque saut technologique a modifié non seulement la vitesse de production, mais la structure même de la pensée narrative." },
            { type: "h3", text: "La logique du hardware dans le verbe" },
            { type: "p", text: "Aujourd'hui, alors que nous concevons des systèmes sur puce (SoC) et des architectures RISC-V, nous commençons à percevoir le langage comme un ensemble de registres et d'instructions. La brièveté, la récursivité et la modularité — concepts chers à l'ingénierie — s'invitent dans le style littéraire contemporain." },
            { type: "blockquote", text: "Un bon code est une poésie qui s'exécute ; un bon roman est un système complexe qui finit par vivre de sa propre autonomie." },
            { type: "p", text: "Mohamed Asikim explore cette dualité, montrant comment la rigueur de l'assembleur peut donner naissance à une prose d'une clarté de cristal, débarrassée du superflu, mais chargée d'une tension électrique palpable." }
        ]
    },
    "architecture-riscv": {
        title: "L'architecture RISC-V : Un nouveau souffle",
        category: "TECHNIQUE",
        time: "12 min de lecture",
        quote: "La souveraineté technologique commence par l'ouverture des bases mêmes du calcul.",
        image: "/assets/images/riscv_architecture_chip_1769376111211.png",
        content: [
            { type: "p", text: "Le monde du hardware vit une révolution silencieuse. RISC-V, le jeu d'instructions open-source, est en train de briser les monopoles établis, offrant une liberté de conception sans précédent pour les ingénieurs du monde entier." },
            { type: "h3", text: "Personnalisation totale du silicium" },
            { type: "p", text: "Contrairement aux architectures propriétaires, RISC-V permet d'ajouter des instructions personnalisées pour des tâches spécifiques (IA, cryptographie). C'est cette granularité qui permet aujourd'hui d'optimiser les systèmes embarqués comme jamais auparavant." },
            { type: "blockquote", text: "Ouvrir le hardware, c'est libérer l'imagination des bâtisseurs de systèmes." },
            { type: "p", text: "Dans cet article, nous explorons comment Mohamed Asikim intègre ces principes d'ouverture et de modularité dans ses propres conceptions mecatroniques." }
        ]
    }
};

import React from "react";

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = React.use(params);
    const article = articlesData[slug] || articlesData["electronique-ecriture"];

    return (
        <main className="flex flex-col min-h-screen bg-background selection:bg-primary selection:text-white">
            <Navbar />

            {/* Article Hero */}
            <section className="pt-48 pb-24 px-6 md:px-12 bg-background">
                <div className="max-w-4xl mx-auto space-y-12">
                    <Link href="/blog" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-primary hover:-translate-x-2 transition-transform mb-12">
                        <ArrowLeft size={16} /> Retour aux articles
                    </Link>

                    <div className="flex flex-wrap items-center justify-between gap-6 border-b border-border pb-10">
                        <div className="flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60">
                            <span className="text-primary decoration-primary/30 underline underline-offset-8">{article.category}</span>
                            <span className="flex items-center gap-2"><Clock size={14} /> {article.time}</span>
                            <span className="italic tracking-widest text-foreground">Par Mohamed Asikim</span>
                        </div>
                        <ShareButton title={article.title} url={`/blog/${slug}`} variant="outline" />
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] text-foreground tracking-tighter">
                        {article.title}.
                    </h1>

                    <p className="text-2xl md:text-3xl text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-10 py-4 font-sans">
                        "{article.quote}"
                    </p>
                </div>
            </section>

            {/* Narrative Content */}
            <section className="py-24 px-6 md:px-12 border-t border-border mb-20">
                <div className="max-w-4xl mx-auto">
                    <div className="aspect-[21/9] bg-secondary border border-border mb-24 relative overflow-hidden group shadow-2xl">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-1000" />
                    </div>

                    <article className="prose prose-stone lg:prose-2xl font-sans text-muted-foreground leading-[2] space-y-12 max-w-none">
                        {article.content.map((block: any, idx: number) => {
                            if (block.type === 'p') return <p key={idx}>{block.text}</p>;
                            if (block.type === 'h3') return <h3 key={idx} className="font-display font-bold text-4xl text-foreground italic mt-20 mb-8">{block.text}</h3>;
                            if (block.type === 'blockquote') return (
                                <blockquote key={idx} className="border-l-4 border-primary pl-12 py-8 my-20 bg-secondary/30 italic text-2xl md:text-3xl text-foreground serif leading-relaxed">
                                    "{block.text}"
                                </blockquote>
                            );
                            return null;
                        })}
                    </article>

                    <div className="mt-32 pt-16 border-t border-border flex flex-col md:flex-row justify-between items-center gap-12">
                        <div className="text-center md:text-left">
                            <h4 className="text-xl font-display font-bold mb-2">Restez connecté à la vision</h4>
                            <p className="text-muted-foreground italic">Rejoignez 5,000+ lecteurs passionnés par la confluence des arts et techniques.</p>
                        </div>
                        <Link href="/contact" className="bg-primary text-white px-12 py-5 rounded-sm text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-primary/90 transition-all shadow-2xl shadow-primary/20">
                            S'abonner à la newsletter
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
