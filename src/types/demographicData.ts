
export interface AgeDistribution {
  "0-14 ans": number;
  "15-64 ans": number;
  "65+ ans": number;
}

export interface DemographicData {
  population_growth: number;
  median_age: number;
  urban_population_percentage: number;
  literacy_rate: number;
  higher_education_rate: number;
  age_distribution: AgeDistribution;
  social_stability_index: number;
}

export interface FinancialIndicators {
  financial_inclusion_rate: number;
  banks_fintechs_count: number;
  banking_sector_stability: number;
  sme_financing_access: number;
  foreign_investors_presence: number;
  venture_capital_presence: boolean;
  development_funds_presence: boolean;
  foreign_investors_types: string[];
}
