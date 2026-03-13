export interface Speaker {
    name: string;
    role: string;
    image: string;
    bio: string;
    company?: string;
    linkedinUrl?: string;
}

export interface AgendaItem {
    time: string;
    endTime?: string;
    title: string;
    description: string;
    sessionType?: string;
    speaker?: string;
}

export interface EventFaq {
    question: string;
    answer: string;
}

export interface Event {
    id: string;
    date: string;
    endDate?: string;
    month: string;
    fullDate: string;
    title: string;
    subtitle: string;
    desc: string;
    cat: string;
    image: string;
    location: string;
    venueName?: string;
    venueAddress?: string;
    mapUrl?: string;
    eventType: "virtual" | "in_person" | "hybrid";
    status: "open" | "limited" | "sold_out" | "closed";
    startTime: string;
    endTime: string;
    timezone: string;
    duration: string;
    language: string;
    platform?: string;
    price: string;
    ctaLabel: string;
    joinUrl?: string;
    accessMode: "direct" | "after_registration";
    accessInstructions: string;
    registrationDeadline?: string;
    maxInscriptions: number;
    currentInscriptions: number;
    featured?: boolean;
    keyTakeaways: string[];
    targetAudience: string[];
    speakers: Speaker[];
    agenda: AgendaItem[];
    faq: EventFaq[];
    tags: string[];
}

export const upcomingEvents: Event[] = [
    {
        id: "webinar-iot-2026",
        date: "12",
        month: "FÉVR. 2026",
        fullDate: "2026-02-12",
        title: "L'Avenir de l'Électronique au Maroc",
        subtitle: "Un webinar stratégique pour comprendre les infrastructures, talents et opportunités qui façonneront la prochaine décennie industrielle.",
        desc: "<p>Une session conçue pour donner une <strong>lecture claire, concrète et stratégique</strong> de l'avenir de l'électronique au Maroc.</p><p>Nous aborderons les infrastructures, les talents, les opportunités industrielles et les conditions réelles de montée en échelle pour les entreprises, ingénieurs et décideurs.</p>",
        cat: "WEBINAR",
        image: "/assets/images/electronic_future_maroc_1769376061385.png",
        location: "En ligne",
        venueName: "Zoom Webinar",
        eventType: "virtual",
        status: "open",
        startTime: "14:00",
        endTime: "16:00",
        timezone: "GMT+1",
        duration: "2 Heures",
        language: "Français",
        platform: "Zoom",
        price: "Gratuit",
        ctaLabel: "Recevoir le lien d'accès",
        joinUrl: "https://zoom.us/j/9876543210",
        accessMode: "after_registration",
        accessInstructions: "<p>Le lien Zoom, le mot d'accueil et les consignes de connexion seront envoyés par email après validation de l'inscription.</p><p>Nous recommandons une connexion <strong>10 minutes avant le début</strong> afin de vérifier l'accès et de profiter de l'introduction.</p>",
        registrationDeadline: "2026-02-11T23:59:00+01:00",
        maxInscriptions: 100,
        currentInscriptions: 45,
        featured: true,
        keyTakeaways: [
            "Comprendre les leviers industriels qui accélèrent l'électronique au Maroc.",
            "Identifier les compétences et métiers qui monteront en puissance d'ici 2030.",
            "Décoder les opportunités pour les ingénieurs, investisseurs et décideurs.",
            "Échanger en direct avec des profils terrain sur les défis de mise à l'échelle."
        ],
        targetAudience: ["Ingénieurs", "Décideurs industriels", "Étudiants techniques", "Fondateurs hardware"],
        speakers: [
            {
                name: "Mohamed Asikim TCHAHAYE",
                role: "Consultant Expert IoT & Électronique",
                company: "KIMMCORP",
                linkedinUrl: "https://www.linkedin.com/in/asikim-mohamed-tchahaye-47b2501a4/",
                image: "/assets/images/kim.jpg",
                bio: "<p>Expert en <strong>systèmes embarqués</strong>, innovation industrielle et stratégie technologique appliquée au contexte africain.</p><p>Il accompagne la lecture des mutations technologiques avec une approche à la fois technique, économique et prospective.</p>"
            },
            {
                name: "Dr. Ahmed El Fassi",
                role: "Directeur R&D, TechMaroc",
                company: "TechMaroc",
                linkedinUrl: "https://www.linkedin.com/",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
                bio: "<p>Spécialiste en <strong>micro-électronique</strong> et semi-conducteurs, avec une expérience ancrée dans les enjeux de structuration de filières industrielles.</p>"
            }
        ],
        agenda: [
            { time: "14:00", endTime: "14:20", title: "Introduction & Vision 2026", description: "Aperçu global des mutations technologiques à venir et lecture du positionnement régional.", sessionType: "Keynote", speaker: "Mohamed Asikim TCHAHAYE" },
            { time: "14:20", endTime: "15:05", title: "Le Hub Technologique Marocain", description: "Analyse des infrastructures, chaînes de valeur et opportunités industrielles à fort potentiel.", sessionType: "Analyse", speaker: "Dr. Ahmed El Fassi" },
            { time: "15:05", endTime: "15:35", title: "Talents, formation et compétitivité", description: "Compétences critiques, montée en gamme et besoins des entreprises pour les 5 prochaines années.", sessionType: "Panel", speaker: "Mohamed Asikim TCHAHAYE" },
            { time: "15:35", endTime: "16:00", title: "Q&A & Networking", description: "Session d'échange ouverte avec les intervenants et recommandations concrètes pour aller plus loin.", sessionType: "Q&A" }
        ],
        faq: [
            { question: "Comment vais-je recevoir le lien de connexion ?", answer: "<p>Après inscription, vous recevrez un email de confirmation avec le lien Zoom et les consignes de participation.</p>" },
            { question: "Puis-je poser des questions pendant la session ?", answer: "<p>Oui. Une séquence <strong>Q&amp;A</strong> est prévue en fin de webinar et les questions peuvent aussi être soumises dans le chat.</p>" },
            { question: "Y aura-t-il un replay ?", answer: "<p>Un replay synthétique pourra être partagé aux inscrits selon les autorisations de diffusion.</p>" }
        ],
        tags: ["IoT", "Industrie 4.0", "Maroc"]
    },
    {
        id: "salon-livre-paris",
        date: "25",
        month: "MARS 2026",
        fullDate: "2026-03-25",
        title: "Signature Littéraire : Le Souffle des Idées",
        subtitle: "Une rencontre éditoriale intime autour de l'œuvre, des idées qui l'ont portée et d'un échange direct avec les lecteurs.",
        desc: "<p>Une rencontre éditoriale pensée pour aller <strong>au-delà de la simple dédicace</strong>.</p><p>Cette session réunit présentation de l'ouvrage, lecture, conversation avec le public et temps de rencontre individualisé autour des idées majeures du livre.</p>",
        cat: "SIGNATURE",
        image: "/assets/images/souffle_idees_book_1769376079792.png",
        location: "Porte de Versailles, Paris",
        venueName: "Salon du Livre de Paris",
        venueAddress: "Paris Expo Porte de Versailles, 1 Place de la Porte de Versailles, 75015 Paris, France",
        mapUrl: "https://maps.google.com/?q=Paris+Expo+Porte+de+Versailles",
        eventType: "in_person",
        status: "limited",
        startTime: "15:00",
        endTime: "18:00",
        timezone: "GMT+1",
        duration: "3 Heures",
        language: "Français",
        price: "Entrée Libre",
        ctaLabel: "Demander une invitation",
        accessMode: "after_registration",
        accessInstructions: "<p>Une confirmation d'accès et le point de rendez-vous exact dans le salon vous seront envoyés après validation.</p><p>Merci d'arriver en avance si vous souhaitez participer à la séquence d'échange avant la dédicace.</p>",
        registrationDeadline: "2026-03-22T23:59:00+01:00",
        maxInscriptions: 200,
        currentInscriptions: 180,
        keyTakeaways: [
            "Rencontrer l'auteur et découvrir l'intention derrière l'ouvrage.",
            "Assister à une lecture choisie autour des thèmes majeurs du livre.",
            "Participer à un échange direct sur littérature, pensée et société.",
            "Obtenir une dédicace personnalisée et prolonger la discussion sur place."
        ],
        targetAudience: ["Lecteurs", "Professionnels du livre", "Étudiants en lettres", "Public curieux"],
        speakers: [
            {
                name: "Mohamed Asikim TCHAHAYE",
                role: "Auteur & Penseur",
                company: "KIMMCORP",
                linkedinUrl: "https://www.linkedin.com/in/asikim-mohamed-tchahaye-47b2501a4/",
                image: "/assets/images/kim.jpg",
                bio: "<p>Auteur explorant l'intersection entre <strong>technologie</strong>, humanisme et responsabilité intellectuelle.</p><p>Son travail met en dialogue création littéraire, réflexion critique et enjeux contemporains.</p>"
            }
        ],
        agenda: [
            { time: "15:00", endTime: "15:40", title: "Présentation de l'Ouvrage", description: "Présentation du livre, de sa genèse et des fils conducteurs qui structurent la pensée de l'auteur.", sessionType: "Présentation", speaker: "Mohamed Asikim TCHAHAYE" },
            { time: "15:40", endTime: "16:20", title: "Lecture & Conversation", description: "Lecture d'extraits choisis suivie d'un échange autour des thèmes du livre et des réactions du public.", sessionType: "Lecture" },
            { time: "16:20", endTime: "18:00", title: "Session de Dédicaces", description: "Rencontres personnalisées, photos et discussions individuelles avec les lecteurs.", sessionType: "Rencontre" }
        ],
        faq: [
            { question: "Faut-il acheter un billet séparé ?", answer: "<p>L'accès est libre, mais une confirmation préalable permet de mieux organiser l'accueil et les temps d'échange.</p>" },
            { question: "Où se situe exactement la rencontre dans le salon ?", answer: "<p>Le stand et l'horaire détaillé seront précisés dans le message de confirmation envoyé aux inscrits.</p>" },
            { question: "Peut-on venir avec son propre exemplaire ?", answer: "<p>Oui, vous pouvez venir avec votre exemplaire ou acquérir l'ouvrage sur place selon les disponibilités.</p>" }
        ],
        tags: ["Littérature", "Humanisme", "Paris"]
    }
];

export const eventCategories = ["WEBINAR", "SIGNATURE", "CONFÉRENCE", "WORKSHOP", "INNOVATION"];
