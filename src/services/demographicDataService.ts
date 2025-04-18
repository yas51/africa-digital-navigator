
import { supabase } from '@/integrations/supabase/client';
import type { CountryData } from '@/data/countriesData';

const WORLD_BANK_API_BASE = 'https://api.worldbank.org/v2';

// Service pour récupérer les données démographiques de sources externes
export const fetchDemographicDataFromExternalSource = async (countryCode: string) => {
  try {
    console.log(`Récupération des données démographiques pour ${countryCode}`);
    
    // Récupérer les indicateurs de la Banque Mondiale
    const indicators = {
      population_growth: 'SP.POP.GROW', // Croissance de la population
      literacy_rate: 'SE.ADT.LITR.ZS', // Taux d'alphabétisation
      urban_population: 'SP.URB.TOTL.IN.ZS', // Population urbaine
      higher_education: 'SE.TER.ENRR', // Taux d'inscription dans l'enseignement supérieur
    };
    
    const fetchIndicator = async (indicator: string) => {
      const response = await fetch(
        `${WORLD_BANK_API_BASE}/country/${countryCode}/indicator/${indicator}?format=json&date=2021`
      );
      const data = await response.json();
      return data[1]?.[0]?.value ?? null;
    };

    const [
      populationGrowth,
      literacyRate,
      urbanPopulation,
      higherEducation
    ] = await Promise.all([
      fetchIndicator(indicators.population_growth),
      fetchIndicator(indicators.literacy_rate),
      fetchIndicator(indicators.urban_population),
      fetchIndicator(indicators.higher_education),
    ]);

    // Simulation des données d'âge basée sur les tendances régionales
    const getAgeDistribution = (region: string) => {
      switch(region) {
        case "Afrique de l'Ouest":
          return {
            "0-14 ans": 42,
            "15-64 ans": 55,
            "65+ ans": 3
          };
        case "Afrique du Nord":
          return {
            "0-14 ans": 35,
            "15-64 ans": 60,
            "65+ ans": 5
          };
        default:
          return {
            "0-14 ans": 40,
            "15-64 ans": 57,
            "65+ ans": 3
          };
      }
    };

    // Récupérer la région du pays
    const { data: countryData } = await supabase
      .from('countries')
      .select('region')
      .eq('id', countryCode)
      .single();

    return {
      population_growth: populationGrowth,
      median_age: 20 + Math.random() * 10, // À remplacer par données réelles
      urban_population_percentage: urbanPopulation,
      literacy_rate: literacyRate,
      higher_education_rate: higherEducation,
      age_distribution: getAgeDistribution(countryData?.region || ''),
      social_stability_index: Math.random(), // À remplacer par un indice réel
      demographic_data_last_update: new Date().toISOString()
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des données démographiques:', error);
    return null;
  }
};

// Mise à jour immédiate des données démographiques pour un pays spécifique
export const updateDemographicDataRealtime = async (countryCode: string) => {
  try {
    console.log(`Mise à jour en temps réel des données démographiques pour: ${countryCode}`);
    const externalData = await fetchDemographicDataFromExternalSource(countryCode);
    
    if (externalData) {
      const { error } = await supabase
        .from('countries')
        .update({
          ...externalData,
          demographic_data_last_update: new Date().toISOString()
        })
        .eq('id', countryCode);
        
      if (error) {
        console.error('Erreur lors de la mise à jour en temps réel:', error);
        return false;
      }
      
      console.log(`Données démographiques mises à jour avec succès pour: ${countryCode}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Erreur lors de la mise à jour en temps réel:', error);
    return false;
  }
};

// Fonction pour démarrer des mises à jour périodiques plus fréquentes
export const startRealtimeUpdates = (intervalInSeconds = 30) => {
  console.log(`Démarrage des mises à jour en temps réel (intervalle: ${intervalInSeconds} secondes)`);
  
  const intervalId = setInterval(async () => {
    try {
      const { data: countries } = await supabase.from('countries').select('id');
      
      if (countries) {
        // Mettre à jour un pays aléatoire à chaque intervalle
        const randomIndex = Math.floor(Math.random() * countries.length);
        const randomCountry = countries[randomIndex];
        
        await updateDemographicDataRealtime(randomCountry.id);
      }
    } catch (error) {
      console.error('Erreur dans les mises à jour en temps réel:', error);
    }
  }, intervalInSeconds * 1000);
  
  return () => {
    clearInterval(intervalId);
    console.log('Mises à jour en temps réel arrêtées');
  };
};

