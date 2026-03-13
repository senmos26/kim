"use client";
import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, ExternalLink, MessageCircle, BookOpen, Tag as TagIcon, User, Calendar, Layers, Ruler, Weight, Building2 } from "lucide-react";
import Link from "next/link";
import { ShareButton } from "@/components/ui/ShareButton";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { socials } from "@/data/socials";
import { booksData } from "@/data/books";

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

export default function BookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = React.use(params);
    const book = booksData[slug] || booksData["souffle-des-idees"];

    const relatedBooks = (book.relatedBooks || [])
        .map((id: string) => booksData[id])
        .filter(Boolean)
        .slice(0, 3);

    const availableFormats = (book.formats || []).filter((f: any) => f.available);
    const lowestPrice = availableFormats.length > 0 ? Math.min(...availableFormats.map((f: any) => f.price)) : null;

    return (
        <main className="flex flex-col min-h-screen bg-background selection:bg-primary selection:text-white">
            <Navbar />

            {/* Hero: Cover + Core Info */}
            <section className="pt-36 pb-10 px-6 md:px-12 bg-background">
                <div className="max-w-6xl mx-auto">
                    <Link href="/books" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-primary hover:-translate-x-2 transition-transform mb-10">
                        <ArrowLeft size={14} /> Retour à la collection
                    </Link>

                    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[340px_1fr] gap-10 lg:gap-14 items-start">
                        {/* Cover — sticky on desktop */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="md:sticky md:top-28 flex flex-col items-center gap-6"
                        >
                            <div className="relative w-full max-w-[300px] aspect-[3/4] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] group">
                                <div className="absolute inset-0 overflow-hidden border border-border">
                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-r from-black/15 to-transparent z-10" />
                                {book.status === "coming_soon" && (
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-white bg-primary px-3 py-1.5">
                                            À paraître
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Purchase CTA — under cover on mobile/desktop */}
                            <div className="w-full max-w-[300px] space-y-3">
                                {book.amazonUrl ? (
                                    <a
                                        href={book.amazonUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-primary text-white py-4 text-[10px] font-bold uppercase tracking-[0.3em] transition-all hover:bg-foreground flex items-center justify-center gap-3"
                                    >
                                        Acheter cet ouvrage <ExternalLink size={14} />
                                    </a>
                                ) : (
                                    <span className="w-full bg-secondary text-foreground/40 py-4 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 cursor-not-allowed">
                                        Bientôt disponible
                                    </span>
                                )}
                                {book.whatsappOrder && (
                                    <a
                                        href={`https://wa.me/${socials.whatsapp.replace(/\s/g, "")}?text=${encodeURIComponent(`Bonjour, je souhaite commander "${book.title}".`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full border border-border py-3 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:border-primary transition-colors"
                                    >
                                        <MessageCircle size={14} /> WhatsApp
                                    </a>
                                )}
                            </div>
                        </motion.div>

                        {/* Right Column — all info */}
                        <div className="flex flex-col min-w-0">
                            {/* Header row */}
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">
                                    {book.subcategory || book.cat}
                                </span>
                                <ShareButton title={book.title} url={`/books/${slug}`} variant="outline" className="shrink-0" />
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-[1] text-foreground mb-2 tracking-tight">
                                {book.title}.
                            </h1>

                            {book.subtitle && (
                                <p className="text-xs font-bold uppercase tracking-[0.15em] text-foreground/50 mb-5">
                                    {book.subtitle}
                                </p>
                            )}

                            <p className="text-sm text-foreground/60 mb-6">
                                par <span className="font-semibold text-foreground">{book.author}</span>
                            </p>

                            {/* Short description */}
                            <div className="relative mb-6 pl-6 border-l-2 border-primary/20">
                                <p className="text-base text-foreground/70 italic leading-relaxed">
                                    &ldquo;{book.desc}&rdquo;
                                </p>
                            </div>

                            {/* Price + Formats row */}
                            <div className="flex flex-wrap items-center gap-6 mb-6 pb-6 border-b border-border">
                                {book.price ? (
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-display font-bold text-foreground">{book.price.toFixed(2)}</span>
                                        <span className="text-sm text-foreground/50">{book.currency || "$"}</span>
                                        {lowestPrice && lowestPrice < book.price && (
                                            <span className="text-[9px] text-foreground/40 ml-2">dès {lowestPrice.toFixed(2)} {book.currency}</span>
                                        )}
                                    </div>
                                ) : book.status === "coming_soon" ? (
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">À venir</span>
                                ) : null}

                                {book.formats && book.formats.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {book.formats.map((f: any, i: number) => (
                                            <span
                                                key={i}
                                                className={cn(
                                                    "px-3 py-1.5 border text-[9px] font-bold uppercase tracking-wider",
                                                    f.available
                                                        ? "border-primary/20 text-foreground bg-primary/5"
                                                        : "border-border text-foreground/30 bg-secondary/10"
                                                )}
                                            >
                                                {f.type} · {f.price.toFixed(2)}
                                                {!f.available && " (bientôt)"}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Compact metadata table */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4 mb-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <Calendar size={13} className="text-primary/60 shrink-0" />
                                    <div>
                                        <span className="text-[9px] text-foreground/40 uppercase tracking-wider block">Publication</span>
                                        <span className="text-foreground font-medium text-xs">{formatDate(book.publicationDate)}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Layers size={13} className="text-primary/60 shrink-0" />
                                    <div>
                                        <span className="text-[9px] text-foreground/40 uppercase tracking-wider block">Pages</span>
                                        <span className="text-foreground font-medium text-xs">{book.pages}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BookOpen size={13} className="text-primary/60 shrink-0" />
                                    <div>
                                        <span className="text-[9px] text-foreground/40 uppercase tracking-wider block">Langue</span>
                                        <span className="text-foreground font-medium text-xs">{book.language}</span>
                                    </div>
                                </div>
                                {book.isbn && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-[9px] text-primary/60 font-bold shrink-0">#</span>
                                        <div>
                                            <span className="text-[9px] text-foreground/40 uppercase tracking-wider block">ISBN</span>
                                            <span className="text-foreground font-mono text-xs">{book.isbn}</span>
                                        </div>
                                    </div>
                                )}
                                {book.dimensions && (
                                    <div className="flex items-center gap-2">
                                        <Ruler size={13} className="text-primary/60 shrink-0" />
                                        <div>
                                            <span className="text-[9px] text-foreground/40 uppercase tracking-wider block">Dimensions</span>
                                            <span className="text-foreground font-medium text-xs">{book.dimensions}</span>
                                        </div>
                                    </div>
                                )}
                                {book.weight && (
                                    <div className="flex items-center gap-2">
                                        <Weight size={13} className="text-primary/60 shrink-0" />
                                        <div>
                                            <span className="text-[9px] text-foreground/40 uppercase tracking-wider block">Poids</span>
                                            <span className="text-foreground font-medium text-xs">{book.weight}</span>
                                        </div>
                                    </div>
                                )}
                                {book.publisher && (
                                    <div className="flex items-center gap-2">
                                        <Building2 size={13} className="text-primary/60 shrink-0" />
                                        <div>
                                            <span className="text-[9px] text-foreground/40 uppercase tracking-wider block">Éditeur</span>
                                            <span className="text-foreground font-medium text-xs">{book.publisher}</span>
                                        </div>
                                    </div>
                                )}
                                {book.targetAudience && (
                                    <div className="flex items-center gap-2">
                                        <User size={13} className="text-primary/60 shrink-0" />
                                        <div>
                                            <span className="text-[9px] text-foreground/40 uppercase tracking-wider block">Public</span>
                                            <span className="text-foreground font-medium text-xs">{book.targetAudience}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Tags — clickable, link to /books?tag=xxx */}
                            {book.tags && book.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-border">
                                    {book.tags.map((tag: string) => (
                                        <Link
                                            key={tag}
                                            href={`/books?tag=${encodeURIComponent(tag)}`}
                                            className="flex items-center gap-1.5 bg-secondary/60 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-foreground/60 hover:text-primary hover:bg-primary/5 transition-colors"
                                        >
                                            <TagIcon size={10} /> {tag}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* Presentation — WYSIWYG HTML content */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-display font-bold italic mb-6">Présentation.</h2>
                                <div
                                    className="prose prose-sm max-w-none text-foreground/70 leading-relaxed [&_p]:mb-4 [&_strong]:text-foreground [&_em]:text-foreground/80 [&_h2]:text-xl [&_h2]:font-display [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-4 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-2 [&_blockquote]:border-primary/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-foreground/60 [&_a]:text-primary [&_a]:underline"
                                    dangerouslySetInnerHTML={{ __html: book.narrative }}
                                />
                            </div>

                            {/* Quote */}
                            <div className="bg-white px-8 py-6 border border-border italic text-base text-foreground relative mb-8">
                                <span className="absolute -top-2 left-4 text-4xl text-primary/20 font-serif leading-none">&ldquo;</span>
                                <p className="pl-4">{book.quote}</p>
                                <span className="absolute -bottom-2 right-4 text-4xl text-primary/20 font-serif leading-none rotate-180">&ldquo;</span>
                            </div>

                            {/* Related Books */}
                            {relatedBooks.length > 0 && (
                                <div className="pt-6 border-t border-border">
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/50 mb-5">
                                        <BookOpen size={12} className="inline mr-2 text-primary" />
                                        Ouvrages connexes
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                        {relatedBooks.map((rel: any) => (
                                            <Link key={rel.id} href={`/books/${rel.id}`} className="group flex gap-4 items-start p-3 hover:bg-white transition-colors -mx-3 rounded">
                                                <div className="relative w-14 shrink-0 aspect-[3/4] overflow-hidden border border-border">
                                                    <img src={rel.image} alt={rel.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                </div>
                                                <div className="flex flex-col gap-1 min-w-0">
                                                    <span className="text-[8px] font-bold uppercase tracking-widest text-primary">{rel.cat}</span>
                                                    <h4 className="text-sm font-display font-bold italic group-hover:text-primary transition-colors leading-tight truncate">
                                                        {rel.title}
                                                    </h4>
                                                    {rel.price && (
                                                        <span className="text-xs font-bold text-foreground">
                                                            {rel.price.toFixed(2)} {rel.currency || "$"}
                                                        </span>
                                                    )}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
