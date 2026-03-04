import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Mail, Globe, Send, Linkedin, MessageSquare } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="flex flex-col min-h-screen bg-background">
            <Navbar />

            <section className="pt-48 pb-32 px-6 md:px-12 border-b border-border">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
                    <div className="lg:col-span-5 space-y-12">
                        <h1 className="text-4xl md:text-6xl font-display font-bold leading-none">Entrons en <span className="text-primary italic font-normal">Contact.</span></h1>
                        <p className="text-xl text-muted-foreground italic leading-relaxed max-w-sm">
                            "Toute grande collaboration commence par un premier mot, une première idée partagée."
                        </p>

                        <div className="space-y-10 pt-8">
                            <div className="flex items-center gap-8 group">
                                <div className="p-4 bg-primary text-white rounded-sm">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">E-mail Professionnel</span>
                                    <a href="mailto:atcmohamed16@gmail.com" className="block text-lg font-bold hover:text-primary transition-colors">atcmohamed16@gmail.com</a>
                                </div>
                            </div>

                            <div className="flex items-center gap-8 group">
                                <div className="p-4 bg-secondary border border-border text-foreground rounded-sm">
                                    <Linkedin size={24} />
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Réseau Professionnel</span>
                                    <a href="https://www.linkedin.com/in/asikim-mohamed-tchahaye-605700131" target="_blank" rel="noopener noreferrer" className="block text-lg font-bold hover:text-primary transition-colors">linkedin.com/in/asikim-mohamed...</a>
                                </div>
                            </div>

                            <div className="flex items-center gap-8 group">
                                <div className="p-4 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 rounded-sm">
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

                    <div className="lg:col-span-6">
                        <form className="space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/60">Nom Complet</label>
                                    <input type="text" className="w-full bg-transparent border-b border-border py-4 focus:outline-none focus:border-primary transition-colors italic" placeholder="Jean-Luc Godard" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/60">Adresse E-mail</label>
                                    <input type="email" className="w-full bg-transparent border-b border-border py-4 focus:outline-none focus:border-primary transition-colors italic" placeholder="jean@exemple.com" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/60">Objet de la demande</label>
                                <select className="w-full bg-transparent border-b border-border py-4 focus:outline-none focus:border-primary transition-colors italic appearance-none cursor-pointer">
                                    <option>Littérature & Collaboration Éditoriale</option>
                                    <option>Expertise Ingénierie & Projets</option>
                                    <option>Conférence & Événementiel</option>
                                    <option>Autre sujet</option>
                                </select>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/60">Votre Message</label>
                                <textarea rows={6} className="w-full bg-transparent border-b border-border py-4 focus:outline-none focus:border-primary transition-colors italic resize-none" placeholder="Décrivez votre projet ou votre question..."></textarea>
                            </div>

                            <button className="bg-primary text-white w-full md:w-fit px-16 py-6 rounded-sm text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 flex items-center justify-center gap-4 group">
                                Envoyer le message <Send size={18} className="group-hover:translate-x-2 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
