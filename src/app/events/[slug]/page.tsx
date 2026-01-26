"use client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Calendar, MapPin, Share2, MessageSquare, Clock } from "lucide-react";
import Link from "next/link";
import { ShareButton } from "@/components/ui/ShareButton";

import React from "react";

export default function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = React.use(params);
    return (
        <main className="flex flex-col min-h-screen bg-background">
            <Navbar />

            <section className="pt-48 pb-20 px-6 md:px-12 bg-background">
                <div className="max-w-7xl mx-auto">
                    <Link href="/events" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-primary hover:-translate-x-2 transition-transform mb-20">
                        <ArrowLeft size={16} /> Retour à l'agenda
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                        <div className="lg:col-span-8">
                            <div className="flex justify-between items-center mb-10">
                                <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-primary underline underline-offset-[12px] decoration-primary/30">Détails de l'événement</span>
                                <ShareButton title="L'Avenir de l'Électronique au Maroc" url={`/events/${slug}`} />
                            </div>

                            <h1 className="text-5xl md:text-[6rem] font-display font-bold leading-[0.95] mb-12 italic tracking-tighter">L'Avenir de l'Électronique au Maroc : Défis & Vision 2026.</h1>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 py-12 border-y border-border">
                                <div className="space-y-3">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2"><Calendar size={14} className="text-primary" /> Date</span>
                                    <p className="font-display font-bold text-2xl tracking-tight">12 Février 2026</p>
                                </div>
                                <div className="space-y-3">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2"><MapPin size={14} className="text-primary" /> Lieu</span>
                                    <p className="font-display font-bold text-2xl tracking-tight">Zoom / En Ligne</p>
                                </div>
                                <div className="space-y-3">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2"><Clock size={14} className="text-primary" /> Durée</span>
                                    <p className="font-display font-bold text-2xl tracking-tight">2 Heures</p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-4 lg:pt-24">
                            <div className="bg-secondary p-12 space-y-10 border border-border shadow-2xl shadow-black/5">
                                <h3 className="text-2xl font-display font-bold">Réservez votre place</h3>
                                <p className="text-base text-muted-foreground leading-relaxed italic border-l-2 border-primary/20 pl-6">
                                    "Rejoignez Mohamed Asikim pour une session exclusive d'échange sur le futur industriel."
                                </p>
                                <button className="w-full bg-primary text-white py-6 rounded-sm text-xs font-bold uppercase tracking-[0.3em] shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all">Recevoir le lien</button>
                                <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">Places limitées à 100 participants</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-32 px-6 md:px-12 bg-background border-t border-border mt-12">
                <div className="max-w-4xl mx-auto prose prose-stone lg:prose-xl font-sans text-muted-foreground leading-[1.8] space-y-10">
                    <h2 className="font-display font-bold italic text-4xl mb-12 text-foreground">À propos de cette conférence</h2>
                    <p>
                        Le secteur de l'électronique au Maroc connaît une mutation sans précédent. Porté par une vision stratégique nationale et une montée en compétence des talents locaux, le pays s'affirme comme un hub technologique incontournable pour la région.
                    </p>
                    <p className="bg-secondary/30 p-10 italic border-l-4 border-primary">
                        "Nous ne construisons pas seulement des composants, nous construisons l'architecture de notre souveraineté technologique." — Mohamed Asikim TCHAHAYE
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    );
}
