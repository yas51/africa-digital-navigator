
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
    queryFn: fetchCountries
  });

  // Log the number of countries returned to understand why only 8 are displayed
  useEffect(() => {
    console.log("Number of countries fetched:", countries.length, countries);
  }, [countries]);

  const handleRefresh = async () => {
    try {
      await cleanupCountryDuplicates();
      await refetch();
      toast({
        title: "Actualisation manuelle",
        description: "Les données des pays ont été nettoyées et actualisées.",
      });
      return true;
    } catch (error) {
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
