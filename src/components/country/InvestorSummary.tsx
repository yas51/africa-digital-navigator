
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  BriefcaseIcon,
  TrendingUpIcon,
  GlobeIcon,
  UsersIcon,
  BuildingIcon,
  BanknotesIcon,
  ScaleIcon,
  ShieldCheckIcon,
  ChartBarIcon
} from 'lucide-react';
import type { CountryData } from '@/data/countriesData';

interface InvestorSummaryProps {
  country: CountryData;
}

const InvestorSummary = ({ country }: InvestorSummaryProps) => {
  // Fonction pour calculer le score d'attractivité global
  const calculateAttractivenessScore = () => {
    const scores = {
      economic: (country.gdpGrowth * 10 + (100 - country.doingBusinessRank / 2)) / 2,
      digital: (country.internetPenetration + country.mobilePenetration) / 2,
      stability: country.politicalStability || 0,
      finance: country.banking_sector_stability || 0,
      infrastructure: (country.infrastructure_quality || 0),
      social: country.social_stability_index || 0
    };

    return Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length);
  };

  // Fonction pour formater les pourcentages
  const formatPercent = (value?: number) => {
    if (value === undefined || value === null) return 'N/A';
    return `${value.toFixed(1)}%`;
  };

  // Déterminer la recommandation globale
  const getRecommendation = () => {
    const score = calculateAttractivenessScore();
    if (score >= 75) return "Très favorable - Opportunité d'investissement majeure";
    if (score >= 60) return "Favorable - Bonnes perspectives avec quelques points de vigilance";
    if (score >= 40) return "Modéré - Potentiel intéressant mais risques significatifs";
    return "Prudence recommandée - Niveau de risque élevé";
  };

  // Analyser les forces et faiblesses
  const strengths = [];
  const weaknesses = [];

  // Analyse économique
  if (country.gdpGrowth > 5) strengths.push("Forte croissance économique");
  if (country.gdpGrowth < 2) weaknesses.push("Croissance économique faible");
  
  // Analyse démographique
  if (country.urban_population_percentage > 60) strengths.push("Fort potentiel du marché urbain");
  if (country.literacy_rate > 80) strengths.push("Population éduquée");
  
  // Analyse financière
  if (country.banking_sector_stability > 70) strengths.push("Secteur bancaire stable");
  if (country.financial_inclusion_rate > 60) strengths.push("Bonne inclusion financière");
  
  // Analyse infrastructure
  if (country.infrastructure_quality > 70) strengths.push("Infrastructure de qualité");
  if (country.infrastructure_quality < 40) weaknesses.push("Infrastructure insuffisante");
  
  // Analyse risques
  if (country.politicalStability < 50) weaknesses.push("Instabilité politique");
  if (country.corruptionIndex < 40) weaknesses.push("Niveau de corruption élevé");

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <BriefcaseIcon className="h-6 w-6 text-primary" />
          Synthèse pour l'Investisseur
        </CardTitle>
        <CardDescription>
          Analyse complète des opportunités et risques d'investissement pour {country.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* Indicateurs clés */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ChartBarIcon className="h-5 w-5 text-primary" />
                Indicateurs Clés
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/10 rounded-lg">
                  <div className="text-sm text-muted-foreground">PIB</div>
                  <div className="text-2xl font-semibold">{country.gdp.toFixed(1)} Mds$</div>
                </div>
                <div className="p-4 bg-secondary/10 rounded-lg">
                  <div className="text-sm text-muted-foreground">Croissance</div>
                  <div className="text-2xl font-semibold text-green-600">+{country.gdpGrowth.toFixed(1)}%</div>
                </div>
                <div className="p-4 bg-secondary/10 rounded-lg">
                  <div className="text-sm text-muted-foreground">Population</div>
                  <div className="text-2xl font-semibold">{country.population.toFixed(1)}M</div>
                </div>
                <div className="p-4 bg-secondary/10 rounded-lg">
                  <div className="text-sm text-muted-foreground">Score Opportunité</div>
                  <div className="text-2xl font-semibold">{calculateAttractivenessScore()}/100</div>
                </div>
              </div>
            </div>

            {/* Forces */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <TrendingUpIcon className="h-5 w-5 text-green-600" />
                Forces
              </h3>
              <ul className="space-y-2">
                {strengths.map((strength, index) => (
                  <li key={index} className="flex items-center gap-2 text-green-600">
                    <span className="h-2 w-2 rounded-full bg-green-600"></span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            {/* Faiblesses */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <ScaleIcon className="h-5 w-5 text-red-600" />
                Points de vigilance
              </h3>
              <ul className="space-y-2">
                {weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-center gap-2 text-red-600">
                    <span className="h-2 w-2 rounded-full bg-red-600"></span>
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            {/* Environnement des affaires */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BuildingIcon className="h-5 w-5 text-primary" />
                Environnement des Affaires
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Rang Doing Business</span>
                  <span className="font-semibold">{country.doingBusinessRank}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Stabilité Politique</span>
                  <span className="font-semibold">{formatPercent(country.politicalStability)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Infrastructure</span>
                  <span className="font-semibold">{formatPercent(country.infrastructure_quality)}</span>
                </div>
              </div>
            </div>

            {/* Système financier */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BanknotesIcon className="h-5 w-5 text-primary" />
                Système Financier
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Inclusion Financière</span>
                  <span className="font-semibold">{formatPercent(country.financial_inclusion_rate)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Stabilité Bancaire</span>
                  <span className="font-semibold">{formatPercent(country.banking_sector_stability)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Accès PME au financement</span>
                  <span className="font-semibold">{formatPercent(country.sme_financing_access)}</span>
                </div>
              </div>
            </div>

            {/* Recommandation */}
            <div className="p-4 bg-primary/10 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <ShieldCheckIcon className="h-5 w-5 text-primary" />
                Recommandation
              </h3>
              <p className="text-primary font-medium">{getRecommendation()}</p>
            </div>
          </div>
        </div>

        {/* Opportunités sectorielles */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Opportunités Sectorielles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {country.gdpGrowth > 4 && (
              <div className="p-4 border rounded-lg">
                <div className="font-medium">Services Financiers</div>
                <div className="text-sm text-muted-foreground">
                  Fort potentiel de croissance avec {formatPercent(country.financial_inclusion_rate)} d'inclusion financière
                </div>
              </div>
            )}
            {(country.internetPenetration + country.mobilePenetration) / 2 > 60 && (
              <div className="p-4 border rounded-lg">
                <div className="font-medium">Technologies Digitales</div>
                <div className="text-sm text-muted-foreground">
                  Marché digital en développement avec {formatPercent(country.internetPenetration)} de pénétration internet
                </div>
              </div>
            )}
            {country.urban_population_percentage > 50 && (
              <div className="p-4 border rounded-lg">
                <div className="font-medium">Infrastructures Urbaines</div>
                <div className="text-sm text-muted-foreground">
                  Urbanisation croissante ({formatPercent(country.urban_population_percentage)})
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestorSummary;
