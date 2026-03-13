"use client";
import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Calendar, MapPin, Clock, Users, BookOpen, ExternalLink } from "lucide-react";
import Link from "next/link";
import { ShareButton } from "@/components/ui/ShareButton";
import { upcomingEvents } from "@/data/events";
import { SpeakerCard } from "@/components/ui/SpeakerCard";
import { RegistrationModal } from "@/components/ui/RegistrationModal";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

function getStatusLabel(status: "open" | "limited" | "sold_out" | "closed") {
    switch (status) {
        case "limited":
            return "Places limitées";
        case "sold_out":
            return "Complet";
        case "closed":
            return "Clôturé";
        default:
            return "Inscriptions ouvertes";
    }
}

function getEventTypeLabel(eventType: "virtual" | "in_person" | "hybrid") {
    switch (eventType) {
        case "virtual":
            return "En ligne";
        case "hybrid":
            return "Hybride";
        default:
            return "Présentiel";
    }
}

function stripHtml(html: string) {
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export default function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = React.use(params);
    const event = upcomingEvents.find(ev => ev.id === slug);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [speakerPage, setSpeakerPage] = useState(1);
    const [agendaPage, setAgendaPage] = useState(1);
    const [faqPage, setFaqPage] = useState(1);
    const [takeawaysExpanded, setTakeawaysExpanded] = useState(false);
    const [audienceExpanded, setAudienceExpanded] = useState(false);
    const [openFaq, setOpenFaq] = useState<string | null>(null);

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

    const occupancyRate = Math.min((event.currentInscriptions / event.maxInscriptions) * 100, 100);
    const isFull = event.status === "sold_out" || event.currentInscriptions >= event.maxInscriptions;
    const formattedDeadline = event.registrationDeadline
        ? new Date(event.registrationDeadline).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        })
        : null;
    const speakerPageSize = 6;
    const agendaPageSize = 5;
    const faqPageSize = 5;
    const speakerPages = Math.max(1, Math.ceil(event.speakers.length / speakerPageSize));
    const agendaPages = Math.max(1, Math.ceil(event.agenda.length / agendaPageSize));
    const faqPages = Math.max(1, Math.ceil(event.faq.length / faqPageSize));
    const visibleSpeakers = event.speakers.slice((speakerPage - 1) * speakerPageSize, speakerPage * speakerPageSize);
    const visibleAgenda = event.agenda.slice((agendaPage - 1) * agendaPageSize, agendaPage * agendaPageSize);
    const visibleFaq = event.faq.slice((faqPage - 1) * faqPageSize, faqPage * faqPageSize);
    const visibleTakeaways = takeawaysExpanded ? event.keyTakeaways : event.keyTakeaways.slice(0, 6);
    const visibleAudience = audienceExpanded ? event.targetAudience : event.targetAudience.slice(0, 10);

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
                                className="flex flex-wrap justify-between items-center gap-6 mb-10"
                            >
                                <div className="flex items-center gap-3 overflow-x-auto max-w-full pb-1">
                                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white bg-primary px-3 py-1 border border-primary">{getStatusLabel(event.status)}</span>
                                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-foreground/70 bg-background px-3 py-1 border border-border">{getEventTypeLabel(event.eventType)}</span>
                                    {event.tags.map(tag => (
                                        <span key={tag} className="shrink-0 text-[9px] font-bold uppercase tracking-[0.3em] text-primary/60 bg-primary/5 px-3 py-1 border border-primary/10">{tag}</span>
                                    ))}
                                </div>
                                <ShareButton title={event.title} url={`/events/${slug}`} />
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-2xl md:text-4xl lg:text-5xl font-display font-bold leading-tight mb-8 italic tracking-tighter"
                            >
                                {event.title}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.12 }}
                                className="text-lg md:text-2xl text-foreground/75 leading-relaxed max-w-4xl mb-10"
                            >
                                {event.subtitle}
                            </motion.p>

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
                                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 py-12 border-y border-border"
                            >
                                <div className="space-y-3">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2"><Calendar size={14} className="text-primary" /> Date</span>
                                    <p className="font-display font-bold text-2xl tracking-tight">
                                        {event.date}{event.endDate && <span className="opacity-40">-{event.endDate}</span>} {event.month}
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2"><Clock size={14} className="text-primary" /> Horaire</span>
                                    <p className="font-display font-bold text-2xl tracking-tight">{event.startTime} - {event.endTime}</p>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/45">{event.timezone}</p>
                                </div>
                                <div className="space-y-3">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2"><MapPin size={14} className="text-primary" /> Lieu</span>
                                    <p className="font-display font-bold text-2xl tracking-tight">{event.location}</p>
                                    {event.venueName && <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/45">{event.venueName}</p>}
                                </div>
                                <div className="space-y-3">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2"><Users size={14} className="text-primary" /> Format</span>
                                    <p className="font-display font-bold text-2xl tracking-tight">{event.duration}</p>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/45">{event.language}{event.platform ? ` • ${event.platform}` : ""}</p>
                                </div>
                            </motion.div>

                            <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 py-14 border-b border-border">
                                <div className="space-y-8">
                                    <div>
                                        <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-primary">Pourquoi participer</span>
                                        <h2 className="text-3xl md:text-4xl font-display font-bold italic tracking-tighter mt-4 mb-5">Ce que vous allez réellement en retirer.</h2>
                                        <div className="max-w-2xl space-y-4 text-foreground/70 leading-relaxed [&_p]:mb-4 [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:pl-5" dangerouslySetInnerHTML={{ __html: event.desc }} />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {visibleTakeaways.map((item) => (
                                            <div key={item} className="border border-border bg-background p-5 space-y-3">
                                                <span className="block h-1 w-10 bg-primary" />
                                                <p className="text-sm leading-relaxed text-foreground/75">{item}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {event.keyTakeaways.length > 6 && (
                                        <button
                                            type="button"
                                            onClick={() => setTakeawaysExpanded((prev) => !prev)}
                                            className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary hover:underline"
                                        >
                                            {takeawaysExpanded ? "Réduire la liste" : `Afficher ${event.keyTakeaways.length - 6} points supplémentaires`}
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-8">
                                    <div className="border border-border bg-white p-8">
                                        <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-primary">Public concerné</span>
                                        <div className="flex flex-wrap gap-3 mt-6">
                                            {visibleAudience.map((item) => (
                                                <span key={item} className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.25em] border border-border bg-background text-foreground/70">{item}</span>
                                            ))}
                                        </div>

                                        {event.targetAudience.length > 10 && (
                                            <button
                                                type="button"
                                                onClick={() => setAudienceExpanded((prev) => !prev)}
                                                className="mt-6 text-[10px] font-bold uppercase tracking-[0.28em] text-primary hover:underline"
                                            >
                                                {audienceExpanded ? "Réduire" : `Afficher ${event.targetAudience.length - 10} profils supplémentaires`}
                                            </button>
                                        )}
                                    </div>

                                    <div className="border border-border p-8 space-y-4">
                                        <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-primary">Accès & logistique</span>
                                        <div className="text-sm text-foreground/75 leading-relaxed [&_p]:mb-4 [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:pl-5" dangerouslySetInnerHTML={{ __html: event.accessInstructions }} />
                                        {event.venueAddress && (
                                            <p className="text-sm text-foreground/65 leading-relaxed">{event.venueAddress}</p>
                                        )}
                                        <div className="flex flex-wrap gap-4 pt-2">
                                            {event.mapUrl && (
                                                <a href={event.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-primary hover:underline">
                                                    Voir le plan <ExternalLink size={12} />
                                                </a>
                                            )}
                                            {event.joinUrl && event.accessMode === "direct" && (
                                                <a href={event.joinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-primary hover:underline">
                                                    Rejoindre la session <ExternalLink size={12} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="lg:col-span-4 lg:pt-24">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white p-10 space-y-8 border border-border shadow-2xl shadow-black/5 sticky top-32"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between gap-4">
                                        <h3 className="text-2xl font-display font-bold">Réservez votre place</h3>
                                        <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-primary border border-primary/20 bg-primary/5 px-3 py-1">{getStatusLabel(event.status)}</span>
                                    </div>
                                    <div className="text-primary font-bold text-lg uppercase tracking-widest">{event.price}</div>
                                </div>

                                <div className="space-y-4 border-y border-border py-6">
                                    <div className="flex items-start justify-between gap-4 text-sm">
                                        <span className="text-foreground/45 uppercase tracking-[0.24em] font-bold text-[9px]">Date</span>
                                        <span className="text-right font-medium">{event.date} {event.month} • {event.startTime} - {event.endTime}</span>
                                    </div>
                                    <div className="flex items-start justify-between gap-4 text-sm">
                                        <span className="text-foreground/45 uppercase tracking-[0.24em] font-bold text-[9px]">Accès</span>
                                        <span className="text-right font-medium">{event.eventType === "virtual" ? `${event.platform || "En ligne"} • ${event.accessMode === "direct" ? "accès direct" : "sur invitation"}` : event.venueName || event.location}</span>
                                    </div>
                                    <div className="flex items-start justify-between gap-4 text-sm">
                                        <span className="text-foreground/45 uppercase tracking-[0.24em] font-bold text-[9px]">Langue</span>
                                        <span className="text-right font-medium">{event.language}</span>
                                    </div>
                                    {formattedDeadline && (
                                        <div className="flex items-start justify-between gap-4 text-sm">
                                            <span className="text-foreground/45 uppercase tracking-[0.24em] font-bold text-[9px]">Clôture</span>
                                            <span className="text-right font-medium">{formattedDeadline}</span>
                                        </div>
                                    )}
                                </div>

                                <p className="text-sm text-muted-foreground leading-relaxed italic border-l-2 border-primary/20 pl-6">
                                    "Rejoignez {event.speakers[0].name} pour une session exclusive autour de {stripHtml(event.subtitle).toLowerCase()}"
                                </p>

                                <div className="space-y-6">
                                    {event.accessMode === "direct" && event.joinUrl && !isFull ? (
                                        <a
                                            href={event.joinUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full inline-flex items-center justify-center gap-3 py-6 rounded-sm text-xs font-bold uppercase tracking-[0.3em] shadow-xl bg-primary text-white shadow-primary/20 hover:bg-primary/90 transition-all"
                                        >
                                            {event.ctaLabel} <ExternalLink size={14} />
                                        </a>
                                    ) : (
                                        <button
                                            onClick={() => setIsModalOpen(true)}
                                            disabled={isFull}
                                            className={cn(
                                                "w-full py-6 rounded-sm text-xs font-bold uppercase tracking-[0.3em] shadow-xl transition-all active:scale-95",
                                                isFull
                                                    ? "bg-muted text-muted-foreground cursor-not-allowed shadow-none"
                                                    : "bg-primary text-white shadow-primary/20 hover:bg-primary/90"
                                            )}
                                        >
                                            {isFull ? "Complet" : event.ctaLabel}
                                        </button>
                                    )}

                                    <p className="text-[10px] text-center text-foreground/55 uppercase tracking-[0.22em] leading-relaxed">
                                        {event.accessMode === "after_registration" ? "Validation requise avant envoi des informations d'accès" : "Accès immédiat disponible après clic"}
                                    </p>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest">
                                            <span className="text-muted-foreground/60">Disponibilité</span>
                                            <span className="text-primary">{Math.round(occupancyRate)}% Occupé</span>
                                        </div>
                                        <div className="h-[2px] w-full bg-border overflow-hidden">
                                            <div
                                                className="h-full bg-primary transition-all duration-1000"
                                                style={{ width: `${occupancyRate}%` }}
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
            <section className="py-20 px-6 md:px-12 bg-white border-y border-border">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-12">
                        <div className="max-w-2xl">
                            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-4 mb-6">
                                <Users size={16} /> Les Intervenants
                            </span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold italic tracking-tighter">Experts & Visionnaires.</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {visibleSpeakers.map((speaker, idx) => (
                            <SpeakerCard
                                key={speaker.name}
                                {...speaker}
                                index={idx + (speakerPage - 1) * speakerPageSize}
                            />
                        ))}
                    </div>

                    {speakerPages > 1 && (
                        <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
                            <button type="button" onClick={() => setSpeakerPage((prev) => Math.max(1, prev - 1))} disabled={speakerPage === 1} className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] border border-border disabled:opacity-40">
                                Précédent
                            </button>
                            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-foreground/55">Page {speakerPage} / {speakerPages}</span>
                            <button type="button" onClick={() => setSpeakerPage((prev) => Math.min(speakerPages, prev + 1))} disabled={speakerPage === speakerPages} className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] border border-border disabled:opacity-40">
                                Suivant
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Agenda Section */}
            <section className="py-20 px-6 md:px-12 bg-background">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-5">
                        <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-4 mb-6">
                            <BookOpen size={16} /> Programme
                        </span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold italic tracking-tighter mb-10">L'Agenda de la session.</h2>
                        <p className="text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-10">
                            Une immersion structurée pour maximiser l'apprentissage et l'interaction.
                        </p>
                    </div>

                    <div className="lg:col-span-7 space-y-12">
                        {visibleAgenda.map((item, idx) => (
                            <motion.div
                                key={`${item.time}-${item.title}-${idx}`}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex gap-10 group"
                            >
                                <div className="flex flex-col items-center">
                                    <div className="text-primary font-display font-bold text-xl whitespace-nowrap">{item.time}{item.endTime ? ` - ${item.endTime}` : ""}</div>
                                    <div className="w-px h-full bg-border group-last:bg-transparent mt-4" />
                                </div>
                                <div className="pb-12 border-b border-border/50 w-full">
                                    {(item.sessionType || item.speaker) && (
                                        <div className="flex flex-wrap gap-3 mb-4">
                                            {item.sessionType && <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-primary border border-primary/20 bg-primary/5 px-3 py-1">{item.sessionType}</span>}
                                            {item.speaker && <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-foreground/55 border border-border px-3 py-1">{item.speaker}</span>}
                                        </div>
                                    )}
                                    <h4 className="text-xl font-display font-bold italic mb-4 group-hover:text-primary transition-colors">{item.title}</h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}

                        {agendaPages > 1 && (
                            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                                <button type="button" onClick={() => setAgendaPage((prev) => Math.max(1, prev - 1))} disabled={agendaPage === 1} className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] border border-border disabled:opacity-40">
                                    Précédent
                                </button>
                                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-foreground/55">Page {agendaPage} / {agendaPages}</span>
                                <button type="button" onClick={() => setAgendaPage((prev) => Math.min(agendaPages, prev + 1))} disabled={agendaPage === agendaPages} className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] border border-border disabled:opacity-40">
                                    Suivant
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 md:px-12 bg-white border-t border-border">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-4">
                        <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-primary flex items-center gap-4 mb-6">
                            <Users size={16} /> Questions fréquentes
                        </span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold italic tracking-tighter mb-6">Tout ce qu'il faut savoir avant de vous inscrire.</h2>
                        <p className="text-foreground/70 leading-relaxed">Les réponses essentielles pour lever les derniers freins avant la participation.</p>
                    </div>

                    <div className="lg:col-span-8 space-y-4">
                        {visibleFaq.map((item) => {
                            const isOpen = openFaq === item.question;

                            return (
                                <div key={item.question} className="border border-border bg-background">
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaq(isOpen ? null : item.question)}
                                        className="w-full text-left p-6 md:p-8"
                                    >
                                        <div className="flex items-center justify-between gap-6">
                                            <h3 className="text-lg font-display font-bold">{item.question}</h3>
                                            <span className="text-primary text-xl leading-none">{isOpen ? "−" : "+"}</span>
                                        </div>
                                    </button>

                                    {isOpen && (
                                        <div className="px-6 md:px-8 pb-8 text-sm leading-relaxed text-foreground/70 [&_p]:mb-4 [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:pl-5" dangerouslySetInnerHTML={{ __html: item.answer }} />
                                    )}
                                </div>
                            );
                        })}

                        {faqPages > 1 && (
                            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                                <button type="button" onClick={() => { setFaqPage((prev) => Math.max(1, prev - 1)); setOpenFaq(null); }} disabled={faqPage === 1} className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] border border-border disabled:opacity-40">
                                    Précédent
                                </button>
                                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-foreground/55">Page {faqPage} / {faqPages}</span>
                                <button type="button" onClick={() => { setFaqPage((prev) => Math.min(faqPages, prev + 1)); setOpenFaq(null); }} disabled={faqPage === faqPages} className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] border border-border disabled:opacity-40">
                                    Suivant
                                </button>
                            </div>
                        )}
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
