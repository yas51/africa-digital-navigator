
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from 'lucide-react';
import type { CountryData } from '@/data/countriesData';

interface EconomicIndicatorsProps {
  country: CountryData;
}

const EconomicIndicators = ({ country }: EconomicIndicatorsProps) => {
  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" /> Indicateurs Économiques
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Inflation:</span>
            <span className="font-medium">{country.current_inflation?.toFixed(1) || '?'}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Taux de change:</span>
            <span className="font-medium">{country.exchange_rate?.toFixed(4) || '?'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Chômage:</span>
            <span className="font-medium">{country.unemployment_rate?.toFixed(1) || '?'}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Dette publique:</span>
            <span className="font-medium">{country.public_debt_gdp?.toFixed(1) || '?'}% du PIB</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EconomicIndicators;
