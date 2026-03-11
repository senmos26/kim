"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "FR" | "EN";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
    FR: {
        "nav.home": "Accueil",
        "nav.books": "Ouvrages",
        "nav.articles": "Articles",
        "nav.portfolio": "Portfolio",
        "nav.events": "Événements",
        "nav.about": "À Propos",
        "nav.contact": "Contact",
        "nav.login": "Connexion",
        "nav.logout": "Se déconnecter",
        "hero.title1": "Concevoir le système.",
        "hero.title2": "Écrire l'avenir.",
        "hero.desc1": "À la croisée de l'ingénierie rigoureuse et de la puissance narrative.",
        "hero.desc2": "architecte de systèmes complexes par le calcul, bâtisseur d'univers par la plume.",
        "hero.iam": "Je suis",
        "hero.cta.book": "Lire ses écrits",
        "hero.cta.work": "Explorer ses projets",
        "hero.badge": "INGÉNIEUR & AUTEUR",
        "blog.title": "Pensées & Analyses.",
        "blog.subtitle": "Un espace dédié à la confluence entre design hardware et poésie narrative.",
        "books.title": "La Collection Éditoriale.",
        "books.subtitle": "Un voyage entre raison technique et émotion littéraire.",
        "contact.title": "Entrons en Contact.",
        "contact.subtitle": "Une idée, un projet ou simplement envie d'échanger ?",
        "footer.rights": "Tous droits réservés.",
        "auth.reason.default": "Accédez à toutes les fonctionnalités exclusives de KIMMCORP.",
    },
    EN: {
        "nav.home": "Home",
        "nav.books": "Books",
        "nav.articles": "Articles",
        "nav.portfolio": "Portfolio",
        "nav.events": "Events",
        "nav.about": "About",
        "nav.contact": "Contact",
        "nav.login": "Login",
        "nav.logout": "Logout",
        "hero.title1": "Design the system.",
        "hero.title2": "Write the future.",
        "hero.desc1": "At the crossroads of rigorous engineering and narrative power.",
        "hero.desc2": "architect of complex systems via calculation, builder of universes via the pen.",
        "hero.iam": "I am",
        "hero.cta.book": "Read his writings",
        "hero.cta.work": "Explore his projects",
        "hero.badge": "ENGINEER & AUTHOR",
        "blog.title": "Thoughts & Analysis.",
        "blog.subtitle": "A space dedicated to the confluence of hardware design and narrative poetry.",
        "books.title": "The Editorial Collection.",
        "books.subtitle": "A journey between technical reason and literary emotion.",
        "contact.title": "Let's Connect.",
        "contact.subtitle": "An idea, a project, or just want to chat?",
        "footer.rights": "All rights reserved.",
        "auth.reason.default": "Access all exclusive features of KIMMCORP.",
    }
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState<Language>("FR");

    useEffect(() => {
        const saved = localStorage.getItem("kimm_lang") as Language;
        if (saved && (saved === "FR" || saved === "EN")) {
            setLanguage(saved);
        }
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("kimm_lang", lang);
    };

    const t = (key: string) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
    return context;
};
