"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Calendar, Mail, User, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventTitle: string;
    eventDate: string;
    price?: string;
}

export const RegistrationModal = ({ isOpen, onClose, eventTitle, eventDate, price }: RegistrationModalProps) => {
    const [step, setStep] = useState<"form" | "loading" | "success">("form");
    const [formData, setFormData] = useState({ name: "", email: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep("loading");
        setTimeout(() => setStep("success"), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-background border border-border shadow-2xl z-[101] overflow-hidden"
                    >
                        {/* Progress Bar (Visual only) */}
                        <div className="h-1 bg-secondary w-full">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: step === "success" ? "100%" : step === "loading" ? "70%" : "30%" }}
                                className="h-full bg-primary transition-all duration-500"
                            />
                        </div>

                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 text-muted-foreground hover:text-primary transition-colors z-20"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-10 md:p-14">
                            {step === "form" && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-8"
                                >
                                    <div>
                                        <h3 className="text-2xl font-display font-bold italic mb-2">Réserver ma place</h3>
                                        <p className="text-sm text-muted-foreground mb-2">Rejoignez-nous pour : <span className="text-primary font-bold">{eventTitle}</span> le {eventDate}.</p>
                                        {price && (
                                            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">
                                                TARIF : {price}
                                            </div>
                                        )}
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2">
                                                <User size={12} className="text-primary" /> Nom Complet
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full bg-secondary/50 border border-border p-4 text-sm focus:outline-none focus:border-primary transition-colors"
                                                placeholder="Jean Dupont"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2">
                                                <Mail size={12} className="text-primary" /> Adresse Email
                                            </label>
                                            <input
                                                required
                                                type="email"
                                                className="w-full bg-secondary/50 border border-border p-4 text-sm focus:outline-none focus:border-primary transition-colors"
                                                placeholder="jean.dupont@example.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full bg-primary text-white py-5 rounded-sm text-xs font-bold uppercase tracking-[0.3em] shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all group"
                                        >
                                            Confirmer la réservation
                                            <ArrowRight size={14} className="inline-block ml-3 group-hover:translate-x-2 transition-transform" />
                                        </button>
                                    </form>

                                    <p className="text-[9px] text-center text-muted-foreground uppercase tracking-widest leading-relaxed">
                                        En vous inscrivant, vous acceptez de recevoir des informations relatives à cet événement et aux activités de KIMMCORP.
                                    </p>
                                </motion.div>
                            )}

                            {step === "loading" && (
                                <div className="py-20 flex flex-col items-center justify-center space-y-6">
                                    <Loader2 size={48} className="text-primary animate-spin" />
                                    <p className="text-sm font-bold uppercase tracking-widest animate-pulse">Traitement de votre demande...</p>
                                </div>
                            )}

                            {step === "success" && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center space-y-8"
                                >
                                    <div className="flex justify-center">
                                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                                            <CheckCircle2 size={40} className="text-primary" />
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-display font-bold italic mb-4">C'est confirmé !</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            Merci <span className="text-foreground font-bold">{formData.name}</span>.<br />
                                            Votre invitation pour <span className="text-primary font-bold italic">{eventTitle}</span> a été envoyée à <span className="text-foreground font-bold">{formData.email}</span>.
                                        </p>
                                    </div>

                                    <div className="bg-secondary/30 p-6 space-y-4 border-l-2 border-primary">
                                        <div className="flex items-center gap-4 text-left">
                                            <Calendar size={20} className="text-primary" />
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Date de l'événement</p>
                                                <p className="text-sm font-bold">{eventDate}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={onClose}
                                        className="w-full border border-border py-4 rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-secondary transition-colors"
                                    >
                                        Fermer la fenêtre
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
