"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/ui/AuthModal";
import { useLanguage } from "@/contexts/LanguageContext";
import { ShimmerButton } from "@/components/ui/shimmer-button";

const navItems = [
    { key: "nav.home", link: "/" },
    { key: "nav.books", link: "/books" },
    { key: "nav.articles", link: "/blog" },
    { key: "nav.portfolio", link: "/portfolio" },
    { key: "nav.events", link: "/events" },
    { key: "nav.about", link: "/about" },
];

const languages = [
    { code: "FR" as const, label: "Français", flag: "🇫🇷" },
    { code: "EN" as const, label: "English", flag: "🇬🇧" },
];

export const Navbar = () => {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const langRef = useRef<HTMLDivElement>(null);

    const { language, setLanguage, t } = useLanguage();
    const { user, isAuthenticated, logout, showAuthModal, authReason, openAuthModal, closeAuthModal } = useAuth();

    const currentLang = languages.find(l => l.code === language) || languages[0];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (langRef.current && !langRef.current.contains(e.target as Node)) {
                setLangOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 inset-x-0 z-[50] transition-all duration-500 py-5 px-6 md:px-12",
                    isScrolled
                        ? "bg-background/95 backdrop-blur-lg border-b border-border py-3.5 shadow-sm"
                        : "bg-transparent"
                )}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="font-display text-2xl font-bold tracking-tight text-foreground">
                        KIMM<span className="text-primary italic font-medium font-display">CORP</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navItems.map((item) => {
                            const isActive = pathname === item.link || (item.link !== "/" && pathname.startsWith(item.link));
                            return (
                                <Link
                                    key={item.key}
                                    href={item.link}
                                    className={cn(
                                        "text-sm font-medium transition-all duration-300 relative py-1",
                                        isActive ? "text-primary" : "text-foreground/80 hover:text-primary"
                                    )}
                                >
                                    {t(item.key)}
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-underline"
                                            className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}

                        <div className="flex items-center gap-3 pl-6 border-l border-border">
                            {/* Language Selector Popup */}
                            <div ref={langRef} className="relative">
                                <button
                                    onClick={() => setLangOpen(!langOpen)}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border",
                                        langOpen
                                            ? "border-primary/30 bg-primary/5 text-primary"
                                            : "border-transparent text-foreground/80 hover:text-foreground hover:bg-secondary/50"
                                    )}
                                >
                                    <span className="text-base leading-none">{currentLang.flag}</span>
                                    <span>{currentLang.code}</span>
                                    <ChevronDown size={14} className={cn(
                                        "transition-transform duration-200",
                                        langOpen && "rotate-180"
                                    )} />
                                </button>

                                <AnimatePresence>
                                    {langOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute top-full right-0 mt-2 z-50 w-[200px] bg-background border-2 border-border rounded-xl shadow-2xl shadow-black/8 overflow-hidden"
                                        >
                                            <div className="p-1.5">
                                                {languages.map((lang) => (
                                                    <button
                                                        key={lang.code}
                                                        onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                                                        className={cn(
                                                            "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                                                            language === lang.code
                                                                ? "bg-primary/10 text-primary font-semibold"
                                                                : "text-foreground hover:bg-secondary hover:text-foreground"
                                                        )}
                                                    >
                                                        <span className="text-xl leading-none">{lang.flag}</span>
                                                        <span>{lang.label}</span>
                                                        {language === lang.code && (
                                                            <span className="ml-auto w-2 h-2 rounded-full bg-primary" />
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* ── Auth zone ── */}
                            {isAuthenticated && user ? (
                                <div className="flex items-center gap-3 border border-border px-4 py-2 rounded-lg bg-secondary/30">
                                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs font-bold text-white">
                                            {user.name[0].toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="text-sm font-semibold text-foreground">
                                        {user.name}
                                    </span>
                                    <button
                                        onClick={logout}
                                        title="Se déconnecter"
                                        className="text-foreground/60 hover:text-red-500 transition-colors ml-1"
                                    >
                                        <LogOut size={15} />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => openAuthModal()}
                                    className="flex items-center gap-2 border border-border text-foreground px-4 py-2 rounded-lg text-sm font-medium hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all"
                                >
                                    <User size={15} /> {t("nav.login")}
                                </button>
                            )}

                            <Link href="/contact">
                                <ShimmerButton
                                    background="linear-gradient(135deg, #CC5500 0%, #e06b20 50%, #CC5500 100%)"
                                    shimmerColor="#ffffff"
                                    shimmerSize="0.05em"
                                    shimmerDuration="2.5s"
                                    borderRadius="8px"
                                    className="text-sm font-semibold px-6 py-2.5"
                                >
                                    {t("nav.contact")}
                                </ShimmerButton>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="lg:hidden flex items-center gap-3">
                        {/* Mobile Language */}
                        <button
                            onClick={() => setLangOpen(!langOpen)}
                            className="flex items-center gap-1.5 text-sm font-medium text-foreground/80 px-2 py-1.5 rounded-lg hover:bg-secondary/50 transition-colors"
                        >
                            <span className="text-base leading-none">{currentLang.flag}</span>
                            <span>{currentLang.code}</span>
                        </button>

                        {/* Mobile Language Popup */}
                        <AnimatePresence>
                            {langOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 8 }}
                                    className="absolute top-full right-4 mt-2 z-50 w-[200px] bg-background border-2 border-border rounded-xl shadow-2xl overflow-hidden"
                                >
                                    <div className="p-1.5">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                                                className={cn(
                                                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                                                    language === lang.code
                                                        ? "bg-primary/10 text-primary font-semibold"
                                                        : "text-foreground/70 hover:bg-secondary"
                                                )}
                                            >
                                                <span className="text-xl leading-none">{lang.flag}</span>
                                                <span>{lang.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Mobile auth avatar */}
                        {isAuthenticated && user ? (
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                    <span className="text-xs font-bold text-white">{user.name[0].toUpperCase()}</span>
                                </div>
                                <button onClick={logout} className="text-muted-foreground/40 hover:text-red-500 transition-colors">
                                    <LogOut size={16} />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => openAuthModal()}
                                className="text-foreground/80 hover:text-primary transition-colors"
                            >
                                <User size={22} />
                            </button>
                        )}
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
                            {navItems.map((item) => {
                                const isActive = pathname === item.link || (item.link !== "/" && pathname.startsWith(item.link));
                                return (
                                    <Link
                                        key={item.key}
                                        href={item.link}
                                        className={cn(
                                            "text-2xl font-display font-bold border-b border-border pb-6 last:border-0 flex items-center justify-between",
                                            isActive ? "text-primary" : "text-foreground"
                                        )}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {t(item.key)}
                                        {isActive && <div className="w-2 h-2 rounded-full bg-primary" />}
                                    </Link>
                                );
                            })}
                            <Link
                                href="/contact"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <ShimmerButton
                                    background="linear-gradient(135deg, #CC5500 0%, #e06b20 50%, #CC5500 100%)"
                                    shimmerColor="#ffffff"
                                    borderRadius="8px"
                                    className="w-full text-base font-semibold py-4"
                                >
                                    {t("nav.contact")}
                                </ShimmerButton>
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Auth Modal — accessible depuis la Navbar sur toutes les pages */}
            <AuthModal
                isOpen={showAuthModal}
                onClose={closeAuthModal}
                reason={authReason || t("auth.reason.default")}
            />
        </>
    );
};
