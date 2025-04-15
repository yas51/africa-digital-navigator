
import type { EconomicIndicators } from '@/types/economicIndicators';
import { countryDataMap, getDefaultEconomicData } from '@/data/countryEconomicData';
import { supabase } from '@/integrations/supabase/client';

export const fetchEconomicIndicators = async (countryCode: string): Promise<EconomicIndicators> => {
  try {
    console.log("Fetching economic indicators for:", countryCode);
    
    // Dans un environnement réel, on appellerait une vraie API externe
    // Simulation avec des données réalistes par pays
    const countryData = countryDataMap[countryCode.toLowerCase()] || getDefaultEconomicData();
    
    return countryData;
  } catch (error) {
    console.error('Error fetching economic indicators:', error);
    return getDefaultEconomicData();
  }
};

export const updateCountryEconomicData = async (countryId: string): Promise<boolean> => {
  try {
    const economicData = await fetchEconomicIndicators(countryId);
    
    if (economicData) {
      const { error } = await supabase
        .from('countries')
        .update({
          current_inflation: economicData.current_inflation,
          exchange_rate: economicData.exchange_rate,
          unemployment_rate: economicData.unemployment_rate,
          public_debt_gdp: economicData.public_debt_gdp,
          trade_balance: economicData.trade_balance,
          exchange_rate_volatility: economicData.exchange_rate_volatility,
          ease_of_doing_business: economicData.ease_of_doing_business,
          business_creation_days: economicData.business_creation_days,
          credit_access_score: economicData.credit_access_score,
          foreign_investor_protection: economicData.foreign_investor_protection,
          skilled_workforce_availability: economicData.skilled_workforce_availability,
          import_export_regulations: economicData.import_export_regulations,
          last_real_time_update: new Date().toISOString(),
          business_climate_last_update: new Date().toISOString()
        })
        .eq('id', countryId);

      if (error) {
        console.error('Error updating economic indicators:', error);
        return false;
      }
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error updating economic data:', error);
    return false;
  }
};
