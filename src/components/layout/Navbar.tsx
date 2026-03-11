"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, Globe, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/ui/AuthModal";
import { useLanguage } from "@/contexts/LanguageContext";

const navItems = [
    { key: "nav.home", link: "/" },
    { key: "nav.books", link: "/books" },
    { key: "nav.articles", link: "/blog" },
    { key: "nav.portfolio", link: "/portfolio" },
    { key: "nav.events", link: "/events" },
    { key: "nav.about", link: "/about" },
];

export const Navbar = () => {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { language, setLanguage, t } = useLanguage();
    const { user, isAuthenticated, logout, showAuthModal, authReason, openAuthModal, closeAuthModal } = useAuth();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
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
                        {navItems.map((item) => {
                            const isActive = pathname === item.link || (item.link !== "/" && pathname.startsWith(item.link));
                            return (
                                <Link
                                    key={item.key}
                                    href={item.link}
                                    className={cn(
                                        "text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 relative py-1",
                                        isActive ? "text-primary" : "text-foreground/60 hover:text-primary"
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

                        <div className="flex items-center gap-4 pl-4 border-l border-border">
                            <button
                                onClick={() => setLanguage(language === "FR" ? "EN" : "FR")}
                                className="flex items-center gap-2 text-[10px] font-bold text-foreground/40 hover:text-primary transition-colors"
                            >
                                <Globe size={14} /> {language}
                            </button>

                            {/* ── Auth zone ── */}
                            {isAuthenticated && user ? (
                                <div className="flex items-center gap-3 border border-border px-4 py-2 bg-secondary/30">
                                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                        <span className="text-[9px] font-bold text-white">
                                            {user.name[0].toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">
                                        {user.name}
                                    </span>
                                    <button
                                        onClick={logout}
                                        title="Se déconnecter"
                                        className="text-muted-foreground/40 hover:text-red-500 transition-colors ml-1"
                                    >
                                        <LogOut size={13} />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => openAuthModal()}
                                    className="flex items-center gap-2 border border-foreground/20 text-foreground px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-all"
                                >
                                    <User size={13} /> {t("nav.login")}
                                </button>
                            )}

                            <Link
                                href="/contact"
                                className="bg-primary text-white px-6 py-2.5 rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                            >
                                {t("nav.contact")}
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="lg:hidden flex items-center gap-4">
                        <button
                            onClick={() => setLanguage(language === "FR" ? "EN" : "FR")}
                            className="text-[12px] font-bold text-foreground/40"
                        >
                            {language}
                        </button>
                        {/* Mobile auth avatar */}
                        {isAuthenticated && user ? (
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                                    <span className="text-[10px] font-bold text-white">{user.name[0].toUpperCase()}</span>
                                </div>
                                <button onClick={logout} className="text-muted-foreground/40 hover:text-red-500 transition-colors">
                                    <LogOut size={14} />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => openAuthModal()}
                                className="text-foreground/60 hover:text-primary transition-colors"
                            >
                                <User size={20} />
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
                                className="bg-primary text-white text-center py-4 rounded-sm font-bold uppercase tracking-widest mt-4"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t("nav.contact")}
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
