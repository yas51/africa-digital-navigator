
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CalendarIcon, Clock2Icon, CreditCardIcon, ShieldIcon, GraduationCapIcon, ShoppingCartIcon } from 'lucide-react';
import type { CountryData } from '@/data/countriesData';
import BusinessClimateIndicator from './business-climate/BusinessClimateIndicator';
import BusinessClimateFooter from './business-climate/BusinessClimateFooter';
import { getDefaultValue } from './business-climate/utils';

interface BusinessClimateIndicatorsProps {
  country: CountryData;
}

const BusinessClimateIndicators = ({ country }: BusinessClimateIndicatorsProps) => {
  console.log("BusinessClimateIndicators - Données du pays:", country.id, {
    ease_of_doing_business: country.ease_of_doing_business,
    business_creation_days: country.business_creation_days,
    credit_access_score: country.credit_access_score,
    foreign_investor_protection: country.foreign_investor_protection,
    skilled_workforce_availability: country.skilled_workforce_availability,
    import_export_regulations: country.import_export_regulations,
    last_update: country.business_climate_last_update
  });

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
          {indicators.map((indicator, index) => (
            <BusinessClimateIndicator
              key={index}
              {...indicator}
            />
          ))}
        </div>
        <BusinessClimateFooter lastUpdate={country.business_climate_last_update} />
      </CardContent>
    </Card>
  );
};

export default BusinessClimateIndicators;
