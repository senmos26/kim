"use client";
import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/sections/Hero";
import { Book, Cpu, Calendar, ArrowRight, User, Clock, Tag } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ContentCard } from "@/components/ui/ContentCard";
import { BookCard } from "@/components/ui/BookCard";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { EventCard } from "@/components/ui/EventCard";
import { upcomingEvents } from "@/lib/data";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <Hero />

      {/* 1. SECTION ÉVÉNEMENTS PROCHAINS (MOVED & LIMITED TO 2) */}
      <section className="py-32 px-6 md:px-12 bg-secondary/10 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-8">
            <h3 className="text-4xl md:text-6xl font-display font-bold">Prochains <br /> <span className="text-primary italic font-normal">Rendez-vous.</span></h3>
            <Link href="/events" className="text-xs font-bold uppercase tracking-widest border-b-2 border-primary/20 pb-2 hover:border-primary transition-all">Tous les événements</Link>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {upcomingEvents.slice(0, 2).map((ev, idx) => (
              <EventCard
                key={ev.id}
                id={ev.id}
                href={`/events/${ev.id}`}
                title={ev.title}
                desc={ev.desc}
                category={ev.cat}
                date={ev.date}
                endDate={ev.endDate}
                month={ev.month}
                location={ev.location}
                price={ev.price}
                maxInscriptions={ev.maxInscriptions}
                currentInscriptions={ev.currentInscriptions}
                image={ev.image}
                speakers={ev.speakers}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. SECTION DERNIÈRES PARUTIONS (OUVRAGES) */}
      <section className="py-32 px-6 md:px-12 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-primary mb-6 underline underline-offset-8">Dernières Parutions</h2>
              <h3 className="text-4xl md:text-6xl font-display font-bold leading-none italic">
                L'essence de la pensée <span className="font-normal text-primary">littéraire.</span>
              </h3>
            </div>
            <Link href="/books" className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-widest hover:text-primary transition-all border-b-2 border-primary/10 pb-2">
              Voir toute la collection <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {[
              { id: "souffle-des-idees", title: "Le Souffle des Idées", cat: "LITTÉRATURE / ESSAI", desc: "Une œuvre majeure explorant les tensions fertiles entre la logique de l'ingénieur et l'intuition du poète.", image: "/assets/images/souffle_idees_book_1769376079792.png" },
              { id: "echos-futur", title: "Échos du Futur", cat: "LITTÉRATURE", desc: "Recueil d'essais sur la place de l'homme dans un monde orchestré par l'électronique.", image: "bg-orange-50" },
              { id: "ingenierie-demain", title: "L'Ingénierie du Demain", cat: "TECHNIQUE", desc: "Guide de référence sur les systèmes embarqués pour la nouvelle génération.", image: "bg-secondary/30" }
            ].map((book, idx) => (
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
        </div>
      </section>

      {/* 3. SECTION EXPERTISE TECHNIQUE (TECH/PORTFOLIO) */}
      <section className="py-32 px-6 md:px-12 bg-secondary/30 border-b border-border">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h3 className="text-4xl md:text-6xl font-display font-bold text-center leading-tight mb-20">
            L'innovation par la <br className="hidden md:block" />
            <span className="text-primary font-medium italic underline underline-offset-10">rigueur technique.</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full">
            {[
              { id: "smartgrid-v2", title: "SmartGrid v2", cat: "Systèmes Embarqués", desc: "Contrôleur intelligent pour réseaux électriques locaux haute performance.", tech: ["C", "PCB Design", "IoT"], image: "/assets/images/smartgrid_technology_1769376095858.png", icon: <Cpu /> },
              { id: "iot-precision", title: "IoT Precision", cat: "Capteurs", desc: "Automate de mesure haute fidélité pour laboratoires de recherche scientifique.", tech: ["VHDL", "FPGA"], image: "bg-secondary/30", icon: <Cpu /> },
              { id: "edge-analytics", title: "Edge Analytics", cat: "Intelligence Artificielle", desc: "Optimisation d'algorithmes de vision complexe sur architecture FPGA.", tech: ["Python", "C++"], image: "bg-orange-100/30", icon: <Cpu /> }
            ].map((p, idx) => (
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

          <Link href="/portfolio" className="mt-16 flex items-center gap-4 text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">
            Explorer tout le portfolio <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* 4. SECTION BLOG (ARTICLES RECENT) */}
      <section className="py-32 px-6 md:px-12 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-8">
            <h3 className="text-4xl md:text-6xl font-display font-bold">Réflexions <br /> <span className="text-muted-foreground italic font-normal">et Partages.</span></h3>
            <Link href="/blog" className="text-xs font-bold uppercase tracking-widest border-b-2 border-primary/20 pb-2 hover:border-primary transition-all">Consulter le blog</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { id: "electronique-ecriture", cat: "Littérature", date: "12 JAN 2026", title: "Comment l'électronique influence l'écriture moderne ?", desc: "Une analyse profonde sur l'interaction entre les structures logiques et la créativité narrative.", image: "/assets/images/poesie_digitale_art_1769376168451.png" },
              { id: "architecture-riscv", cat: "Technique", date: "05 JAN 2026", title: "L'architecture RISC-V : Un nouveau souffle.", desc: "Exploration technique des microcontrôleurs open-source et de leur impact sur l'industrie.", image: "/assets/images/riscv_architecture_chip_1769376111211.png" },
              { id: "poesie-digitale", cat: "Littérature", date: "28 DÉC 2025", title: "La poésie comme refuge dans un monde digital", desc: "Redécouvrir le lyrisme à l'ère de l'intelligence artificielle et de l'automatisation.", image: "bg-secondary/30" }
            ].map((art, idx) => (
              <ArticleCard
                key={art.id}
                id={art.id}
                href={`/blog/${art.id}`}
                title={art.title}
                desc={art.desc}
                category={art.cat}
                date={art.date}
                image={art.image}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
