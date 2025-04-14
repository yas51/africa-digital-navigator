
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp } from 'lucide-react';
import type { CountryData } from '@/data/countriesData';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface EconomicChartProps {
  country: CountryData;
}

const EconomicChart = ({ country }: EconomicChartProps) => {
  // Transformation des données pour un affichage correct sur le graphique
  const chartData = [
    {
      category: "Indicateurs",
      "Croissance PIB (%)": country.gdpGrowth,
      "Inflation (%)": country.current_inflation || 0,
      "Taux de chômage (%)": country.unemployment_rate || 0,
      "Dette publique (% PIB)": country.public_debt_gdp || 0,
      "Balance commerciale (% PIB)": country.trade_balance || 0,
    }
  ];

  // Configuration des couleurs pour chaque indicateur
  const colors = {
    "Croissance PIB (%)": 'hsl(142, 76%, 36%)',
    "Inflation (%)": 'hsl(346, 87%, 43%)',
    "Taux de chômage (%)": 'hsl(200, 95%, 14%)',
    "Dette publique (% PIB)": 'hsl(32, 95%, 44%)',
    "Balance commerciale (% PIB)": 'hsl(262, 83%, 58%)'
  };

  return (
    <Card className="col-span-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" /> Indicateurs Macroéconomiques
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ChartContainer
          className="w-full h-full"
          config={{
            bar: {
              theme: {
                light: "hsl(142, 76%, 36%)",
                dark: "hsl(142, 76%, 36%)",
              },
            },
          }}
        >
          <BarChart 
            data={chartData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis 
              dataKey="category" 
              type="category" 
              tick={false} 
              axisLine={false}
            />
            <ChartTooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                return (
                  <ChartTooltipContent
                    className="bg-background"
                    payload={payload}
                  />
                );
              }}
            />
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center"
              wrapperStyle={{ bottom: -80 }}
            />
            {Object.keys(colors).map((key) => (
              <Bar 
                key={key} 
                dataKey={key} 
                fill={colors[key as keyof typeof colors]} 
                name={key}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default EconomicChart;
