"use client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Zap, Globe, Clock3, Building2, MapPin, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { ShareButton } from "@/components/ui/ShareButton";

import React from "react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { getPortfolioProjectById, getRelatedPortfolioProjects, portfolioProjects } from "@/data/portfolio";

function getConfidentialityLabel(level: "public" | "anonymized" | "private_case") {
    switch (level) {
        case "anonymized":
            return "Cas anonymisé";
        case "private_case":
            return "Projet confidentiel";
        default:
            return "Cas public";
    }
}

export default function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = React.use(params);
    const project = getPortfolioProjectById(slug) || portfolioProjects[0];
    const relatedProjects = getRelatedPortfolioProjects(project.relatedProjects);

    return (
        <main className="flex flex-col min-h-screen bg-background selection:bg-primary selection:text-white">
            <Navbar />

            {/* Case Study Hero */}
            <section className="pt-48 pb-20 px-6 md:px-12 bg-background">
                <div className="max-w-7xl mx-auto">
                    <Link href="/portfolio" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-primary hover:-translate-x-2 transition-transform mb-20">
                        <ArrowLeft size={16} /> Retour au portfolio
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                        <div className="lg:col-span-8">
                            <div className="flex flex-wrap justify-between items-center gap-6 mb-10">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-primary underline underline-offset-12 decoration-primary/30">{project.category}</span>
                                    <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-foreground/60 border border-border px-3 py-1.5 bg-background">{project.status === "featured" ? "À la une" : project.status === "confidential" ? "Confidentiel" : project.status === "archived" ? "Archive" : "Publié"}</span>
                                    {project.featured && <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-white border border-primary px-3 py-1.5 bg-primary">Vedette</span>}
                                </div>
                                <ShareButton title={project.title} url={`/portfolio/${slug}`} variant="outline" />
                            </div>

                            <h1 className="text-4xl md:text-6xl font-display font-bold leading-[0.95] text-foreground mb-8 tracking-tighter italic">
                                {project.title}
                            </h1>

                            <p className="text-lg md:text-2xl text-foreground/72 leading-relaxed max-w-4xl mb-10">
                                {project.subtitle}
                            </p>

                            <p className="text-2xl md:text-3xl text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-12 py-4 max-w-3xl font-sans">
                                "{project.quote}"
                            </p>

                            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="border border-border p-6 space-y-3 bg-white">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/45">Contexte</p>
                                    <div className="text-sm text-foreground/72 leading-relaxed [&_p]:mb-4 [&_strong]:text-foreground" dangerouslySetInnerHTML={{ __html: project.introHtml }} />
                                </div>
                                <div className="border border-border p-6 space-y-4 bg-background">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/45">Mission</p>
                                    <div className="flex flex-wrap gap-3">
                                        <span className="text-[9px] font-bold uppercase tracking-[0.24em] px-3 py-1 bg-secondary border border-border text-foreground/75">{project.engagementType}</span>
                                        <span className="text-[9px] font-bold uppercase tracking-[0.24em] px-3 py-1 bg-primary/5 border border-primary/15 text-primary">{project.metricHighlight}</span>
                                    </div>
                                    <ul className="space-y-3 text-sm text-foreground/72 leading-relaxed">
                                        {project.objectives.slice(0, 3).map((objective) => (
                                            <li key={objective} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> <span>{objective}</span></li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-4 lg:pt-24 space-y-16">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Secteur</span>
                                    <p className="text-xl font-display font-bold tracking-tight">{project.sector}</p>
                                </div>
                                <div className="space-y-4">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Rôle</span>
                                    <p className="text-xl font-display font-bold tracking-tight">{project.role}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Client</span>
                                    <p className="text-base font-medium tracking-tight inline-flex items-center gap-2"><Building2 size={16} className="text-primary" /> {project.clientName}</p>
                                </div>
                                <div className="space-y-4">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Confidentialité</span>
                                    <p className="text-base font-medium tracking-tight inline-flex items-center gap-2"><ShieldCheck size={16} className="text-primary" /> {getConfidentialityLabel(project.confidentialityLevel)}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Durée</span>
                                    <p className="text-base font-medium tracking-tight inline-flex items-center gap-2"><Clock3 size={16} className="text-primary" /> {project.duration}</p>
                                </div>
                                <div className="space-y-4">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Localisation</span>
                                    <p className="text-base font-medium tracking-tight inline-flex items-center gap-2"><MapPin size={16} className="text-primary" /> {project.location}</p>
                                </div>
                            </div>
                            <div className="space-y-8">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Technologies</span>
                                <div className="flex flex-wrap gap-4">
                                    {project.tech.map((t: string) => (
                                        <span key={t} className="text-[10px] font-bold uppercase tracking-widest border border-border px-6 py-3 bg-white hover:border-primary/20 transition-colors">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Narrative */}
            <section className="py-32 px-6 md:px-12 bg-background border-t border-border mt-12 mb-20">
                <div className="max-w-5xl mx-auto space-y-32">
                    <div className="relative aspect-21/9 bg-white border border-border overflow-hidden group shadow-2xl">
                        <img
                            src={project.coverImage}
                            alt={project.coverImageAlt}
                            className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-1000" />
                    </div>

                    <article className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
                        <div className="md:col-span-5 space-y-8">
                            <h2 className="text-4xl font-display font-bold italic tracking-tight underline decoration-primary/20 underline-offset-8">Le Défi Technique</h2>
                            <div className="text-xl text-muted-foreground leading-relaxed font-sans [&_p]:mb-5 [&_strong]:text-foreground" dangerouslySetInnerHTML={{ __html: project.challengeHtml }} />

                            <div className="space-y-5 pt-6 border-t border-border">
                                <h3 className="text-[11px] font-bold uppercase tracking-[0.35em] text-primary">Contraintes</h3>
                                <ul className="space-y-4 text-sm text-foreground/72 leading-relaxed">
                                    {project.constraints.map((constraint) => (
                                        <li key={constraint} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> <span>{constraint}</span></li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {project.metrics.slice(0, 4).map((metric, idx) => (
                                <div key={metric.label} className="p-10 border border-border bg-white space-y-8 hover:border-primary/20 transition-colors group">
                                    {idx % 2 === 0 ? <Zap size={36} className="text-primary group-hover:scale-110 transition-transform" /> : <Globe size={36} className="text-primary group-hover:scale-110 transition-transform" />}
                                    <div className="space-y-3">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary">{metric.label}</p>
                                        <h4 className="text-2xl font-display font-bold">{metric.value}</h4>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed text-sm">{metric.description}</p>
                                </div>
                            ))}
                        </div>
                    </article>

                    <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 py-8 border-y border-border">
                        <div className="lg:col-span-4 space-y-5">
                            <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-primary">Approche</span>
                            <div className="text-foreground/72 leading-relaxed [&_p]:mb-4 [&_strong]:text-foreground" dangerouslySetInnerHTML={{ __html: project.solutionHtml }} />
                        </div>
                        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-foreground/50">Responsabilités</h3>
                                <ul className="space-y-3 text-sm text-foreground/72 leading-relaxed">
                                    {project.responsibilities.map((item) => (
                                        <li key={item} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> <span>{item}</span></li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-foreground/50">Livrables</h3>
                                <ul className="space-y-3 text-sm text-foreground/72 leading-relaxed">
                                    {project.deliverables.map((item) => (
                                        <li key={item} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> <span>{item}</span></li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-foreground/50">Highlights techniques</h3>
                                <ul className="space-y-3 text-sm text-foreground/72 leading-relaxed">
                                    {project.technicalHighlights.map((item) => (
                                        <li key={item} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> <span>{item}</span></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-10">
                        <div className="max-w-3xl space-y-4">
                            <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-primary">Résultats</span>
                            <div className="text-foreground/72 leading-relaxed [&_p]:mb-4 [&_strong]:text-foreground" dangerouslySetInnerHTML={{ __html: project.resultsHtml }} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {project.gallery.map((item) => (
                                <figure key={item.src} className="border border-border bg-background overflow-hidden">
                                    <div className="relative aspect-video">
                                        <img src={item.src} alt={item.alt} className="absolute inset-0 h-full w-full object-cover" />
                                    </div>
                                    {item.caption && (
                                        <figcaption className="p-5 text-sm text-foreground/65 leading-relaxed border-t border-border">{item.caption}</figcaption>
                                    )}
                                </figure>
                            ))}
                        </div>
                    </section>

                    {relatedProjects.length > 0 && (
                        <section className="space-y-12 pt-10 border-t border-border">
                            <div className="max-w-2xl">
                                <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-primary">Projets liés</span>
                                <h2 className="text-3xl md:text-4xl font-display font-bold italic tracking-tight mt-4">Explorer des problématiques proches.</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-8">
                                {relatedProjects.slice(0, 2).map((relatedProject, idx) => (
                                    <ProjectCard
                                        key={relatedProject.id}
                                        href={`/portfolio/${relatedProject.id}`}
                                        title={relatedProject.title}
                                        subtitle={relatedProject.subtitle}
                                        desc={relatedProject.excerpt}
                                        category={relatedProject.category}
                                        sector={relatedProject.sector}
                                        clientName={relatedProject.clientName}
                                        status={relatedProject.status}
                                        featured={relatedProject.featured}
                                        year={relatedProject.year}
                                        duration={relatedProject.duration}
                                        engagementType={relatedProject.engagementType}
                                        metricHighlight={relatedProject.metricHighlight}
                                        tech={relatedProject.tech}
                                        tags={relatedProject.tags}
                                        image={relatedProject.coverImage}
                                        index={idx}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    <div className="pt-24 border-t border-border flex flex-col lg:flex-row justify-between items-center gap-16">
                        <div className="text-center lg:text-left max-w-2xl">
                            <h3 className="text-3xl font-display font-bold italic mb-4">Besoin d'une expertise technique de haut niveau ?</h3>
                            <p className="text-muted-foreground text-lg italic">De la preuve de concept à l'industrialisation, Mohamed Asikim accompagne vos projets les plus critiques.</p>
                        </div>
                        <div className="flex flex-wrap gap-8">
                            <Link href="/contact" className="bg-primary text-white px-16 py-6 rounded-sm text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-primary/90 transition-all shadow-2xl shadow-primary/20">
                                {project.ctaLabel}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
