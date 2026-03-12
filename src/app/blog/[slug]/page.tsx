"use client";
import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
    ArrowLeft,
    ArrowRight,
    Clock,
    Share2,
    ThumbsUp,
    MessageCircle,
    Tag as TagIcon,
    ChevronRight,
    Eye,
    Sparkles,
    Send,
    List
} from "lucide-react";
import Link from "next/link";
import { SharePopup } from "@/components/ui/SharePopup";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

import { articlesData, articles } from "@/data/articles";

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Aujourd'hui";
    if (days === 1) return "Hier";
    if (days < 7) return `Il y a ${days} jours`;
    if (days < 30) return `Il y a ${Math.floor(days / 7)} sem.`;
    return formatDate(dateStr);
}

function computeReadingTime(html: string) {
    const text = html.replace(/<[^>]+>/g, " ");
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(2, Math.round(words / 200));
    return `${minutes} min`;
}

function extractTOC(html: string): { id: string; text: string; level: number }[] {
    const regex = /<(h[23])[^>]*>(.*?)<\/\1>/gi;
    const items: { id: string; text: string; level: number }[] = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
        const text = match[2].replace(/<[^>]+>/g, "");
        const id = text.toLowerCase().replace(/[^a-zàâéèêëïîôùûüç0-9]+/gi, "-").replace(/^-|-$/g, "");
        items.push({ id, text, level: match[1] === "h2" || match[1] === "H2" ? 2 : 3 });
    }
    return items;
}

function injectHeadingIds(html: string): string {
    return html.replace(/<(h[23])([^>]*)>(.*?)<\/\1>/gi, (_, tag, attrs, content) => {
        const text = content.replace(/<[^>]+>/g, "");
        const id = text.toLowerCase().replace(/[^a-zàâéèêëïîôùûüç0-9]+/gi, "-").replace(/^-|-$/g, "");
        return `<${tag}${attrs} id="${id}">${content}</${tag}>`;
    });
}

function extractHighlights(html: string): string[] {
    const pMatches = html.match(/<p[^>]*>(.*?)<\/p>/gi) || [];
    return pMatches
        .slice(0, 3)
        .map(p => p.replace(/<[^>]+>/g, "").split(".")[0] + ".");
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
    const { user, isAuthenticated, openAuthModal } = useAuth();

    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState<Comment[]>([]);
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState<number>(article.likes_count);
    const [showSharePopup, setShowSharePopup] = useState(false);
    const [commentLoading, setCommentLoading] = useState(false);
    const [readProgress, setReadProgress] = useState(0);
    const [tocOpen, setTocOpen] = useState(false);
    const articleRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setComments(loadComments(slug));
        if (isAuthenticated && user) {
            setLiked(hasUserLiked(slug, user.id));
        }
    }, [slug, isAuthenticated, user]);

    useEffect(() => { window.scrollTo(0, 0); }, [slug]);

    // Reading progress
    const handleScroll = useCallback(() => {
        if (!articleRef.current) return;
        const el = articleRef.current;
        const rect = el.getBoundingClientRect();
        const start = el.offsetTop;
        const height = el.scrollHeight;
        const scrolled = window.scrollY - start;
        const progress = Math.min(100, Math.max(0, (scrolled / (height - window.innerHeight)) * 100));
        setReadProgress(progress);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const requireAuth = (reason: string, then: () => void) => {
        if (!isAuthenticated) { openAuthModal(reason); return; }
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

    const readingTime = useMemo(() => computeReadingTime(article.content), [article]);
    const toc = useMemo(() => extractTOC(article.content), [article]);
    const processedContent = useMemo(() => injectHeadingIds(article.content), [article]);
    const highlights = useMemo(() => extractHighlights(article.content), [article]);

    const relatedArticles = useMemo(() =>
        (article.related_articles || [])
            .map((id: string) => articlesData[id])
            .filter(Boolean)
            .slice(0, 2),
    [article]);

    // Prev/next navigation
    const currentIndex = articles.findIndex(a => a.id === article.id);
    const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
    const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

    return (
        <main className="flex flex-col min-h-screen bg-background selection:bg-primary selection:text-white">
            <Navbar />

            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent">
                <div className="h-full bg-primary transition-all duration-150 ease-out" style={{ width: `${readProgress}%` }} />
            </div>

            {/* Article Hero */}
            <section className="relative pt-36 pb-12 px-6 md:px-12 bg-background overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/20 -z-10 skew-x-12 translate-x-1/3" />

                <div className="max-w-6xl mx-auto">
                    <Link href="/blog" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-primary hover:-translate-x-2 transition-transform mb-8">
                        <ArrowLeft size={14} /> Retour aux articles
                    </Link>

                    <div className="flex items-center gap-3 flex-wrap mb-5">
                        <span className="bg-primary/5 text-primary border border-primary/10 px-3 py-1 text-[9px] font-bold uppercase tracking-widest">
                            {article.category}
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-foreground/40">
                            {timeAgo(article.date)}
                        </span>
                        {article.updated_at && article.updated_at !== article.date && (
                            <span className="text-[8px] text-foreground/30 uppercase tracking-wider">
                                · Mis à jour le {formatDate(article.updated_at)}
                            </span>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-none text-foreground tracking-tight italic mb-6">
                        {article.title}.
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-border">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-secondary border border-border overflow-hidden relative">
                                <Image src={article.author_avatar} alt={article.author_name} fill className="object-cover" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">{article.author_name}</span>
                                <span className="text-[8px] text-foreground/40 uppercase tracking-wider">Auteur & Ingénieur</span>
                            </div>
                        </div>

                        <div className="h-4 w-px bg-border hidden md:block" />

                        <div className="flex items-center gap-5 text-[9px] font-bold uppercase tracking-widest text-foreground/40">
                            <span className="flex items-center gap-1.5"><Clock size={12} className="text-primary" /> {readingTime}</span>
                            <span className="flex items-center gap-1.5"><Eye size={12} className="text-primary" /> {article.views_count.toLocaleString()}</span>
                            <span className="flex items-center gap-1.5"><MessageCircle size={12} className="text-primary" /> {comments.length + article.comments_count}</span>
                        </div>

                        <div className="ml-auto flex items-center gap-3">
                            <button
                                onClick={handleLike}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 border text-[9px] font-bold uppercase tracking-wider transition-all",
                                    liked ? "bg-primary border-primary text-white" : "border-border text-foreground hover:border-primary"
                                )}
                            >
                                <ThumbsUp size={13} className={liked ? "fill-white" : ""} /> {likeCount}
                            </button>
                            <button
                                onClick={() => setShowSharePopup(true)}
                                className="flex items-center gap-2 px-4 py-2 border border-border text-[9px] font-bold uppercase tracking-wider text-foreground hover:border-primary transition-all"
                            >
                                <Share2 size={13} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="pb-16 px-6 md:px-12 bg-background">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 items-start">

                    {/* Left Column: Content */}
                    <div>
                        {/* Featured Image */}
                        <div className="relative aspect-video bg-secondary border border-border mb-10 overflow-hidden group">
                            <Image
                                src={article.image}
                                alt={article.title}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-700" />
                        </div>

                        {/* Highlights Block */}
                        <div className="bg-secondary/20 border-l-4 border-primary p-8 mb-10 space-y-4">
                            <div className="flex items-center gap-2 text-primary">
                                <Sparkles size={14} />
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Points Saillants</span>
                            </div>
                            <div className="space-y-3">
                                {highlights.map((point, i) => (
                                    <div key={i} className="flex gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                        <p className="text-foreground/70 text-sm leading-relaxed">{point}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mobile TOC toggle */}
                        {toc.length > 0 && (
                            <div className="lg:hidden mb-8">
                                <button onClick={() => setTocOpen(!tocOpen)} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary mb-3">
                                    <List size={14} /> Sommaire {tocOpen ? "▾" : "▸"}
                                </button>
                                {tocOpen && (
                                    <nav className="bg-secondary/20 border border-border p-4 space-y-2">
                                        {toc.map((item) => (
                                            <a key={item.id} href={`#${item.id}`} onClick={() => setTocOpen(false)}
                                               className={cn("block text-xs text-foreground/60 hover:text-primary transition-colors", item.level === 3 && "pl-4")}>
                                                {item.text}
                                            </a>
                                        ))}
                                    </nav>
                                )}
                            </div>
                        )}

                        {/* Article Body — WYSIWYG HTML */}
                        <article ref={articleRef} className="mb-10">
                            <p className="text-lg text-foreground font-display leading-relaxed italic mb-8 pl-5 border-l-2 border-primary/20">
                                &ldquo;{article.excerpt}&rdquo;
                            </p>
                            <div
                                className="prose prose-sm md:prose-base max-w-none text-foreground/70 leading-relaxed
                                    [&_p]:mb-5 [&_strong]:text-foreground [&_em]:text-foreground/80
                                    [&_h2]:text-xl [&_h2]:font-display [&_h2]:font-bold [&_h2]:italic [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:tracking-tight
                                    [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-3
                                    [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-6 [&_blockquote]:py-4 [&_blockquote]:my-8 [&_blockquote]:bg-secondary/20 [&_blockquote]:italic [&_blockquote]:text-foreground/80 [&_blockquote]:text-lg
                                    [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5
                                    [&_a]:text-primary [&_a]:underline"
                                dangerouslySetInnerHTML={{ __html: processedContent }}
                            />
                        </article>

                        {/* Tags — clickable */}
                        <div className="flex flex-wrap gap-2 pb-8 border-b border-border">
                            {article.tags.map((tag: string) => (
                                <Link
                                    key={tag}
                                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                                    className="flex items-center gap-1.5 bg-secondary/60 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-foreground/50 hover:text-primary hover:bg-primary/5 transition-colors"
                                >
                                    <TagIcon size={10} /> {tag}
                                </Link>
                            ))}
                        </div>

                        {/* Author Bio */}
                        <div className="flex items-start gap-5 py-8 border-b border-border">
                            <div className="w-14 h-14 rounded-full bg-secondary border border-border overflow-hidden relative shrink-0">
                                <Image src={article.author_avatar} alt={article.author_name} fill className="object-cover" />
                            </div>
                            <div>
                                <Link href="/about" className="text-sm font-bold text-foreground hover:text-primary transition-colors">{article.author_name}</Link>
                                <p className="text-xs text-foreground/50 leading-relaxed mt-1">{article.author_bio}</p>
                            </div>
                        </div>

                        {/* Prev / Next Navigation */}
                        <div className="grid grid-cols-2 gap-6 py-8">
                            {prevArticle ? (
                                <Link href={`/blog/${prevArticle.id}`} className="group flex flex-col gap-1 p-4 hover:bg-secondary/20 transition-colors -m-4 rounded">
                                    <span className="text-[8px] font-bold uppercase tracking-widest text-foreground/30 flex items-center gap-1"><ArrowLeft size={10} /> Précédent</span>
                                    <span className="text-sm font-display font-bold italic text-foreground group-hover:text-primary transition-colors line-clamp-1">{prevArticle.title}</span>
                                </Link>
                            ) : <div />}
                            {nextArticle ? (
                                <Link href={`/blog/${nextArticle.id}`} className="group flex flex-col gap-1 items-end text-right p-4 hover:bg-secondary/20 transition-colors -m-4 rounded">
                                    <span className="text-[8px] font-bold uppercase tracking-widest text-foreground/30 flex items-center gap-1">Suivant <ArrowRight size={10} /></span>
                                    <span className="text-sm font-display font-bold italic text-foreground group-hover:text-primary transition-colors line-clamp-1">{nextArticle.title}</span>
                                </Link>
                            ) : <div />}
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <aside className="hidden lg:flex flex-col gap-8 sticky top-28">
                        {/* Table of Contents */}
                        {toc.length > 0 && (
                            <nav className="bg-secondary/10 border border-border p-6">
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground mb-4 pb-3 border-b border-border flex items-center gap-2">
                                    <List size={12} className="text-primary" /> Sommaire
                                </h4>
                                <div className="space-y-2">
                                    {toc.map((item) => (
                                        <a
                                            key={item.id}
                                            href={`#${item.id}`}
                                            className={cn(
                                                "block text-xs text-foreground/50 hover:text-primary transition-colors leading-snug",
                                                item.level === 3 && "pl-4 text-[11px]"
                                            )}
                                        >
                                            {item.text}
                                        </a>
                                    ))}
                                </div>
                            </nav>
                        )}

                        {/* Quick Facts */}
                        <div className="bg-secondary/10 border border-border p-6">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground mb-4 pb-3 border-b border-border">Infos</h4>
                            <div className="space-y-4 text-xs">
                                <div className="flex justify-between"><span className="text-foreground/40">Lecture</span><span className="font-bold text-foreground">{readingTime}</span></div>
                                <div className="flex justify-between"><span className="text-foreground/40">Vues</span><span className="font-bold text-foreground">{article.views_count.toLocaleString()}</span></div>
                                <div className="flex justify-between"><span className="text-foreground/40">Publié</span><span className="font-bold text-foreground">{formatDate(article.date)}</span></div>
                                {article.updated_at && (
                                    <div className="flex justify-between"><span className="text-foreground/40">Modifié</span><span className="font-bold text-foreground">{formatDate(article.updated_at)}</span></div>
                                )}
                            </div>
                            <button
                                onClick={() => setShowSharePopup(true)}
                                className="w-full flex items-center justify-between mt-5 pt-4 border-t border-border group"
                            >
                                <span className="text-[9px] font-bold uppercase tracking-widest text-foreground">Partager</span>
                                <ChevronRight size={12} className="text-primary group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* Newsletter */}
                        <div className="bg-primary p-8 text-white relative overflow-hidden group">
                            <Sparkles className="absolute -top-4 -right-4 text-white/10 w-24 h-24 group-hover:rotate-12 transition-transform duration-1000" />
                            <div className="relative z-10">
                                <h4 className="text-xl font-display font-bold leading-tight mb-3 italic">Vision & Tech .</h4>
                                <p className="text-[11px] text-white/60 leading-relaxed mb-5">
                                    Rejoignez 5,000+ lecteurs. Veille ingénierie & humanisme.
                                </p>
                                <form className="space-y-3" onSubmit={e => e.preventDefault()}>
                                    <input
                                        type="email"
                                        placeholder="VOTRE EMAIL"
                                        className="w-full bg-white/10 border border-white/20 p-3 text-[9px] font-bold uppercase tracking-widest focus:outline-none focus:border-white transition-colors placeholder:text-white/30"
                                    />
                                    <button type="submit" className="w-full bg-white text-primary py-3 text-[9px] font-bold uppercase tracking-[0.3em] hover:bg-white/90 transition-all">
                                        S'abonner
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Related Articles */}
                        {relatedArticles.length > 0 && (
                            <div>
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground mb-4">À lire aussi</h4>
                                <div className="space-y-5">
                                    {relatedArticles.map((rel: any) => (
                                        <Link key={rel.id} href={`/blog/${rel.id}`} className="group flex gap-3 items-start">
                                            <div className="relative w-16 shrink-0 aspect-video overflow-hidden border border-border">
                                                <Image src={rel.image} alt={rel.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                            </div>
                                            <div className="min-w-0">
                                                <span className="text-[7px] font-bold uppercase tracking-widest text-primary">{rel.category}</span>
                                                <h5 className="text-xs font-display font-bold italic group-hover:text-primary transition-colors leading-tight line-clamp-2">
                                                    {rel.title}
                                                </h5>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Contact CTA */}
                        <Link
                            href={`/contact?subject=Article: ${article.title}`}
                            className="block p-6 bg-secondary/10 border border-primary/20 hover:border-primary transition-colors group"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <MessageCircle size={12} className="text-primary" />
                                <span className="text-[9px] font-bold uppercase tracking-widest text-foreground">Question ?</span>
                            </div>
                            <p className="text-xs font-display font-bold italic leading-tight">Discuter de ce sujet avec l'auteur.</p>
                        </Link>
                    </aside>
                </div>
            </section>

            {/* Share Popup */}
            <SharePopup
                isOpen={showSharePopup}
                onClose={() => setShowSharePopup(false)}
                title={article.title}
            />

            {/* Comment Section */}
            <section className="pt-8 pb-12 px-6 md:px-12 bg-secondary/10 border-t border-border">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <MessageCircle size={14} className="text-primary" />
                        <h2 className="text-sm font-display font-bold italic">
                            Commentaires <span className="text-foreground/40 font-normal">({comments.length})</span>
                        </h2>
                    </div>

                    <div className="mb-8 space-y-3">
                        {isAuthenticated && user && (
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                                    <span className="text-[8px] font-bold text-white">{user.name[0].toUpperCase()}</span>
                                </div>
                                <span className="text-[9px] font-bold uppercase tracking-widest text-primary">{user.name}</span>
                            </div>
                        )}
                        <textarea
                            value={commentText}
                            onChange={e => setCommentText(e.target.value)}
                            onFocus={() => !isAuthenticated && requireAuth("Connectez-vous pour commenter.", () => {})}
                            placeholder={isAuthenticated ? "Partagez votre réflexion..." : "Connectez-vous pour commenter..."}
                            rows={3}
                            className="w-full bg-background border border-border p-5 text-sm focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-foreground/30 leading-relaxed"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={handleAddComment}
                                disabled={commentLoading}
                                className={cn(
                                    "flex items-center gap-2 px-6 py-3 text-[9px] font-bold uppercase tracking-[0.3em] transition-all",
                                    commentLoading ? "bg-primary/50 text-white cursor-wait" : "bg-primary text-white hover:bg-primary/90"
                                )}
                            >
                                {commentLoading ? "..." : <><Send size={11} /> Publier</>}
                            </button>
                        </div>
                    </div>

                    <div className={cn("space-y-0 overflow-y-auto", comments.length > 4 && "max-h-[480px]")} style={{ scrollbarWidth: "thin" }}>
                        <AnimatePresence initial={false}>
                            {comments.length === 0 ? (
                                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-foreground/30 text-sm italic py-8">
                                    Soyez le premier à commenter.
                                </motion.p>
                            ) : (
                                comments.map((c, i) => (
                                    <motion.div
                                        key={c.id}
                                        initial={{ opacity: 0, x: -12 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.04 }}
                                        className="flex gap-3 py-4 border-b border-border last:border-0"
                                    >
                                        <div className="shrink-0 pt-0.5">
                                            <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                                                <span className="text-[10px] font-bold text-primary">{c.authorName[0].toUpperCase()}</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0 space-y-1">
                                            <div className="flex items-baseline justify-between gap-3 flex-wrap">
                                                <span className="text-[9px] font-bold uppercase tracking-widest text-foreground">{c.authorName}</span>
                                                <span className="text-[8px] text-foreground/30 uppercase tracking-wider shrink-0">
                                                    {new Date(c.createdAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                                                </span>
                                            </div>
                                            <p className="text-sm text-foreground/70 leading-relaxed">{c.text}</p>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
