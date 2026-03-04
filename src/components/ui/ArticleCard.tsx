"use client";
import React from "react";
import { ArrowRight, ArrowUpRight, Clock, User, Tag } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShareButton } from "@/components/ui/ShareButton";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
    id: string;
    href: string;
    title: string;
    desc: string;
    category: string;
    date: string;
    author?: string;
    readTime?: string;
    tags?: string[];
    image?: string;
    index: number;
    onTagClick?: (tag: string) => void;
}

export const ArticleCard = ({
    id,
    href,
    title,
    desc,
    category,
    date,
    author = "Mohamed Asikim",
    readTime = "5 min",
    tags = [],
    image,
    index,
    onTagClick
}: ArticleCardProps) => {
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
            className="group relative flex flex-col h-full bg-background p-5 border border-transparent lg:hover:border-border transition-all duration-700 max-w-[380px] mx-auto w-full"
        >
            {/* 1. Category & Date Header */}
            <div className="flex items-center justify-between mb-5">
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-primary">
                    {category}
                </span>
                <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/40">
                    {date}
                </span>
            </div>

            {/* 2. Large Impact Title - The 'Verbe' first */}
            <Link href={href} className="block mb-6">
                <h3 className="text-xl md:text-2xl font-display font-bold leading-[1.2] tracking-tighter italic group-hover:text-primary transition-colors duration-500">
                    {title}.
                </h3>
            </Link>

            {/* 3. Image Section - Inset and Framed */}
            <div className="relative aspect-video mb-8 bg-secondary/10 border border-border group-hover:border-primary/20 transition-colors duration-700">
                {/* Image Wrapper for Clipping (Hover Zoom) */}
                <div className="absolute inset-0 overflow-hidden">
                    {image?.match(/^[/\\]|^[a-zA-Z]:|^http/) ? (
                        <img
                            src={image}
                            alt={title}
                            className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                            <Tag size={48} className="text-primary" />
                        </div>
                    )}

                    {/* Visual Accent */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent mix-blend-overlay" />
                </div>

                {/* Floating Share Button - OUTSIDE overflow-hidden wrapper */}
                <div className="absolute bottom-3 right-3 z-[40] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <ShareButton title={title} url={href} variant="solid" className="scale-[0.65] origin-bottom-right" />
                </div>
            </div>

            {/* 4. Description & Metadata */}
            <div className="space-y-6 flex-grow">
                <p className="text-muted-foreground text-xs leading-relaxed italic border-l-2 border-primary/20 pl-4 py-0.5 line-clamp-3">
                    "{desc}"
                </p>

                {/* Tags */}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <button
                                key={tag}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onTagClick?.(tag);
                                }}
                                className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/50 hover:text-primary transition-colors"
                            >
                                #{tag}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* 5. Footer CTA */}
            <div className="mt-10 pt-6 border-t border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-3 text-[8px] font-bold uppercase tracking-widest text-muted-foreground/30">
                    <span className="flex items-center gap-1.5"><User size={10} /> {author}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5"><Clock size={10} /> {readTime}</span>
                </div>

                <Link
                    href={href}
                    className="inline-flex items-center gap-2.5 text-[9px] font-bold uppercase tracking-[0.3em] text-primary group/link overflow-hidden"
                >
                    <span className="relative">
                        LIRE
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary translate-x-[-105%] group-hover/link:translate-x-0 transition-transform duration-500" />
                    </span>
                    <ArrowUpRight size={12} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-500" />
                </Link>
            </div>

            {/* Background Number Accent */}
            <div className="absolute top-8 right-8 text-8xl font-display font-bold text-foreground/[0.015] -z-10 group-hover:text-primary/[0.025] transition-colors duration-1000 select-none">
                0{index + 1}
            </div>
        </motion.div>
    );
};
