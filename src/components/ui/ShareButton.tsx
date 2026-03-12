"use client";
import React, { useState } from "react";
import { Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { SharePopup } from "./SharePopup";

interface ShareButtonProps {
    title: string;
    url?: string;
    className?: string;
    variant?: "outline" | "ghost" | "solid";
}

export const ShareButton = ({ title, url, className, variant = "outline" }: ShareButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const variants = {
        solid: "bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20",
        outline: "bg-background/80 backdrop-blur-md border border-border text-foreground/60 hover:text-primary hover:border-primary",
        ghost: "bg-transparent text-foreground/40 hover:text-primary"
    };

    return (
        <>
            <div className={cn("inline-block rounded-full", className)} onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsOpen(true);
                    }}
                    className={cn(
                        "p-3 rounded-full transition-all duration-300 flex items-center justify-center",
                        variants[variant]
                    )}
                    aria-label="Partager"
                >
                    <Share2 size={18} />
                </button>
            </div>

            <SharePopup
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={title}
                url={url}
            />
        </>
    );
};
