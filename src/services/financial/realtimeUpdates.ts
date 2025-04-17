
import { supabase } from '@/integrations/supabase/client';
import { updateCountryFinancialData } from './updateService';

// Fonction pour simuler des mises à jour périodiques des données financières
export const startFinancialDataUpdates = (intervalInSeconds: number = 30): (() => void) => {
  console.log(`Démarrage des mises à jour des données financières toutes les ${intervalInSeconds} secondes`);
  
  const intervalId = setInterval(async () => {
    try {
      // Récupérer tous les pays
      const { data: countries, error } = await supabase
        .from('countries')
        .select('id')
        .order('name');
        
      if (error) {
        console.error('Erreur lors de la récupération des pays:', error);
        return;
      }
      
      if (!countries || countries.length === 0) {
        console.log('Aucun pays trouvé pour la mise à jour des données financières');
        return;
      }
      
      // Sélectionner un pays aléatoire pour la mise à jour
      const randomIndex = Math.floor(Math.random() * countries.length);
      const countryToUpdate = countries[randomIndex];
      
      console.log(`Mise à jour aléatoire des données financières pour: ${countryToUpdate.id}`);
      await updateCountryFinancialData(countryToUpdate.id);
      
    } catch (error) {
      console.error('Erreur lors de la mise à jour périodique des données financières:', error);
    }
  }, intervalInSeconds * 1000);
  
  // Retourner une fonction pour arrêter les mises à jour
  return () => {
    console.log('Arrêt des mises à jour des données financières');
    clearInterval(intervalId);
  };
};
