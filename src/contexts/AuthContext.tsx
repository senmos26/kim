"use client";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
export interface AuthUser {
    id: string;
    email: string;
    name: string;
}

interface AuthSession {
    user: AuthUser;
    token: string;
    expiresAt: number; // timestamp ms
}

interface AuthContextType {
    user: AuthUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<{ error: string | null }>;
    signup: (name: string, email: string, password: string) => Promise<{ error: string | null }>;
    logout: () => void;

    // Modal state
    showAuthModal: boolean;
    authReason: string;
    openAuthModal: (reason?: string) => void;
    closeAuthModal: () => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const SESSION_KEY = "kimm_auth_session";
const USERS_KEY = "kimm_auth_users";   // "base de données" fictive en localStorage
const TOKEN_TTL = 7 * 24 * 60 * 60 * 1000; // 7 jours

function generateId() {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function generateToken() {
    return Array.from({ length: 40 }, () => Math.random().toString(36)[2] || "0").join("");
}

function getStoredUsers(): Record<string, { id: string; name: string; email: string; passwordHash: string }> {
    if (typeof window === "undefined") return {};
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
    } catch {
        return {};
    }
}

function saveUser(user: { id: string; name: string; email: string; passwordHash: string }) {
    const users = getStoredUsers();
    users[user.email] = user;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getStoredSession(): AuthSession | null {
    if (typeof window === "undefined") return null;
    try {
        const raw = localStorage.getItem(SESSION_KEY);
        if (!raw) return null;
        const session: AuthSession = JSON.parse(raw);
        if (Date.now() > session.expiresAt) {
            localStorage.removeItem(SESSION_KEY);
            return null;
        }
        return session;
    } catch {
        return null;
    }
}

function saveSession(session: AuthSession) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function clearSession() {
    localStorage.removeItem(SESSION_KEY);
}

// Simulation d'un hash basique (à remplacer par bcrypt côté Supabase plus tard)
function simpleHash(password: string): string {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        hash = (hash << 5) - hash + password.charCodeAt(i);
        hash |= 0;
    }
    return "h_" + Math.abs(hash).toString(36) + "_" + password.length;
}

// ─── Context ─────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Modal global state
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authReason, setAuthReason] = useState("");

    const openAuthModal = useCallback((reason?: string) => {
        setAuthReason(reason || "");
        setShowAuthModal(true);
    }, []);

    const closeAuthModal = useCallback(() => {
        setShowAuthModal(false);
    }, []);

    // Au montage : vérifier si une session valide existe (= refresh token auto)
    useEffect(() => {
        const session = getStoredSession();
        if (session) {
            // Renouveler le token automatiquement (simule le refresh token)
            const refreshed: AuthSession = {
                ...session,
                expiresAt: Date.now() + TOKEN_TTL,
            };
            saveSession(refreshed);
            setUser(session.user);
        }
        setIsLoading(false);
    }, []);

    const login = useCallback(async (email: string, password: string): Promise<{ error: string | null }> => {
        const users = getStoredUsers();
        const stored = users[email.toLowerCase()];

        if (!stored) {
            return { error: "Aucun compte trouvé pour cet email." };
        }
        if (stored.passwordHash !== simpleHash(password)) {
            return { error: "Mot de passe incorrect." };
        }

        const authUser: AuthUser = { id: stored.id, email: stored.email, name: stored.name };
        const session: AuthSession = {
            user: authUser,
            token: generateToken(),
            expiresAt: Date.now() + TOKEN_TTL,
        };

        saveSession(session);
        setUser(authUser);
        return { error: null };
    }, []);

    const signup = useCallback(async (name: string, email: string, password: string): Promise<{ error: string | null }> => {
        if (password.length < 6) {
            return { error: "Le mot de passe doit contenir au moins 6 caractères." };
        }

        const users = getStoredUsers();
        if (users[email.toLowerCase()]) {
            return { error: "Un compte existe déjà avec cet email." };
        }

        const newUser = {
            id: generateId(),
            name: name.trim(),
            email: email.toLowerCase(),
            passwordHash: simpleHash(password),
        };

        saveUser(newUser);

        const authUser: AuthUser = { id: newUser.id, email: newUser.email, name: newUser.name };
        const session: AuthSession = {
            user: authUser,
            token: generateToken(),
            expiresAt: Date.now() + TOKEN_TTL,
        };

        saveSession(session);
        setUser(authUser);
        return { error: null };
    }, []);

    const logout = useCallback(() => {
        clearSession();
        setUser(null);
        closeAuthModal(); // On ferme le modal si jamais il était ouvert
    }, [closeAuthModal]);

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            isAuthenticated: !!user,
            login,
            signup,
            logout,
            showAuthModal,
            authReason,
            openAuthModal,
            closeAuthModal,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
