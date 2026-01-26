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
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
                delay: index * 0.1,
                duration: 0.8,
                ease: "easeOut"
            }}
            className="group relative flex flex-col h-full bg-background"
        >
            {/* Article Visual */}
            <div className={cn(
                "aspect-[16/10] relative mb-10 border border-border overflow-visible",
                image?.match(/^[/\\]|^[a-zA-Z]:|^http/) ? "" : (image || "bg-secondary/20")
            )}>
                {/* Nested wrapper for clipping */}
                <div className="absolute inset-0 overflow-hidden">
                    {image?.match(/^[/\\]|^[a-zA-Z]:|^http/) && (
                        <img
                            src={image}
                            alt={title}
                            className="absolute inset-0 w-full h-full object-cover opacity-80 lg:group-hover:opacity-100 transition-all duration-1000 lg:group-hover:scale-105"
                        />
                    )}
                    <div className="absolute inset-0 bg-primary/5 lg:group-hover:bg-transparent transition-colors duration-700" />

                    {/* Date Tag */}
                    <div className="absolute top-6 right-6 z-20">
                        <div className="bg-primary text-white text-[9px] font-bold uppercase tracking-widest px-4 py-2 shadow-lg">
                            {date}
                        </div>
                    </div>
                </div>

                {/* Share Button Overlay - Visible on mobile, hover on desktop */}
                <div className="absolute top-6 left-6 z-30 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500">
                    <ShareButton title={title} url={href} variant="ghost" className="bg-white lg:bg-transparent hover:bg-background" />
                </div>
            </div>

            {/* Article Content */}
            <div className="flex-grow flex flex-col">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center gap-6 mb-6">
                    <div className="flex items-center gap-3">
                        <span className="h-px w-6 bg-primary/40" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                            {category}
                        </span>
                    </div>
                    <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50">
                        <span className="flex items-center gap-2"><User size={12} className="text-primary/40" /> {author}</span>
                        <span className="flex items-center gap-2"><Clock size={12} className="text-primary/40" /> {readTime}</span>
                    </div>
                </div>

                <Link href={href}>
                    <h3 className="text-3xl font-display font-bold mb-6 leading-tight lg:group-hover:text-primary transition-colors decoration-primary/20 decoration-2 underline-offset-8">
                        {title}.
                    </h3>
                </Link>

                <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-8 italic">
                    "{desc}"
                </p>

                {/* Tags Section */}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-10">
                        {tags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => onTagClick?.(tag)}
                                className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 bg-secondary hover:bg-primary/10 hover:text-primary border border-border transition-all"
                            >
                                <Tag size={10} /> {tag}
                            </button>
                        ))}
                    </div>
                )}

                <Link
                    href={href}
                    className="inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/40 hover:text-primary transition-all mt-auto w-fit group/link"
                >
                    LIRE L'ARTICLE <ArrowRight size={14} className="group-hover/link:translate-x-2 transition-transform" />
                </Link>
            </div>

            {/* Hover Arrow Indicator */}
            <div className="absolute -top-4 -left-4 text-primary/5 lg:group-hover:text-primary/10 transition-all duration-700 pointer-events-none rotate-180 -z-10">
                <ArrowUpRight size={120} strokeWidth={0.5} />
            </div>
        </motion.div>
    );
};
