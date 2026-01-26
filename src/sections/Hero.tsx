"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
    return (
        <section className="relative min-h-[85vh] flex items-center pt-24 pb-12 overflow-hidden bg-background">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                <div className="lg:col-span-7 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >

                        <h1 className="font-display text-4xl md:text-5xl lg:text-[4.5rem] font-bold tracking-tight mb-8 leading-[0.95] text-foreground">
                            De l'Électronique <br />
                            <span className="text-primary italic font-normal font-display">au Verbe.</span>
                        </h1>
                        <p className="text-base md:text-lg text-muted-foreground mb-12 max-w-xl leading-relaxed italic border-l-4 border-primary/20 pl-8 font-sans">
                            L'ingénierie des systèmes rencontre la finesse de l'écriture. Bienvenue dans l'univers de <strong>Mohamed Asikim TCHAHAYE</strong>, où chaque innovation est une histoire et chaque page une architecture.
                        </p>

                        <div className="flex flex-wrap gap-8 items-center">
                            <Link
                                href="/books"
                                className="group relative flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] transition-all"
                            >
                                Ses Œuvres Littéraires
                                <div className="p-4 bg-primary text-white rounded-full group-hover:scale-110 transition-transform shadow-xl shadow-primary/20">
                                    <ArrowRight size={20} />
                                </div>
                            </Link>

                            <Link
                                href="/portfolio"
                                className="text-[10px] font-bold uppercase tracking-[0.2em] border-b-2 border-primary/10 hover:border-primary transition-all pb-1"
                            >
                                Projets d'Ingénierie
                            </Link>
                        </div>
                    </motion.div>
                </div>

                <div className="lg:col-span-5 hidden lg:block">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative aspect-[3/4] bg-secondary rounded-sm overflow-hidden border border-border shadow-2xl"
                    >
                        {/* Actual Portrait - No grayscale */}
                        <img
                            src="/assets/images/kim.jpg"
                            alt="Mohamed Asikim TCHAHAYE - Portrait"
                            className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 group-hover:scale-105"
                        />

                        {/* Professional Name Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />

                        <div className="absolute bottom-8 left-8 z-30">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 }}
                                className="space-y-1"
                            >
                                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/50 block">INGÉNIEUR & AUTEUR</span>
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
