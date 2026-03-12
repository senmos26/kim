"use client";
import React, { useState, useRef, useEffect } from "react";
import { Search, X, ChevronDown, ArrowUpDown, Filter as FilterIcon, LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface FilterSystemProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    categories: string[];
    sortBy: string;
    onSortChange: (sort: string) => void;
    sortOptions: { label: string; value: string }[];
    placeholder?: string;
    resultCount?: number;
}

export const FilterSystem = ({
    searchQuery,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
    categories,
    sortBy,
    onSortChange,
    sortOptions,
    placeholder = "Rechercher...",
    resultCount,
}: FilterSystemProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<"category" | "sort" | null>(null);
    const catRef = useRef<HTMLDivElement>(null);
    const sortRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (catRef.current && !catRef.current.contains(e.target as Node) &&
                sortRef.current && !sortRef.current.contains(e.target as Node)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const activeFilters = (selectedCategory !== "ALL" ? 1 : 0) + (searchQuery ? 1 : 0);
    const currentSortLabel = sortOptions.find(o => o.value === sortBy)?.label || "Trier";

    const handleClearAll = () => {
        onSearchChange("");
        onCategoryChange("ALL");
    };

    return (
        <div className="space-y-4">
            {/* Main Filter Bar */}
            <div className="flex flex-col lg:flex-row items-stretch gap-3 w-full">

                {/* Search Input — Large & Readable */}
                <div className={cn(
                    "relative flex-grow group transition-all duration-300",
                    isFocused && "z-10"
                )}>
                    <Search
                        size={20}
                        className={cn(
                            "absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200",
                            isFocused ? "text-primary" : "text-foreground/70"
                        )}
                    />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder={placeholder}
                        className={cn(
                            "w-full bg-background border-2 rounded-lg py-3.5 pl-12 pr-12 text-sm font-medium tracking-wide",
                            "placeholder:text-foreground/60 placeholder:font-normal",
                            "focus:outline-none transition-all duration-300",
                            isFocused
                                ? "border-primary/60 shadow-lg shadow-primary/5 ring-4 ring-primary/5"
                                : "border-border hover:border-primary/20"
                        )}
                    />
                    {searchQuery && (
                        <button
                            onClick={() => onSearchChange("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/70 hover:text-primary transition-colors p-1 rounded-full hover:bg-primary/5"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>

                {/* Controls Row */}
                <div className="flex items-center gap-3">

                    {/* Category Dropdown */}
                    <div ref={catRef} className="relative">
                        <button
                            onClick={() => setOpenDropdown(openDropdown === "category" ? null : "category")}
                            className={cn(
                                "flex items-center gap-2.5 px-5 py-3.5 rounded-lg border-2 text-sm font-semibold transition-all duration-200 whitespace-nowrap",
                                selectedCategory !== "ALL"
                                    ? "bg-primary/5 border-primary/30 text-primary hover:bg-primary/10"
                                    : "bg-background border-border text-foreground/70 hover:border-primary/20 hover:text-foreground"
                            )}
                        >
                            <FilterIcon size={16} className={selectedCategory !== "ALL" ? "text-primary" : "text-foreground/70"} />
                            <span className="hidden sm:inline">
                                {selectedCategory === "ALL" ? "Catégorie" : selectedCategory}
                            </span>
                            <ChevronDown size={14} className={cn(
                                "transition-transform duration-200",
                                openDropdown === "category" && "rotate-180"
                            )} />
                        </button>

                        <AnimatePresence>
                            {openDropdown === "category" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute top-full right-0 mt-2 z-50 min-w-[240px] bg-background border-2 border-border rounded-xl shadow-2xl shadow-black/8 overflow-hidden"
                                >
                                    <div className="p-2 border-b border-border">
                                        <p className="text-[11px] font-bold uppercase tracking-widest text-foreground/70 px-3 py-2">
                                            Filtrer par catégorie
                                        </p>
                                    </div>
                                    <div className="p-1.5 max-h-[300px] overflow-y-auto">
                                        <button
                                            onClick={() => { onCategoryChange("ALL"); setOpenDropdown(null); }}
                                            className={cn(
                                                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                                                selectedCategory === "ALL"
                                                    ? "bg-primary/10 text-primary font-semibold"
                                                    : "text-foreground/80 hover:bg-secondary hover:text-foreground"
                                            )}
                                        >
                                            <LayoutGrid size={14} />
                                            Toutes les catégories
                                        </button>
                                        {categories.map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => { onCategoryChange(cat); setOpenDropdown(null); }}
                                                className={cn(
                                                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                                                    selectedCategory === cat
                                                        ? "bg-primary/10 text-primary font-semibold"
                                                        : "text-foreground/80 hover:bg-secondary hover:text-foreground"
                                                )}
                                            >
                                                <span className={cn(
                                                    "w-2 h-2 rounded-full flex-shrink-0",
                                                    selectedCategory === cat ? "bg-primary" : "bg-border"
                                                )} />
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Sort Dropdown */}
                    <div ref={sortRef} className="relative">
                        <button
                            onClick={() => setOpenDropdown(openDropdown === "sort" ? null : "sort")}
                            className={cn(
                                "flex items-center gap-2.5 px-5 py-3.5 rounded-lg border-2 text-sm font-semibold transition-all duration-200 whitespace-nowrap",
                                "bg-background border-border text-foreground/70 hover:border-primary/20 hover:text-foreground"
                            )}
                        >
                            <ArrowUpDown size={16} className="text-foreground/70" />
                            <span className="hidden sm:inline">{currentSortLabel}</span>
                            <ChevronDown size={14} className={cn(
                                "transition-transform duration-200",
                                openDropdown === "sort" && "rotate-180"
                            )} />
                        </button>

                        <AnimatePresence>
                            {openDropdown === "sort" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute top-full right-0 mt-2 z-50 min-w-[220px] bg-background border-2 border-border rounded-xl shadow-2xl shadow-black/8 overflow-hidden"
                                >
                                    <div className="p-2 border-b border-border">
                                        <p className="text-[11px] font-bold uppercase tracking-widest text-foreground/70 px-3 py-2">
                                            Trier par
                                        </p>
                                    </div>
                                    <div className="p-1.5">
                                        {sortOptions.map((opt) => (
                                            <button
                                                key={opt.value}
                                                onClick={() => { onSortChange(opt.value); setOpenDropdown(null); }}
                                                className={cn(
                                                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                                                    sortBy === opt.value
                                                        ? "bg-primary/10 text-primary font-semibold"
                                                        : "text-foreground/80 hover:bg-secondary hover:text-foreground"
                                                )}
                                            >
                                                <span className={cn(
                                                    "w-2 h-2 rounded-full flex-shrink-0",
                                                    sortBy === opt.value ? "bg-primary" : "bg-border"
                                                )} />
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Active Filters Bar */}
            <AnimatePresence>
                {activeFilters > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-3 flex-wrap overflow-hidden"
                    >
                        <span className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">
                            Filtres actifs :
                        </span>

                        {selectedCategory !== "ALL" && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={() => onCategoryChange("ALL")}
                                className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-3.5 py-1.5 rounded-full text-xs font-semibold hover:bg-primary/20 transition-colors"
                            >
                                {selectedCategory}
                                <X size={12} />
                            </motion.button>
                        )}

                        {searchQuery && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={() => onSearchChange("")}
                                className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-3.5 py-1.5 rounded-full text-xs font-semibold hover:bg-primary/20 transition-colors"
                            >
                                « {searchQuery} »
                                <X size={12} />
                            </motion.button>
                        )}

                        <button
                            onClick={handleClearAll}
                            className="text-xs font-bold text-foreground/70 hover:text-primary transition-colors underline underline-offset-4"
                        >
                            Tout effacer
                        </button>

                        {resultCount !== undefined && (
                            <span className="ml-auto text-xs font-semibold text-foreground/70">
                                {resultCount} résultat{resultCount !== 1 ? "s" : ""}
                            </span>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
