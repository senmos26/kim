export interface ArticleContent {
    type: "p" | "h3" | "blockquote";
    text: string;
}

export interface Article {
    id: string;
    title: string;
    excerpt: string;
    category: "LITTÉRATURE" | "SCIENTIFIQUE";
    author_name: string;
    date: string;
    time: string;
    likes_count: number;
    comments_count: number;
    quote?: string;
    image: string;
    tags: string[];
    content: ArticleContent[];
}

export const articles: Article[] = [
    {
        id: "etalonnage-thermometres",
        title: "Étalonnage des thermomètres infrarouges",
        excerpt: "Guide technique sur la précision et les méthodes de calibration des capteurs de température sans contact.",
        category: "SCIENTIFIQUE",
        author_name: "Mohamed Asikim TCHAHAYE",
        date: "2026-03-01",
        time: "10 min de lecture",
        likes_count: 45,
        comments_count: 5,
        quote: "La précision d'une mesure commence par la compréhension de son incertitude.",
        image: "bg-blue-50/50",
        tags: ["Capteurs", "Métrologie", "Savoir-faire"],
        content: [
            { type: "p", text: "L'étalonnage des thermomètres infrarouges est une procédure cruciale pour garantir la fiabilité des mesures thermiques dans l'industrie. (Contenu issu de la ressource client en cours de transcription...)" },
        ]
    },
    {
        id: "micropipette-feedback",
        title: "Experience Feedback Guide: Micropipette",
        excerpt: "Retour d'expérience sur l'utilisation et la maintenance préventive des micropipettes de précision.",
        category: "SCIENTIFIQUE",
        author_name: "Mohamed Asikim TCHAHAYE",
        date: "2026-02-28",
        time: "6 min de lecture",
        likes_count: 32,
        comments_count: 2,
        quote: "Dans l'infiniment petit, chaque microlitre compte.",
        image: "bg-emerald-50/50",
        tags: ["Laboratoire", "Ingénierie", "Feedback"],
        content: [
            { type: "p", text: "Le guide 'Experience Feedback Guide - Micropipette' explore les meilleures pratiques pour manipuler et entretenir ce matériel de précision. (Contenu en cours de publication...)" },
        ]
    },
    {
        id: "electronique-ecriture",
        title: "Comment l'électronique influence l'écriture moderne",
        excerpt: "Exploration de la confluence entre la rigueur de l'ingénierie et la finesse de la prose littéraire.",
        category: "LITTÉRATURE",
        author_name: "Mohamed Asikim TCHAHAYE",
        date: "2026-02-15",
        time: "8 min de lecture",
        likes_count: 124,
        comments_count: 18,
        quote: "Nous ne sommes plus seulement des écrivains de papier, mais des architectes de structures logiques portées par l'atome.",
        image: "/assets/images/poesie_digitale_art_1769376168451.png",
        tags: ["Philosophie", "Design System", "IA"],
        content: [
            { type: "p", text: "L'écriture a toujours été influencée par les outils qui la portent. De la plume d'oie à la machine à écrire, chaque saut technologique a modifié non seulement la vitesse de production, mais la structure même de la pensée narrative." },
            { type: "h3", text: "La logique du hardware dans le verbe" },
            { type: "p", text: "Aujourd'hui, alors que nous concevons des systèmes sur puce (SoC) et des architectures RISC-V, nous commençons à percevoir le langage comme un ensemble de registres et d'instructions. La brièveté, la récursivité et la modularité — concepts chers à l'ingénierie — s'invitent dans le style littéraire contemporain." },
            { type: "blockquote", text: "Un bon code est une poésie qui s'exécute ; un bon roman est un système complexe qui finit par vivre de sa propre autonomie." },
            { type: "p", text: "Mohamed Asikim explore cette dualité, montrant comment la rigueur de l'assembleur peut donner naissance à une prose d'une clarté de cristal, débarrassée du superflu, mais chargée d'une tension électrique palpable." }
        ]
    },
    {
        id: "architecture-riscv",
        title: "L'architecture RISC-V : Un nouveau souffle",
        excerpt: "Pourquoi l'open-source dans le hardware est la clé de la souveraineté technologique de demain.",
        category: "SCIENTIFIQUE",
        author_name: "Mohamed Asikim TCHAHAYE",
        date: "2026-01-28",
        time: "12 min de lecture",
        likes_count: 89,
        comments_count: 12,
        quote: "La souveraineté technologique commence par l'ouverture des bases mêmes du calcul.",
        image: "/assets/images/riscv_architecture_chip_1769376111211.png",
        tags: ["RISC-V", "Hardware", "Open Source"],
        content: [
            { type: "p", text: "Le monde du hardware vit une révolution silencieuse. RISC-V, le jeu d'instructions open-source, est en train de briser les monopoles établis, offrant une liberté de conception sans précédent pour les ingénieurs du monde entier." },
            { type: "h3", text: "Personnalisation totale du silicium" },
            { type: "p", text: "Contrairement aux architectures propriétaires, RISC-V permet d'ajouter des instructions personnalisées pour des tâches spécifiques (IA, cryptographie). C'est cette granularité qui permet aujourd'hui d'optimiser les systèmes embarqués comme jamais auparavant." },
            { type: "blockquote", text: "Ouvrir le hardware, c'est libérer l'imagination des bâtisseurs de systèmes." },
            { type: "p", text: "Dans cet article, nous explorons comment Mohamed Asikim intègre ces principes d'ouverture et de modularité dans ses propres conceptions mecatroniques." }
        ]
    }
];

export const articlesData = articles.reduce((acc, art) => ({ ...acc, [art.id]: art }), {} as Record<string, Article>);

export const articleCategories = ["LITTÉRATURE", "SCIENTIFIQUE"];
