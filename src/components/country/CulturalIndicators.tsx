
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Languages, Users } from 'lucide-react';
import type { CountryData } from '@/data/countriesData';

interface CulturalIndicatorsProps {
  country: CountryData;
}

const CulturalIndicators = ({ country }: CulturalIndicatorsProps) => {
  // Vérifie si les données culturelles sont disponibles
  const hasCulturalData = country.cultural_dimensions !== undefined || 
                          country.ethnic_groups !== undefined ||
                          country.religious_groups !== undefined;

  if (!hasCulturalData) {
    return null; // Ne pas afficher le composant si aucune donnée n'est disponible
  }

  // Formatage des données d'ethnicité pour l'affichage si disponibles
  const formatGroupData = (groupData: any) => {
    if (!groupData) return "Non disponible";
    
    try {
      const data = typeof groupData === 'object' ? groupData : {};
      return Object.entries(data)
        .map(([key, value]) => `${key}: ${Math.round(Number(value))}%`)
        .join(', ');
    } catch (error) {
      console.error("Erreur lors du formatage des données de groupe:", error);
      return "Format de données incorrect";
    }
  };

  // Formatage des dimensions culturelles (Hofstede)
  const formatCulturalDimensions = () => {
    if (!country.cultural_dimensions) return null;
    
    try {
      const dimensions = typeof country.cultural_dimensions === 'object' ? country.cultural_dimensions : {};
      
      const dimensionLabels: Record<string, string> = {
        power_distance: "Distance hiérarchique",
        individualism: "Individualisme",
        masculinity: "Masculinité",
        uncertainty_avoidance: "Évitement de l'incertitude",
        long_term_orientation: "Orientation long terme"
      };
      
      return Object.entries(dimensions)
        .map(([key, value]) => {
          const label = dimensionLabels[key] || key;
          return (
            <div key={key} className="flex justify-between">
              <span className="text-sm text-muted-foreground">{label}:</span>
              <span className="font-medium">{value !== null && value !== undefined ? Math.round(Number(value)) : 'N/A'}/100</span>
            </div>
          );
        });
    } catch (error) {
      console.error("Erreur lors du formatage des dimensions culturelles:", error);
      return null;
    }
  };

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" /> Indicateurs culturels
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="mb-3">
            <span className="text-sm font-medium">Composition de la population</span>
            
            {country.ethnic_groups && (
              <div className="mt-1">
                <span className="text-sm text-muted-foreground">Groupes ethniques:</span>
                <div className="text-sm">{formatGroupData(country.ethnic_groups)}</div>
              </div>
            )}
            
            {country.religious_groups && (
              <div className="mt-1">
                <span className="text-sm text-muted-foreground">Groupes religieux:</span>
                <div className="text-sm">{formatGroupData(country.religious_groups)}</div>
              </div>
            )}
          </div>
          
          {country.cultural_dimensions && (
            <div className="mt-3">
              <span className="text-sm font-medium mb-1 block">Dimensions culturelles</span>
              <div className="space-y-1">
                {formatCulturalDimensions()}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CulturalIndicators;
