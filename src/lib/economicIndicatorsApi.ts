
// API pour récupérer les indicateurs économiques en temps réel

/**
 * Fonction pour récupérer les indicateurs économiques actuels pour un pays
 * 
 * @param countryCode - Le code ISO du pays (ex: FR, US, DE)
 * @returns Les indicateurs économiques récupérés
 */
export const fetchEconomicIndicators = async (countryCode: string) => {
  try {
    // NOTE: Ceci est un exemple d'API - dans un environnement réel, vous utiliseriez
    // une API réelle comme Alpha Vantage, World Bank API, Trading Economics, etc.
    
    // Nous simulons ici une API réelle avec des données aléatoires pour la démonstration
    // Dans une application réelle, remplacez cette URL par celle de votre API économique
    const response = await fetch(
      `https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.MKTP.CD,FP.CPI.TOTL.ZG,SL.UEM.TOTL.ZS,GC.DOD.TOTL.GD.ZS,BN.CAB.XOKA.GD.ZS?format=json&date=2023`
    );
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des indicateurs économiques');
    }
    
    const data = await response.json();
    
    // Traiter les données reçues pour les normaliser
    const processedData = processWorldBankEconomicData(data, countryCode);
    
    return processedData;
  } catch (error) {
    console.error('Erreur Economic Indicators API:', error);
    
    // En cas d'erreur, retourner des données simulées (à remplacer par une gestion d'erreur appropriée)
    return {
      current_inflation: Math.random() * 5,
      exchange_rate: 1 + Math.random(),
      unemployment_rate: 3 + Math.random() * 7,
      public_debt_gdp: 40 + Math.random() * 60,
      trade_balance: -5 + Math.random() * 10,
      exchange_rate_volatility: Math.random() * 3,
      timestamp: new Date().toISOString()
    };
  }
};

/**
 * Traite les données brutes de la Banque Mondiale pour en extraire les indicateurs économiques
 */
const processWorldBankEconomicData = (data: any, countryCode: string) => {
  // Dans un cas réel, nous traiterions les données de l'API
  // Pour l'exemple, nous simulons des données
  
  return {
    current_inflation: parseFloat((2 + Math.random() * 3).toFixed(2)),
    exchange_rate: parseFloat((1 + Math.random() * 0.2).toFixed(4)),
    unemployment_rate: parseFloat((4 + Math.random() * 6).toFixed(1)),
    public_debt_gdp: parseFloat((50 + Math.random() * 40).toFixed(1)),
    trade_balance: parseFloat((-10 + Math.random() * 20).toFixed(2)),
    exchange_rate_volatility: parseFloat((0.1 + Math.random() * 0.9).toFixed(2)),
    timestamp: new Date().toISOString()
  };
};

/**
 * Met à jour les données économiques d'un pays dans la base de données
 */
export const updateCountryEconomicData = async (countryId: string) => {
  try {
    const economicData = await fetchEconomicIndicators(countryId);
    
    if (economicData) {
      const { supabase } = await import('@/integrations/supabase/client');
      
      const { error } = await supabase
        .from('countries')
        .update({
          current_inflation: economicData.current_inflation,
          exchange_rate: economicData.exchange_rate,
          unemployment_rate: economicData.unemployment_rate,
          public_debt_gdp: economicData.public_debt_gdp,
          trade_balance: economicData.trade_balance,
          exchange_rate_volatility: economicData.exchange_rate_volatility,
          last_real_time_update: new Date().toISOString()
        })
        .eq('id', countryId);

      if (error) {
        console.error('Erreur lors de la mise à jour des indicateurs économiques:', error);
        return false;
      }
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Erreur lors de la mise à jour des données économiques:', error);
    return false;
  }
};
