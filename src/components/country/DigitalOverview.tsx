
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from 'lucide-react';
import type { CountryData } from '@/data/countriesData';

interface DigitalOverviewProps {
  country: CountryData;
}

const DigitalOverview = ({ country }: DigitalOverviewProps) => {
  return (
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
  );
};

export default DigitalOverview;
