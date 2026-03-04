"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
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
       

        {/* Titre Impactant */}
        <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tighter">
            Concevoir le système. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                Écrire l'avenir.
            </span>
        </h1>

        {/* Description avec une structure "manifeste" */}
        <div className="bg-gradient-to-br from-white to-neutral-50 p-6 rounded-lg border-l-4 border-primary shadow-sm">
            <p className="text-lg text-neutral-600 leading-relaxed font-light">
                À la croisée de l'ingénierie rigoureuse et de la puissance narrative.
                <br />
                Je suis <strong className="text-foreground">Mohamed Asikim TCHAHAYE</strong>, 
                architecte de systèmes complexes par le calcul, bâtisseur d'univers par la plume.
            </p>
        </div>

        {/* Boutons modernes */}
        <div className="flex items-center gap-4 pt-4">
            <Link
                href="/books"
                className="px-8 py-4 bg-primary text-white font-semibold uppercase tracking-wider text-xs hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30 rounded-none"
            >
                Lire ses écrits
            </Link>

            <Link
                href="/portfolio"
                className="px-8 py-4 bg-transparent border border-neutral-300 text-foreground font-semibold uppercase tracking-wider text-xs hover:border-primary hover:text-primary transition-all rounded-none"
            >
                Explorer ses projets
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
