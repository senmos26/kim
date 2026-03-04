"use client";
import React from "react";
import { Search, ChevronDown, SortAsc, Filter as FilterIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
    placeholder = "RECHERCHER..."
}: FilterSystemProps) => {
    return (
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 w-full max-w-7xl mx-auto">
            {/* Search Bar */}
            <div className="relative flex-grow">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground/50" size={16} />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full bg-secondary/30 border border-border/50 hover:border-primary/20 rounded-sm py-4 px-14 text-[9px] font-bold uppercase tracking-[0.2em] focus:outline-none focus:ring-1 focus:ring-primary focus:bg-background transition-all h-full min-h-[56px]"
                />
            </div>

            {/* Selects Container - Now flex-row even on smaller screens if possible, or stacked */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Category Select */}
                <div className="relative group w-full sm:w-[240px]">
                    <FilterIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none" size={14} />
                    <select
                        value={selectedCategory}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        className="appearance-none bg-secondary/30 border border-border/50 hover:border-primary/20 rounded-sm py-4 pl-14 pr-12 text-[9px] font-bold uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer w-full transition-all h-[56px]"
                    >
                        <option value="ALL">TOUTES CATÉGORIES</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground/30 pointer-events-none group-hover:text-primary transition-colors" size={14} />
                </div>

                {/* Sort Select */}
                <div className="relative group w-full sm:w-[220px]">
                    <SortAsc className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none" size={14} />
                    <select
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="appearance-none bg-secondary/30 border border-border/50 hover:border-primary/20 rounded-sm py-4 pl-14 pr-12 text-[9px] font-bold uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer w-full transition-all h-[56px]"
                    >
                        {sortOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label.toUpperCase()}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground/30 pointer-events-none group-hover:text-primary transition-colors" size={14} />
                </div>
            </div>
        </div>
    );
};
