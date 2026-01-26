"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X, Globe } from "lucide-react";

const navItems = [
    { name: "Accueil", link: "/" },
    { name: "Ouvrages", link: "/books" },
    { name: "Articles", link: "/blog" },
    { name: "Portfolio", link: "/portfolio" },
    { name: "Événements", link: "/events" },
    { name: "À Propos", link: "/about" },
];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [lang, setLang] = useState<"FR" | "EN">("FR");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 inset-x-0 z-[50] transition-all duration-500 py-6 px-6 md:px-12",
                isScrolled
                    ? "bg-background border-b border-border py-4 shadow-sm"
                    : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="font-display text-2xl font-bold tracking-tight text-foreground">
                    KIMM<span className="text-primary italic font-medium font-display">CORP</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-10">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.link}
                            className="text-[13px] font-bold uppercase tracking-widest text-foreground/60 hover:text-primary transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}

                    <div className="flex items-center gap-4 pl-4 border-l border-border">
                        <button
                            onClick={() => setLang(lang === "FR" ? "EN" : "FR")}
                            className="flex items-center gap-2 text-[12px] font-bold text-foreground/40 hover:text-primary transition-colors"
                        >
                            <Globe size={14} /> {lang}
                        </button>
                        <Link
                            href="/contact"
                            className="bg-primary text-white px-6 py-2.5 rounded-sm text-[12px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                        >
                            Contact
                        </Link>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <div className="lg:hidden flex items-center gap-4">
                    <button
                        onClick={() => setLang(lang === "FR" ? "EN" : "FR")}
                        className="text-[12px] font-bold text-foreground/40"
                    >
                        {lang}
                    </button>
                    <button
                        className="text-foreground p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="absolute top-full left-0 right-0 bg-background border-b border-border lg:hidden flex flex-col p-8 gap-6 overflow-hidden"
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.link}
                                className="text-xl font-display font-bold border-b border-border pb-4 last:border-0"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="bg-primary text-white text-center py-4 rounded-sm font-bold uppercase tracking-widest mt-4"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contact
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
