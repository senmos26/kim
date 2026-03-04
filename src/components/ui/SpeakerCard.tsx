"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface SpeakerCardProps {
    name: string;
    role: string;
    image: string;
    bio: string;
    index: number;
}

export const SpeakerCard = ({ name, role, image, bio, index }: SpeakerCardProps) => {
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

                <h4 className="text-lg font-display font-bold italic mb-2 group-hover:text-primary transition-colors">
                    {name}
                </h4>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-6">
                    {role}
                </p>

                <div className="relative overflow-hidden h-0 group-hover:h-auto transition-all duration-500">
                    <p className="text-sm text-muted-foreground italic leading-relaxed pt-4 border-t border-border/50">
                        "{bio}"
                    </p>
                </div>
            </div>

            {/* Background Accent */}
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-primary/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700" />
        </motion.div>
    );
};
