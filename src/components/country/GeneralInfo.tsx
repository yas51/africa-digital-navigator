
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe2 } from 'lucide-react';
import type { CountryData } from '@/data/countriesData';

interface GeneralInfoProps {
  country: CountryData;
}

const GeneralInfo = ({ country }: GeneralInfoProps) => {
  return (
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
  );
};

export default GeneralInfo;
