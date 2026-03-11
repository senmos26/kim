import type { Metadata } from "next";
import { Lora, Playfair_Display, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KIMMCORP | Mohamed Asikim TCHAHAYE - Auteur & Ingénieur",
  description: "Espace littéraire et technique de Mohamed Asikim TCHAHAYE. Retouvez ses œuvres et réalisations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body
        className={cn(
          lora.variable,
          playfair.variable,
          "antialiased bg-background text-foreground min-h-screen font-sans"
        )}
      >
        <AuthProvider>
          <LanguageProvider>
            <SmoothScrollProvider>
              {children}
            </SmoothScrollProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
