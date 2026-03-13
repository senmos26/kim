"use client";
import React from "react";
import { ArrowUpRight, Clock3, Building2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShareButton } from "@/components/ui/ShareButton";
import { cn } from "@/lib/utils";

function stripHtml(html: string) {
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

interface ProjectCardProps {
    href: string;
    title: string;
    subtitle?: string;
    desc: string;
    category: string;
    sector?: string;
    clientName?: string;
    status?: "featured" | "published" | "archived" | "confidential";
    featured?: boolean;
    year?: string;
    duration?: string;
    engagementType?: string;
    metricHighlight?: string;
    tech: string[];
    tags?: string[];
    image?: string;
    icon?: React.ReactNode;
    index: number;
}

export const ProjectCard = ({
    href,
    title,
    subtitle,
    desc,
    category,
    sector,
    clientName,
    year,
    duration,
    engagementType,
    metricHighlight,
    tech,
    tags = [],
    image,
    icon,
    index
}: ProjectCardProps) => {
    const previewDesc = stripHtml(desc);
    const visibleTech = tech.slice(0, 2);
    const overflowTechCount = tech.length - visibleTech.length;
    const visibleTags = tags.slice(0, 1);
    const hasMetaInfo = Boolean(sector || clientName);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                delay: index * 0.1,
                duration: 0.8,
                ease: [0.21, 0.45, 0.32, 0.9]
            }}
            className="group relative flex h-full min-h-[280px] flex-col overflow-hidden border border-border bg-background transition-all duration-700 hover:border-primary/20 hover:shadow-[0_16px_36px_rgba(0,0,0,0.05)] xl:min-h-[270px] lg:flex-row"
        >
            <div className={cn(
                "relative flex aspect-video items-center justify-center border-b border-border bg-secondary/20 lg:min-h-full lg:w-[31%] lg:shrink-0 lg:aspect-auto lg:border-r lg:border-b-0 xl:w-[30%]",
                image?.match(/^[/\\]|^[a-zA-Z]:|^http/) ? "" : (image || "bg-secondary/20")
            )}>
                <div className="absolute inset-0 overflow-hidden">
                    {image?.match(/^[/\\]|^[a-zA-Z]:|^http/) ? (
                        <img
                            src={image}
                            alt={title}
                            className="absolute inset-0 h-full w-full object-cover opacity-85 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-100"
                        />
                    ) : (
                        <div className="scale-150 text-foreground/5 transition-colors duration-700 group-hover:text-primary/10">
                            {icon}
                        </div>
                    )}

                    <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-white/10 opacity-70 transition-opacity duration-700 group-hover:opacity-40" />
                    <div className="absolute inset-0 bg-primary/3 transition-colors duration-700 group-hover:bg-primary/1" />

                    <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center gap-2">
                        <span className="border border-primary/10 bg-background/90 px-3 py-1 text-[11px] font-medium text-primary/80 backdrop-blur-sm">
                            {category}
                        </span>
                    </div>
                </div>

                <div className="absolute top-4 right-4 z-30 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500">
                    <ShareButton title={title} url={href} variant="ghost" className="bg-white lg:bg-transparent hover:bg-primary/5" />
                </div>
            </div>

            <div className="flex grow flex-col justify-between p-4 md:p-5 xl:p-6 lg:w-[69%] xl:w-[70%]">
                <div className="space-y-3">
                    <div className="flex flex-wrap items-start justify-between gap-2 border-b border-border/80 pb-2.5">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[13px] font-medium text-foreground/62">
                            {year && <span>{year}</span>}
                            {duration && (
                                <span className="inline-flex items-center gap-2">
                                    <Clock3 size={13} className="text-primary" /> {duration}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="max-w-2xl space-y-2">
                        <h3 className="text-[1.35rem] xl:text-[1.5rem] font-display font-bold italic leading-[1.06] tracking-tight transition-colors group-hover:text-primary">
                            {title}
                        </h3>

                        {subtitle && (
                            <p className="text-sm leading-6 text-foreground/80 line-clamp-2">
                                {subtitle}
                            </p>
                        )}

                        <p className="max-w-xl border-l-2 border-primary/15 pl-3 text-[13px] italic leading-5 text-foreground/64 line-clamp-1">
                            "{previewDesc}"
                        </p>
                    </div>

                    {hasMetaInfo && (
                        <div className="grid grid-cols-1 gap-2 border-y border-border/80 py-2.5 text-[13px] text-foreground/74 sm:grid-cols-2">
                            {sector && (
                                <div className="space-y-1">
                                    <p className="text-[11px] font-medium text-foreground/50">Secteur</p>
                                    <p className="leading-relaxed">{sector}</p>
                                </div>
                            )}

                            {clientName && (
                                <div className="space-y-1">
                                    <p className="text-[11px] font-medium text-foreground/50">Client</p>
                                    <p className="inline-flex items-center gap-2 leading-relaxed"><Building2 size={14} className="text-primary" /> {clientName}</p>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="space-y-2">
                        {(engagementType || metricHighlight) && (
                            <div className="flex flex-wrap gap-2">
                                {engagementType && (
                                    <span className="border border-border bg-secondary px-2.5 py-1 text-[11px] font-medium text-foreground/76">
                                        {engagementType}
                                    </span>
                                )}
                                {metricHighlight && (
                                    <span className="border border-primary/15 bg-primary/5 px-2.5 py-1 text-[11px] font-medium text-primary">
                                        {metricHighlight}
                                    </span>
                                )}
                            </div>
                        )}

                        <div className="flex flex-wrap gap-2">
                            {visibleTech.map((t) => (
                                <span key={t} className="border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-foreground/70 transition-colors group-hover:border-primary/20">
                                    {t}
                                </span>
                            ))}

                            {overflowTechCount > 0 && (
                                <span className="border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-foreground/48">
                                    +{overflowTechCount}
                                </span>
                            )}
                        </div>

                        {visibleTags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {visibleTags.map((tag) => (
                                    <span key={tag} className="border border-primary/10 bg-primary/5 px-2.5 py-1 text-[11px] font-medium text-primary/70">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border/80 pt-3">
                    <Link
                        href={href}
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-3.5 py-2 text-[13px] font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 z-20 group/link"
                    >
                        Voir le projet
                        <ArrowUpRight size={14} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>

                    <div className="text-[11px] font-medium text-foreground/40">
                        Explorer
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
