import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="border-t border-border bg-background py-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
                <div className="col-span-1 md:col-span-2">
                    <Link href="/" className="font-display text-2xl font-bold tracking-tight">
                        KIMM<span className="text-primary italic font-medium font-display">CORP</span>
                    </Link>
                    <p className="mt-8 text-muted-foreground max-w-sm text-sm leading-loose">
                        Exploration de la dualité entre l'ingénierie électronique et l'expression littéraire.
                        Une vision unifiée pour un monde en constante évolution.
                    </p>
                    <div className="flex gap-6 mt-10">
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                            <Twitter size={20} />
                        </a>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                            <Linkedin size={20} />
                        </a>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                            <Mail size={20} />
                        </a>
                    </div>
                </div>

                <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-10 text-foreground/40">Navigation</h4>
                    <ul className="space-y-6 text-[13px] font-bold uppercase tracking-widest text-foreground/70">
                        <li><Link href="/" className="hover:text-primary transition-colors">Accueil</Link></li>
                        <li><Link href="/books" className="hover:text-primary transition-colors">Ouvrages</Link></li>
                        <li><Link href="/blog" className="hover:text-primary transition-colors">Articles</Link></li>
                        <li><Link href="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-10 text-foreground/40">Bureau</h4>
                    <ul className="space-y-6 text-[13px] font-medium text-muted-foreground">
                        <li>Casablanca, Maroc</li>
                        <li>contact@kimmcorp.com</li>
                        <li>+212 (0) 5XX XX XX XX</li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                <div>© {new Date().getFullYear()} KIMMCORP. Tous droits réservés.</div>
                <div className="flex gap-10">
                    <a href="#" className="hover:text-primary transition-colors">Mentions Légales</a>
                    <a href="#" className="hover:text-primary transition-colors">Confidentialité</a>
                </div>
            </div>
        </footer>
    );
};
