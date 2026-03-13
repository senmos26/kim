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
            className="group relative mx-auto flex h-full w-full max-w-[400px] flex-col border border-transparent bg-background p-6 transition-all duration-700 lg:hover:border-border"
        >
            {/* Category & Date Header */}
            <div className="mb-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-primary">
                        {category}
                    </span>
                    {isNew(date) && (
                        <span className="rounded-sm bg-primary px-2 py-1 text-[10px] font-semibold text-white">Nouveau</span>
                    )}
                </div>
                <span className="text-xs font-medium text-foreground/70">
                    {date}
                </span>
            </div>

            {/* Title */}
            <Link href={href} className="block mb-6">
                <h3 className="text-xl md:text-2xl font-display font-bold leading-[1.12] tracking-tight italic group-hover:text-primary transition-colors duration-500">
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
                    <div className="absolute inset-0 bg-linear-to-tr from-primary/5 to-transparent mix-blend-overlay" />
                </div>

                <div className="absolute bottom-3 right-3 z-40 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <ShareButton title={title} url={href} variant="solid" className="scale-[0.65] origin-bottom-right" />
                </div>
            </div>

            {/* Description */}
            <div className="space-y-4 grow">
                <p className="border-l-2 border-primary/20 py-0.5 pl-4 text-sm italic leading-7 text-foreground/80 line-clamp-3">
                    &ldquo;{desc}&rdquo;
                </p>

                {/* Tags — clickable links */}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
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
                                className="text-xs font-medium text-foreground/55 transition-colors hover:text-primary"
                            >
                                #{tag}
                            </Link>
                        ))}
                        {tags.length > 4 && (
                            <span className="text-xs text-foreground/30">+{tags.length - 4}</span>
                        )}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="mt-8 pt-5 border-t border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs font-medium text-foreground/55">
                    <span className="flex items-center gap-1.5"><Clock size={12} /> {readTime}</span>
                    {viewsCount != null && (
                        <><span className="text-foreground/20">·</span><span className="flex items-center gap-1.5"><Eye size={12} /> {viewsCount >= 1000 ? `${(viewsCount / 1000).toFixed(1)}k` : viewsCount}</span></>
                    )}
                    {likesCount != null && (
                        <><span className="text-foreground/20">·</span><span className="flex items-center gap-1.5"><ThumbsUp size={12} /> {likesCount}</span></>
                    )}
                </div>

                <Link
                    href={href}
                    className="group/link inline-flex items-center gap-2.5 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
                >
                    Lire l'article
                    <ArrowUpRight size={14} className="transition-transform duration-500 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </Link>
            </div>

            {/* Background Number Accent */}
            <div className="absolute top-8 right-8 -z-10 text-8xl font-display font-bold text-foreground/1.5 transition-colors duration-1000 select-none group-hover:text-primary/2.5">
                0{index + 1}
            </div>
        </motion.div>
    );
};
