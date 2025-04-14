import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe2, TrendingUp, BarChart3 } from 'lucide-react';
import type { CountryData } from '@/data/countriesData';
import { supabase } from '@/integrations/supabase/client';
import { updateCountryWithExternalData } from '@/lib/supabase';
import { toast } from "@/components/ui/toast";

interface CountryDetailsProps {
  country: CountryData;
}

const CountryDetails: React.FC<CountryDetailsProps> = ({ country }) => {
  const [updatedCountry, setUpdatedCountry] = useState<CountryData>(country);

  useEffect(() => {
    const updateCountryData = async () => {
      try {
        console.log(`Dernière mise à jour des données: ${country.wb_last_updated}`);

        const isDataStale = !country.wb_last_updated || 
          (new Date().getTime() - new Date(country.wb_last_updated).getTime()) > 24 * 60 * 60 * 1000;

        if (isDataStale) {
          console.log('Mise à jour des données du pays en cours...');
          const updated = await updateCountryWithExternalData(country.id);
          
          if (updated) {
            const { data, error } = await supabase
              .from('countries')
              .select('*')
              .eq('id', country.id)
              .single();

            if (data) {
              setUpdatedCountry(data);
              toast({
                title: "Données mises à jour",
                description: `Les données pour ${country.name} ont été actualisées.`
              });
            }
          }
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour des données:', error);
        toast({
          title: "Erreur de mise à jour",
          description: "Impossible de mettre à jour les données du pays.",
          variant: "destructive"
        });
      }
    };

    updateCountryData();
  }, [country]);

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
      
      <Card>
        <CardHeader>
          <CardTitle>Informations de mise à jour</CardTitle>
        </CardHeader>
        <CardContent>
          <div>Dernière mise à jour: {updatedCountry.wb_last_updated ? new Date(updatedCountry.wb_last_updated).toLocaleString() : 'Jamais'}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CountryDetails;
