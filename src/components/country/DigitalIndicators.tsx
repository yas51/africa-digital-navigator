
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wifi, Signal, Users, Database, Globe2 } from 'lucide-react';
import type { CountryData } from '@/data/countriesData';

interface DigitalIndicatorsProps {
  country: CountryData;
}

const DigitalIndicators = ({ country }: DigitalIndicatorsProps) => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Indicateurs Technologiques et Digitaux</CardTitle>
        <CardDescription>Infrastructure et écosystème numérique</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Wifi className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Pénétration Numérique</h3>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex justify-between">
                    Internet: <span className="font-medium">{country.internetPenetration}%</span>
                  </p>
                  <p className="text-sm text-muted-foreground flex justify-between">
                    Mobile: <span className="font-medium">{country.mobilePenetration}%</span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Signal className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Infrastructure TIC</h3>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex justify-between">
                    Qualité réseau: <span className="font-medium">{Math.round((country.internetPenetration + country.mobilePenetration) / 2)}%</span>
                  </p>
                  <p className="text-sm text-muted-foreground flex justify-between">
                    Couverture 4G: <span className="font-medium">{Math.round(country.mobilePenetration * 0.9)}%</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Talents Tech & IA</h3>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex justify-between">
                    Disponibilité: <span className="font-medium">{Math.round(country.education * 0.8)}/100</span>
                  </p>
                  <p className="text-sm text-muted-foreground flex justify-between">
                    Formation tech: <span className="font-medium">{Math.round(country.education * 0.7)}/100</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Database className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Investissements Digital</h3>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex justify-between">
                    Public: <span className="font-medium">{Math.round(country.gdpGrowth * 10)}M$</span>
                  </p>
                  <p className="text-sm text-muted-foreground flex justify-between">
                    Privé: <span className="font-medium">{Math.round(country.fdiInflow)}M$</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-2 bg-rose-100 rounded-lg">
                <Globe2 className="h-5 w-5 text-rose-600" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Classements</h3>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex justify-between">
                    NRI: <span className="font-medium">{Math.round(country.opportunityScore * 0.8)}/100</span>
                  </p>
                  <p className="text-sm text-muted-foreground flex justify-between">
                    e-Gov: <span className="font-medium">{Math.round(country.opportunityScore * 0.7)}/100</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DigitalIndicators;
