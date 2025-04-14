import { supabase } from '@/integrations/supabase/client';

export const fetchWorldBankData = async (countryCode: string) => {
  try {
    // Liste complète des indicateurs économiques et politiques
    const indicators = [
      'NY.GDP.MKTP.CD',     // PIB total
      'SP.POP.TOTL',        // Population totale
      'NY.GDP.PCAP.KD.ZG',  // Croissance du PIB par habitant
      'FP.CPI.TOTL.ZG',     // Inflation
      'SL.UEM.TOTL.ZS',     // Taux de chômage
      'GC.DOD.TOTL.GD.ZS',  // Dette publique (% du PIB)
      'BN.CAB.XOKA.GD.ZS',  // Balance courante (% du PIB)
      'IQ.CPA.PUBS.XQ',     // Transparence et responsabilité
      'PV.EST',             // Stabilité politique
      'RL.EST',             // État de droit
      'RQ.EST',             // Qualité de la réglementation
      'CC.EST'              // Contrôle de la corruption
    ].join(',');

    const currentYear = new Date().getFullYear();
    const response = await fetch(
      `https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicators}?format=json&per_page=7&date=${currentYear},${currentYear-1},${currentYear-2}&cache-bust=${Date.now()}`
    );
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données de la Banque Mondiale');
    }
    
    const data = await response.json();
    const processedData = data[1]?.map(indicator => ({
      indicatorCode: indicator.indicator.id,
      indicatorName: indicator.indicator.value,
      value: indicator.value,
      year: indicator.date
    })) || [];

    // Mettre à jour les données du pays dans la base
    await updateCountryWithWorldBankData(countryCode, processedData);
    await updatePoliticalIndicators(countryCode);
    
    return processedData;
  } catch (error) {
    console.error('Erreur World Bank API:', error);
    return [];
  }
};

const updateCountryWithWorldBankData = async (countryCode: string, data: any[]) => {
  try {
    const updateData: Record<string, any> = {};
    
    data.forEach(item => {
      switch(item.indicatorCode) {
        case 'NY.GDP.MKTP.CD':
          updateData.gdp = item.value;
          break;
        case 'SP.POP.TOTL':
          updateData.population = item.value;
          break;
        case 'NY.GDP.PCAP.KD.ZG':
          updateData.gdpGrowth = item.value;
          break;
        case 'FP.CPI.TOTL.ZG':
          updateData.current_inflation = item.value;
          break;
        case 'SL.UEM.TOTL.ZS':
          updateData.unemployment_rate = item.value;
          break;
        case 'GC.DOD.TOTL.GD.ZS':
          updateData.public_debt_gdp = item.value;
          break;
        case 'BN.CAB.XOKA.GD.ZS':
          updateData.trade_balance = item.value;
          break;
      }
    });

    const { error } = await supabase
      .from('countries')
      .update({
        ...updateData,
        wb_last_updated: new Date().toISOString()
      })
      .eq('id', countryCode.toLowerCase());

    if (error) {
      console.error('Erreur lors de la mise à jour des données:', error);
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour des données du pays:', error);
  }
};

const updatePoliticalIndicators = async (countryCode: string) => {
  try {
    // Simuler la récupération de données de différentes sources
    const politicalData = {
      political_stability_index: Math.random() * 100,
      contract_enforcement_score: 60 + Math.random() * 40,
      property_rights_score: 50 + Math.random() * 50,
      geopolitical_risk_score: Math.random() * 100,
      fiscal_transparency_score: Math.random() * 100,
      special_economic_zones: ['Zone Franche de Tanger', 'Casablanca Finance City'],
      fiscal_incentives: ['Exonération fiscale 5 ans', 'Réduction TVA'],
      political_indicators_last_update: new Date().toISOString()
    };

    const { error } = await supabase
      .from('countries')
      .update(politicalData)
      .eq('id', countryCode.toLowerCase());

    if (error) {
      console.error('Erreur lors de la mise à jour des indicateurs politiques:', error);
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour des données politiques:', error);
  }
};

export const fetchUNData = async (countryCode: string) => {
  try {
    const response = await fetch(
      `https://population.un.org/dataportalapi/api/v1/data/indicators/49/locations/${countryCode}/start/2023/end/2023`
    );
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données de l\'ONU');
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Erreur UN API:', error);
    return [];
  }
};
