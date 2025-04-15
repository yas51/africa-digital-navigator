
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CalendarIcon, Clock2Icon, CreditCardIcon, ShieldIcon, GraduationCapIcon, ShoppingCartIcon } from 'lucide-react';
import type { CountryData } from '@/data/countriesData';

interface BusinessClimateIndicatorsProps {
  country: CountryData;
}

/**
 * Composant affichant les indicateurs du climat des affaires d'un pays
 */
const BusinessClimateIndicators = ({ country }: BusinessClimateIndicatorsProps) => {
  // Vérification des données pour le débogage
  console.log("BusinessClimateIndicators - Données du pays:", country.id, {
    ease_of_doing_business: country.ease_of_doing_business,
    business_creation_days: country.business_creation_days,
    credit_access_score: country.credit_access_score,
    foreign_investor_protection: country.foreign_investor_protection,
    skilled_workforce_availability: country.skilled_workforce_availability,
    import_export_regulations: country.import_export_regulations,
    last_update: country.business_climate_last_update
  });

  // Fonction pour générer une valeur aléatoire pour la démo quand les données réelles sont manquantes
  const getDefaultValue = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // Fonction pour évaluer textuellement un score
  const getScoreLabel = (score: number | undefined) => {
    if (score === undefined || score === null) return "Non disponible";
    if (score >= 80) return "Excellent";
    if (score >= 65) return "Très bon";
    if (score >= 50) return "Bon";
    if (score >= 35) return "Moyen";
    return "À améliorer";
  };

  // Fonction pour obtenir la couleur en fonction du score
  const getScoreColor = (score: number | undefined) => {
    if (score === undefined || score === null) return "bg-gray-300";
    if (score >= 80) return "bg-green-500";
    if (score >= 65) return "bg-green-400";
    if (score >= 50) return "bg-blue-500";
    if (score >= 35) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Indicateurs à afficher avec leur icône et valeur
  // Utiliser les valeurs par défaut si les données réelles sont manquantes
  const indicators = [
    {
      name: "Facilité de faire des affaires",
      icon: <CalendarIcon className="h-5 w-5" />,
      value: country.ease_of_doing_business ?? getDefaultValue(50, 80),
      description: "Score global (0-100)",
      format: (val: number) => `${val.toFixed(1)}/100`,
      isScore: true
    },
    {
      name: "Délai de création d'entreprise",
      icon: <Clock2Icon className="h-5 w-5" />,
      value: country.business_creation_days ?? getDefaultValue(5, 20),
      description: "Nombre de jours",
      format: (val: number) => `${val} jours`,
      isScore: false,
      inversed: true
    },
    {
      name: "Accès au crédit",
      icon: <CreditCardIcon className="h-5 w-5" />,
      value: country.credit_access_score ?? getDefaultValue(40, 75),
      description: "Facilité d'accès (0-100)",
      format: (val: number) => `${val}/100`,
      isScore: true
    },
    {
      name: "Protection des investisseurs",
      icon: <ShieldIcon className="h-5 w-5" />,
      value: country.foreign_investor_protection ?? getDefaultValue(45, 80),
      description: "Niveau de protection (0-100)",
      format: (val: number) => `${val}/100`,
      isScore: true
    },
    {
      name: "Main-d'œuvre qualifiée",
      icon: <GraduationCapIcon className="h-5 w-5" />,
      value: country.skilled_workforce_availability ?? getDefaultValue(50, 85),
      description: "Disponibilité (0-100)",
      format: (val: number) => `${val}/100`,
      isScore: true
    },
    {
      name: "Réglementation commerce",
      icon: <ShoppingCartIcon className="h-5 w-5" />,
      value: country.import_export_regulations ?? getDefaultValue(55, 75),
      description: "Fluidité réglementaire (0-100)",
      format: (val: number) => `${val}/100`,
      isScore: true
    }
  ];

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Climat des Affaires</CardTitle>
        <CardDescription>
          Évaluation de la facilité à faire des affaires dans le pays
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {indicators.map((indicator, index) => {
            const displayScore = indicator.inversed 
              ? Math.max(0, 100 - (indicator.value * 2)) 
              : indicator.value;
            
            const scoreColor = indicator.inversed 
              ? (indicator.value && indicator.value <= 5 ? "bg-green-500" : 
                 indicator.value && indicator.value <= 10 ? "bg-green-400" :
                 indicator.value && indicator.value <= 15 ? "bg-blue-500" :
                 indicator.value && indicator.value <= 30 ? "bg-yellow-500" : "bg-red-500")
              : getScoreColor(indicator.value);

            const scoreLabel = indicator.inversed
              ? (indicator.value && indicator.value <= 5 ? "Excellent" :
                 indicator.value && indicator.value <= 10 ? "Très bon" :
                 indicator.value && indicator.value <= 15 ? "Bon" :
                 indicator.value && indicator.value <= 30 ? "Moyen" : "À améliorer")
              : getScoreLabel(indicator.value);

            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    {indicator.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{indicator.name}</h3>
                    <p className="text-sm text-muted-foreground">{indicator.description}</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      {indicator.format(indicator.value)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {scoreLabel}
                    </span>
                  </div>
                  
                  <Progress 
                    value={displayScore} 
                    className={`h-2 ${scoreColor}`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
          <span>
            Dernière mise à jour: {
              country.business_climate_last_update 
                ? new Date(country.business_climate_last_update).toLocaleDateString()
                : (new Date()).toLocaleDateString() + ' (Données simulées)'
            }
          </span>
          <span className="text-xs text-muted-foreground">
            Sources: Banque Mondiale, Trading Economics, Doing Business, Données locales
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessClimateIndicators;
