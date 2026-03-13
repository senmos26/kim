"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import TextType from "@/components/TextType";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { socials } from "@/data/socials";

function normalizeUrl(url: string) {
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

function TikTokIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
            <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.204V2h-3.193v12.138a2.896 2.896 0 1 1-2.896-2.896c.226 0 .445.027.655.076V8.067a6.09 6.09 0 0 0-.655-.035A6.09 6.09 0 1 0 15.82 14.12V8.02a7.973 7.973 0 0 0 4.685 1.515V6.339a4.81 4.81 0 0 1-.916-.087Z" />
        </svg>
    );
}

export const Hero = () => {
    const { t } = useLanguage();
    const router = useRouter();
    const socialLinks = [
        { label: "Facebook", href: socials.facebook, icon: Facebook, active: true },
        { label: "LinkedIn", href: normalizeUrl(socials.linkedin), icon: Linkedin, active: true },
        { label: "Twitter", href: "", icon: Twitter, active: false },
        { label: "TikTok", href: socials.tiktok, icon: TikTokIcon, active: true },
    ];

    return (
        <section className="relative min-h-[85vh] flex items-center pt-24 pb-12 overflow-hidden bg-background">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                <div className="lg:col-span-7 relative z-10 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        {/* Titre avec ContainerTextFlip */}
                        <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] tracking-tighter">
                            {t("hero.title1")} <br />
                            <ContainerTextFlip
                                words={["Écrire l'avenir.", "Innover.", "Créer.", "Concevoir."]}
                                interval={3000}
                                className="text-3xl lg:text-4xl font-display italic text-primary"
                            />
                        </h1>

                        {/* Description avec TextType animation */}
                        <div className="border-l-4 border-primary pl-6 py-2">
                            <p className="text-lg text-foreground/70 leading-relaxed">
                                {t("hero.desc1")}
                            </p>
                            <p className="text-lg text-foreground/70 leading-relaxed mt-2">
                                {t("hero.iam")} <strong className="text-foreground">Mohamed Asikim TCHAHAYE</strong>,
                            </p>
                            <div className="mt-1">
                                <TextType
                                    text={[
                                        "architecte de systèmes complexes.",
                                        "bâtisseur d'univers par la plume.",
                                        "ingénieur en systèmes embarqués.",
                                        "auteur et penseur technique."
                                    ]}
                                    as="span"
                                    typingSpeed={40}
                                    deletingSpeed={25}
                                    pauseDuration={2500}
                                    className="text-lg text-primary font-medium italic"
                                    cursorCharacter="|"
                                    cursorClassName="text-primary"
                                />
                            </div>
                        </div>

                        {/* Boutons modernes */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
                            <ShimmerButton
                                shimmerColor="#ffffff"
                                shimmerDuration="2.6s"
                                background="rgb(234, 88, 12)"
                                borderRadius="0px"
                                className="min-w-[220px] border-primary/40 px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] shadow-lg shadow-primary/20"
                                onClick={() => router.push("/books")}
                            >
                                {t("hero.cta.book")}
                            </ShimmerButton>

                            <InteractiveHoverButton
                                className="min-w-[220px] rounded-none border-border px-6 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-foreground hover:border-primary"
                                onClick={() => router.push("/portfolio")}
                            >
                                {t("hero.cta.work")}
                            </InteractiveHoverButton>
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            {socialLinks.map((item) => {
                                const Icon = item.icon;

                                if (!item.active) {
                                    return (
                                        <span
                                            key={item.label}
                                            className="flex h-11 w-11 items-center justify-center border border-border text-foreground/25"
                                            aria-label={item.label}
                                            title={`${item.label} bientôt disponible`}
                                        >
                                            <Icon className="h-4 w-4" />
                                        </span>
                                    );
                                }

                                return (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={item.label}
                                        className="group flex h-11 w-11 items-center justify-center border border-border text-foreground/55 transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
                                    >
                                        <Icon className="h-4 w-4" />
                                    </a>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>

                <div className="lg:col-span-5 hidden lg:block">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative aspect-3/4 bg-white rounded-sm overflow-hidden border border-border shadow-2xl"
                    >
                        {/* Actual Portrait - No grayscale */}
                        <img
                            src="/assets/images/kim.jpg"
                            alt="Mohamed Asikim TCHAHAYE - Portrait"
                            className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 group-hover:scale-105"
                        />

                        {/* Professional Name Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />

                        <div className="absolute bottom-8 left-8 z-30">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 }}
                                className="space-y-1"
                            >
                                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/50 block">{t("hero.badge")}</span>
                                <h2 className="text-2xl font-display font-bold text-white tracking-tight italic">
                                    Mohamed Asikim <br />
                                    <span className="text-primary not-italic uppercase tracking-tighter">Tchahaye</span>
                                </h2>
                            </motion.div>
                        </div>

                        {/* Subtle refinement ring */}
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                    </motion.div>
                </div>

            </div>
        </section>
    );
};
