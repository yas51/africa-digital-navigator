
import React, { useEffect, useState } from 'react';
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
import { updatePoliticalIndicators } from '@/lib/externalApis';
import { useToast } from "@/hooks/use-toast";

interface PoliticalIndicatorsProps {
  country: CountryData;
}

// Fonction pour formater et raccourcir les labels longs
const formatSubject = (subject: string) => {
  const labelMap: Record<string, string> = {
    'Stabilité Politique': 'Stabilité',
    'Exécution des Contrats': 'Contrats',
    'Droits de Propriété': 'Propriété',
    'Risque Géopolitique': 'Géopolitique',
    'Transparence Fiscale': 'Transparence'
  };
  
  return labelMap[subject] || subject;
};

const PoliticalIndicators = ({ country }: PoliticalIndicatorsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mettre à jour les données politiques au chargement du composant
  useEffect(() => {
    const updateData = async () => {
      setIsLoading(true);
      console.log(`Tentative de mise à jour des indicateurs politiques pour: ${country.id}`);
      const success = await updatePoliticalIndicators(country.id);
      
      if (success) {
        toast({
          title: "Données mises à jour",
          description: `Les indicateurs politiques pour ${country.name} ont été actualisés.`,
        });
      }
      setIsLoading(false);
    };
    
    // Forcer la mise à jour des données à chaque changement de pays
    updateData();
  }, [country.id, country.name, toast]);

  // Vérification des données pour le débogage
  console.log("PoliticalIndicators - Données du pays:", country.id, {
    special_economic_zones: country.special_economic_zones,
    fiscal_incentives: country.fiscal_incentives,
    last_update: country.political_indicators_last_update
  });

  const radarData = [
    {
      subject: 'Stabilité Politique',
      value: country.political_stability_index || country.politicalStability || 0,
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

  // Utilisé pour le tooltip personnalisé
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip bg-background border border-border p-2 rounded-md shadow-md">
          <p className="font-semibold">{data.subject}</p>
          <p className="text-primary">{`Score: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Indicateurs Politiques et Réglementaires</CardTitle>
        <CardDescription>
          Analyse du cadre juridique et politique {isLoading && "(Mise à jour...)"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart 
                data={radarData}
                margin={{ top: 30, right: 40, bottom: 30, left: 40 }}
              >
                <PolarGrid stroke="rgba(150, 150, 150, 0.3)" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ 
                    fill: 'hsl(var(--foreground))', 
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}
                  tickFormatter={formatSubject}
                  style={{
                    fontSize: '0.8rem'
                  }}
                  tickSize={15}
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, 100]} 
                  tick={{ 
                    fill: 'hsl(var(--muted-foreground))', 
                    fontSize: '0.7rem' 
                  }}
                  tickCount={5}
                />
                <Radar
                  name="Score"
                  dataKey="value"
                  stroke="#2563eb"
                  fill="#2563eb"
                  fillOpacity={0.6}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ 
                    fontSize: '0.85rem',
                    color: 'hsl(var(--foreground))',
                    marginTop: '10px'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Zones Économiques Spéciales</h3>
            <ul className="list-disc pl-5 space-y-2">
              {Array.isArray(country.special_economic_zones) && country.special_economic_zones.length > 0 ? (
                country.special_economic_zones.map((zone, index) => (
                  <li key={index}>{zone}</li>
                ))
              ) : (
                <li>Information non disponible</li>
              )}
            </ul>

            <h3 className="font-semibold text-lg">Incitations Fiscales</h3>
            <ul className="list-disc pl-5 space-y-2">
              {Array.isArray(country.fiscal_incentives) && country.fiscal_incentives.length > 0 ? (
                country.fiscal_incentives.map((incentive, index) => (
                  <li key={index}>{incentive}</li>
                ))
              ) : (
                <li>Pas d'incitations fiscales spécifiques répertoriées</li>
              )}
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
