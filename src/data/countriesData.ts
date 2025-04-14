
export interface CountryData {
  id: string;
  name: string;
  region: string;
  flag: string;
  gdp: number; // GDP in USD billions
  gdpGrowth: number; // GDP growth in %
  population: number; // in millions
  hdi: number; // Human Development Index (0-1)
  doingBusinessRank: number; // Rank out of 190
  internetPenetration: number; // in %
  mobilePenetration: number; // in %
  corruptionIndex: number; // 0-100 (higher is better)
  politicalStability: number; // 0-100
  education: number; // 0-100
  logisticsIndex: number; // 0-5
  fdiInflow: number; // Foreign Direct Investment in USD billions
  officialLanguages: string[];
  opportunityScore: number; // 0-100
}

// Sample data for African countries
export const countriesData: CountryData[] = [
  {
    id: "ng",
    name: "Nigeria",
    region: "Afrique de l'Ouest",
    flag: "🇳🇬",
    gdp: 440.83,
    gdpGrowth: 3.3,
    population: 213.4,
    hdi: 0.539,
    doingBusinessRank: 131,
    internetPenetration: 73.0,
    mobilePenetration: 99.7,
    corruptionIndex: 24,
    politicalStability: 42,
    education: 65,
    logisticsIndex: 2.53,
    fdiInflow: 2.4,
    officialLanguages: ["Anglais"],
    opportunityScore: 68
  },
  {
    id: "za",
    name: "Afrique du Sud",
    region: "Afrique Australe",
    flag: "🇿🇦",
    gdp: 329.53,
    gdpGrowth: 2.0,
    population: 60.0,
    hdi: 0.713,
    doingBusinessRank: 84,
    internetPenetration: 68.2,
    mobilePenetration: 159.9,
    corruptionIndex: 44,
    politicalStability: 59,
    education: 76,
    logisticsIndex: 3.38,
    fdiInflow: 3.1,
    officialLanguages: ["Afrikaans", "Anglais", "Zoulou", "Xhosa", "Swati", "Ndebele", "Sotho du Sud", "Sotho du Nord", "Tswana", "Tsonga", "Venda"],
    opportunityScore: 72
  },
  {
    id: "eg",
    name: "Égypte",
    region: "Afrique du Nord",
    flag: "🇪🇬",
    gdp: 404.14,
    gdpGrowth: 5.6,
    population: 104.3,
    hdi: 0.731,
    doingBusinessRank: 114,
    internetPenetration: 71.9,
    mobilePenetration: 92.7,
    corruptionIndex: 33,
    politicalStability: 31,
    education: 72,
    logisticsIndex: 2.82,
    fdiInflow: 5.2,
    officialLanguages: ["Arabe"],
    opportunityScore: 65
  },
  {
    id: "ke",
    name: "Kenya",
    region: "Afrique de l'Est",
    flag: "🇰🇪",
    gdp: 110.35,
    gdpGrowth: 4.8,
    population: 54.4,
    hdi: 0.601,
    doingBusinessRank: 56,
    internetPenetration: 85.2,
    mobilePenetration: 114.0,
    corruptionIndex: 31,
    politicalStability: 49,
    education: 68,
    logisticsIndex: 2.81,
    fdiInflow: 0.8,
    officialLanguages: ["Anglais", "Swahili"],
    opportunityScore: 76
  },
  {
    id: "ma",
    name: "Maroc",
    region: "Afrique du Nord",
    flag: "🇲🇦",
    gdp: 126.04,
    gdpGrowth: 3.1,
    population: 37.1,
    hdi: 0.686,
    doingBusinessRank: 53,
    internetPenetration: 84.1,
    mobilePenetration: 131.1,
    corruptionIndex: 40,
    politicalStability: 65,
    education: 74,
    logisticsIndex: 2.54,
    fdiInflow: 1.9,
    officialLanguages: ["Arabe", "Amazigh", "Français"],
    opportunityScore: 78
  },
  {
    id: "ci",
    name: "Côte d'Ivoire",
    region: "Afrique de l'Ouest",
    flag: "🇨🇮",
    gdp: 70.99,
    gdpGrowth: 6.2,
    population: 27.5,
    hdi: 0.538,
    doingBusinessRank: 110,
    internetPenetration: 46.8,
    mobilePenetration: 139.0,
    corruptionIndex: 36,
    politicalStability: 45,
    education: 50,
    logisticsIndex: 2.79,
    fdiInflow: 1.0,
    officialLanguages: ["Français"],
    opportunityScore: 70
  },
  {
    id: "gh",
    name: "Ghana",
    region: "Afrique de l'Ouest",
    flag: "🇬🇭",
    gdp: 75.49,
    gdpGrowth: 4.4,
    population: 31.7,
    hdi: 0.611,
    doingBusinessRank: 118,
    internetPenetration: 58.0,
    mobilePenetration: 137.5,
    corruptionIndex: 43,
    politicalStability: 62,
    education: 60,
    logisticsIndex: 2.57,
    fdiInflow: 2.6,
    officialLanguages: ["Anglais"],
    opportunityScore: 69
  },
  {
    id: "rw",
    name: "Rwanda",
    region: "Afrique de l'Est",
    flag: "🇷🇼",
    gdp: 11.07,
    gdpGrowth: 10.9,
    population: 13.3,
    hdi: 0.543,
    doingBusinessRank: 38,
    internetPenetration: 52.1,
    mobilePenetration: 81.3,
    corruptionIndex: 54,
    politicalStability: 68,
    education: 65,
    logisticsIndex: 2.87,
    fdiInflow: 0.4,
    officialLanguages: ["Kinyarwanda", "Anglais", "Français", "Swahili"],
    opportunityScore: 82
  }
];

export const getCountryById = (id: string): CountryData | undefined => {
  return countriesData.find(country => country.id === id);
};

export const getCountriesByRegion = (region: string): CountryData[] => {
  return countriesData.filter(country => country.region === region);
};

export const regions = [
  "Afrique du Nord",
  "Afrique de l'Ouest",
  "Afrique Centrale",
  "Afrique de l'Est",
  "Afrique Australe"
];

export const getTopCountriesByScore = (count: number = 5): CountryData[] => {
  return [...countriesData].sort((a, b) => b.opportunityScore - a.opportunityScore).slice(0, count);
};
