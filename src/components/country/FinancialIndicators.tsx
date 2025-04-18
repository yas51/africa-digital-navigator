
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { 
  Coins, RefreshCw, Building2, TrendingUp, 
  PieChart, Users, HelpCircle, DollarSign 
} from 'lucide-react';
import type { CountryData } from '@/data/countriesData';
import { updateCountryFinancialData } from '@/services/financialDataService';

interface FinancialIndicatorsProps {
  country: CountryData;
}

const FinancialIndicators = ({ country }: FinancialIndicatorsProps) => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const formatPercent = (value?: number) => {
    if (value === undefined || value === null) return 'N/A';
    return `${value.toFixed(1)}%`;
  };

  const formatScore = (value?: number) => {
    if (value === undefined || value === null) return 'N/A';
    return value.toFixed(1);
  };

  const handleRefresh = async () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    try {
      const success = await updateCountryFinancialData(country.id);
      if (success) {
        toast({
          title: "Données financières actualisées",
          description: `Les indicateurs financiers pour ${country.name} ont été mis à jour.`
        });
      } else {
        toast({
          title: "Échec de l'actualisation",
          description: "Un problème est survenu lors de la mise à jour des données.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'actualisation des données financières:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'actualisation des données.",
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const isDataRecent = () => {
    if (!country.financial_data_last_update) return false;
    const lastUpdate = new Date(country.financial_data_last_update).getTime();
    const now = new Date().getTime();
    const thirtyMinutesInMs = 30 * 60 * 1000;
    return (now - lastUpdate) < thirtyMinutesInMs;
  };

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Coins className="h-5 w-5 text-primary" />
          Indicateurs financiers et bancaires
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
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="h-8 w-8 p-0"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span className="sr-only">Actualiser les données</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <PieChart className="h-4 w-4 text-primary" />
                  <span className="font-medium">Inclusion financière</span>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Pourcentage de la population ayant accès aux services financiers formels</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <span>{formatPercent(country.financial_inclusion_rate)}</span>
              </div>
              <div className="h-2 bg-secondary/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${country.financial_inclusion_rate || 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  <span className="font-medium">Établissements financiers</span>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Nombre de banques et fintechs présentes dans le pays</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <span>{country.banks_fintechs_count || 'N/A'}</span>
              </div>
              <div className="h-2 bg-secondary/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((country.banks_fintechs_count || 0) / 100 * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="font-medium">Stabilité bancaire</span>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Indice de stabilité du secteur bancaire</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <span>{formatScore(country.banking_sector_stability)}</span>
              </div>
              <div className="h-2 bg-secondary/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${country.banking_sector_stability || 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span className="font-medium">Accès PME</span>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Facilité d'accès au financement pour les PME</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <span>{formatScore(country.sme_financing_access)}</span>
              </div>
              <div className="h-2 bg-secondary/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${country.sme_financing_access || 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 border-t pt-4">
          <h4 className="text-sm font-medium mb-3">Types d'investisseurs présents</h4>
          <div className="flex flex-wrap gap-2">
            {country.venture_capital_presence && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                Capital-risque
              </span>
            )}
            {country.development_funds_presence && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Fonds de développement
              </span>
            )}
            {country.foreign_investors_types?.map((type, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary-foreground"
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        {country.financial_data_last_update && (
          <div className="mt-4 text-xs text-muted-foreground text-right">
            Dernière mise à jour: {new Date(country.financial_data_last_update).toLocaleString('fr-FR')}
            {isDataRecent() && (
              <span className="text-green-500 ml-1">(Données de la Banque Mondiale)</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FinancialIndicators;
