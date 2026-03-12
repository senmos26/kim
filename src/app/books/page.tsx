"use client";
import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FilterSystem } from "@/components/ui/FilterSystem";
import { BookCard } from "@/components/ui/BookCard";
import { X } from "lucide-react";

import { books, bookCategories } from "@/data/books";

const sortOptions = [
    { label: "Plus récent", value: "newest" },
    { label: "Plus ancien", value: "oldest" },
    { label: "Titre A-Z", value: "title-asc" }
];

export default function BooksPage() {
    return (
        <Suspense fallback={null}>
            <BooksPageContent />
        </Suspense>
    );
}

function BooksPageContent() {
    const searchParams = useSearchParams();
    const tagParam = searchParams.get("tag");

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState("newest");

    useEffect(() => {
        if (tagParam) {
            setSelectedTag(tagParam);
        }
    }, [tagParam]);

    const allTags = useMemo(() => {
        const tags = new Set<string>();
        books.forEach((book) => book.tags?.forEach((t) => tags.add(t)));
        return Array.from(tags).sort();
    }, []);

    const filteredBooks = useMemo(() => {
        let result = books.filter((book) => {
            const matchesSearch =
                book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.desc.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = selectedCategory === "ALL" || book.cat.toLowerCase().includes(selectedCategory.toLowerCase());

            const matchesTag = !selectedTag || (book.tags || []).some((t) => t.toLowerCase() === selectedTag.toLowerCase());

            return matchesSearch && matchesCategory && matchesTag;
        });

        // Sorting
        result.sort((a, b) => {
            if (sortBy === "title-asc") return a.title.localeCompare(b.title);
            if (sortBy === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime();
            if (sortBy === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime();
            return 0;
        });

        return result;
    }, [searchQuery, selectedCategory, selectedTag, sortBy]);

    return (
        <main className="flex flex-col min-h-screen bg-background">
            <Navbar />

            {/* Header */}
            <section className="pt-32 pb-20 px-6 md:px-12 text-center border-b border-border">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-5xl font-display font-bold leading-none mb-8 text-foreground tracking-tighter">
                        La Collection <span className="text-primary italic font-normal">Éditoriale.</span>
                    </h1>
                    <p className="text-xl text-foreground/80 italic max-w-xl mx-auto border-y border-primary/10 py-8 leading-relaxed font-sans">
                        "Un voyage entre raison technique et émotion littéraire."
                        Découvrez les ouvrages de Mohamed Asikim TCHAHAYE.
                    </p>
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
                        categories={bookCategories}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                        sortOptions={sortOptions}
                        placeholder="Rechercher un livre, un auteur..."
                        resultCount={filteredBooks.length}
                    />
                </div>
            </section>

            {/* Tag Filter Bar — scrollable horizontal */}
            {(selectedTag || allTags.length > 0) && (
                <section className="py-3 bg-background border-b border-border">
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

            {/* Content List */}
            <section className="py-24 px-6 md:px-12 bg-[#faf9f6]">
                <div className="max-w-7xl mx-auto min-h-[400px]">
                    {filteredBooks.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24">
                            {filteredBooks.map((book, idx) => (
                                <BookCard
                                    key={book.id}
                                    id={book.id}
                                    href={`/books/${book.id}`}
                                    title={book.title}
                                    desc={book.desc}
                                    category={book.cat}
                                    index={idx}
                                    image={book.image}
                                    price={book.price}
                                    currency={book.currency}
                                    status={book.status}
                                    amazonUrl={book.amazonUrl}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-32 text-center">
                            <h3 className="text-3xl font-display font-bold italic mb-4">Aucun ouvrage trouvé.</h3>
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
