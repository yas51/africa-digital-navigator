import { supabase } from '@/integrations/supabase/client';
import type { CountryData } from '@/data/countriesData';
import { fetchWorldBankData, fetchUNData } from './externalApis';

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

export const updateCountryWithExternalData = async (countryId: string) => {
  try {
    // Récupérer les données externes
    const [worldBankData, unData] = await Promise.all([
      fetchWorldBankData(countryId),
      fetchUNData(countryId)
    ]);

    // Mettre à jour les données dans Supabase si on a reçu de nouvelles données
    if (worldBankData.length > 0) {
      const { error } = await supabase
        .from('countries')
        .update({
          gdp: worldBankData[0]?.value || null,
          population: worldBankData[1]?.value || null,
          gdpGrowth: worldBankData[2]?.value || null,
        })
        .eq('id', countryId);

      if (error) {
        console.error('Erreur lors de la mise à jour des données:', error);
      }
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de la mise à jour des données externes:', error);
    return false;
  }
};

export const subscribeToCountryUpdates = (callback: (countries: CountryData[]) => void) => {
  const subscription = supabase
    .channel('countries_updates')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'countries',
    }, async (payload) => {
      // Fix TypeScript error by checking if payload.new exists and has an id property
      if (payload.new && typeof payload.new === 'object' && 'id' in payload.new) {
        await updateCountryWithExternalData(payload.new.id);
      }
      // Récupérer toutes les données mises à jour
      const { data } = await supabase.from('countries').select('*');
      if (data) callback(data as CountryData[]);
    })
    .subscribe();

  return () => {
    supabase.removeChannel(subscription);
  };
};

export const startPeriodicUpdates = (intervalMinutes: number = 60) => {
  const updateAllCountries = async () => {
    const { data: countries } = await supabase.from('countries').select('id');
    if (countries) {
      for (const country of countries) {
        await updateCountryWithExternalData(country.id);
      }
    }
  };

  // Première mise à jour
  updateAllCountries();

  // Mettre en place la mise à jour périodique
  const interval = setInterval(updateAllCountries, intervalMinutes * 60 * 1000);

  // Retourner une fonction pour arrêter les mises à jour
  return () => clearInterval(interval);
};

export const cleanupCountryDuplicates = async (): Promise<void> => {
  const { data: countries, error: fetchError } = await supabase
    .from('countries')
    .select('*')
    .returns<CountryData[]>();

  if (fetchError) {
    console.error('Erreur lors de la récupération des pays:', fetchError);
    return;
  }

  const uniqueCountries = countries?.reduce((acc, country) => {
    const existingCountry = acc.find(c => 
      c.name.toLowerCase() === country.name.toLowerCase()
    );

    if (!existingCountry) {
      acc.push(country);
    }

    return acc;
  }, [] as CountryData[]);

  if (uniqueCountries) {
    // Supprimer tous les pays existants
    const { error: deleteError } = await supabase
      .from('countries')
      .delete()
      .neq('id', '');

    if (deleteError) {
      console.error('Erreur lors de la suppression des pays:', deleteError);
      return;
    }

    // Insérer les pays uniques
    const { error: insertError } = await supabase
      .from('countries')
      .upsert(uniqueCountries);

    if (insertError) {
      console.error('Erreur lors de l\'insertion des pays uniques:', insertError);
    }
  }
};
