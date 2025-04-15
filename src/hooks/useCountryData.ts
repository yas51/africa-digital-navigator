
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { setupRealtimeUpdates, fetchCountries } from '@/lib/supabase';
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
    const unsubscribe = setupRealtimeUpdates((updatedCountries) => {
      // Update countries in real-time
      setRealtimeCountries(updatedCountries);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleRefresh = async () => {
    console.log('Manually refreshing countries data...');
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
