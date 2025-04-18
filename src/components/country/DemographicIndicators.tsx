
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, Home, TrendingUp } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { CountryData } from '@/data/countriesData';
import type { AgeDistribution } from '@/types/demographicData';

interface DemographicIndicatorsProps {
  country: CountryData;
}

const DemographicIndicators = ({ country }: DemographicIndicatorsProps) => {
  const formatPercent = (value?: number) => {
    if (value === undefined || value === null) return 'N/A';
    return `${value.toFixed(1)}%`;
  };

  const formatNumber = (value?: number) => {
    if (value === undefined || value === null) return 'N/A';
    return value.toFixed(1);
  };

  // Parse age distribution safely
  const getAgeDistribution = (): AgeDistribution => {
    try {
      if (typeof country.age_distribution === 'object' && country.age_distribution !== null) {
        return country.age_distribution as AgeDistribution;
      }
    } catch (error) {
      console.error('Erreur lors du parsing de la distribution d\'âge:', error);
    }
    return {
      "0-14 ans": 0,
      "15-64 ans": 0,
      "65+ ans": 0
    };
  };

  const ageDistribution = getAgeDistribution();

  const isDataRecent = () => {
    if (!country.demographic_data_last_update) return false;
    const lastUpdate = new Date(country.demographic_data_last_update).getTime();
    const now = new Date().getTime();
    const thirtyMinutesInMs = 30 * 60 * 1000;
    return (now - lastUpdate) < thirtyMinutesInMs;
  };

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Indicateurs démographiques
          {isDataRecent() && (
            <span className="ml-2 text-xs text-green-500 font-medium inline-flex items-center">
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Données réelles
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="font-medium">Croissance démographique</span>
                </div>
                <span>{formatPercent(country.population_growth)}</span>
              </div>
              <Progress value={country.population_growth ? Math.min(country.population_growth * 10, 100) : 0} />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-primary" />
                  <span className="font-medium">Population urbaine</span>
                </div>
                <span>{formatPercent(country.urban_population_percentage)}</span>
              </div>
              <Progress value={country.urban_population_percentage || 0} />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  <span className="font-medium">Taux d'alphabétisation</span>
                </div>
                <span>{formatPercent(country.literacy_rate)}</span>
              </div>
              <Progress value={country.literacy_rate || 0} />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  <span className="font-medium">Études supérieures</span>
                </div>
                <span>{formatPercent(country.higher_education_rate)}</span>
              </div>
              <Progress value={country.higher_education_rate || 0} />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-3">Distribution par âge</h3>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(ageDistribution).map(([age, percentage]) => (
              <div key={age} className="bg-secondary/10 p-3 rounded-lg">
                <div className="text-sm font-medium">{age}</div>
                <div className="text-2xl font-semibold">{formatPercent(percentage)}</div>
              </div>
            ))}
          </div>
        </div>

        {country.demographic_data_last_update && (
          <div className="text-xs text-muted-foreground text-right">
            Dernière mise à jour: {new Date(country.demographic_data_last_update).toLocaleString('fr-FR')}
            {isDataRecent() && (
              <span className="text-green-500 ml-1">(Données réelles de la Banque Mondiale)</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DemographicIndicators;
