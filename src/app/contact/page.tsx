"use client";
import React, { useState, useEffect, Suspense, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Mail, Linkedin, ArrowRight, ChevronDown, MapPin } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const subjects = [
    "Littérature & Collaboration Éditoriale",
    "Expertise Ingénierie & Projets",
    "Conférence & Événementiel",
    "Autre sujet",
];

const sideLinks = [
    {
        icon: Mail,
        href: "mailto:atcmohamed16@gmail.com",
        label: "Email",
    },
    {
        icon: MapPin,
        href: "https://maps.google.com/?q=Calgary,+Alberta,+Canada",
        label: "Localisation",
    },
    {
        icon: Linkedin,
        href: "https://www.linkedin.com/in/asikim-mohamed-tchahaye-605700131",
        label: "LinkedIn",
    },
];

function ContactForm() {
    const { user, isAuthenticated, openAuthModal } = useAuth();
    const searchParams = useSearchParams();
    const [subjectOpen, setSubjectOpen] = useState(false);
    const subjectRef = useRef<HTMLDivElement>(null);
    const [isSent, setIsSent] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: subjects[0],
        message: ""
    });

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

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (subjectRef.current && !subjectRef.current.contains(e.target as Node)) {
                setSubjectOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSent(true);
        setTimeout(() => {
            setIsSent(false);
            setFormData(prev => ({ ...prev, message: "" }));
        }, 3000);
    };

    const inputClassName =
        "w-full bg-transparent border-0 border-b border-border pb-3 text-base text-foreground placeholder:text-foreground/70 focus:outline-none focus:border-primary transition-colors";

    return (
        <div className="mt-14 border border-border bg-white p-8 md:p-10 lg:p-12">
            {isAuthenticated && user ? (
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10 border-l-2 border-primary pl-4"
                >
                    <p className="text-sm text-foreground/80">
                        Connecté en tant que <span className="font-semibold text-foreground">{user.name}</span>.
                    </p>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10 border-l-2 border-primary pl-4"
                >
                    <p className="text-sm text-foreground/80">
                        <button
                            type="button"
                            onClick={() => openAuthModal("Connectez-vous pour pré-remplir vos informations de contact.")}
                            className="font-semibold text-primary hover:underline"
                        >
                            Se connecter
                        </button>{" "}
                        pour pré-remplir vos informations.
                    </p>
                </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                    <div className="space-y-3">
                        <label className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground">Votre nom</label>
                        <input
                            type="text"
                            name="name"
                            autoComplete="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className={inputClassName}
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground">Adresse e-mail</label>
                        <input
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className={inputClassName}
                            placeholder="email@exemple.com"
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground">Objet</label>
                    <div ref={subjectRef} className="relative">
                        <button
                            type="button"
                            onClick={() => setSubjectOpen(!subjectOpen)}
                            className={cn(
                                "flex w-full items-center justify-between border-0 border-b pb-3 text-left text-base text-foreground transition-colors",
                                subjectOpen ? "border-primary" : "border-border hover:border-primary/70"
                            )}
                        >
                            <span className="truncate">{formData.subject}</span>
                            <ChevronDown
                                size={16}
                                className={cn("shrink-0 text-foreground/80 transition-transform duration-200", subjectOpen && "rotate-180")}
                            />
                        </button>

                        <AnimatePresence>
                            {subjectOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 8 }}
                                    transition={{ duration: 0.16 }}
                                    className="absolute left-0 right-0 top-full z-30 mt-2 border border-border bg-white shadow-xl"
                                >
                                    {subjects.map((s) => (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => {
                                                setFormData((prev) => ({ ...prev, subject: s }));
                                                setSubjectOpen(false);
                                            }}
                                            className={cn(
                                                "w-full px-4 py-3 text-left text-sm transition-colors",
                                                formData.subject === s
                                                    ? "bg-primary/10 font-semibold text-primary"
                                                    : "text-foreground hover:bg-secondary/40"
                                            )}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground">Parlez-nous de votre projet</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className={`${inputClassName} resize-none`}
                        placeholder="Comment pouvons-nous vous aider ?"
                    />
                </div>

                <div className="pt-6">
                    <AnimatePresence mode="wait">
                        {isSent ? (
                            <motion.p
                                key="success"
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 6 }}
                                className="border-l-2 border-primary pl-4 text-sm font-medium text-foreground"
                            >
                                Message envoyé avec succès. Nous revenons vers vous rapidement.
                            </motion.p>
                        ) : (
                            <motion.button
                                key="submit"
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 6 }}
                                type="submit"
                                className="inline-flex items-center gap-3 bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:bg-foreground"
                            >
                                Envoyer le message
                                <ArrowRight size={14} />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </form>
        </div>
    );
}

export default function ContactPage() {
    return (
        <main className="flex flex-col min-h-screen bg-white selection:bg-primary selection:text-white">
            <Navbar />

            <section className="px-4 pb-24 pt-32 md:px-8 lg:pl-[120px]">
                <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[88px] border-r border-border bg-white text-foreground lg:flex lg:flex-col lg:items-center lg:py-8">
                    <div className="mt-28 flex items-center gap-6 lg:flex-col">
                        {sideLinks.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                target={item.href.startsWith("mailto") ? undefined : "_blank"}
                                rel="noopener noreferrer"
                                aria-label={item.label}
                                className="text-foreground/65 transition-colors hover:text-primary"
                            >
                                <item.icon size={17} />
                            </a>
                        ))}
                    </div>

                    <p className="mb-6 mt-auto text-[10px] uppercase tracking-[0.24em] text-foreground/45 [writing-mode:vertical-rl]">
                        © 2026 KIMM CORP
                    </p>
                </aside>

                <div className="mx-auto max-w-7xl border border-primary/20 bg-white">
                    <div className="bg-white px-8 py-10 md:px-14 md:py-14 lg:px-16 lg:py-16">
                            <div className="grid grid-cols-1 gap-10 xl:grid-cols-[1.1fr_0.9fr] xl:gap-14">
                                <motion.div
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.35 }}
                                >
                                    <p className="mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Entrons en contact</p>
                                    <h1 className="font-display text-5xl font-bold leading-[0.9] tracking-tight md:text-7xl">
                                        Contact<span className="text-primary">.</span>
                                    </h1>
                                    <p className="mt-8 max-w-2xl text-xl leading-relaxed text-foreground/80 md:text-[2rem]">
                                        Nous sommes prêts à collaborer sur votre prochaine vision. Écrivez-nous pour discuter de la
                                        façon dont KIMM CORP peut donner vie à vos idées.
                                    </p>
                                </motion.div>

                                <motion.blockquote
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.08, duration: 0.35 }}
                                    className="border-l border-border pl-8 text-xl italic leading-relaxed text-foreground/80 xl:mt-16"
                                >
                                    &ldquo;L&apos;excellence n&apos;est pas un acte, mais une habitude. Nous construisons cette habitude dans
                                    chaque relation client.&rdquo;
                                    <footer className="mt-6 text-xs not-italic font-semibold uppercase tracking-[0.2em] text-primary">
                                        — Équipe dirigeante KIMM
                                    </footer>
                                </motion.blockquote>
                            </div>

                            <Suspense fallback={<div className="mt-14 h-[520px] animate-pulse border border-border bg-white" />}>
                                <ContactForm />
                            </Suspense>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
