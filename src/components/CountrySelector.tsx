
import React, { useState, useEffect } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from 'lucide-react';
import { regions } from '@/data/countriesData';
import { useQuery } from '@tanstack/react-query';
import { fetchCountryById, subscribeToCountryUpdates, startPeriodicUpdates } from '@/lib/supabase';
import CountryDetails from './CountryDetails';
import CountryDetailsSkeleton from './CountryDetailsSkeleton';
import { useCountryData } from '@/hooks/useCountryData';

interface CountrySelectorProps {
  onSelect: (countryId: string) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ onSelect }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("all-regions");
  const [isUpdating, setIsUpdating] = useState(false);
  
  const { countries, isLoading, error, refetch, handleRefresh } = useCountryData();
  
  // Ajouter un log pour voir combien de pays sont disponibles
  useEffect(() => {
    console.log(`CountrySelector - Nombre total de pays disponibles: ${countries.length}`);
    if (countries.length > 0) {
      console.log("Premiers pays disponibles:", countries.slice(0, 5).map(c => `${c.flag} ${c.name}`));
    }
  }, [countries]);
  
  const { data: country } = useQuery({
    queryKey: ['country', selectedCountry],
    queryFn: () => fetchCountryById(selectedCountry),
    enabled: !!selectedCountry,
  });
  
  useEffect(() => {
    const unsubscribe = subscribeToCountryUpdates((updatedCountries) => {
      console.log(`Mise à jour des pays reçue - ${updatedCountries.length} pays`);
      refetch();
    });
    
    const stopPeriodicUpdates = startPeriodicUpdates(60);
    
    return () => {
      unsubscribe();
      stopPeriodicUpdates();
    };
  }, [refetch]);
  
  const handleManualRefresh = async () => {
    setIsUpdating(true);
    await handleRefresh();
    setIsUpdating(false);
  };
  
  const filteredCountries = selectedRegion === "all-regions"
    ? countries
    : countries.filter(country => country.region === selectedRegion);

  // Ajoutons un log pour voir combien de pays sont filtrés
  useEffect(() => {
    console.log(`Pays filtrés par région (${selectedRegion}): ${filteredCountries.length}`);
  }, [filteredCountries, selectedRegion]);

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    onSelect(value);
  };
  
  const handleRegionChange = (value: string) => {
    setSelectedRegion(value);
    setSelectedCountry("");
  };
  
  if (error) {
    return <div className="text-red-500">Erreur lors du chargement des données: {(error as Error).message}</div>;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          <div>
            <Label htmlFor="region">Région</Label>
            <Select value={selectedRegion} onValueChange={handleRegionChange}>
              <SelectTrigger id="region">
                <SelectValue placeholder="Sélectionnez une région" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-regions">Toutes les régions</SelectItem>
                {regions.map(region => (
                  <SelectItem key={region} value={region}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="country">Pays</Label>
            <Select value={selectedCountry} onValueChange={handleCountryChange} disabled={isLoading}>
              <SelectTrigger id="country">
                <SelectValue placeholder={isLoading ? "Chargement..." : "Sélectionnez un pays"} />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {isLoading ? (
                  <SelectItem value="loading" disabled>Chargement des pays...</SelectItem>
                ) : filteredCountries.length === 0 ? (
                  <SelectItem value="none" disabled>Aucun pays disponible</SelectItem>
                ) : (
                  filteredCountries.map(country => (
                    <SelectItem key={country.id} value={country.id}>
                      {country.flag} {country.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleManualRefresh} 
          disabled={isUpdating}
          className="ml-4"
        >
          <RefreshCcw className={`mr-2 h-4 w-4 ${isUpdating ? 'animate-spin' : ''}`} />
          Actualiser
        </Button>
      </div>
      
      {isLoading ? (
        <CountryDetailsSkeleton />
      ) : country ? (
        <CountryDetails country={country} />
      ) : null}
    </div>
  );
};

export default CountrySelector;
