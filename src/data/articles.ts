export interface Article {
    id: string;
    title: string;
    excerpt: string;
    category: "LITTÉRATURE" | "SCIENTIFIQUE";
    author_name: string;
    author_avatar: string;
    author_bio: string;
    date: string;
    updated_at?: string;
    likes_count: number;
    comments_count: number;
    views_count: number;
    quote?: string;
    image: string;
    tags: string[];
    content: string;
    related_articles?: string[];
    status: "published" | "draft";
    featured?: boolean;
}

const AUTHOR_AVATAR = "/assets/images/kim.jpg";
const AUTHOR_BIO = "Ingénieur en systèmes embarqués et auteur, Mohamed Asikim TCHAHAYE explore la convergence entre rigueur technique et pensée créative.";

export const articles: Article[] = [
    {
        id: "etalonnage-thermometres",
        title: "Étalonnage des thermomètres infrarouges",
        excerpt: "Guide technique sur la précision et les méthodes de calibration des capteurs de température sans contact.",
        category: "SCIENTIFIQUE",
        author_name: "Mohamed Asikim TCHAHAYE",
        author_avatar: AUTHOR_AVATAR,
        author_bio: AUTHOR_BIO,
        date: "2026-03-01",
        updated_at: "2026-03-05",
        likes_count: 45,
        comments_count: 5,
        views_count: 1240,
        quote: "La précision d'une mesure commence par la compréhension de son incertitude.",
        image: "/assets/images/riscv_architecture_chip_1769376111211.png",
        tags: ["Capteurs", "Métrologie", "Savoir-faire"],
        content: `<h2>Introduction à l'étalonnage</h2><p>L'étalonnage des thermomètres infrarouges est une procédure cruciale pour garantir la fiabilité des mesures thermiques dans l'industrie. Sans un étalonnage rigoureux, les mesures de température peuvent dévier de manière significative.</p><h3>Pourquoi étalonner ?</h3><p>La dérive des capteurs infrarouges est un phénomène naturel qui s'accentue avec le temps et les conditions d'utilisation. Un programme d'étalonnage régulier permet de <strong>quantifier cette dérive</strong> et de la corriger.</p><h3>Méthodes de calibration</h3><p>Il existe plusieurs méthodes d'étalonnage, chacune adaptée à un contexte spécifique : la méthode par corps noir, la comparaison directe avec un thermomètre de référence, et l'utilisation de points fixes de température.</p><blockquote>La précision d'une mesure commence par la compréhension de son incertitude.</blockquote><h3>Bonnes pratiques terrain</h3><p>Sur le terrain, il est essentiel de respecter les conditions environnementales prescrites : température ambiante stable, absence de courants d'air, et temps de stabilisation suffisant du capteur avant la prise de mesure.</p>`,
        related_articles: ["micropipette-feedback", "architecture-riscv"],
        status: "published",
        featured: true,
    },
    {
        id: "micropipette-feedback",
        title: "Experience Feedback Guide: Micropipette",
        excerpt: "Retour d'expérience sur l'utilisation et la maintenance préventive des micropipettes de précision.",
        category: "SCIENTIFIQUE",
        author_name: "Mohamed Asikim TCHAHAYE",
        author_avatar: AUTHOR_AVATAR,
        author_bio: AUTHOR_BIO,
        date: "2026-02-28",
        likes_count: 32,
        comments_count: 2,
        views_count: 870,
        quote: "Dans l'infiniment petit, chaque microlitre compte.",
        image: "/assets/images/poesie_digitale_art_1769376168451.png",
        tags: ["Laboratoire", "Ingénierie", "Feedback"],
        content: `<h2>Contexte du retour d'expérience</h2><p>Le guide <em>Experience Feedback Guide — Micropipette</em> explore les meilleures pratiques pour manipuler et entretenir ce matériel de précision utilisé quotidiennement dans les laboratoires d'analyse.</p><h3>Manipulation correcte</h3><p>La tenue de la micropipette, l'angle d'aspiration et la vitesse de pipetage sont autant de facteurs qui influencent directement la <strong>répétabilité des mesures</strong>. Une formation initiale rigoureuse est indispensable.</p><h3>Maintenance préventive</h3><p>Un programme de maintenance préventive comprend le nettoyage régulier des cônes, la vérification de l'étanchéité du piston et un étalonnage périodique selon les normes ISO 8655.</p><blockquote>Dans l'infiniment petit, chaque microlitre compte.</blockquote><p>La documentation systématique des interventions de maintenance permet de tracer l'historique de chaque instrument et d'anticiper les remplacements nécessaires.</p>`,
        related_articles: ["etalonnage-thermometres"],
        status: "published",
        featured: false,
    },
    {
        id: "electronique-ecriture",
        title: "Comment l'électronique influence l'écriture moderne",
        excerpt: "Exploration de la confluence entre la rigueur de l'ingénierie et la finesse de la prose littéraire.",
        category: "LITTÉRATURE",
        author_name: "Mohamed Asikim TCHAHAYE",
        author_avatar: AUTHOR_AVATAR,
        author_bio: AUTHOR_BIO,
        date: "2026-02-15",
        updated_at: "2026-02-20",
        likes_count: 124,
        comments_count: 18,
        views_count: 3420,
        quote: "Nous ne sommes plus seulement des écrivains de papier, mais des architectes de structures logiques portées par l'atome.",
        image: "/assets/images/poesie_digitale_art_1769376168451.png",
        tags: ["Philosophie", "Design System", "IA"],
        content: `<p>L'écriture a toujours été influencée par les outils qui la portent. De la plume d'oie à la machine à écrire, chaque saut technologique a modifié non seulement la vitesse de production, mais la <strong>structure même de la pensée narrative</strong>.</p><h2>La logique du hardware dans le verbe</h2><p>Aujourd'hui, alors que nous concevons des systèmes sur puce (SoC) et des architectures RISC-V, nous commençons à percevoir le langage comme un ensemble de registres et d'instructions. La brièveté, la récursivité et la modularité — concepts chers à l'ingénierie — s'invitent dans le style littéraire contemporain.</p><blockquote>Un bon code est une poésie qui s'exécute ; un bon roman est un système complexe qui finit par vivre de sa propre autonomie.</blockquote><h2>L'IA comme co-auteur</h2><p>L'intelligence artificielle ne remplace pas l'auteur : elle amplifie sa capacité d'exploration. Les modèles de langage permettent de tester des structures narratives, d'explorer des champs lexicaux inattendus et de <em>prototyper</em> des chapitres comme on prototypait jadis des circuits imprimés.</p><h3>Vers une écriture modulaire</h3><p>Mohamed Asikim explore cette dualité, montrant comment la rigueur de l'assembleur peut donner naissance à une prose d'une clarté de cristal, débarrassée du superflu, mais chargée d'une tension électrique palpable.</p>`,
        related_articles: ["architecture-riscv"],
        status: "published",
        featured: true,
    },
    {
        id: "architecture-riscv",
        title: "L'architecture RISC-V : Un nouveau souffle",
        excerpt: "Pourquoi l'open-source dans le hardware est la clé de la souveraineté technologique de demain.",
        category: "SCIENTIFIQUE",
        author_name: "Mohamed Asikim TCHAHAYE",
        author_avatar: AUTHOR_AVATAR,
        author_bio: AUTHOR_BIO,
        date: "2026-01-28",
        updated_at: "2026-02-10",
        likes_count: 89,
        comments_count: 12,
        views_count: 2150,
        quote: "La souveraineté technologique commence par l'ouverture des bases mêmes du calcul.",
        image: "/assets/images/riscv_architecture_chip_1769376111211.png",
        tags: ["RISC-V", "Hardware", "Open Source"],
        content: `<p>Le monde du hardware vit une révolution silencieuse. <strong>RISC-V</strong>, le jeu d'instructions open-source, est en train de briser les monopoles établis, offrant une liberté de conception sans précédent pour les ingénieurs du monde entier.</p><h2>Personnalisation totale du silicium</h2><p>Contrairement aux architectures propriétaires, RISC-V permet d'ajouter des <strong>instructions personnalisées</strong> pour des tâches spécifiques (IA, cryptographie). C'est cette granularité qui permet aujourd'hui d'optimiser les systèmes embarqués comme jamais auparavant.</p><h3>Extensions custom</h3><p>Le mécanisme d'extensions de RISC-V est ce qui le distingue fondamentalement d'ARM ou x86. Chaque concepteur peut créer ses propres instructions sans licence, sans royalties.</p><blockquote>Ouvrir le hardware, c'est libérer l'imagination des bâtisseurs de systèmes.</blockquote><h2>Impact sur la souveraineté numérique</h2><p>Pour les nations qui cherchent à réduire leur dépendance technologique, RISC-V représente une opportunité stratégique majeure. La Chine, l'Inde et l'Europe investissent massivement dans cet écosystème.</p><h3>Applications concrètes</h3><p>Dans cet article, nous explorons comment Mohamed Asikim intègre ces principes d'ouverture et de modularité dans ses propres conceptions mécatroniques, des microcontrôleurs IoT aux systèmes de contrôle industriel.</p>`,
        related_articles: ["electronique-ecriture", "etalonnage-thermometres"],
        status: "published",
        featured: false,
    }
];

export const articlesData = articles.reduce((acc, art) => ({ ...acc, [art.id]: art }), {} as Record<string, Article>);

export const articleCategories = ["LITTÉRATURE", "SCIENTIFIQUE"];
