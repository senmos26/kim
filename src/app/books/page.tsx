"use client";
import React, { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FilterSystem } from "@/components/ui/FilterSystem";
import { BookCard } from "@/components/ui/BookCard";

import { books, bookCategories } from "@/data/books";

const sortOptions = [
    { label: "Plus récent", value: "newest" },
    { label: "Plus ancien", value: "oldest" },
    { label: "Titre A-Z", value: "title-asc" }
];

export default function BooksPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [sortBy, setSortBy] = useState("newest");

    const filteredBooks = useMemo(() => {
        let result = books.filter((book) => {
            const matchesSearch =
                book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.desc.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = selectedCategory === "ALL" || book.cat.toLowerCase().includes(selectedCategory.toLowerCase());

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
            <section className="pt-32 pb-20 px-6 md:px-12 text-center border-b border-border">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-5xl font-display font-bold leading-none mb-8 text-foreground tracking-tighter">
                        La Collection <span className="text-primary italic font-normal">Éditoriale.</span>
                    </h1>
                    <p className="text-xl text-muted-foreground italic max-w-xl mx-auto border-y border-primary/10 py-8 leading-relaxed font-sans">
                        "Un voyage entre raison technique et émotion littéraire."
                        Découvrez les ouvrages de Mohamed Asikim TCHAHAYE.
                    </p>
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-12 bg-background border-b border-border">
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
                        placeholder="RECHERCHER UN LIVRE..."
                    />
                </div>
            </section>

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
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-32 text-center">
                            <h3 className="text-3xl font-display font-bold italic mb-4">Aucun ouvrage trouvé.</h3>
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
