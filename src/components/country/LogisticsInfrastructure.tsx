
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Airport, Droplet, Factory, Fuel, Gauge, Power, Ship, Truck } from 'lucide-react';
import type { CountryData } from '@/data/countriesData';

interface LogisticsInfrastructureProps {
  country: CountryData;
}

const LogisticsInfrastructure: React.FC<LogisticsInfrastructureProps> = ({ country }) => {
  const formatCost = (value: number | null | undefined) => 
    value ? `${value.toFixed(2)} USD` : 'N/A';

  const formatScore = (value: number | null | undefined) => 
    value ? `${(value * 20).toFixed(1)}/100` : 'N/A';

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" />
          Logistique et Infrastructure
        </CardTitle>
        <CardDescription>
          Indicateurs de performance logistique et infrastructures
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-4">
            <h3 className="font-semibold">Qualité des Infrastructures</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  Routes
                </div>
                <span>{formatScore(country.road_quality)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Ship className="h-4 w-4" />
                  Ports
                </div>
                <span>{formatScore(country.port_quality)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Airport className="h-4 w-4" />
                  Aéroports
                </div>
                <span>{formatScore(country.airport_quality)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Performance Logistique</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4" />
                  Score LPI
                </div>
                <span>{country.lpi_score ? `${country.lpi_score.toFixed(2)}/5` : 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Factory className="h-4 w-4" />
                  Hubs Logistiques
                </div>
                <span>{country.logistics_hubs ? country.logistics_hubs.length : 0}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Coûts et Énergie</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Power className="h-4 w-4" />
                  Électricité
                </div>
                <span>{formatCost(country.electricity_cost)}/kWh</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Droplet className="h-4 w-4" />
                  Eau
                </div>
                <span>{formatCost(country.water_cost)}/m³</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Fuel className="h-4 w-4" />
                  Carburant
                </div>
                <span>{formatCost(country.fuel_cost)}/L</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Power className="h-4 w-4" />
                  Stabilité Énergétique
                </div>
                <span>{formatScore(country.energy_stability)}</span>
              </div>
            </div>
          </div>
        </div>

        {country.logistics_hubs && country.logistics_hubs.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Hubs Logistiques Disponibles</h3>
            <div className="flex flex-wrap gap-2">
              {country.logistics_hubs.map((hub, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
                  {hub}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LogisticsInfrastructure;
