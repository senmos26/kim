"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
    ArrowLeft,
    Clock,
    Share2,
    ThumbsUp,
    MessageCircle,
    Tag as TagIcon,
    ChevronRight,
    Sparkles,
    X,
    Copy,
    Check,
    Twitter,
    Linkedin,
    Mail,
    Send,
    LogOut
} from "lucide-react";
import Link from "next/link";
import { ShareButton } from "@/components/ui/ShareButton";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/ui/AuthModal";

import { articlesData } from "@/data/articles";

// Helper: Formatage de date
function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

// Helper: Calcul du temps de lecture (basé sur les blocs de texte)
function computeReadingTime(content: any[]) {
    const text = content.map(c => c.text).join(" ");
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(3, Math.round(words / 200));
    return `${minutes} min de lecture`;
}

// Helper: Extraction des points clés (highlights)
function extractHighlights(content: any[]) {
    return content
        .filter(c => c.type === 'p')
        .slice(0, 3)
        .map(c => c.text.split('.')[0] + '.');
}

// ─── Types ───────────────────────────────────────────────────────────────────
interface Comment {
    id: string;
    authorName: string;
    authorEmail: string;
    text: string;
    createdAt: string;
}

function getCommentsKey(slug: string) { return `kimm_comments_${slug}`; }
function getLikesKey(slug: string) { return `kimm_likes_${slug}`; }

function loadComments(slug: string): Comment[] {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem(getCommentsKey(slug)) || "[]"); }
    catch { return []; }
}
function saveComments(slug: string, comments: Comment[]) {
    localStorage.setItem(getCommentsKey(slug), JSON.stringify(comments));
}
function hasUserLiked(slug: string, userId: string): boolean {
    if (typeof window === "undefined") return false;
    try {
        const likes: string[] = JSON.parse(localStorage.getItem(getLikesKey(slug)) || "[]");
        return likes.includes(userId);
    } catch { return false; }
}
function toggleUserLike(slug: string, userId: string): boolean {
    const key = getLikesKey(slug);
    const likes: string[] = JSON.parse(localStorage.getItem(key) || "[]");
    const idx = likes.indexOf(userId);
    if (idx === -1) { likes.push(userId); localStorage.setItem(key, JSON.stringify(likes)); return true; }
    else { likes.splice(idx, 1); localStorage.setItem(key, JSON.stringify(likes)); return false; }
}

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = React.use(params);
    const article = articlesData[slug] || articlesData["electronique-ecriture"];
    const { user, logout, isAuthenticated, openAuthModal } = useAuth();

    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState<Comment[]>([]);
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState<number>(article.likes_count);
    const [showSharePopup, setShowSharePopup] = useState(false);
    const [commentLoading, setCommentLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    // Initial load for comments and likes
    useEffect(() => {
        setComments(loadComments(slug));
        if (isAuthenticated && user) {
            setLiked(hasUserLiked(slug, user.id));
        }
    }, [slug, isAuthenticated, user]);

    // Scroll to top on slug change
    useEffect(() => { window.scrollTo(0, 0); }, [slug]);

    const requireAuth = (reason: string, then: () => void) => {
        if (!isAuthenticated) {
            openAuthModal(reason);
            return;
        }
        then();
    };

    const handleLike = () => {
        requireAuth("Connectez-vous pour soutenir cet article avec un J'aime.", () => {
            const nowLiked = toggleUserLike(slug, user!.id);
            setLiked(nowLiked);
            setLikeCount((prev: number) => nowLiked ? prev + 1 : prev - 1);
        });
    };

    const handleAddComment = () => {
        requireAuth("Connectez-vous pour laisser un commentaire.", () => {
            if (!commentText.trim()) return;
            setCommentLoading(true);
            setTimeout(() => {
                const newComment: Comment = {
                    id: Math.random().toString(36).slice(2),
                    authorName: user!.name,
                    authorEmail: user!.email,
                    text: commentText.trim(),
                    createdAt: new Date().toISOString(),
                };
                const updated = [newComment, ...comments];
                saveComments(slug, updated);
                setComments(updated);
                setCommentText("");
                setCommentLoading(false);
            }, 400);
        });
    };

    const highlights = useMemo(() => extractHighlights(article.content), [article]);
    const readingTime = useMemo(() => computeReadingTime(article.content), [article]);
    const relatedArticles = Object.values(articlesData)
        .filter(a => a.id !== article.id && a.category === article.category)
        .slice(0, 2);

    const handleCopyLink = () => {
        const url = typeof window !== "undefined" ? window.location.href : "";
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="flex flex-col min-h-screen bg-background selection:bg-primary selection:text-white">
            <Navbar />

            {/* Article Hero - Design Premium */}
            <section className="relative pt-48 pb-20 px-6 md:px-12 bg-background overflow-hidden">
                {/* Abstract Background Element */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/30 -z-10 skew-x-12 translate-x-1/2" />

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
                    <div className="lg:col-span-8 space-y-10">
                        <Link href="/blog" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-primary hover:-translate-x-2 transition-transform group">
                            <ArrowLeft size={16} className="group-hover:text-primary transition-colors" /> Retour aux pensées
                        </Link>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <span className="bg-primary/5 text-primary border border-primary/10 px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest">
                                    {article.category}
                                </span>
                                <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/40">
                                    Publié le {formatDate(article.date)}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[0.95] text-foreground tracking-tighter italic">
                                {article.title}.
                            </h1>
                        </div>

                        <div className="flex flex-wrap items-center gap-8 pt-6 border-t border-border">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-secondary border border-border overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500">
                                    <Image src="/assets/images/portrait_asikim_tchahaye_hero_1769376510862.png" alt={article.author_name} fill className="object-cover" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">{article.author_name}</span>
                                    <span className="text-[9px] font-medium text-muted-foreground/60 uppercase tracking-wider">Auteur & Ingénieur</span>
                                </div>
                            </div>

                            <div className="h-4 w-px bg-border hidden md:block" />

                            <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
                                <span className="flex items-center gap-2"><Clock size={14} className="text-primary" /> {readingTime}</span>
                                <span className="flex items-center gap-2"><MessageCircle size={14} className="text-primary" /> {article.comments_count} Commentaires</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 hidden lg:flex justify-end">
                        <div className="flex flex-col items-center gap-4">
                            <button
                                onClick={handleLike}
                                className={cn(
                                    "w-16 h-16 rounded-full flex flex-col items-center justify-center gap-1 border transition-all duration-500",
                                    liked ? "bg-primary border-primary text-white shadow-xl shadow-primary/30" : "bg-background border-border text-foreground hover:border-primary/30"
                                )}
                            >
                                <ThumbsUp size={20} className={liked ? "fill-white" : ""} />
                                <span className="text-[8px] font-bold">{likeCount}</span>
                            </button>
                            <button
                                onClick={() => setShowSharePopup(true)}
                                className="w-16 h-16 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:border-primary transition-all duration-500"
                            >
                                <Share2 size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="pb-32 px-6 md:px-12 bg-background">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">

                    {/* Left Column: Narrative Content */}
                    <div className="lg:col-span-8">
                        {/* Featured Image */}
                        <div className="relative aspect-[21/9] bg-secondary border border-border mb-20 overflow-hidden shadow-2xl group">
                            <Image
                                src={article.image}
                                alt={article.title}
                                fill
                                className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-1000" />
                        </div>

                        {/* Highlights Block */}
                        <div className="bg-secondary/30 border-l-4 border-primary p-10 mb-16 space-y-6">
                            <div className="flex items-center gap-3 text-primary">
                                <Sparkles size={18} />
                                <span className="text-[11px] font-bold uppercase tracking-[0.3em]">Points Saillants</span>
                            </div>
                            <div className="space-y-4">
                                {highlights.map((point, i) => (
                                    <div key={i} className="flex gap-4 group">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0 group-hover:scale-150 transition-transform" />
                                        <p className="text-foreground/80 leading-relaxed font-sans">{point}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Article Text Rendering */}
                        <article className="prose prose-stone lg:prose-xl max-w-none font-sans text-muted-foreground leading-[2] space-y-10">
                            <p className="text-2xl text-foreground font-display leading-relaxed italic mb-12">
                                "{article.excerpt}"
                            </p>

                            {article.content.map((block: any, idx: number) => {
                                if (block.type === 'p') return <p key={idx} className="mb-8">{block.text}</p>;
                                if (block.type === 'h3') return <h3 key={idx} className="font-display font-bold text-2xl text-foreground italic mt-16 mb-6 tracking-tight">{block.text} .</h3>;
                                if (block.type === 'blockquote') return (
                                    <blockquote key={idx} className="border-l-4 border-primary pl-10 py-6 my-12 bg-secondary/30 italic text-xl md:text-2xl text-foreground serif leading-relaxed">
                                        "{block.text}"
                                    </blockquote>
                                );
                                return null;
                            })}
                        </article>

                        {/* Tags */}
                        <div className="mt-20 pt-10 border-t border-border flex flex-wrap gap-3">
                            {article.tags.map((tag: string) => (
                                <span key={tag} className="flex items-center gap-2 bg-secondary px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 hover:text-primary transition-colors cursor-default">
                                    <TagIcon size={12} /> {tag}
                                </span>
                            ))}
                        </div>

                        {/* Mobile Interactions */}
                        <div className="lg:hidden flex items-center gap-6 mt-16 pt-10 border-t border-border">
                            <button
                                onClick={handleLike}
                                className={cn(
                                    "flex items-center gap-3 px-6 py-3 border rounded-sm transition-all duration-300",
                                    liked ? "bg-primary border-primary text-white" : "bg-transparent border-border text-foreground"
                                )}
                            >
                                <ThumbsUp size={18} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">{likeCount} J'aime</span>
                            </button>
                            <button
                                onClick={() => setShowSharePopup(true)}
                                className="flex items-center gap-3 px-6 py-3 border border-border rounded-sm text-foreground"
                            >
                                <Share2 size={18} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Partager</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <aside className="lg:col-span-4 space-y-16">
                        {/* Fast Facts Card */}
                        <div className="bg-secondary/20 border border-border p-10 sticky top-32">
                            <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-foreground mb-8 border-b border-border pb-4">Faits Rapides</h4>
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/40">Thématique</span>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary">{article.category}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/40">Investissement Temps</span>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-foreground">{readingTime}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/40">Dernière Mise à Jour</span>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-foreground">{formatDate(article.date)}</p>
                                </div>
                                <div className="pt-6">
                                    <button
                                        onClick={() => setShowSharePopup(true)}
                                        className="w-full flex items-center justify-between group py-4 border-t border-border"
                                    >
                                        <span className="text-[9px] font-bold uppercase tracking-widest text-foreground">Soutenir & Partager</span>
                                        <ChevronRight size={14} className="group-hover:translate-x-2 transition-all text-primary" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Newsletter Card */}
                        <div className="bg-primary p-12 text-white space-y-8 relative overflow-hidden group">
                            <Sparkles className="absolute -top-6 -right-6 text-white/10 w-32 h-32 group-hover:rotate-12 transition-transform duration-1000" />
                            <div className="relative z-10">
                                <h4 className="text-3xl font-display font-bold leading-tight mb-4 italic">Vision & Tech .</h4>
                                <p className="text-sm text-white/70 leading-relaxed font-light mb-8 italic">
                                    Rejoignez plus de 5,000 lecteurs pour une veille prospective sur l'ingénierie et l'humanisme.
                                </p>
                                <form className="space-y-4">
                                    <input
                                        type="email"
                                        placeholder="VOTRE ADRESSE EMAIL"
                                        className="w-full bg-white/10 border border-white/20 p-4 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-white transition-colors placeholder:text-white/30"
                                    />
                                    <button className="w-full bg-white text-primary py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white/90 transition-all shadow-xl shadow-black/10">
                                        S'abonner
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Interaction Card - Contact Link */}
                        <Link
                            href={`/contact?subject=Littérature & Collaboration Éditoriale&message=Bonjour, j'ai lu votre article "${article.title}" et j'aimerais en discuter davantage...`}
                            className="block p-10 bg-secondary/10 border border-primary/20 hover:border-primary transition-colors group"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <MessageCircle size={16} className="text-primary" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground">Une question ?</span>
                            </div>
                            <h4 className="text-lg font-display font-bold italic mb-6 leading-tight">Envie d'approfondir le sujet avec l'auteur ?</h4>
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] font-bold uppercase tracking-widest text-primary">Contacter Mohamed .</span>
                                <ArrowLeft className="rotate-180 text-primary group-hover:translate-x-2 transition-transform" size={14} />
                            </div>
                        </Link>

                        {/* Related Articles */}
                        {relatedArticles.length > 0 && (
                            <div className="space-y-8">
                                <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-foreground">Pensées Connexes</h4>
                                <div className="space-y-10">
                                    {relatedArticles.map((rel) => (
                                        <Link key={rel.id} href={`/blog/${rel.id}`} className="group block space-y-4">
                                            <div className="relative aspect-video overflow-hidden border border-border">
                                                <Image src={rel.image} alt={rel.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                            </div>
                                            <div className="space-y-2">
                                                <span className="text-[8px] font-bold uppercase tracking-widest text-primary">{rel.category}</span>
                                                <h5 className="text-lg font-display font-bold italic group-hover:text-primary transition-colors leading-tight">
                                                    {rel.title} .
                                                </h5>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </aside>
                </div>
            </section>

            {/* Share Popup - Replication of Trouvaille features */}
            <AnimatePresence>
                {showSharePopup && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowSharePopup(false)}
                            className="absolute inset-0 bg-background/80 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-lg bg-background border border-border shadow-2xl p-10 md:p-14 overflow-hidden"
                        >
                            {/* Decorative border */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />

                            <button
                                onClick={() => setShowSharePopup(false)}
                                className="absolute top-8 right-8 text-muted-foreground hover:text-foreground transition-all"
                            >
                                <X size={24} />
                            </button>

                            <div className="space-y-10 text-center">
                                <div className="space-y-3">
                                    <h3 className="text-2xl font-display font-bold italic tracking-tight">Diffuser l'idée .</h3>
                                    <p className="text-sm text-muted-foreground">Partagez cette vision avec votre réseau.</p>
                                </div>

                                {/* QR Code Display */}
                                <div className="flex justify-center">
                                    <div className="bg-white p-4 border border-border shadow-sm rounded-sm">
                                        <Image
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                                            alt="QR Code Partage"
                                            width={180}
                                            height={180}
                                            className="w-40 h-40"
                                        />
                                    </div>
                                </div>

                                {/* Social Actions */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {[
                                        { icon: Twitter, label: "Twitter", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}` },
                                        { icon: Linkedin, label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}` },
                                        { icon: Mail, label: "Email", href: `mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}` },
                                        { icon: Copy, label: copied ? "Copié !" : "Copie", action: handleCopyLink }
                                    ].map((social, i) => (
                                        <div key={i} className="flex flex-col items-center gap-2">
                                            {social.href ? (
                                                <a
                                                    href={social.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all duration-300"
                                                >
                                                    <social.icon size={20} />
                                                </a>
                                            ) : (
                                                <button
                                                    onClick={social.action}
                                                    className={cn(
                                                        "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300",
                                                        copied ? "bg-green-500 text-white" : "bg-secondary text-foreground hover:bg-primary hover:text-white"
                                                    )}
                                                >
                                                    {copied ? <Check size={20} /> : <social.icon size={20} />}
                                                </button>
                                            )}
                                            <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/60">{social.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ── COMMENT SECTION ── */}
            <section className="pt-6 pb-12 px-6 md:px-12 bg-secondary/10 border-t border-border mt-10">
                <div className="max-w-4xl mx-auto">

                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                        <MessageCircle size={16} className="text-primary" />
                        <h2 className="text-base font-display font-bold italic">
                            Commentaires
                            <span className="ml-2 text-muted-foreground font-normal text-sm">
                                ({comments.length})
                            </span>
                        </h2>
                    </div>

                    {/* Formulaire */}
                    <div className="mb-8 space-y-3">
                        {isAuthenticated && user && (
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                    <span className="text-[8px] font-bold text-white">{user.name[0].toUpperCase()}</span>
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{user.name}</span>
                            </div>
                        )}
                        <div className="relative">
                            <textarea
                                value={commentText}
                                onChange={e => setCommentText(e.target.value)}
                                onFocus={() => !isAuthenticated && requireAuth("Connectez-vous pour laisser un commentaire.", () => { })}
                                placeholder={isAuthenticated ? "Partagez votre réflexion sur cet article..." : "Connectez-vous pour commenter..."}
                                rows={4}
                                className="w-full bg-background border border-border p-6 text-sm font-sans focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-muted-foreground/40 leading-relaxed"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleAddComment}
                                disabled={commentLoading}
                                className={cn(
                                    "flex items-center gap-3 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300",
                                    commentLoading
                                        ? "bg-primary/50 text-white cursor-wait"
                                        : "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
                                )}
                            >
                                {commentLoading ? "..." : <><Send size={13} /> Publier</>}
                            </button>
                        </div>
                    </div>

                    {/* Liste des commentaires */}
                    <div
                        className={cn(
                            "space-y-0 overflow-y-auto pr-1",
                            comments.length > 4 ? "max-h-[520px]" : ""
                        )}
                        style={{ scrollbarWidth: "thin" }}
                    >
                        <AnimatePresence initial={false}>
                            {comments.length === 0 ? (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center text-muted-foreground/40 text-sm italic py-10"
                                >
                                    Soyez le premier à commenter cet article.
                                </motion.p>
                            ) : (
                                comments.map((c, i) => {
                                    const initial = c.authorName[0].toUpperCase();
                                    return (
                                        <motion.div
                                            key={c.id}
                                            initial={{ opacity: 0, x: -12 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.04 }}
                                            className="flex gap-4 py-5 border-b border-border last:border-0"
                                        >
                                            {/* Avatar */}
                                            <div className="flex-shrink-0 pt-0.5">
                                                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                                                    <span className="text-[11px] font-bold text-primary">{initial}</span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0 space-y-1.5">
                                                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">
                                                        {c.authorName}
                                                    </span>
                                                    <span className="text-[9px] font-medium text-muted-foreground/40 uppercase tracking-wider flex-shrink-0">
                                                        {new Date(c.createdAt).toLocaleDateString("fr-FR", {
                                                            day: "2-digit", month: "short", year: "numeric",
                                                            hour: "2-digit", minute: "2-digit"
                                                        })}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-foreground/80 leading-relaxed font-sans">
                                                    {c.text}
                                                </p>
                                            </div>
                                        </motion.div>
                                    );
                                })
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>


            {/* Auth Modal */}
            <Footer />
        </main>
    );
}
