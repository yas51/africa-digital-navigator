
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

  // Fonction de formatage sécurisé pour les valeurs numériques
  const safeFormat = (value: any, decimals: number = 1) => {
    if (value === undefined || value === null) return "Non disponible";
    return Number(value).toFixed(decimals);
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
          {country.population_growth !== undefined && country.population_growth !== null && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Croissance population:</span>
              <span className="font-medium">{safeFormat(country.population_growth)}%</span>
            </div>
          )}
          
          {country.median_age !== undefined && country.median_age !== null && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Âge médian:</span>
              <span className="font-medium">{safeFormat(country.median_age)} ans</span>
            </div>
          )}
          
          {country.urban_population_percentage !== undefined && country.urban_population_percentage !== null && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Population urbaine:</span>
              <span className="font-medium">{safeFormat(country.urban_population_percentage)}%</span>
            </div>
          )}
          
          {country.literacy_rate !== undefined && country.literacy_rate !== null && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Taux d'alphabétisation:</span>
              <span className="font-medium">{safeFormat(country.literacy_rate)}%</span>
            </div>
          )}
          
          {country.higher_education_rate !== undefined && country.higher_education_rate !== null && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Éducation supérieure:</span>
              <span className="font-medium">{safeFormat(country.higher_education_rate)}%</span>
            </div>
          )}
          
          {country.age_distribution && (
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Répartition par âge:</span>
              <span className="font-medium text-sm">{formatAgeDistribution()}</span>
            </div>
          )}
          
          {country.social_stability_index !== undefined && country.social_stability_index !== null && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Indice de stabilité sociale:</span>
              <span className="font-medium">{safeFormat(country.social_stability_index * 100, 0)}/100</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DemographicIndicators;
