
import { FinancialIndicators } from './types';

// Static default financial data by country
export const getDefaultFinancialData = (countryCode: string): FinancialIndicators => {
  // Données fictives spécifiques par pays
  const countrySpecificData: Record<string, Partial<FinancialIndicators>> = {
    'ma': { // Maroc
      financial_inclusion_rate: 71.2,
      banks_fintechs_count: 28,
      banking_sector_stability: 78.5,
      sme_financing_access: 65.2,
      foreign_investors_presence: 72.0,
      venture_capital_presence: true,
      development_funds_presence: true,
      foreign_investors_types: [
        'Banques d\'investissement',
        'Fonds souverains',
        'Institutions financières internationales',
        'Capital-risque'
      ]
    },
    'eg': { // Égypte
      financial_inclusion_rate: 56.3,
      banks_fintechs_count: 32,
      banking_sector_stability: 68.7,
      sme_financing_access: 52.6,
      foreign_investors_presence: 65.0,
      venture_capital_presence: true,
      development_funds_presence: true,
      foreign_investors_types: [
        'Fonds de développement arabes',
        'Institutions financières internationales',
        'Banques d\'investissement',
        'Fonds souverains du Golfe'
      ]
    },
    'za': { // Afrique du Sud
      financial_inclusion_rate: 82.5,
      banks_fintechs_count: 45,
      banking_sector_stability: 81.2,
      sme_financing_access: 72.3,
      foreign_investors_presence: 85.0,
      venture_capital_presence: true,
      development_funds_presence: true,
      foreign_investors_types: [
        'Fonds de pension internationaux',
        'Banques d\'investissement',
        'Capital-risque',
        'Private Equity',
        'Plateforme de crowdfunding'
      ]
    },
    'ng': { // Nigeria
      financial_inclusion_rate: 64.1,
      banks_fintechs_count: 37,
      banking_sector_stability: 62.8,
      sme_financing_access: 55.7,
      foreign_investors_presence: 68.0,
      venture_capital_presence: true,
      development_funds_presence: true,
      foreign_investors_types: [
        'Capital-risque tech',
        'Banques d\'investissement',
        'Diaspora funds',
        'Institutions financières internationales'
      ]
    },
    'ke': { // Kenya
      financial_inclusion_rate: 78.4,
      banks_fintechs_count: 42,
      banking_sector_stability: 74.5,
      sme_financing_access: 67.2,
      foreign_investors_presence: 75.0,
      venture_capital_presence: true,
      development_funds_presence: true,
      foreign_investors_types: [
        'Capital-risque africain',
        'Impact investors',
        'Institutions financières internationales',
        'Tech funds'
      ]
    },
    'ci': { // Côte d'Ivoire
      financial_inclusion_rate: 58.2,
      banks_fintechs_count: 21,
      banking_sector_stability: 72.1,
      sme_financing_access: 54.8,
      foreign_investors_presence: 62.0,
      venture_capital_presence: true,
      development_funds_presence: true,
      foreign_investors_types: [
        'Institutions financières françaises',
        'Banques régionales',
        'Institutions financières internationales',
        'Fonds de développement'
      ]
    },
    'rw': { // Rwanda
      financial_inclusion_rate: 76.5,
      banks_fintechs_count: 19,
      banking_sector_stability: 79.8,
      sme_financing_access: 68.5,
      foreign_investors_presence: 73.0,
      venture_capital_presence: true,
      development_funds_presence: true,
      foreign_investors_types: [
        'Impact investors',
        'Institutions financières internationales',
        'Fonds de développement',
        'Tech funds'
      ]
    },
    'sn': { // Sénégal
      financial_inclusion_rate: 65.2,
      banks_fintechs_count: 24,
      banking_sector_stability: 75.3,
      sme_financing_access: 58.7,
      foreign_investors_presence: 64.0,
      venture_capital_presence: true,
      development_funds_presence: true,
      foreign_investors_types: [
        'Banques françaises',
        'Institutions financières internationales',
        'Fonds de développement',
        'Banques régionales'
      ]
    },
    'et': { // Éthiopie
      financial_inclusion_rate: 42.5,
      banks_fintechs_count: 15,
      banking_sector_stability: 65.2,
      sme_financing_access: 48.3,
      foreign_investors_presence: 55.0,
      venture_capital_presence: false,
      development_funds_presence: true,
      foreign_investors_types: [
        'Institutions financières internationales',
        'Fonds de développement',
        'Investisseurs chinois'
      ]
    },
    'gh': { // Ghana
      financial_inclusion_rate: 68.4,
      banks_fintechs_count: 32,
      banking_sector_stability: 72.7,
      sme_financing_access: 61.5,
      foreign_investors_presence: 70.0,
      venture_capital_presence: true,
      development_funds_presence: true,
      foreign_investors_types: [
        'Capital-risque africain',
        'Institutions financières internationales',
        'Diaspora funds',
        'Impact investors'
      ]
    }
  };

  // Valeurs par défaut si le pays n'est pas dans la liste
  const defaultData: FinancialIndicators = {
    financial_inclusion_rate: 30 + Math.random() * 50,
    banks_fintechs_count: 5 + Math.floor(Math.random() * 40),
    banking_sector_stability: 50 + Math.random() * 30,
    sme_financing_access: 40 + Math.random() * 40,
    foreign_investors_presence: 40 + Math.random() * 40,
    venture_capital_presence: Math.random() > 0.5,
    development_funds_presence: Math.random() > 0.3,
    foreign_investors_types: [
      'Institutions financières internationales',
      'Banques régionales',
      'Fonds de développement'
    ]
  };

  // Combiner les données spécifiques par pays avec les valeurs par défaut
  const countryCode_lower = countryCode.toLowerCase();
  return {
    ...defaultData,
    ...countrySpecificData[countryCode_lower]
  };
};
