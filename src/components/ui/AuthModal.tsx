"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, Eye, EyeOff, AlertCircle, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    /** Message affiché en haut du modal pour expliquer pourquoi l'auth est requise */
    reason?: string;
}

type Mode = "login" | "signup";

export function AuthModal({ isOpen, onClose, reason }: AuthModalProps) {
    const { login, signup } = useAuth();

    const [mode, setMode] = useState<Mode>("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const resetForm = () => {
        setName("");
        setEmail("");
        setPassword("");
        setError(null);
        setShowPassword(false);
    };

    const handleSwitch = (m: Mode) => {
        resetForm();
        setMode(m);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        let result: { error: string | null };

        if (mode === "login") {
            result = await login(email, password);
        } else {
            if (!name.trim()) {
                setError("Veuillez entrer votre prénom.");
                setIsLoading(false);
                return;
            }
            result = await signup(name, email, password);
        }

        setIsLoading(false);

        if (result.error) {
            setError(result.error);
        } else {
            resetForm();
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-background/80 backdrop-blur-md"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 16 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-md bg-background border border-border shadow-2xl overflow-hidden"
                    >
                        {/* Top accent */}
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary" />

                        {/* Close */}
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="px-10 pt-12 pb-10 space-y-8">
                            {/* Header */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-primary mb-4">
                                    <Sparkles size={16} />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
                                        KIMMCORP Blog
                                    </span>
                                </div>
                                <h2 className="text-2xl font-display font-bold italic tracking-tight text-foreground">
                                    {mode === "login" ? "Content de vous revoir." : "Rejoignez la communauté."}
                                </h2>
                                {reason && (
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {reason}
                                    </p>
                                )}
                            </div>

                            {/* Tab switcher */}
                            <div className="flex border border-border">
                                {(["login", "signup"] as Mode[]).map((m) => (
                                    <button
                                        key={m}
                                        onClick={() => handleSwitch(m)}
                                        className={cn(
                                            "flex-1 py-3 text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-200",
                                            mode === m
                                                ? "bg-foreground text-background"
                                                : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        {m === "login" ? "Connexion" : "Inscription"}
                                    </button>
                                ))}
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Name (signup only) */}
                                <AnimatePresence mode="wait">
                                    {mode === "signup" && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="relative">
                                                <User
                                                    size={15}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40"
                                                />
                                                <input
                                                    type="text"
                                                    name="name"
                                                    autoComplete="name"
                                                    value={name}
                                                    onChange={e => setName(e.target.value)}
                                                    placeholder="VOTRE NOM COMPLET"
                                                    className="w-full bg-secondary/30 border border-border pl-10 pr-4 py-4 text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/40"
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Email */}
                                <div className="relative">
                                    <Mail
                                        size={15}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="VOTRE EMAIL"
                                        required
                                        className="w-full bg-secondary/30 border border-border pl-10 pr-4 py-4 text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/40"
                                    />
                                </div>

                                {/* Password */}
                                <div className="relative">
                                    <Lock
                                        size={15}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40"
                                    />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        autoComplete={mode === "login" ? "current-password" : "new-password"}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder="MOT DE PASSE"
                                        required
                                        className="w-full bg-secondary/30 border border-border pl-10 pr-12 py-4 text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/40"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(v => !v)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-foreground transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                </div>

                                {/* Hint for signup */}
                                {mode === "signup" && (
                                    <p className="text-[9px] font-medium text-muted-foreground/50 uppercase tracking-wider -mt-2">
                                        Minimum 6 caractères
                                    </p>
                                )}

                                {/* Error */}
                                <AnimatePresence>
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-start gap-3 bg-red-50 border border-red-200 p-4"
                                        >
                                            <AlertCircle size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                                            <p className="text-[11px] font-medium text-red-600">{error}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={cn(
                                        "w-full py-4 text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300",
                                        isLoading
                                            ? "bg-primary/50 text-white cursor-wait"
                                            : "bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20"
                                    )}
                                >
                                    {isLoading
                                        ? "..."
                                        : mode === "login"
                                            ? "Se connecter"
                                            : "Créer mon compte"}
                                </button>
                            </form>

                            {/* Footer note */}
                            <p className="text-[9px] text-center text-muted-foreground/40 uppercase tracking-wider">
                                {mode === "login"
                                    ? "Pas encore de compte ? "
                                    : "Déjà membre ? "}
                                <button
                                    onClick={() => handleSwitch(mode === "login" ? "signup" : "login")}
                                    className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
                                >
                                    {mode === "login" ? "Inscrivez-vous" : "Connectez-vous"}
                                </button>
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
