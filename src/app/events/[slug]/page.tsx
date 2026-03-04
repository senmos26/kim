"use client";
import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Calendar, MapPin, Share2, MessageSquare, Clock, Users, BookOpen } from "lucide-react";
import Link from "next/link";
import { ShareButton } from "@/components/ui/ShareButton";
import { upcomingEvents } from "@/lib/data";
import { SpeakerCard } from "@/components/ui/SpeakerCard";
import { RegistrationModal } from "@/components/ui/RegistrationModal";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = React.use(params);
    const event = upcomingEvents.find(ev => ev.id === slug);
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!event) {
        return (
            <main className="flex flex-col min-h-screen bg-background">
                <Navbar />
                <section className="pt-48 pb-32 px-6 flex flex-col items-center">
                    <h1 className="text-4xl font-display font-bold italic mb-8">Événement non trouvé.</h1>
                    <Link href="/events" className="text-primary underline font-bold uppercase tracking-widest text-[10px]">
                        Retour à l'agenda
                    </Link>
                </section>
                <Footer />
            </main>
        );
    }

    return (
        <main className="flex flex-col min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-12 px-6 md:px-12 bg-background">
                <div className="max-w-7xl mx-auto">
                    <Link href="/events" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-primary hover:-translate-x-2 transition-transform mb-12 group">
                        <ArrowLeft size={16} /> Retour à l'agenda
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                        <div className="lg:col-span-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex justify-between items-center mb-10"
                            >
                                <div className="flex gap-4">
                                    {event.tags.map(tag => (
                                        <span key={tag} className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary/60 bg-primary/5 px-3 py-1 border border-primary/10">{tag}</span>
                                    ))}
                                </div>
                                <ShareButton title={event.title} url={`/events/${slug}`} />
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-8 italic tracking-tighter"
                            >
                                {event.title}
                            </motion.h1>

                            {/* Event Hero Image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="relative aspect-video w-full overflow-hidden mb-12 border border-border"
                            >
                                <Image
                                    src={event.image || "/assets/images/placeholder.jpg"}
                                    alt={event.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="grid grid-cols-1 sm:grid-cols-3 gap-12 py-12 border-y border-border"
                            >
                                <div className="space-y-3">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2"><Calendar size={14} className="text-primary" /> Date</span>
                                    <p className="font-display font-bold text-2xl tracking-tight">
                                        {event.date}{event.endDate && <span className="opacity-40">-{event.endDate}</span>} {event.month}
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2"><MapPin size={14} className="text-primary" /> Lieu</span>
                                    <p className="font-display font-bold text-2xl tracking-tight">{event.location}</p>
                                </div>
                                <div className="space-y-3">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2"><Clock size={14} className="text-primary" /> Durée</span>
                                    <p className="font-display font-bold text-2xl tracking-tight">{event.duration}</p>
                                </div>
                            </motion.div>
                        </div>

                        <div className="lg:col-span-4 lg:pt-24">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="bg-secondary p-12 space-y-10 border border-border shadow-2xl shadow-black/5 sticky top-32"
                            >
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-display font-bold">Réservez votre place</h3>
                                    <div className="text-primary font-bold text-lg uppercase tracking-widest">{event.price}</div>
                                </div>

                                <p className="text-base text-muted-foreground leading-relaxed italic border-l-2 border-primary/20 pl-6">
                                    "Rejoignez {event.speakers[0].name} pour une session exclusive d'échange sur {event.desc}"
                                </p>

                                <div className="space-y-6">
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        disabled={event.currentInscriptions >= event.maxInscriptions}
                                        className={cn(
                                            "w-full py-6 rounded-sm text-xs font-bold uppercase tracking-[0.3em] shadow-xl transition-all active:scale-95",
                                            event.currentInscriptions >= event.maxInscriptions
                                                ? "bg-muted text-muted-foreground cursor-not-allowed shadow-none"
                                                : "bg-primary text-white shadow-primary/20 hover:bg-primary/90"
                                        )}
                                    >
                                        {event.currentInscriptions >= event.maxInscriptions ? "Complet" : "Recevoir mon invitation"}
                                    </button>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest">
                                            <span className="text-muted-foreground/60">Disponibilité</span>
                                            <span className="text-primary">{Math.round((event.currentInscriptions / event.maxInscriptions) * 100)}% Occupé</span>
                                        </div>
                                        <div className="h-[2px] w-full bg-border overflow-hidden">
                                            <div
                                                className="h-full bg-primary transition-all duration-1000"
                                                style={{ width: `${(event.currentInscriptions / event.maxInscriptions) * 100}%` }}
                                            />
                                        </div>
                                        <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">
                                            {event.maxInscriptions - event.currentInscriptions} PLACES RESTANTES SUR {event.maxInscriptions}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Intervenants Section */}
            <section className="py-20 px-6 md:px-12 bg-[#faf9f6] border-y border-border">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-12">
                        <div className="max-w-2xl">
                            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-4 mb-6">
                                <Users size={16} /> Les Intervenants
                            </span>
                            <h2 className="text-5xl md:text-6xl font-display font-bold italic tracking-tighter">Experts & Visionnaires.</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {event.speakers.map((speaker, idx) => (
                            <SpeakerCard
                                key={speaker.name}
                                {...speaker}
                                index={idx}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Agenda Section */}
            <section className="py-20 px-6 md:px-12 bg-background">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-5">
                        <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-4 mb-6">
                            <BookOpen size={16} /> Programme
                        </span>
                        <h2 className="text-5xl md:text-6xl font-display font-bold italic tracking-tighter mb-10">L'Agenda de la session.</h2>
                        <p className="text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-10">
                            Une immersion structurée pour maximiser l'apprentissage et l'interaction.
                        </p>
                    </div>

                    <div className="lg:col-span-7 space-y-12">
                        {event.agenda.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex gap-10 group"
                            >
                                <div className="flex flex-col items-center">
                                    <div className="text-primary font-display font-bold text-xl">{item.time}</div>
                                    <div className="w-px h-full bg-border group-last:bg-transparent mt-4" />
                                </div>
                                <div className="pb-12 border-b border-border/50 w-full">
                                    <h4 className="text-xl font-display font-bold italic mb-4 group-hover:text-primary transition-colors">{item.title}</h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <RegistrationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                eventTitle={event.title}
                eventDate={`${event.date} ${event.month}`}
                price={event.price}
            />

            <Footer />
        </main>
    );
}
