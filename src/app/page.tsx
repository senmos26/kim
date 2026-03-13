"use client";
import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/sections/Hero";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BookCard } from "@/components/ui/BookCard";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { EventCard } from "@/components/ui/EventCard";
import { upcomingEvents } from "@/data/events";
import { books } from "@/data/books";
import { articles } from "@/data/articles";
import { portfolioProjects } from "@/data/portfolio";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <Hero />

      {/* 1. SECTION ÉVÉNEMENTS PROCHAINS (MOVED & LIMITED TO 2) */}
      <section className="py-32 px-6 md:px-12 bg-white border-b border-border">
        <div className="mx-auto max-w-[1380px]">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-8">
            <h3 className="text-3xl md:text-4xl font-display font-bold">Prochains <br /> <span className="text-primary italic font-normal">Rendez-vous.</span></h3>
            <Link href="/events" className="text-xs font-bold uppercase tracking-widest border-b-2 border-primary/20 pb-2 hover:border-primary transition-all">Tous les événements</Link>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
            {upcomingEvents.slice(0, 4).map((ev, idx) => (
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
                image={ev.image}
                speakers={ev.speakers}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. SECTION DERNIÈRES PARUTIONS (OUVRAGES) */}
      <section className="py-32 px-6 md:px-12 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-primary mb-6 underline underline-offset-8">Dernières Parutions</h2>
              <h3 className="text-3xl md:text-4xl font-display font-bold leading-none italic">
                L'essence de la pensée <span className="font-normal text-primary">littéraire.</span>
              </h3>
            </div>
            <Link href="/books" className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-widest hover:text-primary transition-all border-b-2 border-primary/10 pb-2">
              Voir toute la collection <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {books.slice(0, 3).map((book, idx) => (
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
        </div>
      </section>

      {/* 3. SECTION EXPERTISE TECHNIQUE (TECH/PORTFOLIO) */}
      <section className="py-32 px-6 md:px-12 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h3 className="text-3xl md:text-4xl font-display font-bold text-center leading-tight mb-20">
            L'innovation par la <br className="hidden md:block" />
            <span className="text-primary font-medium italic underline underline-offset-10">rigueur technique.</span>
          </h3>

          <div className="grid w-full max-w-7xl grid-cols-1 gap-8 md:grid-cols-2">
            {portfolioProjects.slice(0, 4).map((p, idx) => (
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

          <Link href="/portfolio" className="mt-16 flex items-center gap-4 text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">
            Explorer tout le portfolio <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* 4. SECTION BLOG (ARTICLES RECENT) */}
      <section className="py-32 px-6 md:px-12 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-8">
            <h3 className="text-3xl md:text-4xl font-display font-bold">Réflexions <br /> <span className="text-foreground/60 italic font-normal">et Partages.</span></h3>
            <Link href="/blog" className="text-xs font-bold uppercase tracking-widest border-b-2 border-primary/20 pb-2 hover:border-primary transition-all">Consulter le blog</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {articles.slice(0, 3).map((art, idx) => (
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
                likesCount={art.likes_count}
                viewsCount={art.views_count}
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
