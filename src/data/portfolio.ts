export interface ProjectMetric {
    label: string;
    value: string;
    description: string;
}

export interface ProjectGalleryItem {
    src: string;
    alt: string;
    caption?: string;
    type?: "image" | "diagram";
}

export interface RelatedProjectLink {
    id: string;
    label?: string;
}

export interface PortfolioProject {
    id: string;
    title: string;
    subtitle: string;
    excerpt: string;
    category: string;
    sector: string;
    clientName: string;
    role: string;
    status: "featured" | "published" | "archived" | "confidential";
    featured?: boolean;
    year: string;
    date: string;
    duration: string;
    engagementType: string;
    location: string;
    confidentialityLevel: "public" | "anonymized" | "private_case";
    tech: string[];
    tags: string[];
    coverImage: string;
    coverImageAlt: string;
    metricHighlight: string;
    quote: string;
    introHtml: string;
    challengeHtml: string;
    solutionHtml: string;
    resultsHtml: string;
    objectives: string[];
    constraints: string[];
    responsibilities: string[];
    deliverables: string[];
    technicalHighlights: string[];
    metrics: ProjectMetric[];
    gallery: ProjectGalleryItem[];
    relatedProjects: RelatedProjectLink[];
    ctaLabel: string;
}

export const portfolioProjects: PortfolioProject[] = [
    {
        id: "smartgrid-v2",
        title: "SmartGrid Controller v2",
        subtitle: "Architecture hardware embarquée pour piloter des micro-réseaux électriques avec plus de résilience, moins de latence et une meilleure sobriété énergétique.",
        excerpt: "Conception d'un régulateur intelligent pour réseaux électriques locaux haute performance.",
        category: "SYSTÈMES EMBARQUÉS",
        sector: "Management Énergétique",
        clientName: "Programme Smart Infrastructure",
        role: "Lead HW Architect",
        status: "featured",
        featured: true,
        year: "2026",
        date: "2026-02-10",
        duration: "8 mois",
        engagementType: "Architecture & prototypage",
        location: "Maroc",
        confidentialityLevel: "anonymized",
        tech: ["Embedded C", "STM32", "LoRaWAN", "Altium Designer", "MQTT", "Modbus"],
        tags: ["Energy", "Edge Control", "Embedded", "Industrial IoT"],
        coverImage: "/assets/images/smartgrid_technology_1769376095858.png",
        coverImageAlt: "Vue du contrôleur SmartGrid sur interface industrielle",
        metricHighlight: "-30% consommation",
        quote: "Optimiser la distribution d'énergie locale grâce à une architecture hardware résiliente, sécurisée et souveraine.",
        introHtml: "<p>Le projet <strong>SmartGrid Controller v2</strong> visait la conception d'un contrôleur embarqué capable d'orchestrer des équipements énergétiques distribués avec un très haut niveau de disponibilité.</p><p>L'objectif n'était pas seulement de faire fonctionner un prototype, mais de poser une base crédible pour l'industrialisation, avec des choix techniques compatibles avec un environnement terrain exigeant.</p>",
        challengeHtml: "<p>La distribution d'énergie dans les micro-grids nécessite une <strong>latence extrêmement faible</strong>, une excellente tolérance aux perturbations et un haut niveau de sécurité.</p><p>Le système devait rester lisible pour les équipes métier, stable dans des environnements contraints et suffisamment modulaire pour accueillir plusieurs protocoles de communication.</p>",
        solutionHtml: "<p>Nous avons conçu une architecture combinant supervision locale, logique de décision embarquée et couche de communication sécurisée.</p><p>Le design matériel a été pensé pour réduire les points de défaillance, faciliter le diagnostic et permettre des itérations firmware rapides avant l'industrialisation.</p>",
        resultsHtml: "<p>Le résultat est un socle technique plus robuste, plus maintenable et mieux aligné avec des scénarios de déploiement terrain.</p><p>Le projet a permis de valider des arbitrages critiques sur la consommation, la sécurisation des échanges et la résilience de la chaîne de contrôle.</p>",
        objectives: [
            "Réduire la consommation énergétique du contrôleur sur des cycles prolongés.",
            "Assurer un pilotage temps réel sur des équipements distribués.",
            "Mettre en place une base d'architecture industrialisable et souveraine."
        ],
        constraints: [
            "Environnement électrique bruité et conditions terrain variables.",
            "Interopérabilité avec plusieurs équipements hétérogènes.",
            "Forte exigence sur la sécurité des échanges et des clés."
        ],
        responsibilities: [
            "Architecture hardware et choix des composants critiques.",
            "Définition de la pile de communication et sécurisation.",
            "Pilotage des arbitrages entre performance, coût et robustesse."
        ],
        deliverables: [
            "Architecture de référence du contrôleur.",
            "Prototype fonctionnel et documentation d'intégration.",
            "Jeu d'hypothèses pour passage à l'industrialisation."
        ],
        technicalHighlights: [
            "Gestion locale de la décision avec communication sécurisée.",
            "Choix d'une architecture orientée maintenance et diagnostic.",
            "Base compatible avec extensions protocolaires futures."
        ],
        metrics: [
            { label: "Consommation", value: "-30%", description: "Réduction de l'empreinte énergétique via optimisation firmware et arbitrages hardware." },
            { label: "Disponibilité", value: "99.9%", description: "Stabilité visée sur les scénarios critiques de contrôle local." },
            { label: "Latence", value: "< 40 ms", description: "Temps de réaction maintenu sur les boucles de pilotage principales." }
        ],
        gallery: [
            { src: "/assets/images/smartgrid_technology_1769376095858.png", alt: "Vue principale du projet SmartGrid", caption: "Vue hero du contrôleur et de son environnement énergétique." },
            { src: "/assets/images/electronic_future_maroc_1769376061385.png", alt: "Interface de supervision énergétique", caption: "Projection de la couche de supervision et de monitoring." }
        ],
        relatedProjects: [
            { id: "iot-precision" },
            { id: "secure-node" }
        ],
        ctaLabel: "Discuter de ce type de projet"
    },
    {
        id: "iot-precision",
        title: "Automate IoT Precision",
        subtitle: "Chaîne d'acquisition instrumentée pour mesurer, filtrer et transmettre des signaux de haute précision dans un contexte scientifique exigeant.",
        excerpt: "Instrument de mesure haute fidélité pour laboratoires de recherche.",
        category: "MÉTROLOGIE",
        sector: "Instrumentation Scientifique",
        clientName: "Laboratoire de Recherche Appliquée",
        role: "FPGA Designer",
        status: "published",
        year: "2025",
        date: "2025-11-20",
        duration: "6 mois",
        engagementType: "Conception électronique",
        location: "France",
        confidentialityLevel: "anonymized",
        tech: ["VHDL", "FPGA", "Precision ADC", "DSP", "UART"],
        tags: ["Metrology", "Signal", "FPGA"],
        coverImage: "/assets/images/riscv_architecture_chip_1769376111211.png",
        coverImageAlt: "Carte de mesure de précision basée FPGA",
        metricHighlight: "-120 dB bruit",
        quote: "La précision au millième, capturée et transmise en temps réel pour la recherche fondamentale.",
        introHtml: "<p>Ce projet répondait à un besoin de mesure de très haute fidélité dans un contexte de recherche où la stabilité de la chaîne d'acquisition est critique.</p>",
        challengeHtml: "<p>Capturer des signaux de faible amplitude dans un environnement bruité industriel imposait une maîtrise fine du front-end analogique et du traitement embarqué.</p>",
        solutionHtml: "<p>Une chaîne d'acquisition dédiée a été construite autour d'un FPGA, avec un soin particulier porté à l'isolation, au routage et à la cohérence temporelle.</p>",
        resultsHtml: "<p>La solution a permis d'améliorer la lisibilité du signal utile et de préparer des scénarios d'exploitation plus ambitieux côté laboratoire.</p>",
        objectives: [
            "Améliorer la précision de mesure sur signaux faibles.",
            "Garantir une transmission temps réel des données critiques."
        ],
        constraints: [
            "Bruit industriel important.",
            "Contraintes fortes sur l'intégrité du signal."
        ],
        responsibilities: [
            "Architecture logique FPGA.",
            "Chaîne de traitement du signal.",
            "Coordination des hypothèses de performance."
        ],
        deliverables: [
            "Architecture FPGA du système.",
            "Jeu de mesures de validation.",
            "Documentation de calibration."
        ],
        technicalHighlights: [
            "Traitement parallèle pour analyse rapide.",
            "Isolation galvanique et robustesse de la capture.",
            "Conception orientée précision laboratoire."
        ],
        metrics: [
            { label: "Bruit", value: "-120 dB", description: "Réduction du bruit grâce à un routage PCB et une chaîne d'acquisition maîtrisés." },
            { label: "Réactivité", value: "Temps réel", description: "Transmission rapide des données vers l'environnement d'analyse." }
        ],
        gallery: [
            { src: "/assets/images/riscv_architecture_chip_1769376111211.png", alt: "Vue carte FPGA de précision", caption: "Prototype de la chaîne de mesure sur base FPGA." }
        ],
        relatedProjects: [
            { id: "edge-analytics" }],
        ctaLabel: "Échanger sur vos contraintes de mesure"
    },
    {
        id: "edge-analytics",
        title: "Edge Analytics Engine",
        subtitle: "Optimisation d'algorithmes de vision et d'inférence embarquée pour traiter la donnée au plus près du terrain avec une enveloppe énergétique limitée.",
        excerpt: "Optimisation d'algorithmes de vision par ordinateur sur puce mobile.",
        category: "IA / VISION",
        sector: "IA Industrielle",
        clientName: "Industrial Vision Initiative",
        role: "System Designer",
        status: "published",
        year: "2025",
        date: "2025-08-15",
        duration: "5 mois",
        engagementType: "Optimisation système",
        location: "Hybride",
        confidentialityLevel: "public",
        tech: ["Python", "TensorFlow Lite", "C++", "Xilinx Vivado"],
        tags: ["AI", "Vision", "Edge", "Low Power"],
        coverImage: "/assets/images/electronic_future_maroc_1769376061385.png",
        coverImageAlt: "Illustration d'une plateforme edge analytics",
        metricHighlight: "5 ms inférence",
        quote: "Décentraliser l'intelligence pour des décisions instantanées au plus proche de la donnée.",
        introHtml: "<p>Le projet visait à rapprocher les capacités d'inférence du lieu réel de production de la donnée afin de limiter latence, dépendance réseau et coût d'exploitation.</p>",
        challengeHtml: "<p>L'enjeu principal était d'exécuter des modèles relativement lourds sur une enveloppe matérielle et thermique réduite.</p>",
        solutionHtml: "<p>Un travail d'optimisation des modèles, de profiling et d'architecture logicielle a permis de réduire les temps de calcul tout en préservant l'exploitabilité.</p>",
        resultsHtml: "<p>Le moteur obtenu apporte un meilleur compromis entre vitesse, consommation et maintenabilité pour des scénarios industriels proches du terrain.</p>",
        objectives: [
            "Réduire la latence d'inférence.",
            "Conserver un budget énergétique compatible embarqué."
        ],
        constraints: [
            "Puissance de calcul limitée.",
            "Contraintes thermiques fortes."
        ],
        responsibilities: [
            "Optimisation système.",
            "Choix des compromis performance/consommation."
        ],
        deliverables: [
            "Pipeline d'inférence optimisé.",
            "Cadre de benchmark technique."
        ],
        technicalHighlights: [
            "Optimisation de l'inférence au plus près de la donnée.",
            "Réduction des coûts de transfert et de latence."
        ],
        metrics: [
            { label: "Inférence", value: "5 ms", description: "Temps moyen visé pour les traitements critiques." },
            { label: "Puissance", value: "< 5W", description: "Maintien de l'enveloppe énergétique pour les scénarios batterie." }
        ],
        gallery: [
            { src: "/assets/images/electronic_future_maroc_1769376061385.png", alt: "Schéma IA embarquée", caption: "Visualisation de l'architecture edge analytics." }
        ],
        relatedProjects: [
            { id: "iot-precision" },
            { id: "smartgrid-v2" }
        ],
        ctaLabel: "Explorer une architecture edge"
    },
    {
        id: "secure-node",
        title: "Secure Node Firmware",
        subtitle: "Base firmware sécurisée pour terminaux IoT connectés avec racine de confiance, contrôle d'intégrité et préparation à des déploiements plus sensibles.",
        excerpt: "Mise en place d'une racine de confiance pour terminaux IoT connectés.",
        category: "SÉCURITÉ",
        sector: "Cybersécurité Embarquée",
        clientName: "Connected Device Program",
        role: "Embedded Security Consultant",
        status: "confidential",
        year: "2024",
        date: "2024-12-05",
        duration: "4 mois",
        engagementType: "Audit & architecture",
        location: "Europe",
        confidentialityLevel: "private_case",
        tech: ["Rust", "Cryptography", "Secure Boot", "PKI"],
        tags: ["Security", "IoT", "Firmware"],
        coverImage: "/assets/images/smartgrid_technology_1769376095858.png",
        coverImageAlt: "Illustration d'un nœud IoT sécurisé",
        metricHighlight: "Secure boot natif",
        quote: "Élever le niveau de confiance d'un terminal connecté sans compromettre son exploitabilité terrain.",
        introHtml: "<p>Cette mission a consisté à renforcer la chaîne de confiance d'un terminal IoT destiné à des contextes de déploiement plus sensibles.</p>",
        challengeHtml: "<p>Il fallait rehausser le niveau de sécurité tout en préservant l'exploitabilité pour les équipes intégration et maintenance.</p>",
        solutionHtml: "<p>Un cadre d'architecture sécurisée a été proposé avec segmentation des responsabilités, durcissement du firmware et mécanismes de vérification d'intégrité.</p>",
        resultsHtml: "<p>Le projet a permis d'établir un socle plus crédible pour des futurs déploiements en environnement exigeant.</p>",
        objectives: ["Mettre en place une racine de confiance claire.", "Réduire la surface d'attaque firmware."],
        constraints: ["Confidentialité élevée.", "Compatibilité avec l'existant."],
        responsibilities: ["Audit d'architecture.", "Recommandations de durcissement."],
        deliverables: ["Feuille de route sécurité.", "Architecture cible."],
        technicalHighlights: ["Boot sécurisé.", "Gestion d'identité machine.", "Durcissement firmware."],
        metrics: [
            { label: "Boot", value: "Vérifié", description: "Mécanisme de validation d'intégrité à l'amorçage." },
            { label: "Confiance", value: "Renforcée", description: "Clarification de la chaîne de confiance et des secrets." }
        ],
        gallery: [
            { src: "/assets/images/smartgrid_technology_1769376095858.png", alt: "Illustration terminal sécurisé", caption: "Cas présenté de façon anonymisée pour respecter la confidentialité." }
        ],
        relatedProjects: [
            { id: "smartgrid-v2" }
        ],
        ctaLabel: "Renforcer un système critique"
    }
];

export const portfolioCategories = ["SYSTÈMES EMBARQUÉS", "MÉTROLOGIE", "IA / VISION", "SÉCURITÉ"];

export function getPortfolioProjectById(id: string) {
    return portfolioProjects.find((project) => project.id === id);
}

export function getRelatedPortfolioProjects(projectIds: RelatedProjectLink[]) {
    return projectIds
        .map((projectLink) => getPortfolioProjectById(projectLink.id))
        .filter((project): project is PortfolioProject => Boolean(project));
}
