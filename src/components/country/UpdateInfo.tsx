
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from 'lucide-react';
import type { CountryData } from '@/data/countriesData';

interface UpdateInfoProps {
  country: CountryData;
}

const UpdateInfo = ({ country }: UpdateInfoProps) => {
  // Fonction pour formater la date de dernière mise à jour
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Jamais';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch (error) {
      console.error('Erreur de formatage de date:', error);
      return 'Format de date invalide';
    }
  };

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" /> Informations de mise à jour
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Données économiques:</span>
            <span className="font-medium">{formatDate(country.last_real_time_update)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Indicateurs démographiques:</span>
            <span className="font-medium">{formatDate(country.demographic_data_last_update)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Infrastructures et logistique:</span>
            <span className="font-medium">{formatDate(country.infrastructure_last_update)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Indicateurs politiques:</span>
            <span className="font-medium">{formatDate(country.political_indicators_last_update)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Données Banque Mondiale:</span>
            <span className="font-medium">{formatDate(country.wb_last_updated)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpdateInfo;
