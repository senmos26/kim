"use client";
import React, { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FilterSystem } from "@/components/ui/FilterSystem";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Cpu, Zap, Code } from "lucide-react";

const projects = [
    { id: "smartgrid-v2", cat: "SYSTÈMES EMBARQUÉS", title: "SmartGrid Controller v2", desc: "Conception d'un régulateur intelligent pour réseaux locaux haute performance.", tech: ["C", "PCB Design", "IoT"], image: "/assets/images/smartgrid_technology_1769376095858.png", icon: <Cpu size={80} />, date: "2026-02-10" },
    { id: "iot-precision", cat: "MÉTROLOGIE", title: "Automate IoT Precision", desc: "Instrument de mesure haute fidélité pour laboratoires de recherche.", tech: ["VHDL", "FPGA", "DSP"], image: "bg-secondary/30", icon: <Zap size={80} />, date: "2025-11-20" },
    { id: "edge-analytics", cat: "IA / VISION", title: "Edge Analytics Engine", desc: "Optimisation d'algorithmes de vision par ordinateur sur puce mobile.", tech: ["Python", "TensorFlow", "C++"], image: "bg-orange-100/30", icon: <Code size={80} />, date: "2025-08-15" },
    { id: "secure-node", cat: "SÉCURITÉ", title: "Secure Node Firmware", desc: "Mise en place d'une racine de confiance pour terminaux IoT connectés.", tech: ["Rust", "Cryptography"], image: "bg-stone-100", icon: <Cpu size={80} />, date: "2024-12-05" }
];

const categories = ["SYSTÈMES EMBARQUÉS", "MÉTROLOGIE", "IA / VISION", "SÉCURITÉ"];

const sortOptions = [
    { label: "Plus récent", value: "newest" },
    { label: "Plus ancien", value: "oldest" },
    { label: "Titre A-Z", value: "title-asc" }
];

export default function PortfolioPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [sortBy, setSortBy] = useState("newest");

    const filteredProjects = useMemo(() => {
        let result = projects.filter((p) => {
            const matchesSearch =
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesCategory = selectedCategory === "ALL" || p.cat === selectedCategory;

            return matchesSearch && matchesCategory;
        });

        // Sorting
        result.sort((a, b) => {
            if (sortBy === "title-asc") return a.title.localeCompare(b.title);
            if (sortBy === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime();
            if (sortBy === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime();
            return 0;
        });

        return result;
    }, [searchQuery, selectedCategory, sortBy]);

    return (
        <main className="flex flex-col min-h-screen bg-background">
            <Navbar />

            {/* Header */}
            <section className="pt-32 pb-16 px-6 md:px-12 border-b border-border">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-10">
                    <div className="max-w-2xl">
                        <h1 className="text-3xl md:text-5xl font-display font-bold leading-none mb-8 text-foreground tracking-tighter uppercase italic">
                            Ingénierie & <span className="text-primary italic font-normal">Savoir-faire.</span>
                        </h1>
                        <p className="text-lg text-foreground/80 italic border-l-4 border-primary/20 pl-8 leading-relaxed font-sans max-w-xl">
                            "L'élégance de la précision." Explorez nos projets critiques, de l'architecture hardware au déploiement système.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-8 bg-background border-b border-border">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <FilterSystem
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        categories={categories}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                        sortOptions={sortOptions}
                        placeholder="Rechercher un projet, une technologie..."
                        resultCount={filteredProjects.length}
                    />
                </div>
            </section>

            {/* Content Grid */}
            <section className="py-24 px-6 md:px-12 bg-[#faf9f6]">
                <div className="max-w-7xl mx-auto min-h-[400px]">
                    {filteredProjects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {filteredProjects.map((p, idx) => (
                                <ProjectCard
                                    key={p.id}
                                    id={p.id}
                                    href={`/portfolio/${p.id}`}
                                    title={p.title}
                                    desc={p.desc}
                                    category={p.cat}
                                    tech={p.tech}
                                    image={p.image}
                                    icon={p.icon}
                                    index={idx}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-32 text-center">
                            <h3 className="text-3xl font-display font-bold italic mb-4">Aucun projet trouvé.</h3>
                            <p className="text-foreground/70">Essayez d'ajuster vos filtres ou votre recherche.</p>
                            <button
                                onClick={() => { setSearchQuery(""); setSelectedCategory("ALL"); }}
                                className="mt-8 text-[10px] font-bold uppercase tracking-widest text-primary underline underline-offset-8"
                            >
                                Réinitialiser les filtres
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
