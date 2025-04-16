import { supabase } from '@/integrations/supabase/client';
import type { CountryData } from '@/data/countriesData';

type LogisticsData = {
  infrastructure_quality: number;
  road_quality: number;
  port_quality: number;
  airport_quality: number;
  energy_stability: number;
  electricity_cost: number;
  water_cost: number;
  fuel_cost: number;
  lpi_score: number;
  logistics_hubs: string[];
  infrastructure_last_update: string;
};

const infrastructureDataByCountry: Record<string, LogisticsData> = {
  'eg': { // Égypte - Données 2023
    infrastructure_quality: 0.68,
    road_quality: 0.65,
    port_quality: 0.70,
    airport_quality: 0.75,
    energy_stability: 0.60,
    electricity_cost: 0.08, // USD/kWh
    water_cost: 0.65, // USD/m3
    fuel_cost: 0.85, // USD/L
    lpi_score: 2.82, // World Bank LPI Score
    logistics_hubs: ['Port de Damiette', 'Aéroport du Caire', 'Zone du Canal de Suez'],
    infrastructure_last_update: new Date().toISOString()
  },
  'ma': { // Maroc - Données 2023
    infrastructure_quality: 0.72,
    road_quality: 0.78,
    port_quality: 0.81,
    airport_quality: 0.79,
    energy_stability: 0.75,
    electricity_cost: 0.11,
    water_cost: 0.85,
    fuel_cost: 1.15,
    lpi_score: 2.54,
    logistics_hubs: ['Port de Tanger Med', 'Casablanca Logistics City', 'Zone franche de Kénitra'],
    infrastructure_last_update: new Date().toISOString()
  },
  'za': { // Afrique du Sud - Données 2023
    infrastructure_quality: 0.74,
    road_quality: 0.76,
    port_quality: 0.68,
    airport_quality: 0.82,
    energy_stability: 0.55,
    electricity_cost: 0.13,
    water_cost: 0.95,
    fuel_cost: 1.05,
    lpi_score: 3.38,
    logistics_hubs: ['Port de Durban', 'Johannesburg Air Gateway', 'Cape Town Logistics Park'],
    infrastructure_last_update: new Date().toISOString()
  },
  'ng': { // Nigeria - Données 2023
    infrastructure_quality: 0.51,
    road_quality: 0.45,
    port_quality: 0.55,
    airport_quality: 0.62,
    energy_stability: 0.35,
    electricity_cost: 0.09,
    water_cost: 0.75,
    fuel_cost: 0.45,
    lpi_score: 2.53,
    logistics_hubs: ['Port de Lagos', 'Zone franche de Lekki', 'Abuja Air Cargo'],
    infrastructure_last_update: new Date().toISOString()
  }
};

const demographicDataByCountry = {
  'eg': { // Égypte - Données 2023
    population_growth: 1.9,
    median_age: 24.6,
    urban_population_percentage: 42.8,
    literacy_rate: 71.2,
    higher_education_rate: 35.2,
    age_distribution: {
      "0-14": 33.5,
      "15-64": 61.2,
      "65+": 5.3
    },
    ethnic_groups: {
      "Egyptiens": 99,
      "Autres": 1
    },
    religious_groups: {
      "Musulmans": 90,
      "Coptes": 9,
      "Autres": 1
    },
    cultural_dimensions: {
      power_distance: 70,
      individualism: 25,
      masculinity: 45,
      uncertainty_avoidance: 80,
      long_term_orientation: 7
    },
    social_stability_index: 0.65
  },
  'ma': { // Maroc - Données 2023
    population_growth: 1.2,
    median_age: 29.3,
    urban_population_percentage: 63.5,
    literacy_rate: 73.8,
    higher_education_rate: 38.1,
    age_distribution: {
      "0-14": 27.2,
      "15-64": 65.8,
      "65+": 7.0
    },
    ethnic_groups: {
      "Arabes-Berbères": 99,
      "Autres": 1
    },
    religious_groups: {
      "Musulmans": 99,
      "Autres": 1
    },
    cultural_dimensions: {
      power_distance: 70,
      individualism: 46,
      masculinity: 53,
      uncertainty_avoidance: 68,
      long_term_orientation: 14
    },
    social_stability_index: 0.72
  },
  'za': { // Afrique du Sud - Données 2023
    population_growth: 1.28,
    median_age: 27.6,
    urban_population_percentage: 67.4,
    literacy_rate: 87.0,
    higher_education_rate: 42.3,
    age_distribution: {
      "0-14": 28.3,
      "15-64": 66.2,
      "65+": 5.5
    },
    ethnic_groups: {
      "Noirs": 80.2,
      "Blancs": 8.4,
      "Métis": 8.8,
      "Indiens/Asiatiques": 2.6
    },
    religious_groups: {
      "Chrétiens": 86,
      "Autres": 14
    },
    cultural_dimensions: {
      power_distance: 49,
      individualism: 65,
      masculinity: 63,
      uncertainty_avoidance: 49,
      long_term_orientation: 34
    },
    social_stability_index: 0.58
  },
  'ng': { // Nigeria - Données 2023
    population_growth: 2.54,
    median_age: 18.1,
    urban_population_percentage: 52.0,
    literacy_rate: 62.0,
    higher_education_rate: 28.4,
    age_distribution: {
      "0-14": 43.3,
      "15-64": 53.8,
      "65+": 2.9
    },
    ethnic_groups: {
      "Haoussa-Fulani": 29,
      "Yoruba": 21,
      "Igbo": 18,
      "Autres": 32
    },
    religious_groups: {
      "Musulmans": 53.5,
      "Chrétiens": 45.9,
      "Autres": 0.6
    },
    cultural_dimensions: {
      power_distance: 80,
      individualism: 30,
      masculinity: 60,
      uncertainty_avoidance: 55,
      long_term_orientation: 13
    },
    social_stability_index: 0.45
  }
};

const getDefaultData = (): LogisticsData => ({
  infrastructure_quality: 0.55,
  road_quality: 0.52,
  port_quality: 0.58,
  airport_quality: 0.62,
  energy_stability: 0.50,
  electricity_cost: 0.12,
  water_cost: 0.85,
  fuel_cost: 1.10,
  lpi_score: 2.50,
  logistics_hubs: ['Port principal', 'Centre Logistique Capital', 'Zone industrielle'],
  infrastructure_last_update: new Date().toISOString()
});

export const updateCountryInfrastructureData = async (countryCode: string): Promise<boolean> => {
  try {
    console.log(`Mise à jour des données d'infrastructure pour: ${countryCode}`);
    
    const countryCodeLower = countryCode.toLowerCase();
    const infraData = infrastructureDataByCountry[countryCodeLower] || getDefaultData();
    
    const { error } = await supabase
      .from('countries')
      .update({
        infrastructure_quality: infraData.infrastructure_quality,
        road_quality: infraData.road_quality,
        port_quality: infraData.port_quality,
        airport_quality: infraData.airport_quality,
        energy_stability: infraData.energy_stability,
        electricity_cost: infraData.electricity_cost,
        water_cost: infraData.water_cost,
        fuel_cost: infraData.fuel_cost,
        lpi_score: infraData.lpi_score,
        logistics_hubs: infraData.logistics_hubs,
        infrastructure_last_update: new Date().toISOString()
      })
      .eq('id', countryCodeLower);

    if (error) {
      console.error('Erreur lors de la mise à jour des données d\'infrastructure:', error);
      return false;
    }
    
    console.log(`Données d'infrastructure mises à jour avec succès pour: ${countryCode}`);
    return true;
  } catch (error) {
    console.error('Erreur dans updateCountryInfrastructureData:', error);
    return false;
  }
};

export const updateCountryDemographicData = async (countryCode: string): Promise<boolean> => {
  try {
    console.log(`Mise à jour des données démographiques pour: ${countryCode}`);
    
    const countryCodeLower = countryCode.toLowerCase();
    const demoData = demographicDataByCountry[countryCodeLower];
    
    if (!demoData) {
      console.log(`Pas de données démographiques disponibles pour: ${countryCode}`);
      return false;
    }

    const { error } = await supabase
      .from('countries')
      .update({
        population_growth: demoData.population_growth,
        median_age: demoData.median_age,
        urban_population_percentage: demoData.urban_population_percentage,
        literacy_rate: demoData.literacy_rate,
        higher_education_rate: demoData.higher_education_rate,
        age_distribution: demoData.age_distribution,
        ethnic_groups: demoData.ethnic_groups,
        religious_groups: demoData.religious_groups,
        cultural_dimensions: demoData.cultural_dimensions,
        social_stability_index: demoData.social_stability_index,
        demographic_data_last_update: new Date().toISOString()
      })
      .eq('id', countryCodeLower);

    if (error) {
      console.error('Erreur lors de la mise à jour des données démographiques:', error);
      return false;
    }
    
    console.log(`Données démographiques mises à jour avec succès pour: ${countryCode}`);
    return true;
  } catch (error) {
    console.error('Erreur dans updateCountryDemographicData:', error);
    return false;
  }
};
