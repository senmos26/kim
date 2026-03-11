export interface Speaker {
    name: string;
    role: string;
    image: string;
    bio: string;
}

export interface AgendaItem {
    time: string;
    title: string;
    description: string;
}

export interface Event {
    id: string;
    date: string;
    endDate?: string;
    month: string;
    fullDate: string;
    title: string;
    desc: string;
    cat: string;
    image: string;
    location: string;
    duration: string;
    price: string;
    maxInscriptions: number;
    currentInscriptions: number;
    speakers: Speaker[];
    agenda: AgendaItem[];
    tags: string[];
}

export const upcomingEvents: Event[] = [
    {
        id: "webinar-iot-2026",
        date: "12",
        month: "FÉVR. 2026",
        fullDate: "2026-02-12",
        title: "L'Avenir de l'Électronique au Maroc",
        desc: "Plongée dans les défis industriels et technologiques de la décennie à venir.",
        cat: "CONFÉRENCE",
        image: "/assets/images/electronic_future_maroc_1769376061385.png",
        location: "Virtual / Zoom",
        duration: "2 Heures",
        price: "Gratuit",
        maxInscriptions: 100,
        currentInscriptions: 45,
        speakers: [
            {
                name: "Mohamed Asikim TCHAHAYE",
                role: "Consultant Expert IoT & Électronique",
                image: "/assets/images/portrait_asikim_tchahaye_hero_1769376510862.png",
                bio: "Expert international en systèmes embarqués et transformation digitale."
            },
            {
                name: "Dr. Ahmed El Fassi",
                role: "Directeur R&D, TechMaroc",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
                bio: "Spécialiste en micro-électronique et semi-conducteurs."
            }
        ],
        agenda: [
            { time: "14:00", title: "Introduction & Vision 2026", description: "Aperçu global de la stratégie nationale." },
            { time: "14:30", title: "Le Hub Technologique Marocain", description: "Analyse des infrastructures et opportunités." },
            { time: "15:30", title: "Q&A & Networking", description: "Session d'échange avec les intervenants." }
        ],
        tags: ["IoT", "Industrie 4.0", "Maroc"]
    },
    {
        id: "salon-livre-paris",
        date: "25",
        month: "MARS 2026",
        fullDate: "2026-03-25",
        title: "Signature Littéraire : Le Souffle des Idées",
        desc: "Rencontre exclusive et dédicace au Salon du Livre de Paris.",
        cat: "LITTÉRATURE",
        image: "/assets/images/souffle_idees_book_1769376079792.png",
        location: "Porte de Versailles, Paris",
        duration: "3 Heures",
        price: "Entrée Libre",
        maxInscriptions: 200,
        currentInscriptions: 180,
        speakers: [
            {
                name: "Mohamed Asikim TCHAHAYE",
                role: "Auteur & Penseur",
                image: "/assets/images/portrait_asikim_tchahaye_hero_1769376510862.png",
                bio: "Explorant l'intersection entre la technologie et l'humanisme."
            }
        ],
        agenda: [
            { time: "15:00", title: "Présentation de l'Ouvrage", description: "Lecture d'extraits choisis." },
            { time: "16:00", title: "Session de Dédicaces", description: "Échanges personnalisés avec les lecteurs." }
        ],
        tags: ["Littérature", "Humanisme", "Paris"]
    }
];

export const eventCategories = ["CONFÉRENCE", "LITTÉRATURE", "WORKSHOP", "INNOVATION"];
