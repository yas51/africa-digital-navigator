
import React, { useState, useEffect } from 'react';
import type { CountryData } from '@/data/countriesData';
import { supabase } from '@/integrations/supabase/client';
import { updateCountryWithExternalData } from '@/lib/supabase';
import { updateCountryEconomicData } from '@/services/economicDataService';
import { updatePoliticalIndicators } from '@/lib/externalApis';
import { updateCountryInfrastructureData } from '@/services/infrastructureDataService';
import { updateCountryDemographicData } from '@/services/infrastructureDataService';
import { useToast } from "@/hooks/use-toast";
import GeneralInfo from './country/GeneralInfo';
import EconomicOverview from './country/EconomicOverview';
import DigitalOverview from './country/DigitalOverview';
import DigitalIndicators from './country/DigitalIndicators';
import EconomicIndicators from './country/EconomicIndicators';
import BalanceIndicators from './country/BalanceIndicators';
import PoliticalIndicators from './country/PoliticalIndicators';
import BusinessClimateIndicators from './country/BusinessClimateIndicators';
import UpdateInfo from './country/UpdateInfo';
import EconomicChart from './country/EconomicChart';
import LogisticsInfrastructure from './country/LogisticsInfrastructure';
import DemographicIndicators from './country/DemographicIndicators';
import CulturalIndicators from './country/CulturalIndicators';

interface CountryDetailsProps {
  country: CountryData;
}

const CountryDetails: React.FC<CountryDetailsProps> = ({ country }) => {
  const [updatedCountry, setUpdatedCountry] = useState<CountryData>(country);
  const { toast } = useToast();

  useEffect(() => {
    const updateCountryData = async () => {
      try {
        console.log(`Dernière mise à jour des données: ${country.wb_last_updated}`);

        const isDataStale = !country.wb_last_updated || 
          (new Date().getTime() - new Date(country.wb_last_updated).getTime()) > 24 * 60 * 60 * 1000;

        if (isDataStale) {
          console.log('Mise à jour des données du pays en cours...');
          const updated = await updateCountryWithExternalData(country.id);
          const economicUpdated = await updateCountryEconomicData(country.id);
          const politicalUpdated = await updatePoliticalIndicators(country.id);
          const infrastructureUpdated = await updateCountryInfrastructureData(country.id);
          const demographicUpdated = await updateCountryDemographicData(country.id);
          
          if (updated || economicUpdated || politicalUpdated || infrastructureUpdated || demographicUpdated) {
            const { data, error } = await supabase
              .from('countries')
              .select('*')
              .eq('id', country.id)
              .single();

            if (data) {
              console.log("Données mises à jour avec succès:", data);
              setUpdatedCountry(data as unknown as CountryData);
              toast({
                title: "Données mises à jour",
                description: `Les données pour ${country.name} ont été actualisées.`
              });
            }
          }
        } else {
          await updateCountryEconomicData(country.id);
          await updatePoliticalIndicators(country.id);
          await updateCountryInfrastructureData(country.id);
          await updateCountryDemographicData(country.id);
          
          const { data } = await supabase
            .from('countries')
            .select('*')
            .eq('id', country.id)
            .single();
            
          if (data) {
            console.log("Données fraîches récupérées:", data);
            setUpdatedCountry(data as unknown as CountryData);
          }
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour des données:', error);
        toast({
          title: "Erreur de mise à jour",
          description: "Impossible de mettre à jour les données du pays.",
          variant: "destructive"
        });
      }
    };

    updateCountryData();
  }, [country, toast]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <GeneralInfo country={updatedCountry} />
        <EconomicOverview country={updatedCountry} />
        <DigitalOverview country={updatedCountry} />
        <DemographicIndicators country={updatedCountry} />
        <CulturalIndicators country={updatedCountry} />
        <LogisticsInfrastructure country={updatedCountry} />
        <DigitalIndicators country={updatedCountry} />
        <PoliticalIndicators country={updatedCountry} />
        <EconomicIndicators country={updatedCountry} />
        <BalanceIndicators country={updatedCountry} />
        <BusinessClimateIndicators country={updatedCountry} />
        <UpdateInfo country={updatedCountry} />
      </div>
      <EconomicChart country={updatedCountry} />
    </div>
  );
};

export default CountryDetails;
