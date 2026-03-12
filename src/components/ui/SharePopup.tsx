"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Copy, Check, Twitter, Linkedin, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface SharePopupProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    url?: string;
}

export const SharePopup = ({ isOpen, onClose, title, url }: SharePopupProps) => {
    const [copied, setCopied] = useState(false);
    const [currentUrl, setCurrentUrl] = useState(url || "");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined" && !url) {
            setCurrentUrl(window.location.href);
        }
    }, [url, isOpen]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            window.addEventListener("keydown", handleEsc);
            document.body.style.overflow = "hidden";
        }
        return () => {
            window.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const socialLinks = [
        {
            icon: Twitter,
            label: "Twitter",
            href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`,
        },
        {
            icon: Linkedin,
            label: "LinkedIn",
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
        },
        {
            icon: Mail,
            label: "Email",
            href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(currentUrl)}`,
        },
    ];

    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(currentUrl)}`;

    const popupContent = (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/80 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-background border border-border shadow-2xl p-10 md:p-12 overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />

                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 text-foreground/60 hover:text-foreground transition-colors"
                        >
                            <X size={22} />
                        </button>

                        <div className="space-y-8 text-center">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-display font-bold italic tracking-tight">
                                    Diffuser l&apos;idée .
                                </h3>
                                <p className="text-sm text-foreground/70">
                                    Partagez cette vision avec votre réseau.
                                </p>
                            </div>

                            <div className="flex justify-center">
                                <div className="bg-white p-4 border border-border shadow-sm">
                                    <Image
                                        src={qrCodeUrl}
                                        alt="QR Code Partage"
                                        width={180}
                                        height={180}
                                        className="w-40 h-40"
                                        unoptimized
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-6">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-col items-center gap-2 group"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-foreground transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                                            <social.icon size={18} />
                                        </div>
                                        <span className="text-[8px] font-bold uppercase tracking-widest text-foreground/60">
                                            {social.label}
                                        </span>
                                    </a>
                                ))}

                                <button
                                    onClick={handleCopyLink}
                                    className="flex flex-col items-center gap-2 group"
                                >
                                    <div
                                        className={cn(
                                            "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                                            copied
                                                ? "bg-green-500 text-white"
                                                : "bg-secondary text-foreground group-hover:bg-primary group-hover:text-white"
                                        )}
                                    >
                                        {copied ? <Check size={18} /> : <Copy size={18} />}
                                    </div>
                                    <span className="text-[8px] font-bold uppercase tracking-widest text-foreground/60">
                                        {copied ? "Copié !" : "Copie"}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );

    if (!mounted) return null;

    return createPortal(popupContent, document.body);
};
