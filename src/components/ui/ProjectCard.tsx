"use client";
import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShareButton } from "@/components/ui/ShareButton";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
    id: string;
    href: string;
    title: string;
    desc: string;
    category: string;
    tech: string[];
    image?: string;
    icon?: React.ReactNode;
    index: number;
}

export const ProjectCard = ({
    id,
    href,
    title,
    desc,
    category,
    tech,
    image,
    icon,
    index
}: ProjectCardProps) => {
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
            className="group relative bg-background border border-border hover:border-primary/20 transition-all duration-700 flex flex-col h-full shadow-sm hover:shadow-2xl hover:shadow-primary/5"
        >
            {/* Visual Area - Technical Focus */}
            <div className={cn(
                "aspect-video relative flex items-center justify-center border-b border-border",
                image?.match(/^[/\\]|^[a-zA-Z]:|^http/) ? "" : (image || "bg-secondary/20")
            )}>
                {/* Nested wrapper for clipping */}
                <div className="absolute inset-0 overflow-hidden">
                    {image?.match(/^[/\\]|^[a-zA-Z]:|^http/) ? (
                        <img
                            src={image}
                            alt={title}
                            className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
                        />
                    ) : (
                        <div className="text-foreground/5 group-hover:text-primary/10 transition-colors duration-700 scale-150">
                            {icon}
                        </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-700" />

                    {/* Category Badge */}
                    <div className="absolute bottom-6 left-6 z-20">
                        <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-primary/70 bg-background/80 backdrop-blur-sm px-4 py-1.5 border border-primary/10">
                            {category}
                        </span>
                    </div>
                </div>

                {/* Share Button Overlay - Visible on mobile, hover on desktop */}
                <div className="absolute top-6 right-6 z-30 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500">
                    <ShareButton title={title} url={href} variant="ghost" className="bg-white lg:bg-transparent hover:bg-primary/5" />
                </div>
            </div>

            {/* Content Area */}
            <div className="p-10 flex flex-col justify-between flex-grow">
                <div>
                    <h3 className="text-xl md:text-2xl font-display font-bold mb-6 italic group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    <p className="text-foreground/80 text-sm leading-relaxed mb-8">
                        {desc}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-3 mb-10">
                        {tech.map((t) => (
                            <span key={t} className="text-[9px] font-bold uppercase tracking-widest px-3 py-1 bg-secondary text-foreground/70 border border-border group-hover:border-primary/20 transition-colors">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <Link
                        href={href}
                        className="inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/40 hover:text-primary transition-colors z-20 group/link"
                    >
                        DÉTAILS DU PROJET
                    </Link>
                    <div className="text-foreground/5 group-hover:text-primary/10 transition-colors duration-500">
                        <ArrowUpRight size={40} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
