"use client";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

function ScrollToTopOnRoute() {
    const pathname = usePathname();
    const lenis = useLenis();

    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        }
    }, [pathname, lenis]);

    return null;
}

function ScrollToTopButton() {
    const lenis = useLenis();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => setVisible(window.scrollY > 500);

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        if (lenis) {
            lenis.scrollTo(0, { duration: 1.2 });
            return;
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    type="button"
                    initial={{ opacity: 0, y: 18, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 18, scale: 0.92 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-60 flex h-12 w-12 items-center justify-center border border-primary bg-primary text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-1 hover:bg-primary/90"
                    aria-label="Remonter en haut"
                >
                    <ChevronUp size={18} />
                </motion.button>
            )}
        </AnimatePresence>
    );
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.08,           // Fluidité (0 = instantané, 1 = jamais finit). 0.08 = premium
                duration: 1.4,        // Durée de la décélération en secondes
                smoothWheel: true,    // Smooth sur la molette
                wheelMultiplier: 0.9, // Sensibilité de la molette
                touchMultiplier: 1.5, // Sensibilité tactile
                infinite: false,
            }}
        >
            <ScrollToTopOnRoute />
            {children}
            <ScrollToTopButton />
        </ReactLenis>
    );
}
