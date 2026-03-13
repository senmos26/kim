"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FilterSystem } from "@/components/ui/FilterSystem";
import { EventCard } from "@/components/ui/EventCard";

import { upcomingEvents, eventCategories } from "@/data/events";

const EVENTS_PER_PAGE = 6;

const sortOptions = [
    { label: "Plus proche (Date)", value: "newest" },
    { label: "Plus lointain", value: "oldest" },
    { label: "Titre A-Z", value: "title-asc" }
];

export default function EventsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [sortBy, setSortBy] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredEvents = useMemo(() => {
        let result = upcomingEvents.filter((ev) => {
            const matchesSearch =
                ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                ev.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                ev.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                ev.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesCategory = selectedCategory === "ALL" || ev.cat === selectedCategory;

            return matchesSearch && matchesCategory;
        });

        // Sorting
        result.sort((a, b) => {
            if (sortBy === "title-asc") return a.title.localeCompare(b.title);
            if (sortBy === "newest") return new Date(a.fullDate).getTime() - new Date(b.fullDate).getTime();
            if (sortBy === "oldest") return new Date(b.fullDate).getTime() - new Date(a.fullDate).getTime();
            return 0;
        });

        return result;
    }, [searchQuery, selectedCategory, sortBy]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory, sortBy]);

    const totalPages = Math.max(1, Math.ceil(filteredEvents.length / EVENTS_PER_PAGE));
    const paginatedEvents = filteredEvents.slice((currentPage - 1) * EVENTS_PER_PAGE, currentPage * EVENTS_PER_PAGE);

    return (
        <main className="flex flex-col min-h-screen bg-white">
            <Navbar />

            {/* Header */}
            <section className="pt-32 pb-16 px-6 md:px-12 border-b border-border">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-10">
                    <div className="max-w-3xl">
                        <h1 className="text-3xl md:text-5xl font-display font-bold leading-none mb-6 text-foreground tracking-tighter uppercase italic">
                            Agenda & <span className="text-primary italic font-normal">Rencontres.</span>
                        </h1>
                        <p className="text-xl text-foreground/80 italic border-l-4 border-primary/20 pl-10 max-w-2xl leading-relaxed font-sans">
                            Découvrez nos conférences, ateliers et signatures littéraires. Un pont entre l'innovation technique et la pensée humaniste.
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
                        categories={eventCategories}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                        sortOptions={sortOptions}
                        placeholder="Rechercher un événement..."
                        resultCount={filteredEvents.length}
                    />
                </div>
            </section>

            {/* Content Grid */}
            <section className="py-24 px-6 md:px-12 bg-white">
                <div className="mx-auto min-h-[400px] max-w-[1380px]">
                    {filteredEvents.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                                {paginatedEvents.map((ev, idx) => (
                                    <EventCard
                                        key={ev.id}
                                        href={`/events/${ev.id}`}
                                        title={ev.title}
                                        subtitle={ev.subtitle}
                                        desc={ev.desc}
                                        category={ev.cat}
                                        date={ev.date}
                                        endDate={ev.endDate}
                                        month={ev.month}
                                        location={ev.location}
                                        status={ev.status}
                                        eventType={ev.eventType}
                                        startTime={ev.startTime}
                                        endTime={ev.endTime}
                                        timezone={ev.timezone}
                                        venueName={ev.venueName}
                                        platform={ev.platform}
                                        ctaLabel={ev.ctaLabel}
                                        featured={ev.featured}
                                        price={ev.price}
                                        maxInscriptions={ev.maxInscriptions}
                                        currentInscriptions={ev.currentInscriptions}
                                        image={ev.image && ev.image.startsWith("/") ? ev.image : undefined}
                                        speakers={ev.speakers || []}
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
                            <h3 className="text-3xl font-display font-bold italic mb-4">Aucun événement trouvé.</h3>
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
