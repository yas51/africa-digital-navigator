import { supabase } from '@/integrations/supabase/client';
import type { CountryData } from '@/data/countriesData';
import { fetchWorldBankData, fetchUNData } from './externalApis';

export const fetchCountries = async (): Promise<CountryData[]> => {
  console.log("Début de récupération des pays depuis Supabase");
  
  const { data, error } = await supabase
    .from('countries')
    .select('*')
    .returns<CountryData[]>();
  
  if (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
  
  console.log(`Nombre de pays récupérés: ${data?.length || 0}`);
  
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
    const [worldBankData, unData] = await Promise.all([
      fetchWorldBankData(countryId),
      fetchUNData(countryId)
    ]);

    if (worldBankData.length > 0) {
      const { error } = await supabase
        .from('countries')
        .update({
          gdp: worldBankData[0]?.value || null,
          population: worldBankData[1]?.value || null,
          gdpGrowth: worldBankData[2]?.value || null,
          wb_gini_index: worldBankData[3]?.value || null,
          wb_poverty_ratio: worldBankData[4]?.value || null,
          wb_ease_business_score: worldBankData[5]?.value || null,
          wb_trade_percentage: worldBankData[6]?.value || null,
          wb_fdi_net_inflows: worldBankData[7]?.value || null,
          wb_internet_users_percent: worldBankData[8]?.value || null,
          wb_mobile_subscriptions: worldBankData[9]?.value || null,
          wb_last_updated: new Date().toISOString()
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
      if (payload.new && typeof payload.new === 'object' && 'id' in payload.new) {
        await updateCountryWithExternalData(payload.new.id);
      }
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

  updateAllCountries();

  const interval = setInterval(updateAllCountries, intervalMinutes * 60 * 1000);

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

  console.log(`Nettoyage des doublons: ${countries?.length || 0} pays trouvés`);

  const uniqueCountries = countries?.reduce((acc, country) => {
    const existingCountry = acc.find(c => 
      c.name.toLowerCase() === country.name.toLowerCase()
    );

    if (!existingCountry) {
      acc.push(country);
    }

    return acc;
  }, [] as CountryData[]);

  console.log(`Après dédoublonnage: ${uniqueCountries?.length || 0} pays uniques`);

  if (uniqueCountries) {
    const { error: deleteError } = await supabase
      .from('countries')
      .delete()
      .neq('id', '');

    if (deleteError) {
      console.error('Erreur lors de la suppression des pays:', deleteError);
      return;
    }

    const { error: insertError } = await supabase
      .from('countries')
      .upsert(uniqueCountries);

    if (insertError) {
      console.error('Erreur lors de l\'insertion des pays uniques:', insertError);
    }
  }
};
