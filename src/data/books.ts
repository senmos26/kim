import { socials } from "./socials";

export interface BookFormat {
    type: "broché" | "kindle" | "pdf" | "audiobook" | "hardcover";
    price: number;
    currency: string;
    url?: string;
    available: boolean;
}

export interface Book {
    id: string;
    title: string;
    subtitle?: string;
    cat: string;
    subcategory?: string;
    desc: string;
    narrative: string;
    quote: string;
    image: string;
    date: string;
    publicationDate: string;
    author: string;

    // Metadata
    pages: number;
    language: string;
    format: string;
    isbn?: string;
    dimensions?: string;
    weight?: string;
    publisher?: string;
    collection?: string;
    targetAudience?: string;

    // Purchase
    price?: number | null;
    currency?: string;
    amazonUrl?: string | null;
    whatsappOrder?: boolean;
    formats?: BookFormat[];

    // Tags & relations
    tags?: string[];
    relatedBooks?: string[];

    // Admin
    status: "published" | "draft" | "coming_soon";
    featured?: boolean;
}

export const books: Book[] = [
    {
        id: "paradoxe-africain",
        title: "Paradoxe Africain ou l'Éveil de Conscience",
        subtitle: "Essai politique et social",
        cat: "LITTÉRATURE / ESSAI",
        subcategory: "Sciences sociales / Doctrines politiques",
        desc: "Une exploration profonde des défis et paradoxes de l'Afrique contemporaine, invitant à un éveil de conscience collectif.",
        narrative: `<p>L'avenir de l'Afrique repose sur une jeunesse unie, capable de dépasser les cycles de déception pour construire un continent souverain et prospère.</p><p>La jeunesse africaine se trouve à un tournant décisif face aux défis sociopolitiques et économiques qui minent le continent. Tout en dénonçant l'ingérence étrangère, elle oscille entre revendications de souveraineté et appels à l'aide extérieure, révélant une contradiction qui fragilise ses luttes.</p><p>Pour un véritable changement, il ne s'agit pas seulement de remplacer les élites, mais de cultiver une <strong>prise de conscience collective</strong>.</p>`,
        quote: "Le vrai changement commence par la responsabilité individuelle de chaque citoyen.",
        image: "/assets/images/uploaded_image_1769373773354.png",
        date: "2025-09-23",
        publicationDate: "2025-09-23",
        author: "Asikim Mohamed Tchahaye",
        pages: 80,
        language: "Français",
        format: "Broché / Kindle",
        isbn: "978-0-00000-000-1",
        dimensions: "15.24 x 0.48 x 22.86 cm",
        weight: "120g",
        publisher: "Auto-édition",
        targetAudience: "10 - 18 ans",
        price: 15.68,
        currency: "CAD",
        amazonUrl: socials.amazon.paradoxe,
        whatsappOrder: true,
        formats: [
            { type: "broché", price: 15.68, currency: "CAD", url: socials.amazon.paradoxe, available: true },
            { type: "kindle", price: 6.77, currency: "CAD", url: socials.amazon.paradoxe, available: true },
        ],
        tags: ["Afrique", "Politique", "Conscience", "Jeunesse"],
        relatedBooks: ["les-pires-erreurs"],
        status: "published",
        featured: true,
    },
    {
        id: "les-pires-erreurs",
        title: "Les Pires Erreurs.",
        subtitle: "Réflexions sur nos failles fondamentales",
        cat: "LITTÉRATURE / ESSAI",
        subcategory: "Essai philosophique",
        desc: "Une réflexion sur les erreurs fondamentales commises au fil du temps et comment elles façonnent notre présent.",
        narrative: `<p>Ce livre est un miroir tendu à la société, une autopsie sans concession des erreurs collectives et individuelles qui nous définissent.</p><p>Mohamed Asikim y dissèque les mécanismes de l'échec, non pas comme une fatalité, mais comme un <strong>terreau fertile pour la transformation</strong>. Chaque chapitre est une leçon tirée du réel, un appel à la lucidité et au courage de se réinventer.</p>`,
        quote: "L'erreur n'est pas l'ennemi du progrès, c'est l'ignorance volontaire qui l'est.",
        image: "/assets/images/uploaded_image_1769373526934.png",
        date: "2024-12-05",
        publicationDate: "2024-12-05",
        author: "Asikim Mohamed Tchahaye",
        pages: 150,
        language: "Français",
        format: "Broché / Kindle",
        isbn: "978-0-00000-000-2",
        dimensions: "14 x 0.9 x 21 cm",
        weight: "200g",
        publisher: "Auto-édition",
        price: 12.99,
        currency: "CAD",
        amazonUrl: socials.amazon.pires_erreurs,
        whatsappOrder: true,
        formats: [
            { type: "broché", price: 12.99, currency: "CAD", url: socials.amazon.pires_erreurs, available: true },
            { type: "kindle", price: 5.99, currency: "CAD", url: socials.amazon.pires_erreurs, available: true },
        ],
        tags: ["Philosophie", "Erreurs", "Résilience"],
        relatedBooks: ["paradoxe-africain", "souffle-des-idees"],
        status: "published",
        featured: false,
    },
    {
        id: "souffle-des-idees",
        title: "Le Souffle des Idées",
        subtitle: "Essais sur la pensée et l'ingénierie",
        cat: "LITTÉRATURE",
        subcategory: "Essai philosophique",
        desc: "Un recueil de pensées explorant les tensions fertiles entre la logique de l'ingénieur et l'intuition du poète.",
        narrative: `<p>Le Souffle des Idées n'est pas qu'un livre ; c'est un <em>manifeste</em> pour une fusion nécessaire entre l'esprit cartésien et l'élan créatif.</p><p>Mohamed Asikim y explore comment la rigueur du design hardware peut informer et structurer une pensée littéraire d'une pureté nouvelle. À travers des chapitres mêlant souvenirs d'ingénierie et méditations poétiques, l'auteur démontre que le signal électrique et le vers écrit sont <strong>deux formes d'une même énergie</strong> qui ne demande qu'à circuler.</p>`,
        quote: "Innover, c'est savoir écouter le murmure de l'intuition au milieu du vacarme des Datas.",
        image: "/assets/images/souffle_idees_book_1769376079792.png",
        date: "2026-03-15",
        publicationDate: "2026-03-15",
        author: "Asikim Mohamed Tchahaye",
        pages: 280,
        language: "Français",
        format: "Broché / Digital",
        isbn: "978-0-00000-000-3",
        dimensions: "15 x 1.2 x 23 cm",
        weight: "350g",
        publisher: "Auto-édition",
        collection: "Essais Contemporains",
        price: 19.99,
        currency: "CAD",
        amazonUrl: socials.amazon.author,
        whatsappOrder: true,
        formats: [
            { type: "broché", price: 19.99, currency: "CAD", url: socials.amazon.author, available: true },
            { type: "kindle", price: 9.99, currency: "CAD", available: false },
        ],
        tags: ["Philosophie", "Ingénierie", "Poésie", "Design"],
        relatedBooks: ["ingenierie-demain", "les-pires-erreurs"],
        status: "published",
        featured: true,
    },
    {
        id: "ingenierie-demain",
        title: "L'Ingénierie du Demain",
        subtitle: "Manuel d'expertise embarquée",
        cat: "SCIENTIFIQUE",
        subcategory: "Technique / Manuel d'expertise",
        desc: "Guide de référence sur les systèmes embarqués et le design hardware pour la nouvelle génération.",
        narrative: `<p>Véritable bible technique pour les ingénieurs d'aujourd'hui, cet ouvrage détaille les <strong>architectures ARM</strong> modernes, l'optimisation <strong>RISC-V</strong> et les protocoles IoT de nouvelle génération.</p><p>Un guide précis, rigoureux et indispensable pour comprendre les fondations matérielles du monde moderne, écrit par un expert de terrain.</p>`,
        quote: "La rigueur technique est la grammaire de l'innovation durable.",
        image: "/assets/images/smartgrid_technology_1769376095858.png",
        date: "2024-06-10",
        publicationDate: "2024-06-10",
        author: "Asikim Mohamed Tchahaye",
        pages: 450,
        language: "Français",
        format: "Hardcover / PDF",
        isbn: "978-0-00000-000-4",
        dimensions: "17 x 2.5 x 24 cm",
        weight: "650g",
        publisher: "Auto-édition",
        price: null,
        currency: "CAD",
        amazonUrl: null,
        whatsappOrder: true,
        formats: [
            { type: "hardcover", price: 39.99, currency: "CAD", available: false },
            { type: "pdf", price: 14.99, currency: "CAD", available: false },
        ],
        tags: ["RISC-V", "ARM", "IoT", "Embarqué", "Hardware"],
        relatedBooks: ["souffle-des-idees"],
        status: "coming_soon",
        featured: false,
    }
];

export const bookCategories = ["LITTÉRATURE", "SCIENTIFIQUE", "LITTÉRATURE / ESSAI"];

export const booksData = books.reduce((acc, book) => ({ ...acc, [book.id]: book }), {} as Record<string, Book>);
