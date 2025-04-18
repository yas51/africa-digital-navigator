
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Building, BarChart3, RefreshCw } from 'lucide-react';
import type { CountryData } from '@/data/countriesData';
import { updateDemographicDataRealtime } from '@/services/demographicDataService';
import { useToast } from "@/hooks/use-toast";

interface DemographicIndicatorsProps {
  country: CountryData;
}

const DemographicIndicators = ({ country }: DemographicIndicatorsProps) => {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = React.useState(false);

  // Vérifie si les données démographiques sont disponibles
  const hasDemographicData = country.population_growth !== undefined || 
                            country.median_age !== undefined ||
                            country.literacy_rate !== undefined;

  if (!hasDemographicData) {
    return null; // Ne pas afficher le composant si aucune donnée n'est disponible
  }

  // Déclenche une mise à jour en temps réel des données
  const handleRefresh = async () => {
    if (!country.id || isUpdating) return;
    
    setIsUpdating(true);
    const success = await updateDemographicDataRealtime(country.id);
    
    if (success) {
      toast({
        title: "Données mises à jour",
        description: "Les indicateurs démographiques ont été actualisés.",
      });
    } else {
      toast({
        title: "Échec de mise à jour",
        description: "Impossible de mettre à jour les indicateurs démographiques.",
        variant: "destructive"
      });
    }
    
    setIsUpdating(false);
  };

  // Fonction de formatage sécurisé pour les valeurs numériques
  const safeFormat = (value: any, decimals: number = 1) => {
    if (value === undefined || value === null) return "Non disponible";
    return Number(value).toFixed(decimals);
  };

  // Formater la date de dernière mise à jour
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

  // Formater la répartition par âge
  const formatAgeDistribution = () => {
    if (!country.age_distribution) return null;
    
    try {
      const ageData = typeof country.age_distribution === 'object' ? country.age_distribution : {};
      return Object.entries(ageData).map(([key, value]) => (
        <div key={key} className="flex justify-between text-sm">
          <span className="text-muted-foreground">{key}:</span>
          <span className="font-medium">{typeof value === 'number' ? `${value}%` : value}</span>
        </div>
      ));
    } catch (error) {
      console.error('Erreur lors du formatage des données d\'âge:', error);
      return null;
    }
  };

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" /> Indicateurs démographiques
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
        <div className="space-y-3">
          {country.population_growth !== undefined && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Croissance population:</span>
              <span className="font-medium">{safeFormat(country.population_growth)}%</span>
            </div>
          )}
          
          {country.median_age !== undefined && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Âge médian:</span>
              <span className="font-medium">{safeFormat(country.median_age)} ans</span>
            </div>
          )}
          
          {country.urban_population_percentage !== undefined && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Population urbaine:</span>
              <span className="font-medium">{safeFormat(country.urban_population_percentage)}%</span>
            </div>
          )}
          
          {country.literacy_rate !== undefined && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Taux d'alphabétisation:</span>
              <span className="font-medium">{safeFormat(country.literacy_rate)}%</span>
            </div>
          )}
          
          {country.higher_education_rate !== undefined && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Éducation supérieure:</span>
              <span className="font-medium">{safeFormat(country.higher_education_rate)}%</span>
            </div>
          )}

          {country.age_distribution && (
            <div className="space-y-1">
              <span className="text-sm text-muted-foreground block mb-1">Répartition par âge:</span>
              {formatAgeDistribution()}
            </div>
          )}
          
          <div className="text-xs text-muted-foreground mt-4">
            Dernière mise à jour: {formatLastUpdate()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemographicIndicators;
