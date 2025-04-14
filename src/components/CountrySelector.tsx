
import React, { useState } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Globe2, TrendingUp, LandPlot, Users, BarChart3 } from 'lucide-react';
import { countriesData, getCountryById, regions } from '@/data/countriesData';

interface CountrySelectorProps {
  onSelect: (countryId: string) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ onSelect }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  
  const filteredCountries = selectedRegion 
    ? countriesData.filter(country => country.region === selectedRegion)
    : countriesData;

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    onSelect(value);
  };
  
  const handleRegionChange = (value: string) => {
    setSelectedRegion(value);
    setSelectedCountry("");
  };
  
  const country = selectedCountry ? getCountryById(selectedCountry) : null;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="region">Région</Label>
          <Select value={selectedRegion} onValueChange={handleRegionChange}>
            <SelectTrigger id="region">
              <SelectValue placeholder="Sélectionnez une région" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Toutes les régions</SelectItem>
              {regions.map(region => (
                <SelectItem key={region} value={region}>{region}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="country">Pays</Label>
          <Select value={selectedCountry} onValueChange={handleCountryChange}>
            <SelectTrigger id="country">
              <SelectValue placeholder="Sélectionnez un pays" />
            </SelectTrigger>
            <SelectContent>
              {filteredCountries.map(country => (
                <SelectItem key={country.id} value={country.id}>
                  {country.flag} {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
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
