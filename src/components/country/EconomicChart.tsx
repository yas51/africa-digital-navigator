
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import type { CountryData } from '@/data/countriesData';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface EconomicChartProps {
  country: CountryData;
}

const EconomicChart = ({ country }: EconomicChartProps) => {
  // Création des données pour le graphique
  const chartData = [
    {
      name: 'Croissance',
      value: country.gdpGrowth,
      label: 'Croissance PIB (%)',
      color: 'hsl(142, 76%, 36%)'
    },
    {
      name: 'Inflation',
      value: country.current_inflation || 0,
      label: 'Inflation (%)',
      color: 'hsl(346, 87%, 43%)'
    },
    {
      name: 'Chômage',
      value: country.unemployment_rate || 0,
      label: 'Taux de chômage (%)',
      color: 'hsl(200, 95%, 14%)'
    },
    {
      name: 'Dette',
      value: country.public_debt_gdp || 0,
      label: 'Dette publique (% PIB)',
      color: 'hsl(32, 95%, 44%)'
    },
    {
      name: 'Balance',
      value: country.trade_balance || 0,
      label: 'Balance commerciale (% PIB)',
      color: 'hsl(262, 83%, 58%)'
    }
  ];

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
            line: {
              theme: {
                light: "hsl(142, 76%, 36%)",
                dark: "hsl(142, 76%, 36%)",
              },
            },
          }}
        >
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
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
            <Legend />
            {chartData.map((entry) => (
              <Line
                key={entry.name}
                type="monotone"
                dataKey="value"
                stroke={entry.color}
                name={entry.label}
                data={[entry]}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default EconomicChart;
