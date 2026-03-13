"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

function stripHtml(html: string) {
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

interface SpeakerCardProps {
    name: string;
    role: string;
    image: string;
    bio: string;
    company?: string;
    linkedinUrl?: string;
    index: number;
}

export const SpeakerCard = ({ name, role, image, bio, company, linkedinUrl, index }: SpeakerCardProps) => {
    const previewBio = stripHtml(bio);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative bg-white border border-border p-8 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden"
        >
            <div className="flex flex-col items-center text-center">
                <div className="relative w-32 h-32 mb-6 overflow-hidden rounded-full border-4 border-secondary group-hover:border-primary/20 transition-colors duration-500">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </div>

                <h4 className="mb-2 text-xl font-display font-bold italic group-hover:text-primary transition-colors">
                    {name}
                </h4>
                <p className="mb-4 text-sm font-medium text-muted-foreground/70">
                    {role}
                </p>

                {company && (
                    <p className="mb-5 text-sm font-semibold text-primary">
                        {company}
                    </p>
                )}

                <div className="w-full pt-4 border-t border-border/50 space-y-4">
                    <p className="text-sm text-muted-foreground italic leading-relaxed line-clamp-5 min-h-28">
                        "{previewBio}"
                    </p>

                    {linkedinUrl && (
                        <a
                            href={linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
                        >
                            LinkedIn <Linkedin size={12} />
                        </a>
                    )}
                </div>
            </div>

            {/* Background Accent */}
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-primary/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700" />
        </motion.div>
    );
};
