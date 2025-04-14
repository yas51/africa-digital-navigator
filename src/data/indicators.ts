
export interface SectorOpportunity {
  id: string;
  name: string;
  description: string;
  growth: number; // Annual growth percentage
  digitalReadiness: number; // 0-100
  foreignInvestment: number; // 0-100 relative scale
  localCompetition: number; // 0-100 (lower means less competition)
  regulatoryEase: number; // 0-100
  overallScore: number; // Calculated from other metrics
}

export interface DigitalReadinessAssessment {
  id: string;
  category: string;
  question: string;
  options: {
    value: number;
    label: string;
  }[];
  weight: number; // Weight in the overall assessment
}

// Industry sectors with digital opportunity in Africa
export const sectorOpportunities: Record<string, SectorOpportunity[]> = {
  "ng": [
    {
      id: "fintech",
      name: "Services Financiers / Fintech",
      description: "Solutions de paiement mobile, crédit numérique, assurances",
      growth: 25.8,
      digitalReadiness: 82,
      foreignInvestment: 80,
      localCompetition: 65,
      regulatoryEase: 58,
      overallScore: 75
    },
    {
      id: "agritech",
      name: "Agritech",
      description: "Solutions numériques pour l'agriculture et la chaîne d'approvisionnement alimentaire",
      growth: 18.4,
      digitalReadiness: 63,
      foreignInvestment: 70,
      localCompetition: 40,
      regulatoryEase: 72,
      overallScore: 67
    },
    {
      id: "ecommerce",
      name: "E-commerce",
      description: "Plateformes de vente en ligne et marketplaces",
      growth: 27.6,
      digitalReadiness: 76,
      foreignInvestment: 75,
      localCompetition: 68,
      regulatoryEase: 65,
      overallScore: 72
    },
    {
      id: "healthcare",
      name: "Santé Numérique",
      description: "Télémédecine, gestion des dossiers médicaux électroniques",
      growth: 15.3,
      digitalReadiness: 58,
      foreignInvestment: 62,
      localCompetition: 45,
      regulatoryEase: 50,
      overallScore: 56
    },
    {
      id: "edtech",
      name: "Edtech",
      description: "Apprentissage en ligne, formation professionnelle numérique",
      growth: 14.7,
      digitalReadiness: 67,
      foreignInvestment: 58,
      localCompetition: 50,
      regulatoryEase: 75,
      overallScore: 63
    }
  ],
  "za": [
    {
      id: "fintech",
      name: "Services Financiers / Fintech",
      description: "Solutions de paiement mobile, crédit numérique, assurances",
      growth: 22.5,
      digitalReadiness: 85,
      foreignInvestment: 82,
      localCompetition: 75,
      regulatoryEase: 70,
      overallScore: 78
    },
    {
      id: "mining",
      name: "Technologies Minières",
      description: "Solutions numériques pour l'extraction et la gestion des ressources minières",
      growth: 15.8,
      digitalReadiness: 72,
      foreignInvestment: 85,
      localCompetition: 60,
      regulatoryEase: 68,
      overallScore: 74
    },
    {
      id: "logistics",
      name: "Logistique & Transport",
      description: "Solutions de suivi, optimisation des itinéraires, gestion de flotte",
      growth: 18.3,
      digitalReadiness: 78,
      foreignInvestment: 70,
      localCompetition: 65,
      regulatoryEase: 72,
      overallScore: 72
    },
    {
      id: "renewable",
      name: "Énergies Renouvelables",
      description: "Solutions numériques pour l'énergie solaire, éolienne et hors réseau",
      growth: 26.9,
      digitalReadiness: 75,
      foreignInvestment: 88,
      localCompetition: 55,
      regulatoryEase: 76,
      overallScore: 79
    },
    {
      id: "telecom",
      name: "Télécommunications",
      description: "Infrastructure réseau, services à valeur ajoutée",
      growth: 12.4,
      digitalReadiness: 90,
      foreignInvestment: 78,
      localCompetition: 80,
      regulatoryEase: 65,
      overallScore: 76
    }
  ]
};

// Default sectors for countries without specific data
export const defaultSectorOpportunities: SectorOpportunity[] = [
  {
    id: "fintech",
    name: "Services Financiers / Fintech",
    description: "Solutions de paiement mobile, crédit numérique, assurances",
    growth: 20.5,
    digitalReadiness: 75,
    foreignInvestment: 76,
    localCompetition: 60,
    regulatoryEase: 65,
    overallScore: 71
  },
  {
    id: "agritech",
    name: "Agritech",
    description: "Solutions numériques pour l'agriculture et la chaîne d'approvisionnement alimentaire",
    growth: 17.8,
    digitalReadiness: 65,
    foreignInvestment: 72,
    localCompetition: 45,
    regulatoryEase: 70,
    overallScore: 64
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    description: "Plateformes de vente en ligne et marketplaces",
    growth: 25.3,
    digitalReadiness: 70,
    foreignInvestment: 68,
    localCompetition: 55,
    regulatoryEase: 62,
    overallScore: 66
  },
  {
    id: "telecom",
    name: "Télécommunications",
    description: "Infrastructure réseau, services à valeur ajoutée",
    growth: 15.6,
    digitalReadiness: 80,
    foreignInvestment: 75,
    localCompetition: 72,
    regulatoryEase: 58,
    overallScore: 69
  },
  {
    id: "edtech",
    name: "Edtech",
    description: "Apprentissage en ligne, formation professionnelle numérique",
    growth: 16.2,
    digitalReadiness: 68,
    foreignInvestment: 60,
    localCompetition: 48,
    regulatoryEase: 74,
    overallScore: 62
  }
];

// Get sector opportunities for a specific country
export const getSectorOpportunities = (countryId: string): SectorOpportunity[] => {
  return sectorOpportunities[countryId] || defaultSectorOpportunities;
};

// Digital readiness assessment questions
export const digitalReadinessQuestions: DigitalReadinessAssessment[] = [
  {
    id: "infra_1",
    category: "Infrastructure",
    question: "Quel est l'état actuel de votre infrastructure IT ?",
    options: [
      { value: 1, label: "Obsolète ou inexistante" },
      { value: 2, label: "Basique - quelques ordinateurs et connexion internet" },
      { value: 3, label: "Standard - réseau local, serveurs sur site" },
      { value: 4, label: "Avancée - cloud partiel, bonnes connexions" },
      { value: 5, label: "Optimale - infrastructure hybride, haute disponibilité" }
    ],
    weight: 3
  },
  {
    id: "infra_2",
    category: "Infrastructure",
    question: "Avez-vous adopté des services cloud ?",
    options: [
      { value: 1, label: "Pas du tout" },
      { value: 2, label: "Utilisation minimale (email, stockage)" },
      { value: 3, label: "Utilisation partielle (quelques applications)" },
      { value: 4, label: "Utilisation significative (la plupart des services)" },
      { value: 5, label: "Cloud-first (stratégie complète)" }
    ],
    weight: 2
  },
  {
    id: "data_1",
    category: "Données",
    question: "Comment gérez-vous vos données d'entreprise ?",
    options: [
      { value: 1, label: "Principalement sur papier ou fichiers locaux" },
      { value: 2, label: "Fichiers partagés sans structure claire" },
      { value: 3, label: "Base de données simple avec saisie manuelle" },
      { value: 4, label: "Systèmes de gestion de données intégrés" },
      { value: 5, label: "Architecture de données avancée avec automatisation" }
    ],
    weight: 3
  },
  {
    id: "data_2",
    category: "Données",
    question: "Utilisez-vous vos données pour prendre des décisions stratégiques ?",
    options: [
      { value: 1, label: "Rarement ou jamais" },
      { value: 2, label: "Occasionnellement, rapports basiques" },
      { value: 3, label: "Régulièrement, tableaux de bord simples" },
      { value: 4, label: "Fréquemment, analytique avancée" },
      { value: 5, label: "Systématiquement, modèles prédictifs et IA" }
    ],
    weight: 2
  },
  {
    id: "skills_1",
    category: "Compétences",
    question: "Quel est le niveau de compétences numériques dans votre équipe ?",
    options: [
      { value: 1, label: "Très limité, besoin de formation de base" },
      { value: 2, label: "Basique, utilisation des outils standard" },
      { value: 3, label: "Intermédiaire, maîtrise des logiciels métier" },
      { value: 4, label: "Avancé, quelques experts techniques" },
      { value: 5, label: "Excellent, équipe avec fortes compétences techniques" }
    ],
    weight: 3
  },
  {
    id: "skills_2",
    category: "Compétences",
    question: "Avez-vous des compétences en data science ou IA dans votre équipe ?",
    options: [
      { value: 1, label: "Aucune" },
      { value: 2, label: "Compréhension basique mais pas d'expertise" },
      { value: 3, label: "Quelques connaissances, expérimentations ponctuelles" },
      { value: 4, label: "Équipe dédiée à temps partiel" },
      { value: 5, label: "Équipe data/IA à temps plein" }
    ],
    weight: 2
  },
  {
    id: "process_1",
    category: "Processus",
    question: "Dans quelle mesure vos processus d'entreprise sont-ils digitalisés ?",
    options: [
      { value: 1, label: "Essentiellement manuels" },
      { value: 2, label: "Quelques processus digitalisés" },
      { value: 3, label: "Digitalisation partielle, systèmes non intégrés" },
      { value: 4, label: "Digitalisation avancée, bonne intégration" },
      { value: 5, label: "Transformation digitale complète" }
    ],
    weight: 3
  },
  {
    id: "process_2",
    category: "Processus",
    question: "Utilisez-vous des outils collaboratifs numériques ?",
    options: [
      { value: 1, label: "Rarement ou jamais" },
      { value: 2, label: "Basiques (email, messagerie)" },
      { value: 3, label: "Standard (partage de documents, visioconférence)" },
      { value: 4, label: "Avancés (plateforme collaborative intégrée)" },
      { value: 5, label: "Complets (environnement de travail digital unifié)" }
    ],
    weight: 2
  },
  {
    id: "strategy_1",
    category: "Stratégie",
    question: "Avez-vous une stratégie de transformation digitale ?",
    options: [
      { value: 1, label: "Pas de stratégie" },
      { value: 2, label: "Réflexion initiale, pas de plan formel" },
      { value: 3, label: "Plan basique sans objectifs précis" },
      { value: 4, label: "Stratégie formalisée avec objectifs" },
      { value: 5, label: "Stratégie complète avec KPIs et ressources dédiées" }
    ],
    weight: 3
  },
  {
    id: "strategy_2",
    category: "Stratégie",
    question: "Quel est le niveau d'engagement de la direction dans la transformation digitale ?",
    options: [
      { value: 1, label: "Faible intérêt" },
      { value: 2, label: "Reconnaissance de l'importance, peu d'actions" },
      { value: 3, label: "Soutien modéré, ressources limitées" },
      { value: 4, label: "Fort soutien, investissements significatifs" },
      { value: 5, label: "Leadership visionnaire, priorité stratégique" }
    ],
    weight: 3
  }
];

// Calculate digital readiness score based on assessment answers
export const calculateDigitalReadinessScore = (answers: Record<string, number>): number => {
  let totalScore = 0;
  let totalWeight = 0;

  digitalReadinessQuestions.forEach(question => {
    if (answers[question.id]) {
      totalScore += answers[question.id] * question.weight;
      totalWeight += question.weight;
    }
  });

  return totalWeight > 0 ? Math.round((totalScore / (totalWeight * 5)) * 100) : 0;
};

// Categories for digital readiness assessment
export const digitalReadinessCategories = [
  "Infrastructure",
  "Données",
  "Compétences",
  "Processus",
  "Stratégie"
];

// Calculate category scores
export const calculateCategoryScores = (answers: Record<string, number>): Record<string, number> => {
  const categoryScores: Record<string, number> = {};

  digitalReadinessCategories.forEach(category => {
    const categoryQuestions = digitalReadinessQuestions.filter(q => q.category === category);
    let totalScore = 0;
    let totalWeight = 0;

    categoryQuestions.forEach(question => {
      if (answers[question.id]) {
        totalScore += answers[question.id] * question.weight;
        totalWeight += question.weight;
      }
    });

    categoryScores[category] = totalWeight > 0 ? Math.round((totalScore / (totalWeight * 5)) * 100) : 0;
  });

  return categoryScores;
};
