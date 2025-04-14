
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from 'lucide-react';
import type { CountryData } from '@/data/countriesData';

interface EconomicOverviewProps {
  country: CountryData;
}

const EconomicOverview = ({ country }: EconomicOverviewProps) => {
  return (
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
  );
};

export default EconomicOverview;
