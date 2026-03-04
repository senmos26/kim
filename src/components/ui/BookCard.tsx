"use client";
import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShareButton } from "@/components/ui/ShareButton";
import { cn } from "@/lib/utils";

interface BookCardProps {
    id: string;
    href: string;
    title: string;
    desc: string;
    category: string;
    image?: string;
    index: number;
}

export const BookCard = ({
    id,
    href,
    title,
    desc,
    category,
    image,
    index
}: BookCardProps) => {
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
            className="group relative flex flex-col h-full overflow-visible"
        >
            {/* Cover Area - 3/4 Aspect Ratio for Books */}
            <div className="relative aspect-[3/4] bg-secondary/20 border border-border/40 shadow-lg lg:group-hover:shadow-2xl transition-all duration-700">
                {/* Nested Image Wrapper with overflow-hidden */}
                <div className="absolute inset-0 overflow-hidden">
                    {image && image.match(/^[/\\]|^[a-zA-Z]:|^http/) ? (
                        <img
                            src={image}
                            alt={title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 lg:group-hover:scale-110"
                        />
                    ) : (
                        <div className={cn("absolute inset-0 flex items-center justify-center", image || "bg-primary/5")}>
                            <span className="text-secondary-foreground/10 text-6xl font-display font-bold rotate-90 opacity-20">{title}</span>
                        </div>
                    )}

                    {/* Premium Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 lg:group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Floating Category Label */}
                    <div className="absolute top-6 left-6 z-20">
                        <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/70 bg-black/20 backdrop-blur-sm px-3 py-1 border border-white/10">
                            {category}
                        </span>
                    </div>

                    {/* Content on Hover for Cover */}
                    <div className="absolute inset-0 flex flex-col justify-end p-10 translate-y-10 opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-700 z-20">
                        <h4 className="text-xl font-display font-bold text-white mb-4 italic leading-tight">
                            {title}
                        </h4>
                        <p className="text-white/70 text-sm leading-relaxed line-clamp-2 mb-8 italic">
                            {desc}
                        </p>
                        <Link
                            href={href}
                            className="inline-flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.4em] text-primary hover:text-white transition-colors"
                        >
                            LIRE DES EXTRAITS <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>

                {/* Share Button Overlay - Visible on mobile, hover on desktop */}
                <div className="absolute top-6 right-6 z-30 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 lg:translate-y-[-10px] lg:group-hover:translate-y-0">
                    <ShareButton title={title} url={href} variant="ghost" className="text-foreground/60 bg-white lg:bg-transparent hover:bg-white/10" />
                </div>
            </div>

            {/* Static Info Below (Visible always for better UX on mobile/scroll) */}
            <div className="mt-8 flex flex-col gap-4">
                <div className="space-y-2">
                    <h3 className="text-xl font-display font-bold leading-tight lg:group-hover:text-primary transition-colors italic">
                        {title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 lg:opacity-100 lg:group-hover:opacity-0 transition-opacity duration-300">
                        {desc}
                    </p>
                </div>

                {/* Mobile-only action link */}
                <Link
                    href={href}
                    className="lg:hidden inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-primary"
                >
                    LIRE DES EXTRAITS <ArrowRight size={14} />
                </Link>
            </div>

            {/* Decorative arrow reveal */}
            <div className="absolute -bottom-4 right-0 text-primary/0 lg:group-hover:text-primary/20 transition-all duration-700 pointer-events-none">
                <ArrowUpRight size={100} strokeWidth={1} />
            </div>
        </motion.div>
    );
};
