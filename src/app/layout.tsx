import type { Metadata } from "next";
import { Lora, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

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
    <html lang="fr" suppressHydrationWarning>
      <body
        className={cn(
          lora.variable,
          playfair.variable,
          "antialiased bg-background text-foreground min-h-screen font-sans"
        )}
      >
        {children}
      </body>
    </html>
  );
}
