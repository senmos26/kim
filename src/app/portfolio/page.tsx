"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FilterSystem } from "@/components/ui/FilterSystem";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { portfolioProjects, portfolioCategories } from "@/data/portfolio";

const PROJECTS_PER_PAGE = 6;

const sortOptions = [
    { label: "Plus récent", value: "newest" },
    { label: "Plus ancien", value: "oldest" },
    { label: "Titre A-Z", value: "title-asc" }
];

export default function PortfolioPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [sortBy, setSortBy] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredProjects = useMemo(() => {
        let result = portfolioProjects.filter((p) => {
            const matchesSearch =
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
                p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesCategory = selectedCategory === "ALL" || p.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });

        result.sort((a, b) => {
            if (sortBy === "title-asc") return a.title.localeCompare(b.title);
            if (sortBy === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime();
            if (sortBy === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime();
            return 0;
        });

        return result;
    }, [searchQuery, selectedCategory, sortBy]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory, sortBy]);

    const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE));
    const paginatedProjects = filteredProjects.slice((currentPage - 1) * PROJECTS_PER_PAGE, currentPage * PROJECTS_PER_PAGE);

    return (
        <main className="flex flex-col min-h-screen bg-white">
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
            <section className="py-8 bg-white border-b border-border">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <FilterSystem
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        categories={portfolioCategories}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                        sortOptions={sortOptions}
                        placeholder="Rechercher un projet, une technologie..."
                        resultCount={filteredProjects.length}
                    />
                </div>
            </section>

            {/* Content Grid */}
            <section className="py-24 px-6 md:px-12 bg-white">
                <div className="mx-auto min-h-[400px] max-w-[1380px]">
                    {filteredProjects.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                                {paginatedProjects.map((p, idx) => (
                                    <ProjectCard
                                        key={p.id}
                                        href={`/portfolio/${p.id}`}
                                        title={p.title}
                                        subtitle={p.subtitle}
                                        desc={p.excerpt}
                                        category={p.category}
                                        sector={p.sector}
                                        clientName={p.clientName}
                                        status={p.status}
                                        featured={p.featured}
                                        year={p.year}
                                        duration={p.duration}
                                        engagementType={p.engagementType}
                                        metricHighlight={p.metricHighlight}
                                        tech={p.tech}
                                        tags={p.tags}
                                        image={p.coverImage}
                                        index={idx}
                                    />
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div className="flex flex-wrap items-center justify-center gap-3 mt-14">
                                    <button
                                        type="button"
                                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] border border-border disabled:opacity-40"
                                    >
                                        Précédent
                                    </button>
                                    <div className="flex flex-wrap items-center justify-center gap-2">
                                        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                                            <button
                                                key={page}
                                                type="button"
                                                onClick={() => setCurrentPage(page)}
                                                className={`min-w-10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.24em] border ${currentPage === page ? "border-primary bg-primary text-white" : "border-border text-foreground/70 hover:border-primary hover:text-primary"}`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] border border-border disabled:opacity-40"
                                    >
                                        Suivant
                                    </button>
                                </div>
                            )}
                        </>
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
