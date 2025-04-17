
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, RefreshCw, DollarSign, Building, TrendingUp, BadgePercent, Users, BarChart4 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { updateCountryFinancialData } from '@/services/financialDataService';
import { useToast } from "@/hooks/use-toast";
import type { CountryData } from '@/data/countriesData';

interface FinancialIndicatorsProps {
  country: CountryData;
}

const FinancialIndicators = ({ country }: FinancialIndicatorsProps) => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  // Fonction pour extraire les données financières du format temporaire
  const extractFinancialData = () => {
    if (!country.fiscal_incentives || !Array.isArray(country.fiscal_incentives)) {
      return null;
    }

    // Extraire les données à partir du format temporaire dans fiscal_incentives
    const financialData: Record<string, any> = {};
    
    for (const item of country.fiscal_incentives) {
      if (!item || typeof item !== 'string' || !item.includes(':')) continue;
      
      const [key, value] = item.split(':');
      if (key.startsWith('financial_') || key.includes('_funds_') || key.includes('_capital_') || 
          key.includes('_financing_') || key.includes('_investors_') || 
          key.includes('_fintechs_') || key.includes('_banking_')) {
        if (value === 'true') financialData[key] = true;
        else if (value === 'false') financialData[key] = false;
        else if (!isNaN(parseFloat(value))) financialData[key] = parseFloat(value);
        else financialData[key] = value;
      }
    }
    
    return Object.keys(financialData).length > 0 ? financialData : null;
  };

  const financialData = extractFinancialData();

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
          description: `Les indicateurs financiers pour ${country.name} ont été mis à jour avec des données réelles.`
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

  // Déterminer si les données sont récentes (moins de 30 minutes)
  const isDataRecent = () => {
    if (!country.financial_data_last_update) return false;
    const lastUpdate = new Date(country.financial_data_last_update).getTime();
    const now = new Date().getTime();
    const thirtyMinutesInMs = 30 * 60 * 1000;
    return (now - lastUpdate) < thirtyMinutesInMs;
  };

  return (
    <Card className="card-hover col-span-1 md:col-span-2">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" /> 
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
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BadgePercent className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Inclusion financière</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3 w-3 text-muted-foreground/70 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Pourcentage de la population adulte ayant accès à des services financiers formels (Source: Banque Mondiale)</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="font-medium">
                {financialData ? formatPercent(financialData.financial_inclusion_rate) : 'N/A'}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Banques et Fintechs</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3 w-3 text-muted-foreground/70 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Nombre d'institutions financières et fintechs opérant dans le pays (Source: Banque Mondiale et données nationales)</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="font-medium">
                {financialData ? financialData.banks_fintechs_count || 'N/A' : 'N/A'}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Stabilité bancaire</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3 w-3 text-muted-foreground/70 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Indice de stabilité du secteur bancaire sur 100 (Source: FMI et données locales)</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="font-medium">
                {financialData ? formatScore(financialData.banking_sector_stability) : 'N/A'}
              </span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart4 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Financement des PME</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3 w-3 text-muted-foreground/70 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Indice d'accès au financement pour les PME sur 100 (Source: Banque Mondiale)</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="font-medium">
                {financialData ? formatScore(financialData.sme_financing_access) : 'N/A'}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Investisseurs étrangers</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3 w-3 text-muted-foreground/70 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Niveau de présence d'investisseurs étrangers sur 100 (Source: CNUCED)</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="font-medium">
                {financialData ? formatScore(financialData.foreign_investors_presence) : 'N/A'}
              </span>
            </div>
            
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Types d'investisseurs</span>
              </div>
              <div className="text-right">
                <div className="flex flex-wrap justify-end gap-1 mt-1">
                  {financialData && financialData.venture_capital_presence && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Capital-risque
                    </span>
                  )}
                  {financialData && financialData.development_funds_presence && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Bailleurs
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {country.foreign_investors_types && country.foreign_investors_types.length > 0 && (
          <div className="mt-4 border-t pt-3">
            <h4 className="text-sm font-medium mb-2">Détail des investisseurs présents</h4>
            <div className="flex flex-wrap gap-1">
              {country.foreign_investors_types.map((type, index) => (
                <span key={index} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {type}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {country.financial_data_last_update && (
          <div className="mt-4 text-xs text-muted-foreground text-right">
            Dernière mise à jour: {new Date(country.financial_data_last_update).toLocaleString('fr-FR')}
            {isDataRecent() && (
              <span className="text-green-500 ml-1">(Données récentes de la Banque Mondiale)</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FinancialIndicators;
