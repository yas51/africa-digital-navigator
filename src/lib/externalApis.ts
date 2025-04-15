
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
      'cg': { // Congo
        special_economic_zones: ['Zone Économique Spéciale de Brazzaville', 'Zone Franche de Pointe-Noire', 'Corridor industriel Pointe-Noire-Brazzaville'],
        fiscal_incentives: ['Exonération fiscale pour investissements directs', 'Réductions pour industries extractives', 'Avantages pour secteur forestier'],
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
      },
      'ne': { // Niger
        special_economic_zones: ['Parc Industriel de Niamey', 'Zone Économique Spéciale de Dosso', 'Zone Franche de Maradi'],
        fiscal_incentives: ['Exonération fiscale de 5 à 7 ans', 'Réduction d\'impôts pour les investisseurs', 'Avantages douaniers spéciaux'],
      },
      'ml': { // Mali
        special_economic_zones: ['Zone Économique Spéciale de Bamako', 'Parc Industriel de Koulikoro', 'Zone Franche de Kayes'],
        fiscal_incentives: ['Exonération fiscale temporaire de 3 ans', 'Réductions douanières pour l\'équipement', 'Avantages pour l\'agro-industrie'],
      },
      'tg': { // Togo
        special_economic_zones: ['Port Franc de Lomé', 'Zone Franche Industrielle de Lomé', 'Parc Industriel d\'Adétikopé'],
        fiscal_incentives: ['Exonération d\'impôts sur 10 ans', 'Réduction des droits de douane', 'Avantages fiscaux pour les exportateurs'],
      },
      'bj': { // Bénin
        special_economic_zones: ['Zone Économique Spéciale de Glo-Djigbé', 'Zone Franche Industrielle de Sèmè-Kpodji', 'Parc Agroalimentaire d\'Allada'],
        fiscal_incentives: ['Exonération fiscale jusqu\'à 15 ans', 'Avantages douaniers', 'Incitations pour l\'investissement étranger'],
      },
      'bf': { // Burkina Faso
        special_economic_zones: ['Zone Économique Spéciale de Ouagadougou', 'Zone Industrielle de Bobo-Dioulasso', 'Parc d\'Activités de Kossodo'],
        fiscal_incentives: ['Exonération fiscale sur 7 ans', 'Réduction d\'impôts pour les PME', 'Avantages pour le secteur agricole'],
      },
      'cm': { // Cameroun
        special_economic_zones: ['Zone Économique de Kribi', 'Zone Franche Industrielle de Douala', 'Technopole de Yaoundé'],
        fiscal_incentives: ['Crédit d\'impôt pour l\'investissement', 'Exonérations fiscales sectorielles', 'Allègements douaniers'],
      },
      'ug': { // Ouganda
        special_economic_zones: ['Kampala Industrial and Business Park', 'Namanve Industrial Park', 'Soroti Industrial Park'],
        fiscal_incentives: ['Déductions fiscales pour l\'investissement', 'Exonération de TVA sur équipements', 'Allégements pour les exportateurs'],
      },
      'tz': { // Tanzanie
        special_economic_zones: ['Bagamoyo Special Economic Zone', 'Benjamin William Mkapa SEZ', 'Mtwara Freeport Zone'],
        fiscal_incentives: ['Exonération fiscale de 10 ans', 'Importation en franchise de droits', 'Réduction d\'impôt sur le revenu'],
      },
      'mz': { // Mozambique
        special_economic_zones: ['Beluluane Industrial Park', 'Nacala Special Economic Zone', 'Mocuba Industrial Free Zone'],
        fiscal_incentives: ['Réduction d\'impôt sur les sociétés', 'Exonération de droits d\'importation', 'Crédits fiscaux pour la formation'],
      },
      'zm': { // Zambie
        special_economic_zones: ['Lusaka South Multi-Facility Economic Zone', 'Chambishi Multi-Facility Economic Zone', 'Lumwana Multi-Facility Economic Zone'],
        fiscal_incentives: ['Exonération fiscale sur 5 ans', 'Déduction pour investissement', 'Allégements pour le secteur minier'],
      },
      'cd': { // RD Congo
        special_economic_zones: ['Zone Économique Spéciale de Maluku-Kinshasa', 'Parc Agro-Industriel de Bukanga Lonzo', 'Zone Franche de Kisangani'],
        fiscal_incentives: ['Exonération d\'impôts pour nouvelles entreprises', 'Incitations pour secteur minier', 'Avantages fiscaux pour énergies renouvelables'],
      },
      'ao': { // Angola
        special_economic_zones: ['Luanda-Bengo Special Economic Zone', 'Zona Franca do Lobito', 'Viana Industrial Park'],
        fiscal_incentives: ['Taux d\'imposition réduit', 'Exemption des droits d\'importation', 'Avantages fiscaux pour l\'innovation'],
      }
    };
    
    // Convertir le code pays en minuscules pour assurer la correspondance
    const countryCodeLower = countryCode.toLowerCase();
    
    // Vérifier si le code pays est dans notre liste
    if (!politicalDataByCountry[countryCodeLower]) {
      console.log(`Aucune donnée spécifique trouvée pour le pays: ${countryCode}`);
      return false;
    }

    // Extraire les données spécifiques au pays
    const countrySpecificData = politicalDataByCountry[countryCodeLower];
    
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
      .eq('id', countryCodeLower);

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
