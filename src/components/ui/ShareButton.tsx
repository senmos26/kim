"use client";
import React, { useState, useEffect, useRef } from "react";
import { Share2, Copy, Check, Twitter, Linkedin, MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
    title: string;
    url: string;
    className?: string;
    variant?: "outline" | "ghost" | "solid";
}

export const ShareButton = ({ title, url, className, variant = "outline" }: ShareButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${url}` : url;

    const handleCopy = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(fullUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    };

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    const shareLinks = [
        {
            name: "Twitter",
            icon: <Twitter size={14} />,
            href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`,
            color: "hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2]"
        },
        {
            name: "LinkedIn",
            icon: <Linkedin size={14} />,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
            color: "hover:bg-[#0077B5]/10 hover:text-[#0077B5]"
        },
        {
            name: "WhatsApp",
            icon: <MessageCircle size={14} />,
            href: `https://wa.me/?text=${encodeURIComponent(title + " " + fullUrl)}`,
            color: "hover:bg-[#25D366]/10 hover:text-[#25D366]"
        }
    ];

    const variants = {
        solid: "bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20",
        outline: "bg-background/80 backdrop-blur-md border border-border text-foreground/60 hover:text-primary hover:border-primary",
        ghost: "bg-transparent text-foreground/40 hover:text-primary"
    };

    return (
        <div className={cn("inline-block rounded-full", className)} onClick={(e) => e.stopPropagation()}>
            <button
                ref={buttonRef}
                onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(!isOpen);
                }}
                className={cn(
                    "p-3 rounded-full transition-all duration-300 flex items-center justify-center",
                    variants[variant]
                )}
                aria-label="Partager"
            >
                <Share2 size={18} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Full screen invisible backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-[10000] bg-black/5 backdrop-blur-[2px]"
                        />

                        {/* The actual popup */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10, x: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10, x: 20 }}
                            className="absolute top-full right-0 mt-4 z-[10001] bg-background border border-border p-6 shadow-2xl rounded-sm min-w-[260px] border-t-4 border-t-primary"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground">Partager</h4>
                                    <p className="text-[9px] text-muted-foreground uppercase tracking-widest mt-1">Diffusez cette œuvre</p>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground p-1">
                                    <X size={16} />
                                </button>
                            </div>

                            <div className="space-y-3">
                                {shareLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cn(
                                            "flex items-center gap-4 p-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all rounded-sm text-foreground/70 hover:text-foreground",
                                            link.color
                                        )}
                                    >
                                        <span className="p-2 bg-secondary rounded-full text-foreground/60 group-hover:text-inherit transition-colors">{link.icon}</span>
                                        {link.name}
                                    </a>
                                ))}

                                <div className="pt-4 mt-4 border-t border-border">
                                    <button
                                        onClick={handleCopy}
                                        className="w-full flex items-center justify-between gap-4 p-4 text-[10px] font-bold uppercase tracking-[0.2em] bg-secondary text-foreground/70 hover:bg-primary hover:text-white transition-all rounded-sm"
                                    >
                                        <span className="flex items-center gap-3">
                                            {copied ? <Check size={16} className="text-white" /> : <Copy size={16} className="text-foreground/50" />}
                                            {copied ? "Copié !" : "Copier le lien"}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};
