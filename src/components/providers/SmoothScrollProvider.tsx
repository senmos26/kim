"use client";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

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
        </ReactLenis>
    );
}
