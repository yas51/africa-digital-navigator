
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CountryData } from '@/data/countriesData';

interface UpdateInfoProps {
  country: CountryData;
}

const UpdateInfo = ({ country }: UpdateInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations de mise à jour</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          Dernière mise à jour: {country.wb_last_updated ? new Date(country.wb_last_updated).toLocaleString() : 'Jamais'}
        </div>
        <div className="mt-2">
          Données économiques: {country.last_real_time_update ? new Date(country.last_real_time_update).toLocaleString() : 'Jamais'}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpdateInfo;
