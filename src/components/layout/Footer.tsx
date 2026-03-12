"use client";
import Link from "next/link";
import { Linkedin, Mail, Phone, MapPin, ArrowRight, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const navLinks = [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Ouvrages", href: "/books" },
];

const contentLinks = [
    { label: "Blog", href: "/blog" },
    { label: "Événements", href: "/events" },
    { label: "Contact", href: "/contact" },
];

const legalLinks = [
    { label: "Mentions légales", href: "#" },
    { label: "Confidentialité", href: "#" },
];

export const Footer = () => {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setSubscribed(true);
        setTimeout(() => setSubscribed(false), 4000);
        setEmail("");
    };

    return (
        <footer className="bg-foreground text-background overflow-hidden">

            {/* — CTA SECTION — Grand titre d'accroche */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-20 border-b border-background/10">
                <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12">
                    <div className="space-y-4 max-w-3xl">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                            Travaillons ensemble
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold italic leading-[1.0] tracking-tighter text-background">
                            Une idée, un projet,{" "}
                            <span className="text-primary">une vision ?</span>
                        </h2>
                    </div>
                    <Link
                        href="/contact"
                        className="group flex items-center gap-4 bg-primary text-white px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary/90 transition-all shadow-2xl shadow-primary/20 flex-shrink-0"
                    >
                        Démarrer la conversation
                        <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* — MAIN COLUMNS — Logo + Nav + Contact + Newsletter */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-16">

                {/* Brand */}
                <div className="lg:col-span-4 space-y-8">
                    <Link href="/" className="font-display text-3xl font-bold tracking-tight text-background">
                        KIMM<span className="text-primary italic font-medium">CORP</span>
                    </Link>
                    <p className="text-background/70 text-sm leading-loose max-w-xs font-light">
                        À la croisée de l'ingénierie électronique et de l'expression littéraire. Une vision unifiée pour un monde en constante évolution.
                    </p>
                    <div className="flex gap-5">
                        <a
                            href="https://www.linkedin.com/in/asikim-mohamed-tchahaye-605700131"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 border border-background/20 flex items-center justify-center text-background/70 hover:border-primary hover:text-primary transition-all duration-300"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={16} />
                        </a>
                        <a
                            href="mailto:atcmohamed16@gmail.com"
                            className="w-10 h-10 border border-background/20 flex items-center justify-center text-background/70 hover:border-primary hover:text-primary transition-all duration-300"
                            aria-label="Email"
                        >
                            <Mail size={16} />
                        </a>
                        <a
                            href="tel:+14034010528"
                            className="w-10 h-10 border border-background/20 flex items-center justify-center text-background/70 hover:border-primary hover:text-primary transition-all duration-300"
                            aria-label="Téléphone"
                        >
                            <Phone size={16} />
                        </a>
                    </div>
                </div>

                {/* Navigation */}
                <div className="lg:col-span-2 space-y-8">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-background/40">
                        Navigation
                    </h4>
                    <ul className="space-y-5">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-sm font-medium text-background/70 hover:text-primary transition-colors group flex items-center gap-2"
                                >
                                    <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-300" />
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contenu */}
                <div className="lg:col-span-2 space-y-8">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-background/40">
                        Contenu
                    </h4>
                    <ul className="space-y-5">
                        {contentLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-sm font-medium text-background/70 hover:text-primary transition-colors group flex items-center gap-2"
                                >
                                    <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-300" />
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="pt-4 space-y-4 border-t border-background/10">
                        <div className="flex items-start gap-3 text-background/50">
                            <MapPin size={14} className="text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm leading-relaxed">Vancouver, Canada<br />& Casablanca, Maroc</span>
                        </div>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="lg:col-span-4 space-y-8">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-background/40">
                        Vision & Tech — La Lettre
                    </h4>
                    <p className="text-background/70 text-sm leading-relaxed">
                        Une veille mensuelle sur l'ingénierie, l'innovation et la pensée littéraire. Rejoignez 5 000+ lecteurs.
                    </p>
                    <form onSubmit={handleSubscribe} className="space-y-4">
                        <div className="flex border border-background/20 focus-within:border-primary transition-colors">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="VOTRE EMAIL"
                                className="flex-1 bg-transparent px-5 py-4 text-xs font-medium tracking-wider text-background placeholder:text-background/40 focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="px-5 bg-primary text-white hover:bg-primary/90 transition-colors flex items-center justify-center"
                                aria-label="S'abonner"
                            >
                                {subscribed
                                    ? <span className="text-[9px] font-bold uppercase tracking-widest px-2">✓</span>
                                    : <Send size={14} />
                                }
                            </button>
                        </div>
                        {subscribed && (
                            <p className="text-primary text-[10px] font-bold uppercase tracking-widest">
                                Merci ! Vous êtes abonné(e).
                            </p>
                        )}
                    </form>
                </div>
            </div>

            {/* — BOTTOM BAR — */}
            <div className="border-t border-background/10">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <p className="text-xs font-medium text-background/50">
                        © {new Date().getFullYear()} KIMMCORP — Mohamed Asikim TCHAHAYE.
                    </p>
                    <div className="flex items-center gap-8">
                        {legalLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-xs font-medium text-background/50 hover:text-primary transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};
