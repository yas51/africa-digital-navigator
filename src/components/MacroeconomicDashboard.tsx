
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Button } from "@/components/ui/button";
import { Download, Share2 } from 'lucide-react';
import { getCountryById } from '@/data/countriesData';
import { getSectorOpportunities } from '@/data/indicators';

interface MacroeconomicDashboardProps {
  countryId: string;
}

const MacroeconomicDashboard: React.FC<MacroeconomicDashboardProps> = ({ countryId }) => {
  const country = getCountryById(countryId);
  const sectorOpportunities = getSectorOpportunities(countryId);

  if (!country) {
    return <div className="text-center py-8">Sélectionnez un pays pour voir l'analyse</div>;
  }

  // Prepare data for radar chart
  const radarData = [
    {
      subject: 'Économie',
      value: Math.min(100, (country.gdpGrowth * 10) + (100 - country.doingBusinessRank / 2)),
      fullMark: 100,
    },
    {
      subject: 'Digital',
      value: Math.min(100, (country.internetPenetration + country.mobilePenetration) / 2),
      fullMark: 100,
    },
    {
      subject: 'Stabilité',
      value: country.politicalStability,
      fullMark: 100,
    },
    {
      subject: 'Corruption',
      value: country.corruptionIndex,
      fullMark: 100,
    },
    {
      subject: 'Logistique',
      value: country.logisticsIndex * 20,
      fullMark: 100,
    },
    {
      subject: 'Éducation',
      value: country.education,
      fullMark: 100,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {country.flag} {country.name}: Analyse Macroéconomique
        </h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exporter PDF
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Partager
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Attractivité par Secteur</CardTitle>
            <CardDescription>Opportunités d'investissement par secteur</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sectorOpportunities}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="overallScore" name="Score Global" fill="#1e40af" />
                  <Bar dataKey="growth" name="Croissance (%)" fill="#3b82f6" />
                  <Bar dataKey="digitalReadiness" name="Maturité Digitale" fill="#60a5fa" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Radar d'Attractivité</CardTitle>
            <CardDescription>Évaluation multi-facteurs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name={country.name} dataKey="value" stroke="#1e40af" fill="#1e40af" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Opportunités Sectorielles Détaillées</CardTitle>
          <CardDescription>Analyse complète par secteur économique</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Secteur</th>
                  <th scope="col" className="px-6 py-3">Description</th>
                  <th scope="col" className="px-6 py-3">Croissance</th>
                  <th scope="col" className="px-6 py-3">Readiness</th>
                  <th scope="col" className="px-6 py-3">Investissements</th>
                  <th scope="col" className="px-6 py-3">Concurrence</th>
                  <th scope="col" className="px-6 py-3">Score Global</th>
                </tr>
              </thead>
              <tbody>
                {sectorOpportunities.map((sector) => (
                  <tr key={sector.id} className="bg-white border-b hover:bg-gray-50">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {sector.name}
                    </th>
                    <td className="px-6 py-4">{sector.description}</td>
                    <td className="px-6 py-4">{sector.growth}%</td>
                    <td className="px-6 py-4">{sector.digitalReadiness}/100</td>
                    <td className="px-6 py-4">{sector.foreignInvestment}/100</td>
                    <td className="px-6 py-4">{sector.localCompetition}/100</td>
                    <td className="px-6 py-4 font-medium">
                      <span className={
                        sector.overallScore >= 75 ? "indicator-high" : 
                        sector.overallScore >= 60 ? "indicator-medium" : 
                        "indicator-low"
                      }>
                        {sector.overallScore}/100
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MacroeconomicDashboard;
