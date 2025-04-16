
import { supabase } from '@/integrations/supabase/client';
import type { CountryData } from '@/data/countriesData';

// Service pour récupérer les données démographiques de sources externes
export const fetchDemographicDataFromExternalSource = async (countryCode: string) => {
  try {
    // TODO: Intégrer une API externe comme World Bank ou UN Data
    console.log(`Récupération des données démographiques pour ${countryCode}`);
    
    // Simulation de données dynamiques
    return {
      population_growth: Math.random() * 3,
      median_age: 20 + Math.random() * 20,
      urban_population_percentage: Math.random() * 100,
      literacy_rate: 50 + Math.random() * 50,
      higher_education_rate: Math.random() * 50,
      social_stability_index: Math.random(),
      // Ajout de données culturelles simulées
      ethnic_groups: {
        "Groupe A": Math.round(Math.random() * 60),
        "Groupe B": Math.round(Math.random() * 30),
        "Groupe C": Math.round(Math.random() * 20)
      },
      religious_groups: {
        "Religion A": Math.round(Math.random() * 70),
        "Religion B": Math.round(Math.random() * 20),
        "Religion C": Math.round(Math.random() * 10)
      },
      cultural_dimensions: {
        power_distance: Math.round(Math.random() * 100),
        individualism: Math.round(Math.random() * 100),
        masculinity: Math.round(Math.random() * 100),
        uncertainty_avoidance: Math.round(Math.random() * 100),
        long_term_orientation: Math.round(Math.random() * 100)
      }
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
      
      console.log(`Données démographiques mises à jour en temps réel pour: ${countryCode}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Erreur lors de la mise à jour en temps réel:', error);
    return false;
  }
};

// Fonction pour démarrer des mises à jour périodiques plus fréquentes (toutes les X secondes)
export const startRealtimeUpdates = (intervalInSeconds = 30) => {
  console.log(`Démarrage des mises à jour en temps réel (intervalle: ${intervalInSeconds} secondes)`);
  
  const intervalId = setInterval(async () => {
    try {
      const { data: countries } = await supabase.from('countries').select('id');
      
      if (countries) {
        // Mettre à jour un pays aléatoire à chaque intervalle pour simuler des mises à jour en temps réel
        const randomIndex = Math.floor(Math.random() * countries.length);
        const randomCountry = countries[randomIndex];
        
        await updateDemographicDataRealtime(randomCountry.id);
      }
    } catch (error) {
      console.error('Erreur dans les mises à jour en temps réel:', error);
    }
  }, intervalInSeconds * 1000);
  
  // Retourner une fonction pour arrêter les mises à jour
  return () => {
    clearInterval(intervalId);
    console.log('Mises à jour en temps réel arrêtées');
  };
};

export const updateDemographicDataPeriodically = async () => {
  try {
    const { data: countries } = await supabase.from('countries').select('id');
    
    if (countries) {
      for (const country of countries) {
        const externalData = await fetchDemographicDataFromExternalSource(country.id);
        
        if (externalData) {
          await supabase
            .from('countries')
            .update({
              ...externalData,
              demographic_data_last_update: new Date().toISOString()
            })
            .eq('id', country.id);
        }
      }
      
      console.log('Mise à jour périodique des données démographiques terminée');
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour périodique:', error);
  }
};
