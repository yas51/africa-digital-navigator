
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import type { CountryData } from '@/data/countriesData';

interface PoliticalIndicatorsProps {
  country: CountryData;
}

const PoliticalIndicators = ({ country }: PoliticalIndicatorsProps) => {
  const radarData = [
    {
      subject: 'Stabilité Politique',
      value: country.political_stability_index || 0,
      fullMark: 100,
    },
    {
      subject: 'Exécution des Contrats',
      value: country.contract_enforcement_score || 0,
      fullMark: 100,
    },
    {
      subject: 'Droits de Propriété',
      value: country.property_rights_score || 0,
      fullMark: 100,
    },
    {
      subject: 'Risque Géopolitique',
      value: Math.max(0, 100 - (country.geopolitical_risk_score || 0)),
      fullMark: 100,
    },
    {
      subject: 'Transparence Fiscale',
      value: country.fiscal_transparency_score || 0,
      fullMark: 100,
    },
  ];

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Indicateurs Politiques et Réglementaires</CardTitle>
        <CardDescription>
          Analyse du cadre juridique et politique
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Score"
                  dataKey="value"
                  stroke="#2563eb"
                  fill="#2563eb"
                  fillOpacity={0.6}
                />
                <Tooltip />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Zones Économiques Spéciales</h3>
            <ul className="list-disc pl-5 space-y-2">
              {country.special_economic_zones?.map((zone, index) => (
                <li key={index}>{zone}</li>
              ))}
            </ul>

            <h3 className="font-semibold text-lg mt-4">Incitations Fiscales</h3>
            <ul className="list-disc pl-5 space-y-2">
              {country.fiscal_incentives?.map((incentive, index) => (
                <li key={index}>{incentive}</li>
              ))}
            </ul>

            <div className="mt-4 text-sm text-gray-500">
              Dernière mise à jour: {
                country.political_indicators_last_update 
                  ? new Date(country.political_indicators_last_update).toLocaleDateString()
                  : 'Non disponible'
              }
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PoliticalIndicators;
