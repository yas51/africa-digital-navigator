
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { setupRealtimeUpdates, fetchCountries } from '@/lib/supabase';
import { startRealtimeUpdates } from '@/services/demographicDataService';
import type { CountryData } from '@/data/countriesData';

export const useCountryData = () => {
  const { data: countries = [], isLoading, error, refetch } = useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  });

  const [realtimeCountries, setRealtimeCountries] = useState<CountryData[]>(countries as CountryData[]);

  useEffect(() => {
    if (countries && countries.length > 0) {
      setRealtimeCountries(countries as CountryData[]);
    }
  }, [countries]);

  useEffect(() => {
    // Configuration des mises à jour en temps réel via Supabase
    const unsubscribe = setupRealtimeUpdates((updatedCountries) => {
      console.log('Mise à jour des pays en temps réel reçue:', updatedCountries.length);
      setRealtimeCountries(updatedCountries);
    });

    // Démarrage des mises à jour périodiques pour simuler des changements en temps réel
    const stopRealtimeUpdates = startRealtimeUpdates(20); // Mise à jour toutes les 20 secondes

    return () => {
      unsubscribe();
      stopRealtimeUpdates();
    };
  }, []);

  const handleRefresh = async () => {
    console.log('Actualisation manuelle des données de pays...');
    return refetch();
  };

  return {
    countries: realtimeCountries,
    isLoading,
    error,
    refetch,
    handleRefresh
  };
};
