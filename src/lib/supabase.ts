
import { supabase } from '@/integrations/supabase/client';
import type { CountryData } from '@/data/countriesData';

// Setup real-time updates function
export const setupRealtimeUpdates = (callback: (updatedCountries: CountryData[]) => void) => {
  console.log('Configuration des mises à jour en temps réel via Supabase...');
  
  // Configure a real-time update channel
  const channel = supabase
    .channel('countries_realtime')
    .on(
      'postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: 'countries' 
      },
      async (payload) => {
        console.log('Mise à jour en temps réel reçue:', payload);
        
        // After receiving an update, fetch the latest data
        const { data: countries } = await supabase
          .from('countries')
          .select('*')
          .order('name');
        
        // Call the callback with the updated countries
        if (countries) {
          callback(countries as unknown as CountryData[]);
        }
      }
    )
    .subscribe((status) => {
      console.log(`Statut de l'abonnement aux mises à jour en temps réel: ${status}`);
    });

  return () => {
    console.log('Désabonnement des mises à jour en temps réel');
    supabase.removeChannel(channel);
  };
};

// Fetch all countries
export const fetchCountries = async (): Promise<CountryData[]> => {
  const { data, error } = await supabase
    .from('countries')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
  
  return data as unknown as CountryData[];
};

// Fetch top countries by opportunity score
export const fetchTopCountriesByScore = async (limit: number = 5): Promise<CountryData[]> => {
  const { data, error } = await supabase
    .from('countries')
    .select('*')
    .order('opportunityScore', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error('Error fetching top countries:', error);
    throw error;
  }
  
  return data as unknown as CountryData[];
};

// Fetch a country by ID
export const fetchCountryById = async (id: string): Promise<CountryData | null> => {
  if (!id) return null;
  
  const { data, error } = await supabase
    .from('countries')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching country by ID:', error);
    return null;
  }
  
  return data as unknown as CountryData;
};

// Update country with external data
export const updateCountryWithExternalData = async (countryId: string): Promise<boolean> => {
  try {
    // Simulate updating country with external data
    console.log(`Updating country ${countryId} with external data`);
    
    // Here we would normally fetch external data and update the country
    // For now, we'll just update the last updated timestamp
    const { data, error } = await supabase
      .from('countries')
      .update({ wb_last_updated: new Date().toISOString() })
      .eq('id', countryId);
    
    if (error) {
      console.error('Error updating country with external data:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in updateCountryWithExternalData:', error);
    return false;
  }
};

// Subscribe to country updates
export const subscribeToCountryUpdates = (callback: (updatedCountries: CountryData[]) => void) => {
  return setupRealtimeUpdates(callback);
};

// Start periodic updates
export const startPeriodicUpdates = (intervalInSeconds: number = 60) => {
  // Set up a timer to periodically check for updates
  const intervalId = setInterval(async () => {
    try {
      console.log('Vérification des mises à jour...');
      const { data: countries } = await supabase
        .from('countries')
        .select('*')
        .order('name');
      
      // Here we would normally update the countries with the latest data
      console.log(`${countries?.length || 0} pays récupérés lors de la mise à jour périodique`);
    } catch (error) {
      console.error('Erreur lors de la mise à jour périodique:', error);
    }
  }, intervalInSeconds * 1000);
  
  // Return a function to stop the updates
  return () => {
    clearInterval(intervalId);
  };
};
