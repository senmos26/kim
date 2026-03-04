"use client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Zap, Globe } from "lucide-react";
import Link from "next/link";
import { ShareButton } from "@/components/ui/ShareButton";
import { cn } from "@/lib/utils";

const projectsData: Record<string, any> = {
    "smartgrid-v2": {
        title: "SmartGrid Controller v2",
        category: "SYSTÈMES EMBARQUÉS / ÉNERGIE",
        quote: "Optimiser la distribution d'énergie locale grâce à une architecture hardware résiliente, sécurisée et souveraine.",
        sector: "Management Énergétique",
        role: "Lead HW Architect",
        tech: ["Embedded C", "STM32", "LoRaWAN", "Altium Design"],
        image: "/assets/images/smartgrid_technology_1769376095858.png",
        challenge: "La distribution d'énergie dans les micro-grids nécessite une latence extrêmement faible et une fiabilité absolue. Le SmartGrid Controller v2 répond à des contraintes environnementales sévères tout en assurant un cryptage des données de bout en bout.",
        stat1: { label: "Consommation -30%", desc: "Réduction massive de l'empreinte énergétique via un firmware optimisé au registre près." },
        stat2: { label: "Sécurité Native", desc: "Mise en place d'un élément sécurisé (SE) pour la gestion des clés cryptographiques." }
    },
    "iot-precision": {
        title: "IoT Precision Label",
        category: "CAPTEURS / MÉTROLOGIE",
        quote: "La précision au millième, capturée et transmise en temps réel pour la recherche fondamentale.",
        sector: "Instrumentation Scientifique",
        role: "FPGA Designer",
        tech: ["VHDL", "FPGA", "Precision ADC", "DSP"],
        image: "/assets/images/riscv_architecture_chip_1769376111211.png",
        challenge: "Capturer des signaux de faible amplitude dans un environnement bruité industriel. Ce projet a nécessité une isolation galvanique totale et un traitement du signal déporté directement sur silicium.",
        stat1: { label: "Bruit -120dB", desc: "Plancher de bruit optimisé grâce à un routage PCB 8 couches hyper-sensible." },
        stat2: { label: "Temps Réel", desc: "Traitement parallèle massif permettant une analyse spectrale en nanosecondes." }
    },
    "edge-analytics": {
        title: "Edge Analytics Platform",
        category: "IA / FPGA ACCELERATION",
        quote: "Décentraliser l'intelligence pour des décisions instantanées au plus proche de la donnée.",
        sector: "IA Industrielle",
        role: "System Designer",
        tech: ["Python", "C++", "Xilinx Vivado", "TensorFlow Lite"],
        image: "/assets/images/electronic_future_maroc_1769376061385.png",
        challenge: "Exécuter des réseaux de neurones complexes sur des ressources matérielles limitées. L'enjeu était de maintenir un FPS élevé tout en restant dans une enveloppe thermique de moins de 5W.",
        stat1: { label: "Inférence 5ms", desc: "Vitesse d'exécution multipliée par 10 par rapport aux microcontrôleurs classiques." },
        stat2: { label: "Low Power", desc: "Optimisation de la consommation énergétique pour des déploiements sur batterie." }
    }
};

import React from "react";

export default function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = React.use(params);
    const project = projectsData[slug] || projectsData["smartgrid-v2"];

    return (
        <main className="flex flex-col min-h-screen bg-background selection:bg-primary selection:text-white">
            <Navbar />

            {/* Case Study Hero */}
            <section className="pt-48 pb-20 px-6 md:px-12 bg-background">
                <div className="max-w-7xl mx-auto">
                    <Link href="/portfolio" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-primary hover:-translate-x-2 transition-transform mb-20">
                        <ArrowLeft size={16} /> Retour au portfolio
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                        <div className="lg:col-span-8">
                            <div className="flex justify-between items-center mb-10">
                                <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-primary underline underline-offset-[12px] decoration-primary/30">{project.category}</span>
                                <ShareButton title={project.title} url={`/portfolio/${slug}`} variant="outline" />
                            </div>

                            <h1 className="text-5xl md:text-6xl font-display font-bold leading-[0.95] text-foreground mb-12 tracking-tighter italic whitespace-pre-line">
                                {project.title.replace(' ', '\n')}
                            </h1>

                            <p className="text-2xl md:text-3xl text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-12 py-4 max-w-3xl font-sans">
                                "{project.quote}"
                            </p>
                        </div>

                        <div className="lg:col-span-4 lg:pt-24 space-y-16">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Secteur</span>
                                    <p className="text-xl font-display font-bold tracking-tight">{project.sector}</p>
                                </div>
                                <div className="space-y-4">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Rôle</span>
                                    <p className="text-xl font-display font-bold tracking-tight">{project.role}</p>
                                </div>
                            </div>
                            <div className="space-y-8">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Technologies</span>
                                <div className="flex flex-wrap gap-4">
                                    {project.tech.map((t: string) => (
                                        <span key={t} className="text-[10px] font-bold uppercase tracking-widest border border-border px-6 py-3 bg-secondary/20 hover:border-primary/20 transition-colors">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Narrative */}
            <section className="py-32 px-6 md:px-12 bg-background border-t border-border mt-12 mb-20">
                <div className="max-w-5xl mx-auto space-y-32">
                    <div className="relative aspect-[21/9] bg-secondary border border-border overflow-hidden group shadow-2xl">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-1000" />
                    </div>

                    <article className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
                        <div className="md:col-span-5 space-y-8">
                            <h2 className="text-4xl font-display font-bold italic tracking-tight underline decoration-primary/20 underline-offset-8">Le Défi Technique</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed font-sans">
                                {project.challenge}
                            </p>
                        </div>

                        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="p-10 border border-border bg-secondary/20 space-y-8 hover:border-primary/20 transition-colors group">
                                <Zap size={36} className="text-primary group-hover:scale-110 transition-transform" />
                                <h4 className="text-2xl font-display font-bold">{project.stat1.label}</h4>
                                <p className="text-muted-foreground leading-relaxed text-sm">{project.stat1.desc}</p>
                            </div>
                            <div className="p-10 border border-border bg-secondary/20 space-y-8 hover:border-primary/20 transition-colors group">
                                <Globe size={36} className="text-primary group-hover:scale-110 transition-transform" />
                                <h4 className="text-2xl font-display font-bold">{project.stat2.label}</h4>
                                <p className="text-muted-foreground leading-relaxed text-sm">{project.stat2.desc}</p>
                            </div>
                        </div>
                    </article>

                    <div className="pt-24 border-t border-border flex flex-col lg:flex-row justify-between items-center gap-16">
                        <div className="text-center lg:text-left max-w-2xl">
                            <h3 className="text-3xl font-display font-bold italic mb-4">Besoin d'une expertise technique de haut niveau ?</h3>
                            <p className="text-muted-foreground text-lg italic">De la preuve de concept à l'industrialisation, Mohamed Asikim accompagne vos projets les plus critiques.</p>
                        </div>
                        <div className="flex flex-wrap gap-8">
                            <Link href="/contact" className="bg-primary text-white px-16 py-6 rounded-sm text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-primary/90 transition-all shadow-2xl shadow-primary/20">
                                Lancer une étude
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
