
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe2, TrendingUp, BarChart3 } from 'lucide-react';
import type { CountryData } from '@/data/countriesData';

interface CountryDetailsProps {
  country: CountryData;
}

const CountryDetails: React.FC<CountryDetailsProps> = ({ country }) => {
  return (
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
  );
};

export default CountryDetails;
