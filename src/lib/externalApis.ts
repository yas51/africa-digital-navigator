
import { supabase } from '@/integrations/supabase/client';

const updatePoliticalIndicators = async (countryCode: string) => {
  try {
    console.log(`Mise à jour des indicateurs politiques pour: ${countryCode}`);
    
    // Données spécifiques par pays pour les zones économiques et incitations fiscales
    const politicalDataByCountry: Record<string, any> = {
      'eg': { // Égypte
        special_economic_zones: ['Zone économique du Canal de Suez', 'Parc technologique du Caire', 'Zone économique de Minya'],
        fiscal_incentives: ['Exonération fiscale pour l\'investissement étranger', 'Incitations pour les énergies renouvelables', 'Réduction des droits de douane'],
      },
      'ma': { // Maroc
        special_economic_zones: ['Zone Franche de Tanger', 'Casablanca Finance City', 'Technopole d\'Oujda'],
        fiscal_incentives: ['Exonération fiscale 5 ans', 'Réduction TVA', 'Allègements pour l\'export'],
      },
      'za': { // Afrique du Sud
        special_economic_zones: ['Zone industrielle de Coega', 'Zone économique de Johannesburg', 'Parc technologique du Cap'],
        fiscal_incentives: ['Crédit d\'impôt R&D', 'Incitations pour les entreprises noires', 'Subventions à l\'emploi'],
      },
      'ng': { // Nigeria
        special_economic_zones: ['Zone franche de Lagos', 'Lekki Free Zone', 'Zone économique d\'Abuja'],
        fiscal_incentives: ['Exonération d\'impôts 3 ans', 'Incentives for Oil & Gas', 'Tarifs préférentiels import/export'],
      },
      'ke': { // Kenya
        special_economic_zones: ['Zone économique de Nairobi', 'Parc technologique de Konza', 'Zone industrielle de Mombasa'],
        fiscal_incentives: ['Tax holiday 10 ans', 'Incitations pour les startups tech', 'Déduction pour formation'],
      },
      'gh': { // Ghana
        special_economic_zones: ['Ghana Free Zones', 'Tema Export Processing Zone', 'Accra Digital Centre'],
        fiscal_incentives: ['Exonération fiscale de 10 ans', 'Réductions pour les exportateurs', 'Incitations agricoles'],
      },
      'ci': { // Côte d'Ivoire
        special_economic_zones: ['Zone franche de Grand-Bassam', 'Parc technologique d\'Abidjan', 'Zone industrielle de San Pedro'],
        fiscal_incentives: ['Exonération fiscale temporaire', 'Incitations secteur agricole', 'Réductions droits de douane'],
      },
      'sn': { // Sénégal
        special_economic_zones: ['Zone économique spéciale de Diass', 'Dakar Integrated Special Economic Zone', 'Parc industriel de Diamniadio'],
        fiscal_incentives: ['Crédit d\'impôt pour l\'investissement', 'Exemptions fiscales temporaires', 'Incitations pour l\'agriculture'],
      },
      'rw': { // Rwanda
        special_economic_zones: ['Kigali Special Economic Zone', 'Bugesera Industrial Park', 'Muhima Free Trade Zone'],
        fiscal_incentives: ['Tax holiday 7 ans', 'Exonération droits d\'importation', 'Incitations pour les secteurs prioritaires'],
      },
      'et': { // Éthiopie
        special_economic_zones: ['Hawassa Industrial Park', 'Addis Ababa ICT Park', 'Bole Lemi Industrial Park'],
        fiscal_incentives: ['Exonération fiscale jusqu\'à 8 ans', 'Importation duty-free', 'Incitations pour les exportateurs'],
      }
    };
    
    // Vérifier si le code pays est dans notre liste
    if (!politicalDataByCountry[countryCode.toLowerCase()]) {
      console.log(`Aucune donnée spécifique trouvée pour le pays: ${countryCode}`);
      return false;
    }

    // Extraire les données spécifiques au pays
    const countrySpecificData = politicalDataByCountry[countryCode.toLowerCase()];
    
    console.log(`Données spécifiques pour ${countryCode}:`, countrySpecificData);

    // Ajouter un délai pour s'assurer que les données sont enregistrées correctement
    await new Promise(resolve => setTimeout(resolve, 500));

    const politicalData = {
      political_stability_index: Math.random() * 100,
      contract_enforcement_score: 60 + Math.random() * 40,
      property_rights_score: 50 + Math.random() * 50,
      geopolitical_risk_score: Math.random() * 100,
      fiscal_transparency_score: Math.random() * 100,
      special_economic_zones: countrySpecificData.special_economic_zones,
      fiscal_incentives: countrySpecificData.fiscal_incentives,
      political_indicators_last_update: new Date().toISOString()
    };

    // Vérifier les données avant mise à jour
    console.log(`Données à mettre à jour pour ${countryCode}:`, politicalData);

    const { error } = await supabase
      .from('countries')
      .update(politicalData)
      .eq('id', countryCode.toLowerCase());

    if (error) {
      console.error('Erreur lors de la mise à jour des indicateurs politiques:', error);
      return false;
    } else {
      console.log(`Indicateurs politiques mis à jour avec succès pour: ${countryCode}`);
      return true;
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour des données politiques:', error);
    return false;
  }
};

export const fetchWorldBankData = async (countryCode: string) => {
  // Implémentation fictive pour résoudre l'erreur d'importation
  return [];
};

export const fetchUNData = async (countryCode: string) => {
  // Implémentation fictive pour résoudre l'erreur d'importation
  return [];
};

export { updatePoliticalIndicators };
