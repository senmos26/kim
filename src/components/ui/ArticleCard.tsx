"use client";
import React from "react";
import { ArrowUpRight, Clock, Eye, ThumbsUp, Tag } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShareButton } from "@/components/ui/ShareButton";

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
    likesCount?: number;
    viewsCount?: number;
    onTagClick?: (tag: string) => void;
}

function isNew(dateStr: string) {
    return (Date.now() - new Date(dateStr).getTime()) < 7 * 24 * 60 * 60 * 1000;
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
    likesCount,
    viewsCount,
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
            {/* Category & Date Header */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-primary">
                        {category}
                    </span>
                    {isNew(date) && (
                        <span className="text-[7px] font-bold uppercase tracking-wider bg-primary text-white px-1.5 py-0.5">Nouveau</span>
                    )}
                </div>
                <span className="text-[8px] font-bold uppercase tracking-widest text-foreground/70">
                    {date}
                </span>
            </div>

            {/* Title */}
            <Link href={href} className="block mb-6">
                <h3 className="text-xl md:text-2xl font-display font-bold leading-[1.2] tracking-tighter italic group-hover:text-primary transition-colors duration-500">
                    {title}.
                </h3>
            </Link>

            {/* Image Section */}
            <div className="relative aspect-video mb-6 bg-secondary/10 border border-border group-hover:border-primary/20 transition-colors duration-700">
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
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent mix-blend-overlay" />
                </div>

                <div className="absolute bottom-3 right-3 z-[40] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <ShareButton title={title} url={href} variant="solid" className="scale-[0.65] origin-bottom-right" />
                </div>
            </div>

            {/* Description */}
            <div className="space-y-4 flex-grow">
                <p className="text-foreground/80 text-xs leading-relaxed italic border-l-2 border-primary/20 pl-4 py-0.5 line-clamp-3">
                    &ldquo;{desc}&rdquo;
                </p>

                {/* Tags — clickable links */}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {tags.slice(0, 4).map((tag) => (
                            <Link
                                key={tag}
                                href={`/blog?tag=${encodeURIComponent(tag)}`}
                                onClick={(e) => {
                                    if (onTagClick) {
                                        e.preventDefault();
                                        onTagClick(tag);
                                    }
                                }}
                                className="text-[8px] font-bold uppercase tracking-widest text-foreground/50 hover:text-primary transition-colors"
                            >
                                #{tag}
                            </Link>
                        ))}
                        {tags.length > 4 && (
                            <span className="text-[8px] text-foreground/30">+{tags.length - 4}</span>
                        )}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="mt-8 pt-5 border-t border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-3 text-[8px] font-bold uppercase tracking-widest text-foreground/50">
                    <span className="flex items-center gap-1"><Clock size={9} /> {readTime}</span>
                    {viewsCount != null && (
                        <><span className="text-foreground/20">·</span><span className="flex items-center gap-1"><Eye size={9} /> {viewsCount >= 1000 ? `${(viewsCount / 1000).toFixed(1)}k` : viewsCount}</span></>
                    )}
                    {likesCount != null && (
                        <><span className="text-foreground/20">·</span><span className="flex items-center gap-1"><ThumbsUp size={9} /> {likesCount}</span></>
                    )}
                </div>

                <Link
                    href={href}
                    className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] text-primary group/link overflow-hidden"
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
