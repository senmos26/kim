"use client";
import React, { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FilterSystem } from "@/components/ui/FilterSystem";
import { ContentCard } from "@/components/ui/ContentCard";

const upcomingEvents = [
    {
        id: "webinar-iot-2026",
        date: "12",
        month: "FÉVR. 2026",
        fullDate: "2026-02-12",
        title: "L'Avenir de l'Électronique au Maroc",
        desc: "Plongée dans les défis industriels et technologiques de la décennie à venir.",
        cat: "CONFÉRENCE",
        image: "/assets/images/electronic_future_maroc_1769376061385.png"
    },
    {
        id: "salon-livre-paris",
        date: "25",
        month: "MARS 2026",
        fullDate: "2026-03-25",
        title: "Signature Littéraire : Le Souffle des Idées",
        desc: "Rencontre exclusive et dédicace au Salon du Livre de Paris.",
        cat: "LITTÉRATURE",
        image: "/assets/images/souffle_idees_book_1769376079792.png"
    },
    {
        id: "masterclass-arm-casa",
        date: "10",
        month: "AVRIL 2026",
        fullDate: "2026-04-10",
        title: "Masterclass : Architectures ARM Modernes",
        desc: "Optimisation bas-niveau pour les systèmes embarqués de demain.",
        cat: "WORKSHOP",
        image: "/assets/images/masterclass_arm_workshop_1769376186504.png"
    },
    {
        id: "conf-smartgrid-rabat",
        date: "22",
        month: "MAI 2026",
        fullDate: "2026-05-22",
        title: "Eco-Systèmes & SmartGrids",
        desc: "Discussion sur l'intégration des énergies renouvelables via l'IoT.",
        cat: "INNOVATION",
        image: "bg-stone-100"
    }
];

const categories = ["CONFÉRENCE", "LITTÉRATURE", "WORKSHOP", "INNOVATION"];

const sortOptions = [
    { label: "Plus proche (Date)", value: "newest" },
    { label: "Plus lointain", value: "oldest" },
    { label: "Titre A-Z", value: "title-asc" }
];

export default function EventsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [sortBy, setSortBy] = useState("newest");

    const filteredEvents = useMemo(() => {
        let result = upcomingEvents.filter((ev) => {
            const matchesSearch =
                ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                ev.desc.toLowerCase().includes(searchQuery.toLowerCase());

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

    return (
        <main className="flex flex-col min-h-screen bg-background">
            <Navbar />

            {/* Header */}
            <section className="pt-32 pb-16 px-6 md:px-12 border-b border-border">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-10">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-7xl font-display font-bold leading-none mb-6 text-foreground tracking-tighter uppercase italic">
                            Agenda & <span className="text-primary italic font-normal">Rencontres.</span>
                        </h1>
                        <p className="text-xl text-muted-foreground italic border-l-4 border-primary/20 pl-10 max-w-2xl leading-relaxed font-sans">
                            Découvrez nos conférences, ateliers et signatures littéraires. Un pont entre l'innovation technique et la pensée humaniste.
                        </p>
                    </div>
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
                        categories={categories}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                        sortOptions={sortOptions}
                        placeholder="RECHERCHER UN ÉVÉNEMENT..."
                    />
                </div>
            </section>

            {/* Content Grid */}
            <section className="py-24 px-6 md:px-12 bg-[#faf9f6]">
                <div className="max-w-7xl mx-auto min-h-[400px]">
                    {filteredEvents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                            {filteredEvents.map((ev, idx) => (
                                <ContentCard
                                    key={ev.id}
                                    id={ev.id}
                                    href={`/events/${ev.id}`}
                                    title={ev.title}
                                    desc={ev.desc}
                                    category={ev.cat}
                                    index={idx}
                                    visualData={{
                                        title: ev.date,
                                        subtitle: ev.month,
                                        image: ev.image
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-32 text-center">
                            <h3 className="text-3xl font-display font-bold italic mb-4">Aucun événement trouvé.</h3>
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
