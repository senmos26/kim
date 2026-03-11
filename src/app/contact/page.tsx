"use client";
import React, { useState, useEffect, Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Mail, Send, Linkedin, MessageSquare, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

function ContactForm() {
    const { user, isAuthenticated, openAuthModal } = useAuth();
    const searchParams = useSearchParams();

    // Form states
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "Littérature & Collaboration Éditoriale",
        message: ""
    });

    // Handle query params and auth auto-fill
    useEffect(() => {
        const subject = searchParams.get("subject");
        const message = searchParams.get("message");

        setFormData(prev => ({
            ...prev,
            name: (isAuthenticated && user) ? user.name : prev.name,
            email: (isAuthenticated && user) ? user.email : prev.email,
            subject: subject || prev.subject,
            message: message || prev.message
        }));
    }, [isAuthenticated, user, searchParams]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Merci pour votre message " + formData.name + " ! Mohamed reviendra vers vous sous peu.");
        setFormData(prev => ({ ...prev, message: "" }));
    };

    return (
        <div className="lg:col-span-6">
            {isAuthenticated && user ? (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8 p-4 bg-primary/5 border border-primary/10 rounded-sm flex items-center justify-between"
                >
                    <p className="text-[11px] font-medium text-foreground/80 uppercase tracking-wider">
                        Connecté en tant que <span className="font-bold text-primary">{user.name}</span>. Profil lié .
                    </p>
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-[9px] font-bold text-white">{user.name[0].toUpperCase()}</span>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8 p-4 bg-secondary/30 border border-border rounded-sm flex items-center justify-between"
                >
                    <p className="text-[11px] font-medium text-foreground/60 uppercase tracking-wider italic">
                        Une question personnalisée ? <button onClick={() => openAuthModal("Connectez-vous pour pré-remplir vos informations de contact.")} className="text-primary hover:underline font-bold transition-all">S'authentifier</button> pour pré-remplir ce formulaire .
                    </p>
                </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/60">Nom Complet</label>
                        <input
                            type="text"
                            name="name"
                            autoComplete="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full bg-transparent border-b border-border py-4 focus:outline-none focus:border-primary transition-colors italic text-sm"
                            placeholder="Jean-Luc Godard"
                        />
                    </div>
                    <div className="space-y-4">
                        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/60">Adresse E-mail</label>
                        <input
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-transparent border-b border-border py-4 focus:outline-none focus:border-primary transition-colors italic text-sm"
                            placeholder="jean@exemple.com"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/60">Objet de la demande</label>
                    <div className="relative">
                        <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-border py-4 focus:outline-none focus:border-primary transition-colors italic appearance-none cursor-pointer text-sm"
                        >
                            <option>Littérature & Collaboration Éditoriale</option>
                            <option>Expertise Ingénierie & Projets</option>
                            <option>Conférence & Événementiel</option>
                            <option>Autre sujet</option>
                        </select>
                        <div className="absolute right-0 bottom-4 pointer-events-none text-muted-foreground/40">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/60">Votre Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full bg-transparent border-b border-border py-4 focus:outline-none focus:border-primary transition-colors italic resize-none text-sm leading-relaxed"
                        placeholder="Décrivez votre projet ou votre question..."
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="bg-primary text-white w-full md:w-fit px-16 py-6 rounded-sm text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 flex items-center justify-center gap-4 group"
                >
                    Envoyer le message <Send size={14} className="group-hover:translate-x-2 transition-transform" />
                </button>
            </form>
        </div>
    );
}

export default function ContactPage() {
    return (
        <main className="flex flex-col min-h-screen bg-background selection:bg-primary selection:text-white">
            <Navbar />

            <section className="pt-48 pb-32 px-6 md:px-12 border-b border-border relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -z-10 skew-x-12 translate-x-1/2" />

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
                    <div className="lg:col-span-12 lg:mb-12">
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full"
                            >
                                <Sparkles size={12} className="text-primary" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Disponible pour collaboration</span>
                            </motion.div>
                            <h1 className="text-3xl md:text-5xl font-display font-bold leading-none">
                                Entrons en <span className="text-primary italic font-normal">Contact.</span>
                            </h1>
                        </div>
                    </div>

                    <div className="lg:col-span-5 space-y-12">
                        <p className="text-lg text-muted-foreground italic leading-relaxed max-w-sm">
                            "Toute grande collaboration commence par un premier mot, une première idée partagée."
                        </p>

                        <div className="space-y-10 pt-8">
                            <div className="flex items-center gap-8 group">
                                <div className="p-4 bg-primary text-white rounded-sm shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">E-mail Professionnel</span>
                                    <a href="mailto:atcmohamed16@gmail.com" className="block text-lg font-bold hover:text-primary transition-colors">atcmohamed16@gmail.com</a>
                                </div>
                            </div>

                            <div className="flex items-center gap-8 group">
                                <div className="p-4 bg-secondary border border-border text-foreground rounded-sm group-hover:scale-110 transition-transform duration-500">
                                    <Linkedin size={24} />
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Réseau Professionnel</span>
                                    <a href="https://www.linkedin.com/in/asikim-mohamed-tchahaye-605700131" target="_blank" rel="noopener noreferrer" className="block text-lg font-bold hover:text-primary transition-colors">linkedin.com/in/asikim-mohamed...</a>
                                </div>
                            </div>

                            <div className="flex items-center gap-8 group">
                                <div className="p-4 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 rounded-sm group-hover:scale-110 transition-transform duration-500">
                                    <MessageSquare size={24} />
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Urgence & WhatsApp</span>
                                    <a href="https://wa.me/14034010528" target="_blank" rel="noopener noreferrer" className="block text-lg font-bold hover:text-primary transition-colors">+1 403 401 0528</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 hidden lg:flex justify-center">
                        <div className="w-px h-full bg-border" />
                    </div>

                    <Suspense fallback={<div className="lg:col-span-6 animate-pulse bg-secondary/20 h-[600px]" />}>
                        <ContactForm />
                    </Suspense>
                </div>
            </section>

            <Footer />
        </main>
    );
}
