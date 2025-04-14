
import { supabase } from '@/integrations/supabase/client';
import type { CountryData } from '@/data/countriesData';

export const fetchCountries = async (): Promise<CountryData[]> => {
  const { data, error } = await supabase
    .from('countries')
    .select('*')
    .returns<CountryData[]>();
  
  if (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
  
  return data || [];
};

export const fetchCountryById = async (id: string): Promise<CountryData | null> => {
  const { data, error } = await supabase
    .from('countries')
    .select('*')
    .eq('id', id)
    .returns<CountryData>()
    .single();
  
  if (error) {
    console.error(`Error fetching country with id ${id}:`, error);
    if (error.code === 'PGRST116') {
      return null;
    }
    throw error;
  }
  
  return data;
};

export const fetchCountriesByRegion = async (region: string): Promise<CountryData[]> => {
  const { data, error } = await supabase
    .from('countries')
    .select('*')
    .eq('region', region)
    .returns<CountryData[]>();
  
  if (error) {
    console.error(`Error fetching countries in region ${region}:`, error);
    throw error;
  }
  
  return data || [];
};

export const fetchTopCountriesByScore = async (count: number = 5): Promise<CountryData[]> => {
  const { data, error } = await supabase
    .from('countries')
    .select('*')
    .order('opportunityScore', { ascending: false })
    .limit(count)
    .returns<CountryData[]>();
  
  if (error) {
    console.error('Error fetching top countries:', error);
    throw error;
  }
  
  return data || [];
};

export const subscribeToCountryUpdates = (callback: (countries: CountryData[]) => void) => {
  const subscription = supabase
    .channel('countries_updates')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'countries',
    }, (payload) => {
      // Quand il y a un changement, on refait un fetch complet
      fetchCountries().then(callback);
    })
    .subscribe();
  
  // Retourne une fonction pour se désabonner
  return () => {
    supabase.removeChannel(subscription);
  };
};
