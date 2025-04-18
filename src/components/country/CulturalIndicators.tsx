import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Languages, Users, RefreshCw } from 'lucide-react';
import type { CountryData } from '@/data/countriesData';
import { updateDemographicDataRealtime } from '@/services/demographicDataService';
import { useToast } from "@/hooks/use-toast";

interface CulturalIndicatorsProps {
  country: CountryData;
}

const CulturalIndicators = ({ country }: CulturalIndicatorsProps) => {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = React.useState(false);
  
  const hasCulturalData = country.cultural_dimensions !== undefined || 
                         country.ethnic_groups !== undefined ||
                         country.religious_groups !== undefined;

  if (!hasCulturalData) {
    return null;
  }

  const handleRefresh = async () => {
    if (!country.id || isUpdating) return;
    
    setIsUpdating(true);
    const success = await updateDemographicDataRealtime(country.id);
    
    if (success) {
      toast({
        title: "Données mises à jour",
        description: "Les indicateurs culturels ont été actualisés.",
      });
    } else {
      toast({
        title: "Échec de mise à jour",
        description: "Impossible de mettre à jour les indicateurs culturels.",
        variant: "destructive"
      });
    }
    
    setIsUpdating(false);
  };

  const formatGroupData = (groupData: Record<string, number> | null) => {
    if (!groupData) return "Non disponible";
    
    try {
      return Object.entries(groupData)
        .map(([key, value]) => (
          <div key={key} className="flex justify-between text-sm">
            <span className="text-muted-foreground">{key}:</span>
            <span className="font-medium">{typeof value === 'number' ? `${value}%` : value}</span>
          </div>
        ));
    } catch (error) {
      console.error("Erreur lors du formatage des données de groupe:", error);
      return "Format de données incorrect";
    }
  };

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
            <div key={key} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{label}:</span>
              <span className="font-medium">
                {value !== null && value !== undefined ? Math.round(Number(value)) : 'N/A'}/100
              </span>
            </div>
          );
        });
    } catch (error) {
      console.error("Erreur lors du formatage des dimensions culturelles:", error);
      return null;
    }
  };

  const formatLastUpdate = () => {
    if (!country.demographic_data_last_update) return "Non disponible";
    
    try {
      const date = new Date(country.demographic_data_last_update);
      return date.toLocaleString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch (error) {
      return "Date incorrecte";
    }
  };

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" /> Indicateurs culturels
          </CardTitle>
          <button 
            className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
            onClick={handleRefresh}
            disabled={isUpdating}
          >
            <RefreshCw className={`h-3 w-3 ${isUpdating ? 'animate-spin' : ''}`} />
            Actualiser
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <span className="text-sm font-medium block">Composition de la population</span>
            
            {country.ethnic_groups && (
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground block">Groupes ethniques:</span>
                {formatGroupData(country.ethnic_groups)}
              </div>
            )}
            
            {country.religious_groups && (
              <div className="space-y-1 mt-2">
                <span className="text-sm text-muted-foreground block">Groupes religieux:</span>
                {formatGroupData(country.religious_groups)}
              </div>
            )}
          </div>
          
          {country.cultural_dimensions && (
            <div className="space-y-1">
              <span className="text-sm font-medium block mb-1">Dimensions culturelles</span>
              {formatCulturalDimensions()}
            </div>
          )}
          
          {country.social_stability_index !== undefined && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Indice de stabilité sociale:</span>
              <span className="font-medium">
                {Math.round(country.social_stability_index * 100)}/100
              </span>
            </div>
          )}
          
          <div className="text-xs text-muted-foreground mt-2">
            Dernière mise à jour: {formatLastUpdate()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CulturalIndicators;
