
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

  return (
    <Card className="card-hover col-span-1 md:col-span-2">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" /> Indicateurs financiers et bancaires
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
                    <p className="max-w-xs">Pourcentage de la population adulte ayant accès à des services financiers formels</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="font-medium">{formatPercent(country.financial_inclusion_rate)}</span>
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
                    <p className="max-w-xs">Nombre d'institutions financières et fintechs opérant dans le pays</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="font-medium">{country.banks_fintechs_count || 'N/A'}</span>
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
                    <p className="max-w-xs">Indice de stabilité du secteur bancaire sur 100</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="font-medium">{formatScore(country.banking_sector_stability)}</span>
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
                    <p className="max-w-xs">Indice d'accès au financement pour les PME sur 100</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="font-medium">{formatScore(country.sme_financing_access)}</span>
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
                    <p className="max-w-xs">Niveau de présence d'investisseurs étrangers sur 100</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="font-medium">{formatScore(country.foreign_investors_presence)}</span>
            </div>
            
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Types d'investisseurs</span>
              </div>
              <div className="text-right">
                <div className="flex flex-wrap justify-end gap-1 mt-1">
                  {country.venture_capital_presence && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Capital-risque
                    </span>
                  )}
                  {country.development_funds_presence && (
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
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FinancialIndicators;
