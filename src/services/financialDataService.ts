
import { supabase } from '@/integrations/supabase/client';

export interface FinancialIndicators {
  financial_inclusion_rate: number;
  banks_fintechs_count: number;
  banking_sector_stability: number;
  sme_financing_access: number;
  foreign_investors_presence: number;
  venture_capital_presence: boolean;
  development_funds_presence: boolean;
  foreign_investors_types: string[];
}

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

export const updateCountryFinancialData = async (countryId: string): Promise<boolean> => {
  try {
    console.log(`Mise à jour des indicateurs financiers pour: ${countryId}`);
    
    // Simuler l'obtention de données d'une API externe
    const financialData = getDefaultFinancialData(countryId);
    
    // Ajouter une légère variation aléatoire pour simuler des changements en temps réel
    const updatedData = {
      financial_inclusion_rate: financialData.financial_inclusion_rate + (Math.random() * 2 - 1),
      banks_fintechs_count: Math.max(1, financialData.banks_fintechs_count + (Math.random() > 0.7 ? Math.floor(Math.random() * 3) - 1 : 0)),
      banking_sector_stability: Math.min(100, Math.max(0, financialData.banking_sector_stability + (Math.random() * 4 - 2))),
      sme_financing_access: Math.min(100, Math.max(0, financialData.sme_financing_access + (Math.random() * 3 - 1.5))),
      foreign_investors_presence: Math.min(100, Math.max(0, financialData.foreign_investors_presence + (Math.random() * 3 - 1.5))),
      venture_capital_presence: Math.random() > 0.9 ? !financialData.venture_capital_presence : financialData.venture_capital_presence,
      development_funds_presence: Math.random() > 0.95 ? !financialData.development_funds_presence : financialData.development_funds_presence,
      foreign_investors_types: financialData.foreign_investors_types,
      financial_data_last_update: new Date().toISOString()
    };
    
    console.log(`Données financières mises à jour pour ${countryId}:`, updatedData);
    
    // Mise à jour dans la base de données Supabase - en utilisant les noms de colonnes qui existent dans la table
    const { error } = await supabase
      .from('countries')
      .update({
        financial_inclusion_rate: updatedData.financial_inclusion_rate,
        banks_fintechs_count: updatedData.banks_fintechs_count,
        banking_sector_stability: updatedData.banking_sector_stability,
        sme_financing_access: updatedData.sme_financing_access,
        foreign_investors_presence: updatedData.foreign_investors_presence,
        venture_capital_presence: updatedData.venture_capital_presence,
        development_funds_presence: updatedData.development_funds_presence,
        foreign_investors_types: updatedData.foreign_investors_types,
        financial_data_last_update: updatedData.financial_data_last_update
      })
      .eq('id', countryId);
      
    if (error) {
      console.error('Erreur lors de la mise à jour des indicateurs financiers:', error);
      return false;
    }
    
    console.log(`Indicateurs financiers mis à jour avec succès pour: ${countryId}`);
    return true;
  } catch (error) {
    console.error('Erreur lors de la mise à jour des données financières:', error);
    return false;
  }
};

// Fonction pour simuler des mises à jour périodiques des données financières
export const startFinancialDataUpdates = (intervalInSeconds: number = 30): (() => void) => {
  console.log(`Démarrage des mises à jour des données financières toutes les ${intervalInSeconds} secondes`);
  
  const intervalId = setInterval(async () => {
    try {
      // Récupérer tous les pays
      const { data: countries, error } = await supabase
        .from('countries')
        .select('id')
        .order('name');
        
      if (error) {
        console.error('Erreur lors de la récupération des pays:', error);
        return;
      }
      
      if (!countries || countries.length === 0) {
        console.log('Aucun pays trouvé pour la mise à jour des données financières');
        return;
      }
      
      // Sélectionner un pays aléatoire pour la mise à jour
      const randomIndex = Math.floor(Math.random() * countries.length);
      const countryToUpdate = countries[randomIndex];
      
      console.log(`Mise à jour aléatoire des données financières pour: ${countryToUpdate.id}`);
      await updateCountryFinancialData(countryToUpdate.id);
      
    } catch (error) {
      console.error('Erreur lors de la mise à jour périodique des données financières:', error);
    }
  }, intervalInSeconds * 1000);
  
  // Retourner une fonction pour arrêter les mises à jour
  return () => {
    console.log('Arrêt des mises à jour des données financières');
    clearInterval(intervalId);
  };
};
