"use client";
import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShareButton } from "@/components/ui/ShareButton";
import { cn } from "@/lib/utils";

interface ContentCardProps {
    id: string;
    href: string;
    title: string;
    desc: string;
    category: string;
    visualData: {
        title?: string;
        subtitle?: string;
        image?: string;
        icon?: React.ReactNode;
    };
    index: number;
}

export const ContentCard = ({
    id,
    href,
    title,
    desc,
    category,
    visualData,
    index
}: ContentCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex flex-col md:flex-row bg-background border border-border lg:hover:shadow-2xl lg:hover:shadow-primary/5 transition-all h-full"
        >
            {/* Visual Area - 2/5 Split */}
            <div
                className={cn(
                    "md:w-2/5 aspect-square md:aspect-auto flex items-center justify-center p-12 border-b md:border-b-0 md:border-r border-border relative overflow-visible",
                    !visualData.image?.match(/^[/\\]|^[a-zA-Z]:|^http/) && (visualData.image || "bg-primary/5")
                )}
            >
                {/* Nested wrapper for clipping (Hover Zoom) */}
                <div className="absolute inset-0 overflow-hidden"
                    style={
                        visualData.image?.match(/^[/\\]|^[a-zA-Z]:|^http/)
                            ? {
                                backgroundImage: `url(${visualData.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }
                            : {}
                    }
                >
                    {/* Overlay to ensure text readability */}
                    {visualData.image?.match(/^[/\\]|^[a-zA-Z]:|^http/) && (
                        <div className="absolute inset-0 bg-black/10 lg:group-hover:bg-black/30 transition-colors duration-700" />
                    )}

                    <div className="absolute inset-0 bg-primary/5 lg:group-hover:bg-transparent transition-colors duration-700" />

                    {/* Editorial Date Badge - Bottom Left */}
                    {(visualData.title || visualData.subtitle) && (
                        <div className="absolute bottom-6 left-6 z-20 flex flex-col transition-transform duration-700 lg:group-hover:translate-x-1">
                            <div className="bg-primary text-white text-3xl font-display font-bold px-4 pt-3 pb-1 leading-none shadow-xl">
                                {visualData.title}
                            </div>
                            <div className="bg-background/90 backdrop-blur-md text-foreground text-[9px] font-bold uppercase tracking-[0.3em] px-4 py-2 border-x border-b border-border shadow-lg">
                                {visualData.subtitle}
                            </div>
                        </div>
                    )}

                    {/* Large Icon if no image */}
                    {!visualData.image?.match(/^[/\\]|^[a-zA-Z]:|^http/) && visualData.icon && (
                        <div className="text-primary/20 transition-transform lg:group-hover:scale-110 duration-700 scale-[2]">
                            {visualData.icon}
                        </div>
                    )}
                </div>

                {/* Share Button - Visible on mobile, hover on desktop */}
                <div className="absolute top-4 right-4 z-30 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500">
                    <ShareButton
                        title={title}
                        url={href}
                        variant="ghost"
                        className="bg-white lg:bg-transparent hover:bg-primary/5"
                    />
                </div>
            </div>

            {/* Content Area - 3/5 Split */}
            <div className="md:w-3/5 p-10 flex flex-col justify-between">
                <div className="space-y-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/20 bg-primary/5 px-3 py-1.5 inline-block">
                        {category}
                    </span>
                    <h3 className="text-3xl font-display font-bold leading-tight lg:group-hover:text-primary transition-colors italic">
                        {title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 italic">
                        "{desc}"
                    </p>
                </div>

                <div className="flex items-center justify-between mt-10">
                    <Link
                        href={href}
                        className="inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/40 hover:text-primary transition-colors z-20 w-fit group/link"
                    >
                        VOIR LES DÉTAILS <ArrowRight size={14} className="group-hover/link:translate-x-2 transition-transform" />
                    </Link>

                    <div className="text-foreground/5 lg:group-hover:text-primary/10 transition-colors duration-500">
                        <ArrowUpRight size={40} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
