
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
  'eg': { // Égypte
    infrastructure_quality: 0.68,
    road_quality: 0.65,
    port_quality: 0.70,
    airport_quality: 0.75,
    energy_stability: 0.60,
    electricity_cost: 0.08,
    water_cost: 0.65,
    fuel_cost: 0.85,
    lpi_score: 2.82,
    logistics_hubs: ['Port de Damiette', 'Aéroport du Caire', 'Zone du Canal de Suez'],
    infrastructure_last_update: new Date().toISOString()
  },
  'ma': { // Maroc
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
  'za': { // Afrique du Sud
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
  'ng': { // Nigeria
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
  },
  'ke': { // Kenya
    infrastructure_quality: 0.61,
    road_quality: 0.58,
    port_quality: 0.64,
    airport_quality: 0.72,
    energy_stability: 0.55,
    electricity_cost: 0.18,
    water_cost: 1.05,
    fuel_cost: 1.18,
    lpi_score: 2.81,
    logistics_hubs: ['Port de Mombasa', 'Nairobi ICD', 'Naivasha Dry Port'],
    infrastructure_last_update: new Date().toISOString()
  },
  'gh': { // Ghana
    infrastructure_quality: 0.59,
    road_quality: 0.55,
    port_quality: 0.62,
    airport_quality: 0.63,
    energy_stability: 0.49,
    electricity_cost: 0.13,
    water_cost: 0.88,
    fuel_cost: 1.02,
    lpi_score: 2.57,
    logistics_hubs: ['Port de Tema', 'Accra Air Freight', 'Kumasi Logistics Center'],
    infrastructure_last_update: new Date().toISOString()
  },
  'ci': { // Côte d'Ivoire
    infrastructure_quality: 0.56,
    road_quality: 0.52,
    port_quality: 0.68,
    airport_quality: 0.61,
    energy_stability: 0.53,
    electricity_cost: 0.12,
    water_cost: 0.79,
    fuel_cost: 1.08,
    lpi_score: 2.75,
    logistics_hubs: ['Port d\'Abidjan', 'San-Pedro Logistics', 'Bouaké Dry Port'],
    infrastructure_last_update: new Date().toISOString()
  },
  'sn': { // Sénégal
    infrastructure_quality: 0.62,
    road_quality: 0.59,
    port_quality: 0.67,
    airport_quality: 0.64,
    energy_stability: 0.58,
    electricity_cost: 0.15,
    water_cost: 0.92,
    fuel_cost: 1.15,
    lpi_score: 2.61,
    logistics_hubs: ['Port de Dakar', 'Diamniadio Industrial Park', 'Blaise Diagne Airport Zone'],
    infrastructure_last_update: new Date().toISOString()
  },
  'rw': { // Rwanda
    infrastructure_quality: 0.65,
    road_quality: 0.71,
    port_quality: 0.35,
    airport_quality: 0.72,
    energy_stability: 0.68,
    electricity_cost: 0.21,
    water_cost: 1.12,
    fuel_cost: 1.22,
    lpi_score: 2.99,
    logistics_hubs: ['Kigali Logistics Platform', 'Bugesera Free Zone', 'Kigali International Airport'],
    infrastructure_last_update: new Date().toISOString()
  },
  'et': { // Éthiopie
    infrastructure_quality: 0.49,
    road_quality: 0.45,
    port_quality: 0.41,
    airport_quality: 0.67,
    energy_stability: 0.52,
    electricity_cost: 0.05,
    water_cost: 0.65,
    fuel_cost: 0.82,
    lpi_score: 2.38,
    logistics_hubs: ['Modjo Dry Port', 'Addis Ababa Logistics Center', 'Hawassa Industrial Park'],
    infrastructure_last_update: new Date().toISOString()
  },
  'cm': { // Cameroun
    infrastructure_quality: 0.54,
    road_quality: 0.48,
    port_quality: 0.61,
    airport_quality: 0.58,
    energy_stability: 0.51,
    electricity_cost: 0.14,
    water_cost: 0.84,
    fuel_cost: 1.05,
    lpi_score: 2.62,
    logistics_hubs: ['Port de Douala', 'Port de Kribi', 'Yaoundé Cargo Terminal'],
    infrastructure_last_update: new Date().toISOString()
  }
};

// Renvoyez des données par défaut pour les pays sans données spécifiques
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
    
    // Obtenir le code pays en minuscules
    const countryCodeLower = countryCode.toLowerCase();
    
    // Obtenir les données d'infrastructure pour ce pays
    const infraData = infrastructureDataByCountry[countryCodeLower] || getDefaultData();
    
    // Mettre à jour la base de données avec ces données
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
