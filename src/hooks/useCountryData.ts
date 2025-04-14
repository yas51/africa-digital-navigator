
import { useQuery } from '@tanstack/react-query';
import { toast } from "@/hooks/use-toast";
import type { CountryData } from '@/data/countriesData';
import { 
  fetchCountries, 
  fetchCountryById, 
  subscribeToCountryUpdates, 
  startPeriodicUpdates,
  cleanupCountryDuplicates 
} from '@/lib/supabase';
import { useEffect } from 'react';

export const useCountryData = () => {
  const { data: countries = [], isLoading, error, refetch } = useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false
  });

  // Log détaillé des pays chargés
  useEffect(() => {
    console.log("Nombre total de pays chargés:", countries.length);
    if (countries.length > 0) {
      console.log("Échantillon de pays chargés:", countries.slice(0, 10).map(country => `${country.flag} ${country.name} (${country.id})`));
      console.log("Régions représentées:", [...new Set(countries.map(country => country.region))]);
    } else {
      console.warn("Aucun pays n'a été chargé. Vérifiez la connexion à Supabase ou l'état de la table 'countries'.");
    }
  }, [countries]);

  const handleRefresh = async () => {
    try {
      console.log("Début du nettoyage et de l'actualisation des données...");
      await cleanupCountryDuplicates();
      await refetch();
      toast({
        title: "Actualisation manuelle",
        description: "Les données des pays ont été nettoyées et actualisées.",
      });
      console.log("Actualisation réussie");
      return true;
    } catch (error) {
      console.error("Erreur lors de l'actualisation:", error);
      toast({
        title: "Erreur d'actualisation",
        description: "Impossible de mettre à jour les données.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    countries,
    isLoading,
    error,
    refetch,
    handleRefresh
  };
};
