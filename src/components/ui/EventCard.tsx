"use client";
import React from "react";
import { ArrowRight, MapPin, Calendar, Clock, Radio } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShareButton } from "@/components/ui/ShareButton";
import { cn } from "@/lib/utils";
import Image from "next/image";

function stripHtml(html: string) {
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

interface EventCardProps {
    href: string;
    title: string;
    subtitle: string;
    desc: string;
    category: string;
    date: string;
    endDate?: string;
    month: string;
    location: string;
    status: "open" | "limited" | "sold_out" | "closed";
    eventType: "virtual" | "in_person" | "hybrid";
    startTime: string;
    endTime: string;
    timezone: string;
    venueName?: string;
    platform?: string;
    ctaLabel?: string;
    featured?: boolean;
    price?: string;
    maxInscriptions?: number;
    currentInscriptions?: number;
    image?: string;
    speakers: Array<{ name: string, image: string }>;
    index: number;
}

export const EventCard = ({
    href,
    title,
    subtitle,
    desc,
    category,
    date,
    endDate,
    month,
    location,
    status,
    eventType,
    startTime,
    endTime,
    timezone,
    venueName,
    platform,
    ctaLabel,
    featured,
    price,
    maxInscriptions = 100,
    currentInscriptions = 0,
    image,
    speakers,
    index
}: EventCardProps) => {
    const isFull = status === "sold_out" || currentInscriptions >= maxInscriptions;
    const occupancyRate = Math.min((currentInscriptions / maxInscriptions) * 100, 100);
    const statusLabel = status === "limited" ? "Places limitées" : status === "sold_out" ? "Complet" : status === "closed" ? "Clôturé" : "Ouvert";
    const typeLabel = eventType === "virtual" ? "En ligne" : eventType === "hybrid" ? "Hybride" : "Présentiel";
    const locationLabel = eventType === "virtual" ? platform || location : venueName || location;
    const previewDesc = stripHtml(desc);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex h-full min-h-[320px] flex-col overflow-hidden border border-border bg-background transition-all hover:z-30 lg:min-h-[300px] lg:flex-row lg:hover:shadow-2xl lg:hover:shadow-primary/5"
        >
            {/* Visual Area - 2/5 Split */}
            <div className="relative aspect-5/4 overflow-hidden bg-secondary lg:w-[38%] lg:shrink-0 lg:aspect-auto xl:w-[36%]">
                {image ? (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
                        <Calendar size={48} className="text-primary/10" />
                    </div>
                )}

                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700" />

                {/* Date Badge */}
                <div className="absolute top-6 left-6 z-20 flex flex-col transition-transform duration-700 group-hover:translate-y-[-4px]">
                    <div className="flex items-baseline gap-1 bg-primary px-4 pb-2 pt-3 text-white shadow-xl">
                        <span className="text-2xl font-display font-bold leading-none">{date}</span>
                        {endDate && <span className="text-sm font-semibold opacity-70">-{endDate}</span>}
                    </div>
                    <div className="border-x border-b border-border bg-background/90 px-4 py-2.5 text-[11px] font-semibold text-foreground shadow-lg backdrop-blur-md">
                        {month}
                    </div>
                </div>

                {featured && (
                    <div className="absolute left-6 bottom-20 z-20">
                        <span className="border border-primary bg-primary px-3 py-2 text-[10px] font-semibold text-white shadow-lg">
                            À la une
                        </span>
                    </div>
                )}

                {/* Price Tag Overlay */}
                {price && (
                    <div className="absolute bottom-6 left-6 z-20">
                        <span className="border border-border bg-background/90 px-3 py-2 text-[10px] font-semibold text-foreground shadow-lg backdrop-blur-md">
                            Prix : {price}
                        </span>
                    </div>
                )}

                {/* Share Button */}
                <div className="absolute top-6 right-6 z-30 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500">
                    <ShareButton
                        title={title}
                        url={href}
                        variant="ghost"
                        className="bg-white/90 backdrop-blur-sm lg:bg-transparent hover:bg-primary/5"
                    />
                </div>
            </div>

            {/* Content Area - 3/5 Split */}
            <div className="relative flex flex-col justify-between p-6 lg:w-[62%] lg:p-7 xl:w-[64%] xl:p-8">
                <div className="space-y-5">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-wrap gap-2">
                            <span className="inline-block border border-primary/20 bg-primary/5 px-3 py-2 text-[10px] font-semibold text-primary">
                                {category}
                            </span>
                            <span className="inline-block border border-border px-3 py-2 text-[10px] font-semibold text-foreground/65">
                                {typeLabel}
                            </span>
                            <span className={cn(
                                "inline-block border px-3 py-2 text-[10px] font-semibold",
                                isFull ? "text-red-500 border-red-200 bg-red-50" : status === "limited" ? "text-primary border-primary/20 bg-primary/5" : "text-foreground/60 border-border"
                            )}>
                                {statusLabel}
                            </span>
                        </div>

                        <div className="flex -space-x-3 group/speakers">
                            {speakers.slice(0, 3).map((speaker, i) => (
                                <div
                                    key={i}
                                    className="relative group/avatar hover:z-20"
                                >
                                    <div className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-background">
                                        <Image src={speaker.image} alt={speaker.name} fill className="object-cover" />
                                    </div>

                                    <div className="absolute bottom-full left-1/2 z-100 mb-2 -translate-x-1/2 whitespace-nowrap bg-primary px-2.5 py-1.5 text-[10px] font-semibold text-white opacity-0 shadow-xl transition-opacity pointer-events-none group-hover/avatar:opacity-100">
                                        {speaker.name}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-primary" />
                                    </div>
                                </div>
                            ))}
                            {speakers.length > 3 && (
                                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-secondary text-[11px] font-semibold">
                                    +{speakers.length - 3}
                                </div>
                            )}
                        </div>
                    </div>

                    <h3 className="text-[1.75rem] md:text-[1.95rem] font-display font-bold italic leading-[1.04] tracking-tight transition-colors group-hover:text-primary">
                        {title}
                    </h3>

                    <p className="text-sm leading-7 text-foreground/78 line-clamp-2 xl:text-[15px]">
                        {subtitle}
                    </p>

                    <p className="border-l-2 border-primary/15 pl-4 text-sm italic leading-6 text-foreground/64 line-clamp-2 xl:text-[15px]">
                        "{previewDesc}"
                    </p>

                    <div className="flex flex-col gap-3.5">
                        <div className="flex items-center gap-3 text-foreground/74">
                            <Clock size={15} className="text-primary" />
                            <span className="text-[11px] font-semibold">{startTime} - {endTime} • {timezone}</span>
                        </div>

                        <div className="flex items-center gap-3 text-foreground/74">
                            <MapPin size={15} className="text-primary" />
                            <span className="text-[11px] font-semibold">{locationLabel}</span>
                        </div>

                        <div className="flex items-center gap-3 text-foreground/74">
                            <Radio size={15} className="text-primary" />
                            <span className="text-[11px] font-semibold">{eventType === "virtual" ? "Accès distanciel" : "Présence sur site"}</span>
                        </div>

                        {/* Availability Bar */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-[10px] font-semibold">
                                <span className={isFull ? "text-red-500" : status === "limited" ? "text-primary" : "text-primary/60"}>
                                    {isFull ? "Complet" : status === "limited" ? "Places limitées" : "Inscriptions ouvertes"}
                                </span>
                                <span className="text-foreground/60">{currentInscriptions} / {maxInscriptions} places</span>
                            </div>
                            <div className="h-[3px] w-full overflow-hidden bg-border">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${occupancyRate}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className={cn("h-full", isFull ? "bg-red-500" : "bg-primary")}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-7 flex items-center justify-between border-t border-border/50 pt-5">
                    <Link
                        href={href}
                        className="inline-flex w-fit items-center gap-2.5 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 z-20 group/link"
                    >
                        {ctaLabel || "Voir les détails"}
                        <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-0.5" />
                    </Link>

                    <div className="text-xs font-medium text-foreground/35">
                        Réserver
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
