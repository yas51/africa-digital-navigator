
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Building, BarChart3 } from 'lucide-react';
import type { CountryData } from '@/data/countriesData';

interface DemographicIndicatorsProps {
  country: CountryData;
}

const DemographicIndicators = ({ country }: DemographicIndicatorsProps) => {
  // Vérifie si les données démographiques sont disponibles
  const hasDemographicData = country.population_growth !== undefined || 
                            country.median_age !== undefined ||
                            country.literacy_rate !== undefined;

  if (!hasDemographicData) {
    return null; // Ne pas afficher le composant si aucune donnée n'est disponible
  }

  // Formatage des données d'âge pour l'affichage si disponibles
  const formatAgeDistribution = () => {
    if (!country.age_distribution) return "Non disponible";
    
    try {
      const ageData = typeof country.age_distribution === 'object' ? country.age_distribution : {};
      return Object.entries(ageData)
        .map(([key, value]) => `${key}: ${Math.round(Number(value))}%`)
        .join(', ');
    } catch (error) {
      console.error("Erreur lors du formatage de la répartition par âge:", error);
      return "Format de données incorrect";
    }
  };

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" /> Indicateurs démographiques
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {country.population_growth !== undefined && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Croissance population:</span>
              <span className="font-medium">{country.population_growth.toFixed(1)}%</span>
            </div>
          )}
          
          {country.median_age !== undefined && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Âge médian:</span>
              <span className="font-medium">{country.median_age.toFixed(1)} ans</span>
            </div>
          )}
          
          {country.urban_population_percentage !== undefined && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Population urbaine:</span>
              <span className="font-medium">{country.urban_population_percentage.toFixed(1)}%</span>
            </div>
          )}
          
          {country.literacy_rate !== undefined && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Taux d'alphabétisation:</span>
              <span className="font-medium">{country.literacy_rate.toFixed(1)}%</span>
            </div>
          )}
          
          {country.higher_education_rate !== undefined && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Éducation supérieure:</span>
              <span className="font-medium">{country.higher_education_rate.toFixed(1)}%</span>
            </div>
          )}
          
          {country.age_distribution && (
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Répartition par âge:</span>
              <span className="font-medium text-sm">{formatAgeDistribution()}</span>
            </div>
          )}
          
          {country.social_stability_index !== undefined && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Indice de stabilité sociale:</span>
              <span className="font-medium">{(country.social_stability_index * 100).toFixed(0)}/100</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DemographicIndicators;
