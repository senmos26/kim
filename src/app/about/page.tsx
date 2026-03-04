import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function AboutPage() {
    return (
        <main className="flex flex-col min-h-screen bg-background">
            <Navbar />

            <section className="pt-48 pb-32 px-6 md:px-12 border-b border-border">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
                    <div className="lg:col-span-5 relative">
                        <div className="relative aspect-[3/4] bg-secondary border border-border overflow-hidden shadow-2xl">
                            <img
                                src="/assets/images/kim.jpg"
                                alt="Mohamed Asikim TCHAHAYE - Portrait"
                                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 hover:scale-105"
                            />
                            {/* Subtle light overlay instead of placeholder */}
                            <div className="absolute inset-0 ring-1 ring-inset ring-black/5" />
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary/20 backdrop-blur-xl border border-primary/20 flex items-center justify-center p-8 text-center hidden md:flex">
                            <span className="text-xs font-bold uppercase tracking-widest text-primary">Auteur & Ingénieur</span>
                        </div>
                    </div>

                    <div className="lg:col-span-7 space-y-12">
                        <h1 className="text-4xl md:text-6xl font-display font-bold leading-none">
                            Mohamed Asikim <br /> <span className="text-primary italic font-normal text-[0.8em]">TCHAHAYE.</span>
                        </h1>
                        <div className="space-y-8 text-xl text-muted-foreground leading-loose italic border-l-4 border-primary/20 pl-10">
                            <p>"Je bâtis des systèmes avec la même précision que je cisèle mes métaphores."</p>
                        </div>
                        <div className="space-y-8 text-[17px] leading-relaxed text-foreground/80 font-sans">
                            <p>
                                <strong>Mohamed Asikim TCHAHAYE</strong> est un ingénieur électricien chevronné et auteur, évoluant à l'intersection de la rigueur industrielle et de l'exploration littéraire. Fort d'un parcours international entre le Maroc et le Canada (Pylon Electronics, Capgemini Engineering), il apporte une vision unique aux défis technologiques complexes.
                            </p>
                            <p>
                                Expert en métrologie, instrumentation et conception de systèmes mecatroniques, il a dirigé des projets d'envergure, de la coordination d'applications innovantes comme ROD App à l'optimisation de chaînes de production. Parallèlement, sa plume interroge notre rapport à la technique et à l'humain.
                            </p>
                            <p>
                                À travers KIMMCORP, il fusionne ces deux mondes, prouvant que l'innovation de demain ne naît pas seulement d'équations, mais aussi d'une profonde compréhension poétique du monde qui nous entoure.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-32 px-6 md:px-12 bg-secondary/10">
                <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12">
                    <div className="text-center md:text-left space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">Expérience Core</h4>
                        <p className="text-4xl font-display font-bold">5+ Années</p>
                    </div>
                    <div className="text-center md:text-left space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">Expertise Technique</h4>
                        <p className="text-4xl font-display font-bold">Électrique/Design</p>
                    </div>
                    <div className="text-center md:text-left space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">Innovation</h4>
                        <p className="text-4xl font-display font-bold">Canada/Maroc</p>
                    </div>
                    <div className="text-center md:text-left space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">Interventions</h4>
                        <p className="text-4xl font-display font-bold">Auteur/Ingénieur</p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
