"use client";
import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FilterSystem } from "@/components/ui/FilterSystem";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { X } from "lucide-react";

import { articles, articleCategories } from "@/data/articles";

const sortOptions = [
    { label: "Plus récent", value: "newest" },
    { label: "Plus ancien", value: "oldest" },
    { label: "Titre A-Z", value: "title-asc" }
];

function computeReadTime(html: string) {
    const text = html.replace(/<[^>]+>/g, " ");
    const words = text.trim().split(/\s+/).length;
    return `${Math.max(2, Math.round(words / 200))} min`;
}

export default function BlogPage() {
    return (
        <Suspense fallback={null}>
            <BlogPageContent />
        </Suspense>
    );
}

function BlogPageContent() {
    const searchParams = useSearchParams();
    const tagParam = searchParams.get("tag");

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState("newest");

    useEffect(() => {
        if (tagParam) setSelectedTag(tagParam);
    }, [tagParam]);

    const allTags = useMemo(() => {
        const tags = new Set<string>();
        articles.forEach((art) => art.tags?.forEach((t) => tags.add(t)));
        return Array.from(tags).sort();
    }, []);

    const filteredArticles = useMemo(() => {
        let result = articles.filter((art) => {
            if (art.status === "draft") return false;

            const matchesSearch =
                art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                art.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesCategory = selectedCategory === "ALL" || art.category === selectedCategory;

            const matchesTag = !selectedTag || art.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase());

            return matchesSearch && matchesCategory && matchesTag;
        });

        result.sort((a, b) => {
            if (sortBy === "title-asc") return a.title.localeCompare(b.title);
            if (sortBy === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime();
            if (sortBy === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime();
            return 0;
        });

        return result;
    }, [searchQuery, selectedCategory, selectedTag, sortBy]);

    return (
        <main className="flex flex-col min-h-screen bg-white">
            <Navbar />

            {/* Header */}
            <section className="pt-32 pb-12 px-6 md:px-12 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-3xl mb-16">
                        <h1 className="text-3xl md:text-5xl font-display font-bold leading-[0.9] mb-8 text-foreground tracking-tighter">
                            Pensées & <span className="text-primary italic font-normal">Analyses.</span>
                        </h1>
                        <p className="text-xl text-foreground/80 italic border-l-4 border-primary/20 pl-10 leading-relaxed max-w-2xl font-sans">
                            Un espace dédié à la confluence entre design hardware et poésie narrative.
                        </p>
                    </div>

                    {/* Filter Section */}
                    <div className="border-y border-border py-6">
                        <FilterSystem
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                            categories={articleCategories}
                            sortBy={sortBy}
                            onSortChange={setSortBy}
                            sortOptions={sortOptions}
                            placeholder="Rechercher un article, un tag..."
                            resultCount={filteredArticles.length}
                        />
                    </div>
                </div>
            </section>

            {/* Tag Filter Bar — scrollable horizontal */}
            {(selectedTag || allTags.length > 0) && (
                <section className="py-3 bg-white border-b border-border">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <div className="flex items-center gap-3">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-foreground/40 shrink-0">Tags</span>
                            {selectedTag && (
                                <button
                                    onClick={() => setSelectedTag(null)}
                                    className="flex items-center gap-1 shrink-0 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider bg-primary text-white border border-primary"
                                >
                                    {selectedTag} <X size={10} />
                                </button>
                            )}
                            <div className="overflow-x-auto scrollbar-none flex items-center gap-2 -my-1 py-1">
                                {allTags.filter((t) => t !== selectedTag).map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => setSelectedTag(tag)}
                                        className="shrink-0 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider border border-border text-foreground/50 hover:border-primary hover:text-primary transition-colors whitespace-nowrap"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Content Grid */}
            <section className="py-24 px-6 md:px-12 bg-white">
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
                                    readTime={computeReadTime(art.content)}
                                    likesCount={art.likes_count}
                                    viewsCount={art.views_count}
                                    index={idx}
                                    onTagClick={(tag) => setSelectedTag(tag)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-32 text-center">
                            <h3 className="text-3xl font-display font-bold italic mb-4">Aucun article trouvé.</h3>
                            <p className="text-foreground/70">Essayez d'ajuster vos filtres ou votre recherche.</p>
                            <button
                                onClick={() => { setSearchQuery(""); setSelectedCategory("ALL"); setSelectedTag(null); }}
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
