import { socials } from "./socials";

export interface Book {
    id: string;
    title: string;
    cat: string;
    desc: string;
    image: string;
    date: string;
    amazonLink: string;
}

export const books: Book[] = [
    {
        id: "paradoxe-africain",
        title: "Paradoxe Africain ou l'Éveil de Conscience",
        cat: "LITTÉRATURE / ESSAI",
        desc: "Une exploration profonde des défis et paradoxes de l'Afrique contemporaine, invitant à un éveil de conscience collectif.",
        image: "/assets/images/paradoxe_africain_book.png", // Image placeholder for now
        date: "2025-11-20",
        amazonLink: socials.amazon.paradoxe
    },
    {
        id: "les-pires-erreurs",
        title: "Les Pires Erreurs.",
        cat: "LITTÉRATURE / ESSAI",
        desc: "Une réflexion sur les erreurs fondamentales commises au fil du temps et comment elles façonnent notre présent.",
        image: "bg-orange-50",
        date: "2024-12-05",
        amazonLink: socials.amazon.pires_erreurs
    },
    {
        id: "souffle-des-idees",
        title: "Le Souffle des Idées",
        cat: "LITTÉRATURE",
        desc: "Un recueil de pensées explorant les tensions fertiles entre la logique de l'ingénieur et l'intuition du poète.",
        image: "/assets/images/souffle_idees_book_1769376079792.png",
        date: "2026-03-15",
        amazonLink: socials.amazon.author
    },
    {
        id: "ingenierie-demain",
        title: "L'Ingénierie du Demain",
        cat: "SCIENTIFIQUE",
        desc: "Guide de référence sur les systèmes embarqués et le design hardware pour la nouvelle génération.",
        image: "bg-secondary/30",
        date: "2024-06-10",
        amazonLink: socials.amazon.author
    }
];

export const bookCategories = ["LITTÉRATURE", "SCIENTIFIQUE", "LITTÉRATURE / ESSAI"];
