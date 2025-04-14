import React, { useState, useEffect } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Globe2, TrendingUp, BarChart3, RefreshCcw } from 'lucide-react';
import { regions } from '@/data/countriesData';
import type { CountryData } from '@/data/countriesData';
import { useQuery } from '@tanstack/react-query';
import { 
  fetchCountries, 
  fetchCountryById, 
  subscribeToCountryUpdates, 
  startPeriodicUpdates 
} from '@/lib/supabase';
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface CountrySelectorProps {
  onSelect: (countryId: string) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ onSelect }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("all-regions");
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Utiliser React Query pour récupérer les pays
  const { data: countries = [], isLoading, error, refetch } = useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries
  });
  
  // Utiliser React Query pour récupérer le pays sélectionné
  const { data: country } = useQuery({
    queryKey: ['country', selectedCountry],
    queryFn: () => fetchCountryById(selectedCountry),
    enabled: !!selectedCountry,
  });
  
  // Abonnement aux mises à jour en temps réel
  useEffect(() => {
    const unsubscribe = subscribeToCountryUpdates((updatedCountries) => {
      refetch();
      toast({
        title: "Mise à jour des pays",
        description: "Les données des pays ont été actualisées en temps réel.",
      });
    });
    
    // Démarrer les mises à jour périodiques
    const stopPeriodicUpdates = startPeriodicUpdates(60); // toutes les heures
    
    return () => {
      unsubscribe();
      stopPeriodicUpdates();
    };
  }, [refetch]);
  
  // Fonction pour forcer une mise à jour manuelle
  const handleManualRefresh = async () => {
    setIsUpdating(true);
    try {
      await refetch();
      toast({
        title: "Actualisation manuelle",
        description: "Les données des pays ont été actualisées manuellement.",
      });
    } catch (error) {
      toast({
        title: "Erreur d'actualisation",
        description: "Impossible de mettre à jour les données.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };
  
  const filteredCountries = selectedRegion === "all-regions"
    ? countries
    : countries.filter(country => country.region === selectedRegion);

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
              <SelectContent>
                {isLoading ? (
                  <SelectItem value="loading" disabled>Chargement des pays...</SelectItem>
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
      
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="card-hover">
              <CardHeader className="pb-2">
                <Skeleton className="h-5 w-40" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="flex justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {country && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe2 className="h-5 w-5 text-primary" /> Aperçu général
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Région:</span>
                  <span className="font-medium">{country.region}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Population:</span>
                  <span className="font-medium">{country.population.toFixed(1)} millions</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">IDH:</span>
                  <span className="font-medium">{country.hdi}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Langue(s):</span>
                  <span className="font-medium">{country.officialLanguages.join(", ")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" /> Économie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">PIB:</span>
                  <span className="font-medium">{country.gdp.toFixed(1)} mds USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Croissance PIB:</span>
                  <span className="font-medium">+{country.gdpGrowth.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">IDE entrants:</span>
                  <span className="font-medium">{country.fdiInflow.toFixed(1)} mds USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Rang Doing Business:</span>
                  <span className="font-medium">{country.doingBusinessRank}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" /> Digital
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Pénétration Internet:</span>
                  <span className="font-medium">{country.internetPenetration.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Pénétration Mobile:</span>
                  <span className="font-medium">{country.mobilePenetration.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Score opportunité:</span>
                  <span className="font-medium">{country.opportunityScore}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Stabilité politique:</span>
                  <span className="font-medium">{country.politicalStability}/100</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CountrySelector;
