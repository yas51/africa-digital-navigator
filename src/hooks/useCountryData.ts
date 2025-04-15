
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { setupRealtimeUpdates } from '@/lib/supabase';
import { fetchCountries } from '@/lib/supabase';

export const useCountryData = () => {
  const { data: countries = [], ...queryResult } = useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  });

  const [realtimeCountries, setRealtimeCountries] = useState(countries);

  useEffect(() => {
    const unsubscribe = setupRealtimeUpdates((updatedCountries) => {
      // Mettre à jour les pays en temps réel
      setRealtimeCountries(updatedCountries);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    ...queryResult,
    countries: realtimeCountries
  };
};
