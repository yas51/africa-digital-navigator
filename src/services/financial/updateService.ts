
import { supabase } from '@/integrations/supabase/client';
import { getDefaultFinancialData } from './defaultData';
import { CountryFinancialUpdate } from './types';

export const updateCountryFinancialData = async (countryId: string): Promise<boolean> => {
  try {
    console.log(`Mise à jour des indicateurs financiers pour: ${countryId}`);
    
    // Simuler l'obtention de données d'une API externe
    const financialData = getDefaultFinancialData(countryId);
    
    // Ajouter une légère variation aléatoire pour simuler des changements en temps réel
    const updatedData: CountryFinancialUpdate = {
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
    
    // Mise à jour dans la base de données Supabase
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
