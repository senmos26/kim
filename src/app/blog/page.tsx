"use client";
import React, { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FilterSystem } from "@/components/ui/FilterSystem";
import { ArticleCard } from "@/components/ui/ArticleCard";

import { articles, articleCategories } from "@/data/articles";

const sortOptions = [
    { label: "Plus récent", value: "newest" },
    { label: "Plus ancien", value: "oldest" },
    { label: "Titre A-Z", value: "title-asc" }
];

export default function BlogPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [sortBy, setSortBy] = useState("newest");

    const filteredArticles = useMemo(() => {
        let result = articles.filter((art) => {
            const matchesSearch =
                art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                art.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesCategory = selectedCategory === "ALL" || art.category === selectedCategory;

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

    const handleTagClick = (tag: string) => {
        setSearchQuery(tag);
        // Scroll to filters if needed
        window.scrollTo({ top: 300, behavior: "smooth" });
    };

    return (
        <main className="flex flex-col min-h-screen bg-background">
            <Navbar />

            {/* Header */}
            <section className="pt-32 pb-12 px-6 md:px-12 bg-background">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-3xl mb-16">
                        <h1 className="text-3xl md:text-5xl font-display font-bold leading-[0.9] mb-8 text-foreground tracking-tighter">
                            Pensées & <span className="text-primary italic font-normal">Analyses.</span>
                        </h1>
                        <p className="text-xl text-muted-foreground italic border-l-4 border-primary/20 pl-10 leading-relaxed max-w-2xl font-sans">
                            Un espace dédié à la confluence entre design hardware et poésie narrative.
                        </p>
                    </div>

                    {/* Filter Section */}
                    <div className="border-y border-border py-4">
                        <FilterSystem
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                            categories={articleCategories}
                            sortBy={sortBy}
                            onSortChange={setSortBy}
                            sortOptions={sortOptions}
                            placeholder="Rechercher un article ou un tag..."
                        />
                    </div>
                </div>
            </section>

            {/* Content Grid */}
            <section className="py-24 px-6 md:px-12 bg-[#faf9f6]">
                <div className="max-w-7xl mx-auto min-h-[400px]">
                    {filteredArticles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {filteredArticles.map((art, idx) => (
                                <ArticleCard
                                    key={art.id}
                                    id={art.id}
                                    href={`/blog/${art.id}`}
                                    title={art.title}
                                    desc={art.excerpt}
                                    category={art.category}
                                    date={art.date}
                                    image={art.image}
                                    tags={art.tags}
                                    readTime={art.time}
                                    index={idx}
                                    onTagClick={handleTagClick}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-32 text-center">
                            <h3 className="text-3xl font-display font-bold italic mb-4">Aucun article trouvé.</h3>
                            <p className="text-muted-foreground">Essayez d'ajuster vos filtres ou votre recherche.</p>
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
