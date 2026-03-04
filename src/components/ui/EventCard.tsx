"use client";
import React from "react";
import { ArrowRight, MapPin, Users, Share2, Calendar } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShareButton } from "@/components/ui/ShareButton";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface EventCardProps {
    id: string;
    href: string;
    title: string;
    desc: string;
    category: string;
    date: string;
    endDate?: string;
    month: string;
    location: string;
    price?: string;
    maxInscriptions?: number;
    currentInscriptions?: number;
    image?: string;
    speakers: Array<{ name: string, image: string }>;
    index: number;
}

export const EventCard = ({
    id,
    href,
    title,
    desc,
    category,
    date,
    endDate,
    month,
    location,
    price,
    maxInscriptions = 100,
    currentInscriptions = 0,
    image,
    speakers,
    index
}: EventCardProps) => {
    const isFull = currentInscriptions >= maxInscriptions;
    const occupancyRate = (currentInscriptions / maxInscriptions) * 100;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex flex-col md:flex-row bg-background border border-border lg:hover:shadow-2xl lg:hover:shadow-primary/5 transition-all h-full hover:z-30 overflow-hidden"
        >
            {/* Visual Area - 2/5 Split */}
            <div className="md:w-2/5 aspect-[4/3] md:aspect-auto relative overflow-hidden bg-secondary">
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
                    <div className="bg-primary text-white text-xl font-display font-bold px-4 pt-3 pb-1 leading-none shadow-xl flex items-baseline gap-1">
                        {date}{endDate && <span className="opacity-60 text-sm">-{endDate}</span>}
                    </div>
                    <div className="bg-background/90 backdrop-blur-md text-foreground text-[9px] font-bold uppercase tracking-[0.3em] px-4 py-2 border-x border-b border-border shadow-lg">
                        {month}
                    </div>
                </div>

                {/* Price Tag Overlay */}
                {price && (
                    <div className="absolute bottom-6 left-6 z-20">
                        <span className="bg-background/90 backdrop-blur-md text-foreground text-[8px] font-bold uppercase tracking-widest px-3 py-1.5 border border-border shadow-lg">
                            PRIX : {price}
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
            <div className="md:w-3/5 p-8 lg:p-10 flex flex-col justify-between relative">
                <div className="space-y-6">
                    <div className="flex justify-between items-start">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-primary border border-primary/20 bg-primary/5 px-3 py-1.5 inline-block">
                            {category}
                        </span>

                        <div className="flex -space-x-3 group/speakers">
                            {speakers.slice(0, 3).map((speaker, i) => (
                                <div
                                    key={i}
                                    className="relative group/avatar hover:z-20"
                                >
                                    <div className="w-8 h-8 rounded-full border-2 border-background overflow-hidden relative">
                                        <Image src={speaker.image} alt={speaker.name} fill className="object-cover" />
                                    </div>

                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-primary text-white text-[8px] font-bold uppercase tracking-widest whitespace-nowrap opacity-0 group-hover/avatar:opacity-100 transition-opacity pointer-events-none z-[100] shadow-xl">
                                        {speaker.name}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-primary" />
                                    </div>
                                </div>
                            ))}
                            {speakers.length > 3 && (
                                <div className="w-8 h-8 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-[10px] font-bold">
                                    +{speakers.length - 3}
                                </div>
                            )}
                        </div>
                    </div>

                    <h3 className="text-xl md:text-2xl font-display font-bold leading-tight group-hover:text-primary transition-colors italic tracking-tighter">
                        {title}
                    </h3>

                    <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 italic">
                        "{desc}"
                    </p>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-muted-foreground/60">
                            <MapPin size={12} className="text-primary" />
                            <span className="text-[9px] font-bold uppercase tracking-widest">{location}</span>
                        </div>

                        {/* Availability Bar */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-[8px] font-bold uppercase tracking-widest">
                                <span className={isFull ? "text-red-500" : "text-primary/60"}>
                                    {isFull ? "COMPLET" : "INSCRIPTIONS OUVERTES"}
                                </span>
                                <span className="text-muted-foreground/40">{currentInscriptions} / {maxInscriptions} PLACES</span>
                            </div>
                            <div className="h-[2px] w-full bg-border overflow-hidden">
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

                <div className="flex items-center justify-between mt-10 pt-6 border-t border-border/50">
                    <Link
                        href={href}
                        className="inline-flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.4em] text-foreground/60 hover:text-primary transition-colors z-20 w-fit group/link"
                    >
                        VOIR L'AGENDA
                    </Link>

                    <div className="text-primary opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                        <ArrowRight size={16} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
